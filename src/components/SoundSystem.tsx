import { useCallback, useEffect, useRef, useState } from 'react'
import LoadingScreen from './LoadingScreen'
import MusicButton from './MusicButton'

const LOADING_MS = 1000
/** Delay between the intro sound and the background loop. */
const LOOP_DELAY_MS = 2000
const INTRO_VOLUME = 0.45
const LOOP_VOLUME = 0.25

const soundUrl = (file: string) => `${import.meta.env.BASE_URL}sounds/${file}`

type Phase = 'loading' | 'leaving' | 'ready'

/**
 * Loader (1s), then the sound starts automatically: the intro, then the
 * looping background music 2s later.
 *
 * Browsers block sound until the visitor clicks, taps or presses a key, so if
 * autoplay is refused the sequence starts on their first interaction instead.
 * Meanwhile a "Sound on?" bubble shows; its × opts out.
 */
export default function SoundSystem() {
  const [phase, setPhase] = useState<Phase>('loading')
  const [playing, setPlaying] = useState(false)
  // Only shown if autoplay is blocked.
  const [showPrompt, setShowPrompt] = useState(false)
  const introRef = useRef<HTMLAudioElement | null>(null)
  const loopRef = useRef<HTMLAudioElement | null>(null)
  /** Pending start of the loop while the intro plays. */
  const loopTimerRef = useRef<number | undefined>(undefined)
  const startedRef = useRef(false)
  // True while the loop is briefly started and stopped to unlock it (see startSequence).
  const primingRef = useRef(false)
  /** Removes the "start on first interaction" listeners, if armed. */
  const disarmRef = useRef<(() => void) | null>(null)

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
      disarmRef.current?.()
      loop.removeEventListener('play', onPlay)
      loop.removeEventListener('pause', onPause)
      intro.pause()
      loop.pause()
      introRef.current = null
      loopRef.current = null
    }
  }, [])

  const scheduleLoop = useCallback(() => {
    const loop = loopRef.current
    if (!loop) return
    loopTimerRef.current = window.setTimeout(() => {
      loopTimerRef.current = undefined
      loop.play().catch(() => setPlaying(false))
    }, LOOP_DELAY_MS)
  }, [])

  // Must run inside a click/tap/key press: the user gesture browsers require for sound.
  const startSequence = useCallback(() => {
    const intro = introRef.current
    const loop = loopRef.current
    if (!intro || !loop || startedRef.current) return
    startedRef.current = true
    disarmRef.current?.()
    setShowPrompt(false)
    setPlaying(true)

    intro.play().catch(() => {})

    // Safari/iOS only allow a later play() on an element that was started during
    // a gesture. Start the loop muted now, then stop and rewind it, so the
    // delayed play() is allowed there too.
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

    scheduleLoop()
  }, [scheduleLoop])

  // Autoplay is refused: start on the visitor's first click, tap or key press.
  const armFirstInteraction = useCallback(() => {
    const onInteract = (e: Event) => {
      // Esc doesn't count as a gesture for sound; the music controls handle their own clicks.
      if (e instanceof KeyboardEvent && e.key === 'Escape') return
      if (e.target instanceof Element && e.target.closest('[data-music-controls]')) return
      startSequence()
    }
    // click (not pointerdown): on touch screens only the end of a tap counts as a gesture.
    window.addEventListener('click', onInteract)
    window.addEventListener('keydown', onInteract)
    disarmRef.current = () => {
      window.removeEventListener('click', onInteract)
      window.removeEventListener('keydown', onInteract)
      disarmRef.current = null
    }
  }, [startSequence])

  // When loading ends, try to start the sound right away.
  const autoplay = useCallback(() => {
    const intro = introRef.current
    if (!intro || startedRef.current) return
    intro
      .play()
      .then(() => {
        // Allowed (e.g. the visitor already interacted): run the sequence.
        startedRef.current = true
        setPlaying(true)
        scheduleLoop()
      })
      .catch(() => {
        setShowPrompt(true)
        armFirstInteraction()
      })
  }, [scheduleLoop, armFirstInteraction])

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

  // × on the bubble: no sound, and stop waiting for a first interaction.
  const dismissPrompt = useCallback(() => {
    setShowPrompt(false)
    disarmRef.current?.()
  }, [])

  const finishLoading = useCallback(() => {
    setPhase('ready')
    autoplay()
  }, [autoplay])

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
