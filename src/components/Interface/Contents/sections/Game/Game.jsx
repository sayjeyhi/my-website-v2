import { useEffect, useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { DIANASOUR, FIRE } from './constants'
import { Section } from '../../Section.jsx'
import { useAtomValue, useSetAtom } from 'jotai'
import { GameEducation } from './components/Education'
import { GameExperience } from './components/Experience'
import { GameProjects } from './components/Projects'
import { GameTalks } from './components/Talks'
import { GameCertifications } from './components/Certifications'
import {
  gamePauseAtom,
  gameIsShootingAtom,
  gameIsStartedAtom,
  gameReadOnlyStateAtom,
  gameScoreAtom,
  gameTimeAtom
} from '../../../../../atoms/game'

const CLOUDS = [
  {
    id: 'cloud-0',
    x: '20%',
    y: 0
  },
  {
    id: 'cloud-1',
    x: '70%',
    y: 0
  },
  {
    id: 'cloud-2',
    x: '100vw',
    y: 0
  }
]
const GROUNDS = [
  {
    id: 'ground-1',
    x: '0'
  },
  {
    id: 'ground-2',
    x: '100%'
  }
]

const GAME_PRIZES = {
  100: <GameEducation />,
  200: <GameProjects />,
  300: <GameCertifications />,
  400: <GameTalks />,
  500: <GameExperience />
}

export const GameSection = () => {
  const jumpAudioRef = useRef(null)
  const hitAudioRef = useRef(null)
  const victoryAudioRef = useRef(null)
  const gameTimerRef = useRef(null)
  const dianaFireRef = useRef(null)
  const cloudControls = useAnimation()
  const groundControls = useAnimation()
  const dianasourControls = useAnimation()
  const fireControls = useAnimation()

  const gameState = useAtomValue(gameReadOnlyStateAtom)
  const setIsStarted = useSetAtom(gameIsStartedAtom)
  const setIsPaused = useSetAtom(gamePauseAtom)
  const setScore = useSetAtom(gameScoreAtom)
  const setTime = useSetAtom(gameTimeAtom)
  const setIsShooting = useSetAtom(gameIsShootingAtom)

  /**
   * Start the game animations
   */
  useEffect(() => {
    if (!gameState.isStarted) return

    cloudControls.start(() => ({
      x: '-100vw',
      transition: { duration: 13, repeat: Infinity, ease: 'linear' }
    }))

    cloudControls.start(() => ({
      x: '-100vw',
      transition: { duration: 9, repeat: Infinity, ease: 'linear' }
    }))
    groundControls.start(() => ({
      x: '-100vw',
      transition: { duration: 9, repeat: Infinity, ease: 'linear' }
    }))

    dianasourControls.start(() => ({
      x: ['0vw', '-10vw', '0vw'],
      scaleX: [-1, -1, -1],
      transition: { duration: 3, repeat: Infinity, ease: 'linear' }
    }))

    // move file from dainasour mouth to left
    fireControls.start(() => ({
      x: ['-12vw', '-70vw'],
      rotate: [90, 90, 90],
      transition: { duration: 3, repeat: Infinity, ease: 'linear' }
    }))
  }, [gameState.isStarted])

  useEffect(() => {
    if (gameState.isStarted || gameTimerRef.current) {
      clearInterval(gameTimerRef.current)
    }

    /**
     * Start the game tick
     */
    gameTimerRef.current = setInterval(() => {
      if (gameState.isPaused || !gameState.isStarted) return

      let prevScore = 0
      let newScore = 0
      setTime(time => time + 0.1)
      setScore(score => {
        prevScore = score
        newScore = score + 0.2
        return newScore
      })
      const successAudioRef = document.getElementById('successAudioRef')
      if (
        Math.ceil(newScore / 100) * 100 > Math.ceil(prevScore / 100) * 100 &&
        successAudioRef &&
        prevScore
      ) {
        successAudioRef.play()
      }

      /**
       * Check if the game is arrived to the prize
       */
      if (prevScore > 50 && prevScore % 100 < 1 && prevScore < 502) {
        handleTogglePauseTheGame()
      }

      /**
       * Check if the game is ended
       */
      if (prevScore >= 700) {
        clearInterval(gameTimerRef.current)
      }
    }, 100)
  }, [gameState.isStarted, gameState.isPaused, setScore, setTime])

  useEffect(() => {
    const handleKeyPress = e => {
      if (e.key === ' ') {
        e.preventDefault()
        if (gameState.isPaused) {
          handleTogglePauseTheGame()
        } else if (!gameState.isStarted) {
          setIsStarted(true)
        } else {
          jumpAudioRef.current.currentTime = 0
          jumpAudioRef.current.play()
          setIsShooting(true)
          setTimeout(() => {
            setIsShooting(false)
          }, 900)
        }
      } else if (e.key === 'Escape') {
        handleTogglePauseTheGame()
      }
    }

    window.removeEventListener('keydown', handleKeyPress)
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [gameState.isStarted, setIsStarted, setIsShooting, gameState.isPaused])

  const handleTogglePauseTheGame = () => {
    if (gameState.isPaused) {
      setIsPaused(false)
      setScore(score => score + 1)
    } else {
      setIsPaused(true)
      clearInterval(gameTimerRef.current)
    }
  }

  useEffect(() => {
    if (gameState.score >= 700 && gameState.isStarted) {
      victoryAudioRef.current.play()
      setIsStarted(false)
      setScore(0)
      setTime(0)
      clearInterval(gameTimerRef.current)
    }
  }, [gameState.score, gameState.isStarted])

  const prizes = {
    100: 'Education',
    200: 'Projects',
    300: 'Certifications',
    400: 'Talks',
    500: 'Experience'
  }

  const showingReward = gameState.isPaused && gameState.score % 100 < 2 && gameState.score < 502

  return (
    <Section
      style={{
        background: showingReward
          ? 'repeating-conic-gradient(hsl(0deg 0% 100% / 79%) 0deg 15deg, hsla(0,0%,100%,0) 0deg 30deg) #faff0059'
          : ''
      }}>
      <div id="offline-resources-2x" className="relative w-full h-3/4">
        {!gameState.isStarted && (
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 stylish text-2xl text-gray-700">
            Press Space key to start the game with interesting prizes! 🎁
          </div>
        )}
        {gameState.isStarted && gameState.score < 502 && (
          <div className="absolute top-12 left-1/2 -translate-x-1/2 -translate-y-1/2 stylish text-2xl text-gray-700">
            {showingReward ? (
              <>Press Space key to continue</>
            ) : (
              <>
                Hit {Math.ceil(gameState.score / 100) * 100} scores and you will see my{' '}
                {prizes[Math.ceil(gameState.score / 100) * 100]}
              </>
            )}
          </div>
        )}
        {gameState.isStarted && (
          <div className="absolute top-16 left-4 -translate-y-1/2 stylish text-3xl text-secondary">
            Score: {gameState.score.toFixed(0)}
          </div>
        )}
        {gameState.isStarted && (
          <div className="absolute top-16 right-4 -translate-y-1/2 stylish text-3xl text-secondary">
            Time: {gameState.time.toFixed(2)}
            <span className="text-lg">s</span>
          </div>
        )}
        <motion.img
          src={DIANASOUR}
          animate={dianasourControls}
          alt="dianasour"
          className="absolute -bottom-8 right-16 -scale-x-100 w-64 h-64"
        />
        <motion.img
          src={FIRE}
          animate={fireControls}
          ref={dianaFireRef}
          alt="dianasour"
          className={`absolute bottom-32 right-32 rotate-90 w-24 h-24 ${
            gameState.isStarted && !gameState.isPaused ? 'visible' : 'invisible'
          }`}
        />

        {CLOUDS.map((cloud, index) => (
          <motion.img
            key={index}
            alt="cloud"
            id={cloud.id}
            animate={cloudControls}
            custom={index}
            style={{ position: 'absolute', top: cloud.y, left: cloud.x }}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAAAcAgMAAACR2TCnAAAABlBMVEUAAADa2to4qB92AAAAAXRSTlMAQObYZgAAAFFJREFUeF6VzTEKAFEIxNA03m+a3P8q2wqi/E35BIdeGXq3q5hnrwBs7mC5vIZzu/nnqI319vRtqHB731blwSHjx+22+Rdn94rzQq0ugKPVlz5onyJcGdu0NgAAAABJRU5ErkJggg=="
          />
        ))}
        {GROUNDS.map((ground, index) => (
          <motion.img
            key={index}
            alt="ground"
            id={ground.id}
            animate={groundControls}
            custom={index}
            style={{ position: 'absolute', bottom: '-60px', left: ground.x, width: '100%' }}
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACWAAAAAYAQMAAABEalRSAAAABlBMVEX///9TU1NYzE1OAAAAAXRSTlMAQObYZgAAAOtJREFUeF7tljEKwzAMRb/J0CWgI/QKOYAh1+pUcjQfpUfw2MFEHVyDQSQmQUNM9AYNcobnh4egU+YVqhAvZSpgsfolPnSv5d0nz3vHslgUdK81RLzyvHcsi+WBNxQh4Ln8pw4Wi7skAg9mXgHMrEACXJnbHIllsbqGAtwXhnYswzFzwPWxWEPc2CexoobkHM4ZpD6s2loWiyIEEwCChIomMiMEHqgP573C9eHkc5VLWh3XsljnGVoLWVl+31bp38piTVVuihtPOAm9kcRLbrFjEvqwamtZLK5eI8sSan9rXEK0LcNFrY5oWawf59S7YSRD7eMAAAAASUVORK5CYII="
          />
        ))}

        {showingReward ? (
          <motion.div
            initial={{
              opacity: 0.5,
              scale: 0.8,
              y: 50
            }}
            exit={{
              opacity: 0.5,
              scale: 0.8,
              y: 50
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                duration: 0.4,
                delay: 0
              }
            }}
            className="absolute top-[8rem] left-0 right-0 inter w-full border-primary border-2 p-5 pt-12 pb-0 rounded-2xl min-h-[30rem] bg-white">
            <h2 className="text-center text-3xl text-primary font-bold bg-white pt-4 rounded-tl-2xl rounded-tr-2xl w-1/4 absolute left-1/2 -translate-x-1/2 -top-[3.35rem] border-t-2 border-l-2 border-r-2 border-primary">
              {prizes[Math.ceil(gameState.score / 100) * 100 - 100]}
            </h2>
            {GAME_PRIZES[Math.ceil(gameState.score / 100) * 100 - 100]}
          </motion.div>
        ) : null}
      </div>

      <audio
        ref={jumpAudioRef}
        src="data:audio/mpeg;base64,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"></audio>
      <audio
        ref={victoryAudioRef}
        src="data:audio/mpeg;base64,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"></audio>
      <audio
        ref={hitAudioRef}
        src="data:audio/mpeg;base64,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"></audio>
      <audio
        id="successAudioRef"
        src="data:audio/mpeg;base64,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"></audio>
    </Section>
  )
}
