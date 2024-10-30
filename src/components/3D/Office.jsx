/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { editable as e } from '@theatre/r3f'
import { animate, useMotionValue } from 'framer-motion'
import { useFrame } from '@react-three/fiber'
import * as Three from 'three'
const chickenAudio = new Audio('/audio/chicken.mp3')
const fanAudio = new Audio('/audio/fan.mp3')
const switchAudio = new Audio('/audio/switch.mp3')

export function Office(props) {
  const [isFanClicked, setIsFanClicked] = useState(false)
  const [isChickenClicked, setIsChickenClicked] = useState(false)
  const [isFanTurnedOn, setIsFanTurnedOn] = useState(false)
  const [clickTimer, setClickTimer] = useState(false)
  const [isStandLampOn, setIsStandLampOn] = useState(false)
  const timerRef = useRef(null)

  const typingCursorRef = useRef(null)
  const fanRef = useRef(null)
  const clockHourRef = useRef(null)
  const clockMinsRef = useRef(null)
  const chickenRef = useRef(null)
  const standLampLightRef = useRef(null)
  const lastMessageRef = useRef(null)
  const lastMessage2Ref = useRef(null)
  const fanCube1Ref = useRef(null)
  const fanCube2Ref = useRef(null)
  const chickenY = useMotionValue(1.282)
  const { nodes, materials } = useGLTF('models/office-final.glb')

  /**
   * Animate chicken on click
   */
  useEffect(() => {
    animate(chickenY, clickTimer ? 1.402 : 1.282, {
      type: 'linear',
      mass: 1,
      stiffness: 200,
      damping: 100,
      restDelta: 0.0001
    })
  }, [clickTimer])

  /**
   * Rotate clock hands to current time
   */
  useEffect(() => {
    const date = new Date()
    const hours = date.getHours()
    const mins = date.getMinutes()
    const hoursAngle = (hours % 12) * 30 + mins * 0.5
    const minsAngle = mins * 6

    clockHourRef.current.rotation.z = ((hoursAngle * Math.PI) / 180) * -1
    clockMinsRef.current.rotation.z = ((minsAngle * Math.PI) / 180) * -1
  }, [props.section])

  useFrame(state => {
    chickenRef.current.position.y = chickenY.get()

    if (isFanTurnedOn) {
      fanCube1Ref.current.rotation.x = Math.sin(new Date().getTime() * 0.001) - 0.3
      fanCube2Ref.current.rotation.x = Math.sin(new Date().getTime() * 0.001) - 0.3
    }

    /**
     * Hide and show last messages
     */
    lastMessageRef.current.material.transparent = true
    lastMessageRef.current.material.opacity = Math.sin(new Date().getTime() * 0.0025)
    lastMessage2Ref.current.material.transparent = true
    lastMessage2Ref.current.material.opacity = 1 + Math.sin(new Date().getTime() * 0.0025)

    /**
     * Hide and show typing cursor
     */
    typingCursorRef.current.visible = Math.floor(state.clock.getElapsedTime() * 4) % 4 < 2

    /**
     * Move AC while it is not clicked
     */
    if (!isFanClicked) {
      if (Math.floor(state.clock.getElapsedTime()) % 8 === 0) {
        fanRef.current.position.x = Math.sin(state.clock.getElapsedTime() * 15) / 80 - 1.2
      }
    }

    /**
     * Move chicken while it is not clicked
     */
    if (!isChickenClicked) {
      if (Math.floor(state.clock.getElapsedTime()) % 5 === 3) {
        chickenRef.current.position.x = Math.sin(state.clock.getElapsedTime() * 12) / 100 + 0.543
      }
    }
  })

  const handleChickenClick = () => {
    setIsChickenClicked(true)
    chickenAudio.currentTime = 0
    chickenAudio.play()

    setClickTimer(true)
    timerRef.current = setTimeout(() => {
      setClickTimer(false)
    }, 300)
  }

  const handleStandLampClick = () => {
    switchAudio.currentTime = 0
    switchAudio.play()
    setIsStandLampOn(on => !on)
    if (isStandLampOn) {
      standLampLightRef.current.material = new Three.MeshStandardMaterial({
        color: '#E44B1F'
      })
    } else {
      /**
       * Add yellow light to stand lamp and add glow using shader
       */
      standLampLightRef.current.material = new Three.MeshStandardMaterial({
        color: '#ffff29',
        shader: {
          uniforms: {
            uTime: { value: 0 },
            uColor: { value: new Three.Color('#ffff29') }
          },
          vertexShader: `
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vPosition;
            void main() {
              vUv = uv;
              vNormal = normal;
              vPosition = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `
        }
      })
    }
  }

  const handleFanClick = () => {
    setIsFanClicked(true)
    if (isFanTurnedOn) {
      fanAudio.currentTime = 27
    } else {
      fanAudio.currentTime = 0
      fanAudio.play()

      setIsFanTurnedOn(true)
    }
    fanAudio.onended = () => {
      setIsFanTurnedOn(false)
    }
  }

  return (
    <e.group theatreKey="Office" dispose={null}>
      <group scale={props.scale}>
        <mesh
          geometry={nodes['Monitor_-_1'].geometry}
          material={materials['9']}
          position={[-0.609, 1.674, -0.949]}
          scale={1.199}
        />
        <group position={[0.064, 1.26, -0.587]} rotation={[0, -0.288, 0]} scale={0.03}>
          <mesh geometry={nodes.Cylinder018.geometry} material={materials['9']} />
          <mesh geometry={nodes.Cylinder018_1.geometry} material={materials['4.001']} />
        </group>
        <group position={[-1.125, 0.688, -0.794]} scale={1.103}>
          <mesh geometry={nodes.Cube020.geometry} material={materials['5.001']} />
          <mesh geometry={nodes.Cube020_1.geometry} material={materials.Items} />
        </group>
        <group
          position={[0.198, 1.684, -0.882]}
          rotation={[0, -0.31, -Math.PI / 2]}
          scale={[0.988, 1.199, 1.199]}>
          <mesh geometry={nodes.ManitorSmall.geometry} material={materials['9']} />
          <mesh geometry={nodes.ManitorSmall_1.geometry} material={materials['Material.004']} />
        </group>
        <group position={[-0.534, 1.234, -0.645]} scale={0.039}>
          <mesh geometry={nodes.Plane001_1.geometry} material={materials['9']} />
          <mesh geometry={nodes.Plane001_2.geometry} material={materials['6.001']} />
        </group>
        <group position={[1.087, 0.536, -0.658]} rotation={[-0.017, 0.006, -0.004]} scale={0.347}>
          <mesh geometry={nodes.Mesh.geometry} material={materials['Brown orang long couch']} />
          <mesh geometry={nodes.Mesh_1.geometry} material={materials['black carbon']} />
          <mesh
            geometry={nodes['Book-Down'].geometry}
            material={materials['Material.016']}
            position={[0.007, -0.439, 0.188]}
            rotation={[0, -0.598, 0]}
            scale={0.369}
          />
          <mesh
            geometry={nodes['Book-Top'].geometry}
            material={materials['Green pandan long coach']}
            position={[0.255, 0.173, 0.274]}
            rotation={[0, -0.003, 0]}
            scale={0.369}>
            <mesh geometry={nodes.Cube003.geometry} material={materials['Material.016']} />
          </mesh>
          <mesh
            geometry={nodes.Cylinder.geometry}
            material={materials['orange krem long coach']}
            position={[0.68, -1.075, 0.408]}
            rotation={[0, 0, 0.279]}
            scale={0.379}
          />
        </group>
        <group
          ref={fanRef}
          onClick={handleFanClick}
          position={[-1.006, 2.642, 0.881]}
          rotation={[0, Math.PI / 2, 0]}
          scale={0.267}>
          <mesh
            geometry={nodes.AC.geometry}
            material={materials['white-cooler']}
            position={[6.696, 0.102, 6.913]}
            rotation={[0, -1.562, 0]}
            scale={0.758}>
            <mesh
              ref={fanCube1Ref}
              geometry={nodes.Cube012.geometry}
              material={materials['white new']}
              position={[0, -0.519, 0.375]}
              rotation={[-0.503, 0, 0]}
              scale={[1.004, 0.688, 0.688]}
            />
            <mesh
              ref={fanCube2Ref}
              geometry={nodes.Cube013.geometry}
              material={materials['white new']}
              position={[0, -0.622, 0.089]}
              rotation={[-0.277, 0, 0]}
              scale={[1.004, 0.688, 0.688]}
            />
            <mesh
              geometry={nodes.Cube014.geometry}
              material={materials['white new']}
              position={[0, 0, -0.196]}
            />
            <mesh
              geometry={nodes.Cube015.geometry}
              material={materials['white new']}
              position={[-0.054, 0, 0]}
              scale={[1, 1, 0.892]}
            />
          </mesh>
        </group>
        <group
          position={[1.086, 1.813, -1.091]}
          rotation={[Math.PI / 2, 0, -0.016]}
          scale={[0.15, 0.15, 0.104]}>
          <mesh geometry={nodes.Plane081.geometry} material={materials['hijau.001']} />
          <mesh geometry={nodes.Plane081_1.geometry} material={materials['orange.002']} />
          <mesh geometry={nodes.Plane081_2.geometry} material={materials.yellow} />
        </group>
        <group
          position={[-0.563, 0.741, 0.369]}
          rotation={[Math.PI, -1.518, Math.PI]}
          scale={[0.229, 0.195, 0.229]}>
          <mesh geometry={nodes.Cylinder003.geometry} material={materials['Black-chair']} />
          <mesh geometry={nodes.Cylinder003_1.geometry} material={materials['Material.004']} />
          <mesh geometry={nodes.Cylinder003_2.geometry} material={materials['Material.008']} />
        </group>
        <group position={[0.993, 0.849, -0.66]} scale={0.031}>
          <group position={[2.294, 1.148, 0]} scale={8.47}>
            <mesh geometry={nodes.Cylinder072.geometry} material={materials['Material.008']} />
            <mesh geometry={nodes.Cylinder072_1.geometry} material={materials['Material.001']} />
            <mesh geometry={nodes.Cylinder072_2.geometry} material={materials['Material.009']} />
            <mesh geometry={nodes.Cylinder072_3.geometry} material={materials['Material.005']} />
            <mesh geometry={nodes.Cylinder072_4.geometry} material={materials['Material.002']} />
          </group>
        </group>
        <group
          onClick={handleStandLampClick}
          position={[-1.626, 1.182, -0.589]}
          rotation={[0, -0.827, 0]}
          scale={[0.029, 0.035, 0.029]}>
          <mesh geometry={nodes.Cylinder019.geometry} material={materials['C-2']} />
          <mesh geometry={nodes.Cylinder019_1.geometry} material={materials['C-3']} />
          <mesh
            ref={standLampLightRef}
            geometry={nodes.Cylinder019_2.geometry}
            material={materials['C-1']}
          />
        </group>
        <mesh
          geometry={nodes.Plane.geometry}
          material={materials['Material.015']}
          position={[-0.203, 0.131, 0]}
          scale={[1.666, 1, 1.162]}
        />
        <e.group
          theatreKey="Chicken"
          ref={chickenRef}
          onClick={handleChickenClick}
          position={[0.543, 1.282, -0.583]}
          rotation={[1.169, -0.031, 0.073]}
          scale={0.03}>
          <mesh geometry={nodes.Circle001.geometry} material={materials['Material.013']} />
          <mesh geometry={nodes.Circle001_1.geometry} material={materials['Material.010']} />
          <mesh geometry={nodes.Circle001_2.geometry} material={materials['Material.011']} />
          <mesh geometry={nodes.Circle001_3.geometry} material={materials['Material.012']} />
        </e.group>
        <mesh
          geometry={nodes.Plane001.geometry}
          material={materials['C-3']}
          position={[0.238, 1.704, -0.862]}
          rotation={[-3.14, -1.259, 1.586]}
          scale={[0.24, 0.145, 0.216]}
        />
        <mesh
          geometry={nodes.Plane002.geometry}
          material={materials.yellow}
          position={[-0.885, 1.862, -0.947]}
          rotation={[-1.577, 1.571, 0]}
          scale={[0.013, 0.079, 0.109]}
        />
        <mesh
          geometry={nodes.Plane003.geometry}
          material={materials['C-1']}
          position={[-0.859, 1.708, -0.947]}
          rotation={[-1.577, 1.571, 0]}
          scale={[0.013, 0.079, 0.134]}
        />
        <mesh
          geometry={nodes.Plane004.geometry}
          material={materials['yellow.002']}
          position={[-0.792, 1.758, -0.947]}
          rotation={[-1.577, 1.571, 0]}
          scale={[0.013, 0.079, 0.115]}
        />
        <mesh
          geometry={nodes.Plane005.geometry}
          material={materials['C-1']}
          position={[-0.748, 1.814, -0.947]}
          rotation={[-1.577, 1.571, 0]}
          scale={[0.013, 0.079, 0.245]}
        />
        <mesh
          geometry={nodes.Plane006.geometry}
          material={materials['C-1']}
          position={[-0.872, 1.601, -0.947]}
          rotation={[-1.577, 1.571, 0]}
          scale={[0.013, 0.079, 0.121]}
        />
        <mesh
          geometry={nodes.Plane007.geometry}
          material={materials['yellow.005']}
          position={[-0.894, 1.544, -0.947]}
          rotation={[-1.577, Math.PI / 2, 0]}
          scale={[0.013, 0.079, 0.098]}
        />
        <mesh
          geometry={nodes.Plane008.geometry}
          material={materials['C-1']}
          position={[-0.789, 1.49, -0.947]}
          rotation={[-1.577, 1.571, 0]}
          scale={[0.013, 0.079, 0.202]}
        />
        <mesh
          geometry={nodes.Plane009.geometry}
          material={materials['C-1']}
          position={[-0.942, 1.656, -0.947]}
          rotation={[-1.577, 1.571, 0]}
          scale={[0.013, 0.079, 0.049]}
        />
        <mesh
          geometry={nodes.Plane010.geometry}
          material={materials['yellow.008']}
          position={[-0.665, 1.707, -0.947]}
          rotation={[-1.577, 1.571, 0]}
          scale={[0.013, 0.079, 0.049]}
        />
        <mesh
          geometry={nodes.Plane011.geometry}
          material={materials['yellow.009']}
          position={[-0.691, 1.601, -0.947]}
          rotation={[-1.577, 1.571, 0]}
          scale={[0.013, 0.079, 0.049]}
        />
        <mesh
          geometry={nodes.Plane012.geometry}
          material={materials['C-1']}
          position={[-0.957, 1.758, -0.947]}
          rotation={[-1.577, Math.PI / 2, 0]}
          scale={[0.013, 0.079, 0.036]}
        />
        <mesh
          geometry={nodes.Plane013.geometry}
          material={materials['Material.013']}
          position={[-0.614, 1.935, -0.947]}
          rotation={[-1.577, 1.571, 0]}
          scale={[0.03, 0.079, 0.427]}
        />
        <mesh
          geometry={nodes.Plane014.geometry}
          material={materials['yellow.012']}
          position={[-0.966, 1.934, -0.941]}
          rotation={[-1.577, 1.571, 0]}
          scale={[0.008, 0.051, 0.009]}
        />
        <mesh
          geometry={nodes.Plane015.geometry}
          material={materials['yellow.013']}
          position={[-0.942, 1.934, -0.941]}
          rotation={[-1.577, 1.571, 0]}
          scale={[0.008, 0.051, 0.009]}
        />
        <mesh
          geometry={nodes.Plane016.geometry}
          material={materials['yellow.014']}
          position={[-0.919, 1.934, -0.941]}
          rotation={[-1.577, 1.571, 0]}
          scale={[0.008, 0.051, 0.009]}
        />
        <mesh
          geometry={nodes.Plane017.geometry}
          material={materials['C-1.001']}
          position={[-0.957, 1.447, -0.947]}
          rotation={[-1.577, Math.PI / 2, 0]}
          scale={[0.013, 0.079, 0.036]}
        />
        <mesh
          geometry={nodes.Plane018.geometry}
          material={materials['yellow.015']}
          position={[-0.792, 1.447, -0.947]}
          rotation={[-1.577, 1.571, 0]}
          scale={[0.013, 0.079, 0.115]}
        />
        <mesh
          geometry={nodes.Plane019.geometry}
          material={materials['yellow.016']}
          position={[-0.687, 1.656, -0.947]}
          rotation={[-1.577, 1.571, 0]}
          scale={[0.013, 0.079, 0.198]}
        />
        <mesh
          geometry={nodes.Plane020.geometry}
          material={materials['C-1.002']}
          position={[-0.43, 1.656, -0.947]}
          rotation={[-1.577, 1.571, 0]}
          scale={[0.013, 0.079, 0.049]}
        />
        <mesh
          geometry={nodes.Plane021.geometry}
          material={materials['C-1.003']}
          position={[-0.494, 1.708, -0.947]}
          rotation={[-1.577, Math.PI / 2, 0]}
          scale={[0.013, 0.079, 0.11]}
        />
        <mesh
          geometry={nodes.Plane022.geometry}
          material={materials['Green pandan long coach']}
          position={[0.004, 1.994, -0.944]}
          rotation={[0, 1.241, -1.577]}
          scale={[0.008, 0.051, 0.009]}
        />
        <mesh
          geometry={nodes.Plane023.geometry}
          material={materials['Green pandan long coach']}
          position={[-0.018, 1.994, -0.952]}
          rotation={[0, 1.241, -1.577]}
          scale={[0.008, 0.051, 0.009]}
        />
        <mesh
          geometry={nodes.Plane024.geometry}
          material={materials['Green pandan long coach']}
          position={[-0.04, 1.994, -0.959]}
          rotation={[0, 1.241, -1.577]}
          scale={[0.008, 0.051, 0.009]}
        />
        <mesh
          geometry={nodes.Plane025.geometry}
          material={materials['Green pandan long coach']}
          position={[-0.024, 1.873, -0.955]}
          rotation={[-3.14, -1.259, 1.586]}
          scale={[0.028, 0.022, 0.029]}
        />
        <mesh
          geometry={nodes.Plane026.geometry}
          material={materials['9']}
          position={[-0.024, 1.804, -0.955]}
          rotation={[-3.14, -1.259, 1.586]}
          scale={[0.028, 0.022, 0.029]}
        />
        <mesh
          geometry={nodes.Plane027.geometry}
          material={materials['9']}
          position={[-0.024, 1.738, -0.955]}
          rotation={[-3.14, -1.259, 1.586]}
          scale={[0.028, 0.022, 0.029]}
        />
        <mesh
          geometry={nodes.Plane028.geometry}
          material={materials['C-3.004']}
          position={[0.238, 1.418, -0.862]}
          rotation={[-3.14, -1.259, 1.586]}
          scale={[0.03, 0.145, 0.216]}
        />
        <mesh
          geometry={nodes.Plane029.geometry}
          material={materials['5.001']}
          position={[0.316, 1.87, -0.835]}
          rotation={[-3.14, -1.259, 1.586]}
          scale={[0.03, 0.138, 0.099]}
        />
        <mesh
          geometry={nodes.Plane031.geometry}
          material={materials['5.002']}
          position={[0.136, 1.79, -0.893]}
          rotation={[-3.14, -1.259, 1.586]}
          scale={[0.03, 0.136, 0.086]}
        />
        <mesh
          geometry={nodes.Plane032.geometry}
          material={materials['5.003']}
          position={[0.176, 1.723, -0.881]}
          rotation={[-3.14, -1.259, 1.586]}
          scale={[0.03, 0.14, 0.125]}
        />
        <mesh
          ref={lastMessage2Ref}
          geometry={nodes.Plane033.geometry}
          material={materials['5.004']}
          position={[0.292, 1.643, -0.837]}
          rotation={[-3.14, -1.259, 1.586]}
          scale={[0.03, 0.14, 0.125]}
        />
        <mesh
          ref={lastMessageRef}
          geometry={nodes.Plane034.geometry}
          material={materials['5.005']}
          position={[0.312, 1.572, -0.826]}
          rotation={[-3.14, -1.259, 1.586]}
          scale={[0.03, 0.138, 0.106]}
        />
        <mesh
          geometry={nodes.Plane030.geometry}
          material={materials['9']}
          position={[-0.024, 1.42, -0.952]}
          rotation={[-3.14, -1.259, 1.586]}
          scale={[0.028, 0.022, 0.029]}
        />
        <mesh
          geometry={nodes.Plane035.geometry}
          material={materials['yellow.001']}
          position={[-0.667, 1.447, -0.947]}
          rotation={[-1.577, 1.571, 0]}
          scale={[0.013, 0.079, 0.005]}
          ref={typingCursorRef}
        />
        <mesh
          geometry={nodes['Monitor_-_1001'].geometry}
          material={materials['9.001']}
          position={[-0.609, 1.674, -0.949]}
          scale={1.199}
        />
        <mesh
          geometry={nodes.Cube004.geometry}
          material={materials['Material.007']}
          position={[-1.125, 2.603, -0.931]}
          rotation={[0, 0, 0.706]}
          scale={[0.014, 0.041, 0.008]}
          ref={clockHourRef}
        />
        <mesh
          geometry={nodes.Cube005.geometry}
          material={materials['Material.007']}
          position={[-1.125, 2.603, -0.922]}
          rotation={[0, 0, -0.788]}
          scale={[0.014, 0.069, 0.008]}
          ref={clockMinsRef}
        />
        <group
          position={[-1.125, 2.381, -0.962]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.222, 0.065, 0.222]}>
          <mesh geometry={nodes.Mesh003.geometry} material={materials['Material.003']} />
          <mesh geometry={nodes.Mesh003_1.geometry} material={materials['Material.006']} />
        </group>
      </group>
    </e.group>
  )
}

useGLTF.preload('models/office-final.glb')
