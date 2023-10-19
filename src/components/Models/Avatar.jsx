/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import { useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function Avatar(props) {
  const { animation } = props
  const { headFollow, cursorFollow, wireframe } = useControls({
    headFollow: false,
    cursorFollow: false,
    wireframe: false
  })
  const group = useRef()
  const { nodes, materials } = useGLTF('models/avatar.glb')

  const { animations: typingAnimation } = useFBX('animations/typing-6.fbx')
  const { animations: showOffAnimation } = useFBX('animations/ShowOff.fbx')
  const { animations: fallingAnimation } = useFBX('animations/Falling Idle (1).fbx')
  const { animations: idleAnimation } = useFBX('animations/Standing Idle.fbx')
  const { animations: tellingASecretAnimation } = useFBX('animations/Telling A Secret.fbx')
  const { animations: phoneCallAnimation } = useFBX('animations/phone-call.fbx')

  typingAnimation[0].name = 'Typing'
  showOffAnimation[0].name = 'ShowOff'
  fallingAnimation[0].name = 'Falling'
  idleAnimation[0].name = 'Idle'
  tellingASecretAnimation[0].name = 'TellingASecret'
  phoneCallAnimation[0].name = 'PhoneCall'

  const { actions } = useAnimations(
    [
      typingAnimation[0],
      showOffAnimation[0],
      fallingAnimation[0],
      idleAnimation[0],
      phoneCallAnimation[0],
      tellingASecretAnimation[0]
    ],
    group
  )

  useFrame(state => {
    if (headFollow) {
      group.current.getObjectByName('Head').lookAt(state.camera.position)
    }
    if (cursorFollow) {
      const target = new THREE.Vector3(state.mouse.x, state.mouse.y, 1)
      group.current.getObjectByName('Spine2').lookAt(target)
    }
  })

  useEffect(() => {
    if (!actions[animation]) return
    actions[animation].reset().fadeIn(0.5).play().setLoop(THREE.LoopPingPong)
    return () => {
      if (!actions[animation]) return
      actions[animation].reset().fadeOut(0.5)
    }
  }, [animation])

  useEffect(() => {
    Object.values(materials).forEach(material => {
      material.wireframe = wireframe
    })
  }, [wireframe])

  return (
    <group {...props} dispose={null} ref={group}>
      <skinnedMesh
        geometry={nodes.Wolf3D_Avatar.geometry}
        material={materials['Wolf3D_Avatar.001']}
        skeleton={nodes.Wolf3D_Avatar.skeleton}
      />
      <primitive object={nodes.Hips} />
    </group>
  )
}

useGLTF.preload('models/Avatar-2.glb')
