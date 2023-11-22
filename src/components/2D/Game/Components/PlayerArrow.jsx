import { useCallback, useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { ARROW_FLYING } from '../base64_files'
import {
  gameDinosaurLifeAtom,
  gameIsDinoHitAtom,
  gameIsStartedAtom,
  gamePauseAtom,
  gamePlayerCurrentAction,
  gamePlayerFire1AtomX,
  gamePlayerFire2AtomX,
  gameSetScoreAtom,
  PLAYER_ACTIONS
} from '@/atoms/game'
import { throttle } from 'lodash-es'

export const PlayerArrow = ({ hitAudioRef }) => {
  const [showFire1, setShowFire1] = useState(false)
  const [showFire2, setShowFire2] = useState(false)
  const playerFireControls1 = useAnimation()
  const playerFireControls2 = useAnimation()

  const isGameStarted = useAtomValue(gameIsStartedAtom)
  const isGamePaused = useAtomValue(gamePauseAtom)
  const playerCurrentAction = useAtomValue(gamePlayerCurrentAction)
  const setPlayerFire1AtomX = useSetAtom(gamePlayerFire1AtomX)
  const setPlayerFire2AtomX = useSetAtom(gamePlayerFire2AtomX)
  const [isDinoHit, setIsDinoHit] = useAtom(gameIsDinoHitAtom)
  const setDinoLife = useSetAtom(gameDinosaurLifeAtom)
  const setScore = useSetAtom(gameSetScoreAtom)

  useEffect(() => {
    if (playerCurrentAction !== PLAYER_ACTIONS.shoot) {
      return
    }

    const animationConfig = {
      x: ['-65vw', '-12vw'],
      y: [-30],
      transition: { duration: 2.5, repeat: 0, ease: 'linear' }
    }

    if (showFire1) {
      setTimeout(() => {
        setShowFire2(true)
        playerFireControls2.start(() => animationConfig)
      }, 250)
    } else {
      setTimeout(() => {
        setShowFire1(true)
        playerFireControls1.start(() => animationConfig)
      }, 250)
    }
  }, [playerCurrentAction])

  const checkIsHitDino = useCallback(
    x => {
      if (x > -12.5 && isGameStarted && !isGamePaused && !isDinoHit) {
        setIsDinoHit(true)
        hitAudioRef.current.currentTime = 0
        hitAudioRef.current.play()
        setDinoLife(life => life - 1)
        setScore(score => score + 6)
        setTimeout(() => {
          setIsDinoHit(false)
        }, 500)
      }
    },
    [isGameStarted, isGamePaused]
  )

  const handleFire1Update = useCallback(
    throttle(e => {
      const x = parseInt(e.x + '')
      setPlayerFire1AtomX(x)
      checkIsHitDino(x)
    }, 100),
    [checkIsHitDino, setPlayerFire1AtomX]
  )
  const handleFire2Update = useCallback(
    throttle(e => {
      const x = parseInt(e.x + '')
      setPlayerFire2AtomX(x)
      checkIsHitDino(x)
    }, 100),
    [checkIsHitDino, setPlayerFire2AtomX]
  )
  const content = (
    <div className="relative">
      <img src={ARROW_FLYING} className="absolute top-[42px] " alt="player-fire" />
      <div className="absolute top-[42px] left-[35px] p-1 bg-[#1e5b00] rotate-45 rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -rotate-45" viewBox="0 0 24 24">
          <path
            fill="#c9c9c9"
            d="m6.35 15.35l-2.1-2.15q1.55-1.55 3.55-2.375T12 10q2.2 0 4.213.838t3.537 2.412l-2.1 2.1q-1.125-1.125-2.588-1.738T12 13q-1.6 0-3.063.613T6.35 15.35ZM2.1 11.1L0 9q2.375-2.425 5.488-3.713T12 4q3.4 0 6.513 1.288T24 9l-2.1 2.1q-1.975-1.975-4.538-3.038T12 7Q9.2 7 6.637 8.063T2.1 11.1ZM12 21l-3.525-3.55q.7-.7 1.613-1.075T12 16q1 0 1.913.375t1.612 1.075L12 21Z"
          />
        </svg>
      </div>
    </div>
  )

  return (
    <>
      <motion.div
        animate={playerFireControls1}
        onUpdate={handleFire1Update}
        onAnimationComplete={() => {
          setShowFire1(false)
          playerFireControls1.stop()
        }}
        className={`absolute bottom-32 right-32 rotate-90 w-24 h-24 will-change-transform ${
          isGameStarted && !isGamePaused && showFire1 ? 'visible' : 'invisible'
        }`}>
        {content}
      </motion.div>
      <motion.div
        animate={playerFireControls2}
        onUpdate={handleFire2Update}
        onAnimationComplete={() => {
          setShowFire2(false)
          playerFireControls2.stop()
        }}
        className={`absolute bottom-32 right-32 rotate-90 w-24 h-24 will-change-transform ${
          isGameStarted && !isGamePaused && showFire2 ? 'visible' : 'invisible'
        }`}>
        {content}
      </motion.div>
    </>
  )
}