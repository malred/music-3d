import {useTheme} from 'next-themes'
import {Outlet, Link} from "react-router-dom";
import Ball from "@/components/Ball.jsx";
import {Canvas} from '@react-three/fiber'
import {
    OrbitControls,
    Preload
} from '@react-three/drei'
import {Suspense,} from 'react';
import Loader from "@/components/Loader.jsx";
import {useNavigate} from "react-router-dom";

const NavBar = () => {
    // 主题
    const {theme, setTheme} = useTheme("dark");
    const navigate = useNavigate();

    return (
        <>
            <div className={`z-20 w-full ${
                theme !== 'dark' ? 'bg-white' : 'bg-black'
            } fixed border-b shadow-lg justify-around p-3 flex flex-row items-center gap-4`}>
                {/*} fixed border-b shadow-lg justify-around p-3 z-20 flex flex-row items-center gap-4`}>*/}
                <Link to={'/'}>
                    <div className={' ml-4'}>
                        <img className={'cursor-pointer'} src="/vite.svg" alt="logo"/>
                    </div>
                </Link>
                <div className={'items-center flex flex-row gap-8'}>
                    <span className={'text-xl cursor-pointer'}>音乐馆</span>
                    <span className={'text-xl cursor-pointer'}>榜单</span>
                    <Link to={'/community'}>
                        <span className={'text-xl cursor-pointer'}>社区</span>
                    </Link>
                </div>
                {/*<div></div>*/}
                <div className={'flex flex-row items-center'}>
                    <input type="text" className={'rounded-lg p-1 px-2 border w-96'}/>
                    <img
                        onClick={() => navigate('/search')}
                        src="/search.png" className={'ml-4 w-6 h-6'} alt=""/>
                </div>
                {/*<div></div>*/}
                <div className={'flex flex-row items-center justify-around gap-4'}>
                    <span className={'cursor-pointer'}
                          onClick={() => {
                              console.log(theme)
                              setTheme(theme === 'dark' ? 'light' : 'dark')
                          }}>
                        {theme === 'dark' ? '🌙夜' : '🌞日'}
                    </span>
                    <Link to={`profile`}>
                        <div
                            className={'dark:bg-black w-12 h-12 cursor-pointer'}>
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
                                </Suspense>
                                {/* 预加载 */}
                                <Preload all/>
                            </Canvas>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
};

export default NavBar;