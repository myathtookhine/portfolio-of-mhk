import { useCallback, useEffect, useRef, useState } from 'react'
import LoadingScreen from './LoadingScreen'
import MusicButton from './MusicButton'

const LOADING_MS = 2000
/** Delay between the intro sound and the background loop. */
const LOOP_DELAY_MS = 2000
const INTRO_VOLUME = 0.8
const LOOP_VOLUME = 0.5

const soundUrl = (file: string) => `${import.meta.env.BASE_URL}sounds/${file}`

type Phase = 'loading' | 'leaving' | 'ready'

/**
 * Loader (2s), then the portfolio shows right away. Sound is opt-in: the
 * "Sound on?" bubble or the music button plays the intro, then the looping
 * background music 2s later. Browsers only allow sound after a click, and it
 * keeps recruiters from being surprised by audio.
 */
export default function SoundSystem() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [playing, setPlaying] = useState(false)
  const [showPrompt, setShowPrompt] = useState(true)
  const introRef = useRef<HTMLAudioElement | null>(null)
  const loopRef = useRef<HTMLAudioElement | null>(null)
  /** Pending start of the loop while the intro plays. */
  const loopTimerRef = useRef<number | undefined>(undefined)
  const startedRef = useRef(false)
  // True while the loop is briefly started and stopped to unlock it (see startSequence).
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

    // Keep the button in sync with the loop's real state. The unlock's own
    // play/pause pair is ignored; its pause event ends the unlock.
    const onPlay = () => !primingRef.current && setPlaying(true)
    const onPause = () => {
      if (primingRef.current) {
        primingRef.current = false
        return
      }
      setPlaying(false)
    }
    loop.addEventListener('play', onPlay)
    loop.addEventListener('pause', onPause)

    // Only advance if Esc hasn't already closed the loader.
    const loadTimer = window.setTimeout(() => setPhase((p) => (p === 'loading' ? 'leaving' : p)), LOADING_MS)

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

  // Must run inside a click: that's the user gesture browsers require for sound.
  const startSequence = useCallback(() => {
    const intro = introRef.current
    const loop = loopRef.current
    if (!intro || !loop) return
    startedRef.current = true
    setShowPrompt(false)
    setPlaying(true)

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
      // Rejected: no pause event will come, so end the unlock here.
      .catch(() => {
        primingRef.current = false
      })
      .finally(() => {
        loop.muted = false
      })

    loopTimerRef.current = window.setTimeout(() => {
      loopTimerRef.current = undefined
      loop.play().catch(() => setPlaying(false))
    }, LOOP_DELAY_MS)
  }, [])

  const toggle = useCallback(() => {
    const intro = introRef.current
    const loop = loopRef.current
    if (!intro || !loop) return
    if (!startedRef.current) return startSequence()

    // Still in the intro: turn sound off before the loop begins.
    if (loopTimerRef.current !== undefined) {
      window.clearTimeout(loopTimerRef.current)
      loopTimerRef.current = undefined
      intro.pause()
      setPlaying(false)
      return
    }

    // pause() keeps currentTime, so play() resumes where the music stopped.
    if (loop.paused) loop.play().catch(() => {})
    else loop.pause()
  }, [startSequence])

  const dismissPrompt = useCallback(() => setShowPrompt(false), [])
  const finishLoading = useCallback(() => setPhase('ready'), [])

  return (
    <>
      {phase !== 'ready' && (
        <LoadingScreen leaving={phase === 'leaving'} durationMs={LOADING_MS} onDone={finishLoading} />
      )}
      {phase === 'ready' && (
        <MusicButton
          playing={playing}
          onToggle={toggle}
          showPrompt={showPrompt}
          onPromptAccept={startSequence}
          onPromptDismiss={dismissPrompt}
        />
      )}
    </>
  )
}
