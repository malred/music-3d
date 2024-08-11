import {useControls} from 'leva'
import {OrbitControls, PositionalAudio, useGLTF} from '@react-three/drei'
import {useState, useRef, useEffect} from 'react'

const Earth = (props) => {
    const earth = useGLTF("/3d/scene.gltf");
    const [play, setPlay] = useState(false);

    const clickHandler = () => {
        console.log(play)
        setPlay(!play);
    };

    const soundRef = useRef()

    return (
        <>
            <OrbitControls
                // 自动旋转
                autoRotate={play}
                enableZoom={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
            />
            {/* 这个音乐有近大远小的效果 */}
            {play && (
                <PositionalAudio
                    // url="/多远都要在一起-G.E.M.邓紫棋.flac"
                    url={'/music/' + props.path}
                    ref={soundRef}
                    autoplay loop distance={3}/>
            )}

            <primitive onClick={clickHandler} scale={2}
                       object={earth.scene} position-y={0} rotation-y={0}/>
        </>
    );
};

useGLTF.preload("/3d/scene.gltf")

export default Earth