import {Canvas} from '@react-three/fiber'
import {
    OrbitControls,
    TransformControls,
    CameraControls,
    Html,
    PositionalAudio,
    useGLTF,
    Text,
    Text3D,
    Float,
    Center,
    Preload
} from '@react-three/drei'
import {Suspense, useEffect, useRef, useState} from 'react';
import {extend} from '@react-three/fiber'

import {BackSide, DoubleSide} from "three";
import {useControls, buttonGroup} from 'leva'
import Gsap from 'gsap';
// ScrollTrigger のインポート
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import {randomType} from "../lib/utils";
import Ball from "../components/Ball.jsx";
import Earth from "../components/Earth.jsx";
import StarsCanvas from "../components/StarCanvas.jsx";
import CanvasLoader from "../components/Loader.jsx";
import * as THREE from "three";
import {Routes, Route, useParams} from 'react-router-dom';
// ScrollTriggerの初期化
Gsap.registerPlugin(ScrollTrigger);
Gsap.config({
    nullTargetWarn: false,
});

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

export default function MusicPage(props) {
    // console.log(props)
    const {id} = useParams()
    const [music, setMusic] = useState({});

    useEffect(() => {
        const commentTopDivs = Gsap.utils.toArray('.comment-top');

        commentTopDivs.forEach((div) => {
            const tl = Gsap.timeline()

            tl
                .fromTo(div, {
                        width: 0,
                        opacity: 0,
                    },
                    {
                        width: 800,
                        opacity: 1,
                        duration: 1.4,
                    }
                )
                .fromTo(div.querySelector('.comment-date'), {
                    opacity: 0,
                }, {
                    opacity: 1,
                })
        });

        const commentBottomDivs = Gsap.utils.toArray('.comment-bottom');

        commentBottomDivs.forEach((div) => {
            const tl = Gsap.timeline()

            // div.addEventListener('mouseenter', () => {
            //     randomType(div.querySelector('.comment-content'), '01', 600, true)
            // })
        });

        // fetch
        (async () => {
            let res = await fetch(`http://localhost:5000/musics/${id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
            res = await res.json()
            console.log(res)
            await setMusic(res)
        })();

    }, []);


    return (
        <div className="h-screen w-full relative z-0">
            <div className="h-full xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
                <div
                    className="xl:flex-1 xl:h-auto md:h-full h-[350px]">
                    <Canvas
                        shadows
                        className={'h-full'}
                        frameloop="demand"
                        gl={{preserveDrawingBuffer: true}}
                        camera={{
                            fov: 45,
                            near: 0.1,
                            far: 200,
                            position: [0, 3, 6],
                        }}
                    >
                        {/* smoothTime 动画持续时间? */}
                        {/*<CameraControls ref={cameraControlRef} smoothTime={0.25}/>*/}
                        <OrbitControls/>
                        <Suspense fallback={<CanvasLoader/>}>
                            <OrbitControls/>
                            <Earth path={music.path}/>
                        </Suspense>
                        <Text
                            position={[0, 2, 0]}
                            fontSize={0.4}
                            color={"white"}
                            textAlign="center"
                            // side={BackSide}
                            font="/3d/font/NotoSansSC-VariableFont_wght.ttf"
                        >
                            {music.name}
                            {/* toneMapped 色调映照，这里关闭后，颜色不会再带有一些灰暗 */}
                            <meshBasicMaterial toneMapped={false} side={DoubleSide}/>
                        </Text>
                    </Canvas>
                </div>
            </div>
            <div className={'h-full'}>
                <div className={'mt-4 justify-center items-center p-4 flex flex-row gap-3'}>
                    <h1 className={'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 font-semibold text-3xl'}>
                        {music.name ? music.name : ''}
                    </h1>
                    <span className={'text-xl'}>{music.singer}</span>
                </div>

                {/*评论*/}
                <div className={'p-4 flex flex-col justify-center gap-3'}>
                    <div className={'flex flex-col items-center'}>
                        <h1 className={'font-semibold text-2xl'}>评论</h1>
                    </div>
                    <div className={'h-2'}></div>
                    <div className={'flex flex-col items-center'}>
                        <div className={'flex flex-col gap-3 items-center w-9/12'}>
                            {[1, 2, 3, 4, 5, 6].map((comment, idx) => (
                                <div className={'flex flex-col gap-3 items-start'}>
                                    <div
                                        className={'w-[800px] comment-top m-1 border-b-2 flex flex-row gap-3 items-center'}>
                                        <div className={'bg-white w-12 h-12 cursor-pointer'} key={idx}>
                                            <Canvas
                                                frameloop="demand"
                                                // 保留视图缓冲区
                                                gl={{preserveDrawingBuffer: true}}
                                            >
                                                {/* suspense可以等待加载 */}
                                                {/* 加载模型,fallback是没加载完成时执行的回调 */}
                                                <Suspense fallback={<CanvasLoader/>}>
                                                    {/* 轨道控制 */}
                                                    <OrbitControls enableZoom={false}/>
                                                    {/* 3D模型 */}
                                                    <Ball imgUrl={'/3d/test/logo.png'}/>
                                                </Suspense>
                                                {/* 预加载 */}
                                                <Preload all/>
                                            </Canvas>
                                        </div>
                                        <div className={'comment-date'}>2024-12-1</div>
                                    </div>
                                    <div className={'comment-bottom mx-1 flex flex-col gap-3'}>
                                        <span className={'p-1 w-[800px] comment-content'}>www! 100昏!!! 😍😍😍</span>
                                        <div className={'flex flex-row gap-2'}>
                                            <span className={'cursor-pointer'} title={'点赞'}>❤{123}</span>
                                            <span className={'cursor-pointer'} title={'评论'}>💬{23}</span>
                                            <span className={'cursor-pointer'} title={'分享'}>🚀{18}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* 3D模型-背景-星星 */}
            <StarsCanvas/>
        </div>
    )
}