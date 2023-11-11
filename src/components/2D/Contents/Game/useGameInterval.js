import { useCallback, useEffect, useRef } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'
import {
  gameIsStartedAtom,
  gamePauseAtom,
  gameScoreAtom,
  gameSetScoreAtom,
  gameTimeAtom
} from '@/atoms/game'
import { currentPrizeAtom, isPrizeVisibleAtom } from '@/atoms/prizes.js'

export const useGameInterval = ({ victoryAudioRef }) => {
  const gameTimerRef = useRef(null)
  const isStarted = useAtomValue(gameIsStartedAtom)
  const isPaused = useAtomValue(gamePauseAtom)
  const isPrizeVisible = useAtomValue(isPrizeVisibleAtom)
  const score = useAtomValue(gameScoreAtom)
  const setScore = useSetAtom(gameSetScoreAtom)
  const setTime = useSetAtom(gameTimeAtom)
  const setIsStarted = useSetAtom(gameIsStartedAtom)
  const setIsPaused = useSetAtom(gamePauseAtom)
  const setCurrentPrize = useSetAtom(currentPrizeAtom)
  const setIsPrizeVisible = useSetAtom(isPrizeVisibleAtom)

  console.log('=====isStarted, isPaused', isPaused)
  const handleTogglePauseTheGame = useCallback(() => {
    if (isPaused) {
      setIsPrizeVisible(false)
      setIsPaused(false)
      setScore(score => score + 1)
    } else {
      setIsPaused(true)
      clearInterval(gameTimerRef.current)
    }
  }, [isPaused, setIsPaused, setScore, gameTimerRef.current])

  useEffect(() => {
    if (isStarted || gameTimerRef.current) {
      clearInterval(gameTimerRef.current)
    }

    /**
     * Start the game tick
     */
    gameTimerRef.current = setInterval(() => {
      if (isPaused || !isStarted) return

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
    }, 1000)
  }, [isStarted, isPaused, setScore, setTime])

  useEffect(() => {
    if (score >= 700 && isStarted) {
      victoryAudioRef.current.play()
      setIsStarted(false)
      setScore(0)
      setTime(0)
      setCurrentPrize('')
      clearInterval(gameTimerRef.current)
    }
  }, [score, isStarted])

  const showingReward = isPaused && isPrizeVisible

  return { gameTimerRef, handleTogglePauseTheGame, showingReward }
}