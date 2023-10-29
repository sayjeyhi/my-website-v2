import { Stage, useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { animate, useMotionValue } from 'framer-motion'
import { useEffect, useState, useReducer } from 'react'
import { framerMotionConfig } from '../config'
import { Avatar } from './Models/Avatar.jsx'
import { Office } from './Models/Office.jsx'
import { Amsterdam } from './Models/Amsterdam.jsx'
import { useCurrentSheet } from '@theatre/r3f'
import { val } from '@theatre/core'

export const Experience = props => {
  const { menuOpened, gameState, dispatchGameState } = props
  const data = useScroll()
  const sheet = useCurrentSheet()
  const [animation, setCharacterAnimation] = useState('Standing')

  const [section, setSection] = useState(0)

  const cameraPositionX = useMotionValue()
  const cameraPositionZ = useMotionValue()
  const cameraLookAtX = useMotionValue()
  const cameraLookAtY = useMotionValue()
  const cameraLookAtZ = useMotionValue()

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -2 : 1.2, {
      ...framerMotionConfig
    })
    animate(cameraPositionZ, menuOpened ? 5 : 9.2, {
      ...framerMotionConfig
    })
    animate(cameraLookAtX, menuOpened ? 10 : 0, {
      ...framerMotionConfig
    })
    animate(cameraLookAtY, menuOpened ? -1 : 0.6, {
      ...framerMotionConfig
    })
    animate(cameraLookAtZ, menuOpened ? 10 : -1, {
      ...framerMotionConfig
    })
  }, [menuOpened])

  useFrame(state => {
    let curSection = Math.floor(data.scroll.current * data.pages + 0.23)

    if (curSection > 3) {
      curSection = 3
    }

    if (curSection !== section) {
      setSection(curSection)
    }

    state.camera.position.x = cameraPositionX.get()
    state.camera.position.z = cameraPositionZ.get()
    state.camera.lookAt(cameraLookAtX.get(), cameraLookAtY.get(), cameraLookAtZ.get())
  })

  // our callback will run on every animation frame
  useFrame(() => {
    const sequenceLength = val(sheet.sequence.pointer.length)
    sheet.sequence.position = data.offset * sequenceLength

    if (sheet.sequence.position < 0.5) {
      setCharacterAnimation('Typing')
    } else if (sheet.sequence.position < 2 && sheet.sequence.position > 0.5) {
      setCharacterAnimation('Falling')
    } else if (sheet.sequence.position < 4 && sheet.sequence.position > 2) {
      setCharacterAnimation('ShowOff')
    } else if (sheet.sequence.position < 5.8 && sheet.sequence.position > 4) {
      setCharacterAnimation('Running')
    } else if (sheet.sequence.position < 7.2 && sheet.sequence.position > 5.8) {
      if (gameState.gameMode) {
        if (gameState.isJumping) {
          setCharacterAnimation('Jumping')
        } else if (gameState.isStarted) {
          setCharacterAnimation('Running')
        } else {
          setCharacterAnimation('Idle')
        }
      } else {
        setCharacterAnimation('TellingASecret')
      }
    } else if (sheet.sequence.position < 9.92 && sheet.sequence.position > 6.9) {
      if (gameState.gameMode) dispatchGameState({ type: 'end' })
      setCharacterAnimation('Running')
    } else if (sheet.sequence.position > 9.92) {
      setCharacterAnimation('PhoneCall')
    }
  })

  return (
    <>
      <Stage shadows intensity={0.5} adjustCamera={false}>
        <Avatar gameState={gameState} animation={animation} />
      </Stage>
      <Stage shadows intensity={0.5} adjustCamera={false}>
        <Office section={section} />
      </Stage>
      <Stage shadows intensity={0.5} adjustCamera={false}>
        <Amsterdam theatreKey="Amsterdam" />
      </Stage>
    </>
  )
}
