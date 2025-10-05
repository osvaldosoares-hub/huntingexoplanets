import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Physics } from '@react-three/rapier'

import Scene from './Scene'
import { useState } from 'react'
import { MOCK_STARS } from '../config/constants'


const App = () => {
    const [selectedStar, setSelectedStar] = useState(MOCK_STARS[0])

    return (
        <>
            <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, background: '#222', color: '#fff', padding: 10, borderRadius: 8 }}>
                <label htmlFor="star-select">Escolha a estrela: </label>
                <select id="star-select" value={selectedStar.name + selectedStar.radius} onChange={e => {
                    const star = MOCK_STARS.find(s => (s.name + s.radius) === e.target.value)
                    if (star) setSelectedStar(star)
                }}>
                    {MOCK_STARS.map(star => (
                        <option key={star.name + star.radius} value={star.name + star.radius}>
                            {star.name}
                        </option>
                    ))}
                </select>
                <div style={{ marginTop: 8 }}>
                    <div>Raio: {selectedStar.radius}</div>
                    <div>Densidade: {selectedStar.density}</div>
                    <div>Massa: {selectedStar.mass}</div>
                </div>
            </div>
            <Canvas camera={{ position: [0, 50, 150], far: 200000 }}>
                <color attach='background' args={['black']} />
                <ambientLight intensity={0.25} />
                <OrbitControls maxDistance={450} minDistance={50} makeDefault />
                <Physics gravity={[0, 0, 0]}>
                    <Scene star={selectedStar} />
                </Physics>
                <EffectComposer>
                    <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
                </EffectComposer>
            </Canvas>
        </>
    )
}

export default App
