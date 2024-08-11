import {useTheme} from 'next-themes'
import Gsap from 'gsap';
// ScrollTrigger のインポート
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import {randomType} from "@/lib/utils";
import {Suspense, useCallback, useEffect, useRef, useState} from "react";
import {useGSAP} from '@gsap/react';

// ScrollTriggerの初期化
Gsap.registerPlugin(ScrollTrigger);
Gsap.registerPlugin(useGSAP);
Gsap.config({
    nullTargetWarn: false,
});
import Lenis from 'lenis'
import {Outlet, Link} from "react-router-dom";

// todo: (歌单部分)fetch+循环渲染 卡顿
export default function IndexPage() {
    const href1 = useRef();
    const titleRef = useRef();
    // const  href2= useRef();
    // const  href3= useRef();
    // const  href4= useRef();
    // const  href5= useRef();
    const ImgsDivRef = useRef(null);
    const playlistRef = useRef(null);
    const {theme, setTheme} = useTheme("dark");
    const [playlists, setPlaylists] = useState([]);

    const render = useCallback(() => {
        return playlists.map((item, index) => (
            <div className={'my-2 w-52 h-48 gap-4'} key={index}>
                <div
                    key={index}
                    className={`playlist-item items-center flex flex-col w-52 h-48
                                      ${theme !== 'dark' ? 'bg-blue-200' : 'bg-amber-800'} rounded-xl shadow-xl transition duration-300 hover:scale-110`}>
                    <img className={'w-52 h-40 rounded-t-xl'} src={item.cover} alt=""/>
                    <span className={`mt-2.5 font-bold ${theme !== 'dark' ?
                        'text-indigo-600' : 'text-white'}`}>{item.name}</span>
                </div>
            </div>
        ))
    }, [playlists, theme])

    const lenis = new Lenis()

    // lenis.on('scroll', (e) => {
    // console.log(e)
    // })
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    const fetchPlaylist = useCallback(async () => {
        let res = await fetch(`http://localhost:5000/playlist`, {
            method: 'GET',
            // cache: "force-cache",
            headers: {
                "Content-Type": "application/json",
            }
        })
        res = await res.json()
        await setPlaylists(res)
    }, [theme])

    useEffect(() => {
        (async () => {
            await fetchPlaylist()

            const tl = Gsap.timeline({
                // duration: 1.3,
            })

            tl
                .fromTo(titleRef.current, {
                        opacity: 0,
                        y: 50,
                        skewX: -20,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        skewX: 0,
                    }
                )
                .fromTo(href1.current, {
                    width: 0,
                }, {
                    width: '100%',
                    duration: 1,
                })

            const imgs = Gsap.utils.toArray(ImgsDivRef.current.querySelectorAll('img'))

            imgs.forEach((img, index) => {
                tl
                    // .fromTo(img, {
                    //     width:80,
                    //     scrollTrigger: {
                    //         trigger: ImgsDivRef.current,
                    //         start: 'top center',
                    //         end: 'bottom bottom',
                    //         markers: true,
                    //         toggleActions: 'play play none reverse',
                    //         // scrub: 2,
                    //         scrub: true,
                    //     }
                    // }, {
                    //     width: 288,
                    //     scrollTrigger: {
                    //         trigger: ImgsDivRef.current,
                    //         start: 'top center',
                    //         end: 'bottom bottom',
                    //         markers: true,
                    //         toggleActions: 'play play none reverse',
                    //         // scrub: 2,
                    //         scrub: true,
                    //     }
                    // })
                    .fromTo(img, {
                        opacity: 0,
                        // y: 80,
                        y: 70,
                        rotateY: '45deg',
                        // scrollTrigger: {
                        //     // trigger: ImgsDivRef.current,
                        //     trigger: img,
                        //     // start: 'top center',
                        //     start: 'top center',
                        //     end: 'bottom bottom',
                        //     // markers: true,
                        //     toggleActions: 'play play none reverse',
                        //     scrub: 2,
                        //     // scrub: true,
                        // },
                    }, {
                        opacity: 1,
                        y: 0,
                        rotateY: 0,
                        scrollTrigger: {
                            // trigger: ImgsDivRef.current,
                            trigger: img,
                            start: 'top center',
                            end: 'bottom bottom',
                            // markers: true,
                            toggleActions: 'play play none reverse',
                            scrub: 2,
                            // scrub: true,
                        },
                    })
            })

            tl.fromTo(ImgsDivRef.current.querySelector('hr'), {
                width: 0,
                scrollTrigger: {
                    trigger: ImgsDivRef.current,
                    start: 'top center',
                    end: 'bottom bottom',
                    // markers: true,
                    toggleActions: 'play play none reverse',
                    // scrub: 2,
                    scrub: true,
                },
            }, {
                width: '100%',
                scrollTrigger: {
                    trigger: ImgsDivRef.current,
                    start: 'top center',
                    end: 'bottom bottom',
                    // markers: true,
                    toggleActions: 'play play none reverse',
                    // scrub: 2,
                    scrub: true,
                },
            })

            const blocks = Gsap.utils.toArray(playlistRef.current.querySelectorAll('.playlist-item'))

            blocks.forEach((b, index) => {
                tl
                    .fromTo(b, {
                        opacity: 0,
                        // y: 80,
                        // scale: .2,
                        // duration: .6,
                        width: 0,
                        height: 0,
                        // scrollTrigger: {
                        //     trigger: playlistRef.current,
                        //     // start: 'top center',
                        //     start: 'top center',
                        //     end: 'bottom bottom',
                        //     // markers: true,
                        //     toggleActions: 'play play none reverse',
                        //     // scrub: 2,
                        //     scrub: true,
                        // },
                    }, {
                        opacity: .8,
                        // y: 0,
                        // scale: 1,
                        // duration: .6,
                        width: 208,
                        height: 208,
                        // delay: .6,
                        scrollTrigger: {
                            trigger: playlistRef.current,
                            start: 'top center',
                            end: 'bottom bottom',
                            // markers: true,
                            toggleActions: 'play play none reverse',
                            // scrub: 2,
                            scrub: true,
                        },
                        // stagger: .3
                    })
            })

            tl.fromTo(playlistRef.current.querySelector('hr'), {
                width: 0,
                // scrollTrigger: {
                //     trigger: ImgsDivRef.current,
                //     start: 'top center',
                //     end: 'bottom bottom',
                //     // markers: true,
                //     toggleActions: 'play play none reverse',
                //     scrub: 2,
                //     // scrub: true,
                // },
            }, {
                width: '100%',
                // duration: 1,
                scrollTrigger: {
                    trigger: playlistRef.current,
                    start: 'top center',
                    end: 'bottom bottom',
                    // markers: true,
                    toggleActions: 'play play none reverse',
                    // scrub: 2,
                    scrub: true,
                },
            })
        })()
    }, [theme]);
    // }, []);

    return (
        <div className={'flex flex-col min-h-screen items-center justify-center'}>
            {/*<div className={'flex flex-col items-center justify-center'}>*/}
            <div
                className={`bg-opacity-30 bg-scroll bg-cover
                 bg-[url('/photos/man-music-group-people-woman-crowd-1176050-pxhere.com.jpg')]
                  flex flex-col h-screen w-full items-center justify-center gap-10 
                  ${theme !== 'dark' ? 'bg-gradient-to-br from-emerald-200 to-fuchsia-200' : ''}
                  `
                }>

                {/*<img*/}
                {/*    className={'w-full h-full -z-10'}*/}
                {/*    src="/photos/man-music-group-people-woman-crowd-1176050-pxhere.com.jpg"*/}
                {/*    alt=""/>*/}

                <h1 ref={titleRef}
                    // className={'text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500 '}>音乐
                    className={'mb-12 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-purple-600 '}>音乐
                    - 无限可能</h1>
                <hr ref={href1}
                    className={`w-full border-none ${theme === 'dark' ? 'bg-purple-700' : "bg-cyan-300"} h-1 rounded-xl`}/>
            </div>

            {/*<div className={'lines flex flex-row justify-around'}>*/}
            {/*    <hr className={'w-[900px] rotate-45 h-1 rounded-xl bg-blue-300'}/>*/}
            {/*    <hr className={'w-11/12 rotate-45 h-1 rounded-xl bg-pink-300'}/>*/}
            {/*    <hr className={'w-11/12 -rotate-45 h-1 rounded-xl bg-pink-300'}/>*/}
            {/*    <hr className={'w-[900px] -rotate-45 h-1 rounded-xl bg-blue-300'} />*/}
            {/*</div>*/}
            {/*</div>*/}

            {/*热门推荐*/}
            <div
                className={`flex flex-col items-center w-full h-screen bg-cover 
                ${theme === 'dark' ? 'bg-[url("/photos/music-black-and-white-technology-equipment-gadget-black-744550-pxhere.com.jpg")]' :
                    'bg-[url("/photos/man-music-concert-singer-microphone-rapper-1192104-pxhere.com.jpg")]'} `}>
                <div ref={ImgsDivRef}
                     className={'w-[85%] h-screen mt-4 gap-8 flex flex-col justify-center'}>
                    <h1 className={'text-3xl font-bold text-amber-400'}>热门推荐</h1>
                    <hr className={'w-full h-1 bg-gradient-to-r from-cyan-300 to-fuchsia-200'}/>
                    <div
                        className={'opacity-85 mt-4 flex flex-row items-center justify-around gap-12'}>
                        <Link
                            className={'hover:scale-90 transition duration-300'}
                            to={'musics/3'}>
                            {/*<img className={' h-[420px] w-72 rounded-xl'}*/}
                            <img className={' h-[360px] w-64 rounded-xl'}
                                 src="/cover/光年之外-G.E.M.邓紫棋.webp" alt=""/>
                        </Link>
                        <Link
                            className={'hover:scale-90 transition duration-300'}
                            to={'musics/5'}>
                            {/*<img className={'h-[420px] w-72 rounded-xl'}*/}
                            <img className={' h-[360px] w-64 rounded-xl'}
                                 src="/cover/告白气球.jpg" alt=""/>
                        </Link>
                        <Link
                            className={'hover:scale-90 transition duration-300'}
                            to={'musics/7'}>
                            {/*<img className={'h-[420px] w-72 rounded-xl'}*/}
                            <img className={' h-[360px] w-64 rounded-xl'}
                                 src="/cover/恋爱循环-花泽香菜.jpg" alt=""/>
                        </Link>
                        <Link
                            className={'hover:scale-90 transition duration-300'}
                            to={'musics/6'}>
                            {/*<img className={'h-[420px] w-72 rounded-xl'}*/}
                            <img className={' h-[360px] w-64 rounded-xl'}
                                 src="/cover/铃芽之旅-周深.jpg" alt=""/>
                        </Link>
                    </div>
                </div>
            </div>

            {/*歌单*/}
            <Suspense fallback={<div>loading...</div>}>
                <div
                    className={`flex flex-col items-center w-screen h-screen bg-cover 
                ${theme === 'dark' ? 'bg-[url("/photos/music-turntable-light-concert-darkness-neon-145322-pxhere.com.jpg")]' :
                        'bg-[url("/photos/music-wood-line-piano-lumber-bible-39038-pxhere.com.jpg")]'} `}>
                    <div
                        ref={playlistRef}
                        className={'w-[85%] h-screen mt-4 gap-8 flex flex-col justify-center'}>
                        {/*<div>*/}
                        <h1 className={'text-3xl font-bold text-amber-400'}>品味歌单</h1>
                        {/*</div>*/}
                        <hr className={'w-full h-1 bg-gradient-to-r from-cyan-300 to-fuchsia-200'}/>
                        <div
                            className={'mt-4 grid grid-cols-5 gap-12 h-60'}>
                            {/*{playlists && playlists.map((item, index) => (*/}
                            {playlists && render()}
                            {/*{(!playlists || playlists.length === 0) && ([1, 2, 3, 4, 5].map((item, index) => (*/}
                            {/*        <div className={'animate-pulse my-2 w-52 h-44 gap-4'} key={index}>*/}
                            {/*            <div className={`playlist-item items-center flex flex-col w-52 h-52*/}
                            {/*          ${theme !== 'dark' ? 'bg-blue-200' : 'bg-amber-800'} rounded-xl shadow-xl transition duration-300 hover:scale-110`}>*/}
                            {/*                <img className={'w-52 h-40 rounded-t-xl bg-gray-200'}*/}
                            {/*                    // src='/cover/可惜没如果.webp'*/}
                            {/*                     alt=""/>*/}
                            {/*                <span className={`mt-2.5 font-bold ${theme !== 'dark' ?*/}
                            {/*                    'text-indigo-600' : 'text-white'}`}>loading</span>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    ))*/}
                            {/*)}*/}
                        </div>
                    </div>
                </div>
            </Suspense>
            {/*<div className={'h-screen'}>*/}

            {/*</div>*/}
        </div>
    )
}