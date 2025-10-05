import { useRef } from 'react'
import { useFrame, extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import noise from './../shaders/noise.glsl'
// SUN_RADIUS removido, agora o raio vem da prop
import { useCamera } from '../context/Camera'

const Sun = ({ star }) => {
    const { handleFocus } = useCamera()

    const CustomShaderMaterial = shaderMaterial(
        { emissiveIntensity: 1.0, time: 0, starColor: [1.0, 0.8, 0.2] },
        // Vertex Shader
        `
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
            vUv = uv;
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        `,
        // Fragment Shader
        `
        uniform float time;
        uniform float emissiveIntensity;
        uniform vec3 starColor;
        varying vec2 vUv;
        varying vec3 vPosition;

        ${noise}

        void main() {
            float noiseValue = noise(vPosition + time);

            vec3 color = mix(starColor, starColor * 0.8, noiseValue);
            float intensity = (noiseValue * 0.5 + 0.5) * emissiveIntensity;

            gl_FragColor = vec4(color * intensity, 1.0);
        }
        `
    )

    extend({ CustomShaderMaterial })

    const shaderRef = useRef()

    // Update the time uniform on each frame
    useFrame(({ clock }) => {
        shaderRef.current.uniforms.time.value = clock.elapsedTime
        // Atualiza cor dinamicamente
        if (shaderRef.current && star.color) {
            // Converter hex para rgb normalizado
            const hex = star.color.replace('#', '')
            const bigint = parseInt(hex, 16)
            const r = ((bigint >> 16) & 255) / 255
            const g = ((bigint >> 8) & 255) / 255
            const b = (bigint & 255) / 255
            shaderRef.current.uniforms.starColor.value = [r, g, b]
        }
    })

    return (
        <RigidBody colliders='ball' userData={{ type: 'Sun' }} type='kinematicPosition' onClick={handleFocus}>
            <mesh>
                <sphereGeometry args={[star.radius, 32, 32]} />
                <customShaderMaterial ref={shaderRef} emissiveIntensity={5} time={0} />
            </mesh>
            <pointLight position={[0, 0, 0]} intensity={50000} color={star.color} />
        </RigidBody>
    )
}

export default Sun
