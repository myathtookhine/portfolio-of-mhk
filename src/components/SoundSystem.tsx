import { useCallback, useEffect, useRef, useState } from 'react'
import LoadingScreen from './LoadingScreen'
import MusicButton from './MusicButton'

const LOADING_MS = 2000
/** Delay between the intro sound and the background loop. */
const LOOP_DELAY_MS = 2000
const INTRO_VOLUME = 0.8
const LOOP_VOLUME = 0.5

const soundUrl = (file: string) => `${import.meta.env.BASE_URL}sounds/${file}`

type Phase = 'loading' | 'await' | 'intro' | 'ready'

/**
 * First-load sequence: loader (2s) → PRESS START → intro sound → 2s later the
 * looping background music starts and the play/pause button appears.
 *
 * Browsers only allow sound after the visitor interacts with the page, so the
 * sequence starts from the PRESS START click rather than automatically.
 */
export default function SoundSystem() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [playing, setPlaying] = useState(false)
  const introRef = useRef<HTMLAudioElement | null>(null)
  const loopRef = useRef<HTMLAudioElement | null>(null)
  const loopTimerRef = useRef<number | undefined>(undefined)
  // True while the loop is being briefly started and stopped to unlock it (see start()).
  const primingRef = useRef(false)

  useEffect(() => {
    const intro = new Audio(soundUrl('starter-sound.mp3'))
    const loop = new Audio(soundUrl('loop-sound.mp3'))
    intro.volume = INTRO_VOLUME
    intro.preload = 'auto'
    loop.volume = LOOP_VOLUME
    loop.loop = true
    loop.preload = 'auto'
    introRef.current = intro
    loopRef.current = loop

    // Keep the button in sync with the audio element's real state.
    const onPlay = () => !primingRef.current && setPlaying(true)
    const onPause = () => !primingRef.current && setPlaying(false)
    loop.addEventListener('play', onPlay)
    loop.addEventListener('pause', onPause)

    // Only advance if the visitor hasn't already skipped past the loader.
    const loadTimer = window.setTimeout(() => setPhase((p) => (p === 'loading' ? 'await' : p)), LOADING_MS)

    return () => {
      window.clearTimeout(loadTimer)
      window.clearTimeout(loopTimerRef.current)
      loop.removeEventListener('play', onPlay)
      loop.removeEventListener('pause', onPause)
      intro.pause()
      loop.pause()
      introRef.current = null
      loopRef.current = null
    }
  }, [])

  // Runs inside the PRESS START click, which is the user gesture browsers require.
  const start = useCallback(() => {
    const intro = introRef.current
    const loop = loopRef.current
    if (!intro || !loop) return

    intro.play().catch(() => {})

    // Safari/iOS only allow a later play() on an element that was started during
    // a gesture. Start the loop muted now, then stop and rewind it, so the
    // delayed play() below is allowed there too.
    primingRef.current = true
    loop.muted = true
    loop
      .play()
      .then(() => {
        loop.pause()
        loop.currentTime = 0
      })
      .catch(() => {})
      .finally(() => {
        loop.muted = false
        primingRef.current = false
      })

    setPhase('intro')
    loopTimerRef.current = window.setTimeout(() => {
      setPhase('ready')
      loop.play().catch(() => {})
    }, LOOP_DELAY_MS)
  }, [])

  const skip = useCallback(() => setPhase('ready'), [])

  const toggle = useCallback(() => {
    const loop = loopRef.current
    if (!loop) return
    // pause() keeps currentTime, so play() resumes where the music stopped.
    if (loop.paused) loop.play().catch(() => {})
    else loop.pause()
  }, [])

  return (
    <>
      {phase !== 'ready' && (
        <LoadingScreen
          stage={phase === 'loading' ? 'loading' : phase === 'await' ? 'await' : 'leaving'}
          durationMs={LOADING_MS}
          onStart={start}
          onSkip={skip}
        />
      )}
      {phase === 'ready' && <MusicButton playing={playing} onToggle={toggle} />}
    </>
  )
}
