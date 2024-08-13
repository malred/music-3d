import {useTheme} from "next-themes";
import {motion} from 'framer-motion'
import {useLayoutEffect, useState} from "react";
import ShowPlaylistItem from "@/components/ShowPlaylistItem.jsx";

const itemsVariant = {
    initial: {
        x: -50,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1.5,
            staggerChildren: 0.2,
        },
    },
}

const h1Variant = {
    initial: {
        x: -40,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
        },
    },
}

const musicVariant = {
    initial: {
        x: 40,
        opacity: 0,
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: 1,
        },
    },
}

const rankVariant = {
    initial: {
        height: '0',
        width: 0,
        // clipPath: 'polygon(48% 0, 100% 38%, 100% 100%, 0 100%, 0 35%)',
        // clipPath: 'polygon(48% 0, 100% 100%, 100% 100%, 0 100%, 0 100%)',
        // clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 0 100%, 0 100%)',
    },
    animate: {
        // clipPath: 'polygon(48% 0, 100% 0, 100% 100%, 0 100%, 0 0)',
        height: '100%',
        width: '208px',
        transition: {
            duration: 1,
            type: 'spring'
        }
    }
}

export default function MusicsShowPage() {
    const {theme, _} = useTheme()
    const [playlist, setPlaylist] = useState([]);

    useLayoutEffect(() => {
        (async () => {
            let res = await fetch('http://localhost:5000/playlist', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            res = await res.json()
            await setPlaylist(res)
        })()
    }, [theme])

    const [musics, setMusics] = useState([]);

    useLayoutEffect(() => {
        (async () => {
            let res = await fetch('http://localhost:5000/musics', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            res = await res.json()
            await setMusics(res)
        })()
    }, [theme])

    return (
        <div className={'flex flex-col min-h-screen w-screen gap-8 mt-6'}>
            {/*歌单推荐*/}
            <div className={'flex flex-row absolute h-96 w-screen inset-y-1/4 '}>
                <div className={`opacity-40 relative inset-x-52 h-96 w-56 bg-purple-500 rounded-lg1
                ${theme === 'dark' ?
                    '' :
                    ''}`}></div>
                <motion.h1
                    variants={h1Variant}
                    whileInView='animate'
                    initial='initial'
                    className={'inset-y-12 relative inset-x-36 text-3xl font-bold'}>
                    歌单推荐
                </motion.h1>
                <motion.div
                    variants={itemsVariant}
                    className={'border-t pt-12 opacity-85 inset-y-28 inset-x-6 relative flex flex-row gap-10'}>
                    {playlist && playlist.map(item => (
                        <ShowPlaylistItem key={item.id} item={item} itemsVariant={itemsVariant}/>
                    ))}
                </motion.div>
            </div>
            {/*新歌*/}
            <div className={'flex flex-row absolute h-96 w-screen inset-y-[115%] '}>
                <div className={`opacity-40 relative inset-x-[70%] h-96 w-56 bg-violet-500 
                ${theme === 'dark' ?
                    '' :
                    ''}`}></div>
                <motion.h1
                    variants={h1Variant}
                    whileInView='animate'
                    initial='initial'
                    // className={'inset-y-12 relative inset-x-[60%] text-3xl font-bold'}>
                    className={'inset-y-8 relative inset-x-6 text-3xl font-bold'}>
                    新歌
                </motion.h1>
                <motion.div
                    variants={itemsVariant}
                    className={'pt-8 border-t grid grid-cols-2 w-[45%] inset-x-36 opacity-85 inset-y-24 relative '}>
                    {musics && musics.slice(0, 6).map(item => (
                        <motion.div
                            variants={musicVariant}
                            initial='initial'
                            whileInView='animate'
                            key={item.id} className={'w-80 h-20  flex flex-row'}>
                            <div className={'size-20'}>
                                {/*hover时，显示播放图标*/}
                                <img className={' inset-x-4 inset-y-4 relative size-12 '}
                                     src="/play-white.png" alt=""/>
                                <img
                                    className={'hover:opacity-55 transition duration-200 relative -inset-y-12 cursor-pointer size-20'}
                                    src={item.cover} alt=""/>
                            </div>
                            <div className={'ml-2 justify-center flex flex-col gap-1'}>
                                <span>{item.name}</span>
                                <span>{item.singer}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            {/*排行榜*/}
            <div className={'gap-12 absolute h-[80vh] w-screen inset-y-[215%] flex flex-col items-center'}>
                <motion.h1
                    variants={h1Variant}
                    whileInView='animate'
                    initial='initial'
                    // className={'inset-y-12 relative inset-x-[60%] text-3xl font-bold'}>
                    className={' text-3xl font-bold'}>
                    排行榜
                </motion.h1>
                <div className={` h-[60vh] flex flex-row items-center gap-8`}>
                    {[1, 2, 3, 4].map(item => (
                        <motion.div key={item}
                                    variants={rankVariant}
                                    whileInView='animate'
                                    initial='initial'
                                    className={`p-4 items-center h-full w-52  flex flex-col 
                                    ${theme==='dark'?'bg-sky-800':'bg-green-300'} opacity-85
                         
                        `}>
                            {/*<h2 className={'mt-6'}>新歌榜</h2>*/}
                            <motion.h1
                                className={'mt-12 text-2xl text-white'}>
                                欧美
                            </motion.h1>
                            <div className={'w-16 h-0.5 bg-white mt-5'}></div>
                            <ul className={'list-decimal text-white mt-8 '}>
                                <li>
                                    <div className={'mb-8 flex flex-col'}>
                                        <span>歌曲1</span>
                                        <span>歌手2</span>
                                    </div>
                                </li>
                                <li>
                                    <div className={'mb-8 flex flex-col'}>
                                        <span>歌曲1</span>
                                        <span>歌手2</span>
                                    </div>
                                </li>
                                <li>
                                    <div className={'mb-8 flex flex-col'}>
                                        <span>歌曲1</span>
                                        <span>歌手2</span>
                                    </div>
                                </li>
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
            {/*ai漫听*/
            }
            {/*<div className={'absolute h-96 w-screen inset-y-[375%] '}></div>*/
            }
        </div>
    )
}