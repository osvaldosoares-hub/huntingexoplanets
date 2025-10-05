import useGravity from '../hooks/useGravity'
import { CameraProvider } from '../context/Camera'
import { ExplosionProvider } from '../context/Explosions'
import { TrailProvider } from '../context/Trails'

import Sun from './Sun'
import Stars from './Stars'
import Planets from './Planets'

// Scene component

const Scene = ({ star }) => {
    useGravity()
    return (
        <CameraProvider>
            <ExplosionProvider>
                <Sun star={star} />
                <TrailProvider>
                    <Planets />
                </TrailProvider>
                <Stars />
            </ExplosionProvider>
        </CameraProvider>
    )
}

export default Scene
