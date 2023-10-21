import { Image, Stage, useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { animate, useMotionValue } from 'framer-motion'
import { motion } from 'framer-motion-3d'
import { useEffect, useState } from 'react'
import { framerMotionConfig } from '../config'
import { Projects } from './Interface/Contents/components/Projects.jsx'
import { Avatar } from './Models/Avatar.jsx'
import { Office } from './Models/Office.jsx'
import { Amsterdam } from './Models/Amsterdam.jsx'

export const Experience = props => {
  const { menuOpened } = props
  const { viewport } = useThree()
  const data = useScroll()

  const [section, setSection] = useState(0)

  const cameraPositionX = useMotionValue()
  const cameraPositionZ = useMotionValue()
  const cameraLookAtX = useMotionValue()
  const cameraLookAtY = useMotionValue()
  const cameraLookAtZ = useMotionValue()

  useEffect(() => {
    animate(cameraPositionX, menuOpened ? -4 : 1.2, {
      ...framerMotionConfig
    })
    animate(cameraPositionZ, menuOpened ? 4 : 9.2, {
      ...framerMotionConfig
    })
    animate(cameraLookAtX, menuOpened ? 10 : 0, {
      ...framerMotionConfig
    })
    animate(cameraLookAtY, menuOpened ? -0.2 : 0.6, {
      ...framerMotionConfig
    })
    animate(cameraLookAtZ, menuOpened ? 6 : -1, {
      ...framerMotionConfig
    })
  }, [menuOpened])

  const [characterAnimation, setCharacterAnimation] = useState('Standing')
  useEffect(() => {
    let delayedAnimation = ''
    let changingAnimation = ''
    let changingAnimationDuration = 600

    if (section === 0) {
      delayedAnimation = 'Typing'
      changingAnimation = 'Falling'
    } else if (section === 1) {
      delayedAnimation = 'ShowOff'
      changingAnimation = 'Falling'
    } else if (section === 2) {
      delayedAnimation = 'TellingASecret'
      changingAnimation = 'Running'
    } else if (section === 3) {
      delayedAnimation = 'PhoneCall'
      changingAnimation = 'Running'
    }

    setCharacterAnimation(changingAnimation)
    setTimeout(() => {
      setCharacterAnimation(delayedAnimation)
    }, changingAnimationDuration)
  }, [section])

  useFrame(state => {
    let curSection = Math.floor(data.scroll.current * data.pages + 0.23)

    console.log('curSection', data)
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

  return (
    <>
      <motion.group
        initial={'100'}
        position={[0.67, 2.07, 4]}
        rotation={[-3.14, 1.0, 3.14]}
        animate={`${section}`}
        transition={{
          duration: 0.6
        }}
        variants={{
          100: {
            opacity: 0
          },
          0: {
            opacity: 1,
            scaleX: 2.15,
            scaleY: 2.15,
            scaleZ: 2.15
          },
          1: {
            y: -viewport.height + 1,
            x: 2.5,
            z: 1,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scaleX: 2.9,
            scaleY: 2.9,
            scaleZ: 2.9
          },
          2: {
            x: -5,
            y: -viewport.height * 2 + 0.5,
            z: 1,
            rotateX: 0,
            rotateY: Math.PI / 2,
            rotateZ: 0,
            scaleX: 2,
            scaleY: 2,
            scaleZ: 2
          },
          3: {
            y: -viewport.height * 2.82 + 1,
            x: 1.5,
            z: 7.5,
            rotateX: 0,
            rotateY: -0.5,
            rotateZ: 0,
            scaleX: 0.4,
            scaleY: 0.4,
            scaleZ: 0.4
          }
        }}>
        <Stage shadows intensity={0.5} adjustCamera={false}>
          <Avatar animation={characterAnimation} />
        </Stage>
      </motion.group>
      <motion.group
        position={[1.4, 1.9, 4]}
        rotation-y={-Math.PI / 4}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1.4 }}
        transition={{ duration: 0.5 }}>
        <Stage shadows intensity={0.5} adjustCamera={false}>
          <Office section={section} />
        </Stage>
      </motion.group>

      {/* SKILLS */}
      <motion.group
        position={[0, -1.5, -10]}
        animate={{
          z: section === 1 ? 0 : -1,
          y: section === 1 ? -viewport.height : -1.5
        }}>
        <Projects />
      </motion.group>
      {/* SKILLS */}
      <motion.group
        rotation-y={-Math.PI / 2.05}
        rotation-z={0.95}
        rotation-x={0.8}
        animate={{
          x: -Math.PI / 4.9,
          y: section > 2 ? -viewport.height * 2.94 : -viewport.height * 5.7,
          z: section > 2 ? Math.PI * 2.56 : -2
        }}>
        <Amsterdam />
      </motion.group>
    </>
  )
}
