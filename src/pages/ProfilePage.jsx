import Loader from "@/components/Loader.jsx";
import Ball from "@/components/Ball.jsx";
import {
    OrbitControls,
    TransformControls,
    Html,
    PositionalAudio,
    useGLTF,
    Text,
    Text3D,
    Float,
    Center,
    Preload
} from '@react-three/drei'
import {Canvas} from '@react-three/fiber'
import {Suspense, useEffect, useRef, useState} from 'react';
import {BackSide, DoubleSide} from "three";
import StarsCanvas from "@/components/StarCanvas.jsx";
import {useTheme} from "next-themes";

export default function ProfilePage() {
    const {theme, setTheme} = useTheme("dark");

    return (
        <>
            <div className={'flex flex-col items-center'}>
                <div className={'h-[500px] w-2/3'}>
                    <Canvas
                        frameloop="demand"
                        // 保留视图缓冲区
                        gl={{preserveDrawingBuffer: true}}
                    >
                        {/* suspense可以等待加载 */}
                        {/* 加载模型,fallback是没加载完成时执行的回调 */}
                        <Suspense fallback={<Loader/>}>
                            {/* 轨道控制 */}
                            <OrbitControls enableZoom={false}/>
                            {/* 3D模型 */}
                            <Ball imgUrl={'/3d/test/logo.png'}/>
                            <Text
                                position={[0, 0, 3]}
                                fontSize={0.4}
                                color={"white"}
                                textAlign="center"
                                // side={BackSide}
                                font="/3d/font/NotoSansSC-VariableFont_wght.ttf"
                            >
                                username
                                {/* toneMapped 色调映照，这里关闭后，颜色不会再带有一些灰暗 */}
                                <meshBasicMaterial toneMapped={false} side={DoubleSide}/>
                            </Text>
                        </Suspense>
                        {/* 预加载 */}
                        <Preload all/>
                    </Canvas>
                    {/* 3D模型-背景-星星 */}
                    <StarsCanvas/>
                </div>
                <div
                    className={`${theme === 'dark' ? 'dark:bg-black' : 'bg-white'} p-3 mt-4 w-full h-screen flex flex-col `}>
                    <div className={'flex flex-col items-center'}>
                        <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-pink-300 '}`}>歌单</h1>
                    </div>
                </div>
            </div>
        </>
    )
}