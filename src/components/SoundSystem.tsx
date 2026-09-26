import { useCallback, useEffect, useRef, useState } from 'react'
import LoadingScreen from './LoadingScreen'
import MusicButton from './MusicButton'

const LOADING_MS = 2000
/** Delay between the end of the loader (intro sound) and the background loop. */
const LOOP_DELAY_MS = 2000
const INTRO_VOLUME = 0.8
const LOOP_VOLUME = 0.5

const soundUrl = (file: string) => `${import.meta.env.BASE_URL}sounds/${file}`

type Phase = 'loading' | 'intro' | 'ready'

/**
 * First-load sequence: loader (2s) → intro sound → 2s later the looping
 * background music starts and the play/pause button appears.
 */
export default function SoundSystem() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [playing, setPlaying] = useState(false)
  const loopRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const intro = new Audio(soundUrl('starter-sound.mp3'))
    const loop = new Audio(soundUrl('loop-sound.mp3'))
    intro.volume = INTRO_VOLUME
    loop.volume = LOOP_VOLUME
    loop.loop = true
    loop.preload = 'auto'
    loopRef.current = loop

    // Browsers refuse to play sound until the visitor has interacted with the
    // page. If autoplay is blocked, start the music on the first click or key
    // press instead (the music button handles its own clicks).
    function startOnFirstGesture(e: Event) {
      if (e.target instanceof Element && e.target.closest('[data-music-button]')) return
      loop.play().catch(() => {})
    }
    function armGestureFallback() {
      window.addEventListener('pointerdown', startOnFirstGesture)
      window.addEventListener('keydown', startOnFirstGesture)
    }
    function disarmGestureFallback() {
      window.removeEventListener('pointerdown', startOnFirstGesture)
      window.removeEventListener('keydown', startOnFirstGesture)
    }

    // Keep the button in sync with the audio element's real state. Once the
    // music has played by any route, the fallback is no longer needed, so a
    // later click elsewhere can't restart music the visitor has paused.
    function onPlay() {
      setPlaying(true)
      disarmGestureFallback()
    }
    function onPause() {
      setPlaying(false)
    }
    loop.addEventListener('play', onPlay)
    loop.addEventListener('pause', onPause)

    const introTimer = window.setTimeout(() => {
      setPhase('intro')
      intro.play().catch(() => {})
    }, LOADING_MS)
    const loopTimer = window.setTimeout(() => {
      setPhase('ready')
      loop.play().catch(armGestureFallback)
    }, LOADING_MS + LOOP_DELAY_MS)

    return () => {
      window.clearTimeout(introTimer)
      window.clearTimeout(loopTimer)
      disarmGestureFallback()
      loop.removeEventListener('play', onPlay)
      loop.removeEventListener('pause', onPause)
      intro.pause()
      loop.pause()
      loopRef.current = null
    }
  }, [])

  const toggle = useCallback(() => {
    const loop = loopRef.current
    if (!loop) return
    // pause() keeps currentTime, so play() resumes where the music stopped.
    if (loop.paused) loop.play().catch(() => {})
    else loop.pause()
  }, [])

  return (
    <>
      {phase !== 'ready' && <LoadingScreen leaving={phase === 'intro'} durationMs={LOADING_MS} />}
      {phase === 'ready' && <MusicButton playing={playing} onToggle={toggle} />}
    </>
  )
}
