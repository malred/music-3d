import Gsap from 'gsap';
// ScrollTrigger のインポート
import {ScrollTrigger} from 'gsap/dist/ScrollTrigger';
import {useEffect, useRef, useState, useCallback} from "react";

// ScrollTriggerの初期化
Gsap.registerPlugin(ScrollTrigger);
Gsap.config({
    nullTargetWarn: false,
});
import {useTheme} from "next-themes";
// import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js'
import WaveSurfer from 'wavesurfer.js'
import {useGSAP} from '@gsap/react';
import {useNavigate} from "react-router-dom";

Gsap.registerPlugin(useGSAP);

export default function SearchPage() {
    const resultRef = useRef();
    const {theme, setTheme} = useTheme("dark");
    const [musics, setMusics] = useState([])

    const fetchMusics = useCallback(async () => {
        let res = await fetch(`http://localhost:5000/musics`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
            }
        })
        res = await res.json()
        await setMusics(res)
    }, [theme])

    useEffect(() => {
            // const items = Gsap.utils.toArray('.result > div')
            // const items = resultRef.current.querySelectorAll('div')

            (async () => {
                await fetchMusics()

                // 等待有值后, 就可以成功
                const items = await resultRef.current.querySelectorAll('.items');

                items.forEach(item => {
                    const tl = Gsap.timeline({})

                    tl
                        .fromTo(item, {
                            // left left-b,
                            width: 0,
                            opacity: 0,
                            clipPath: 'polygon(0 0, 50% 0%, 0 100%, 0% 100%)',
                            duration: 2
                        }, {
                            width: '100%',
                            opacity: .7,
                            clipPath: 'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)',
                            duration: 2
                        },)
                        .fromTo(item, {
                            background: theme === 'dark' ?
                                'black' :
                                'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
                            // 'linear-gradient(90deg, rgba(42,90,186,1) 35%, rgba(0,255,112,1) 100%);',

                            // background: 'linear-gradient(90deg, rgba(42,90,186,1) 35%, rgba(0,255,112,1) 100%);',
                            // background: 'linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)',
                            duration: 2
                        }, {
                            // background: theme === 'dark' ? 'black' : 'white',
                            // background: 'gray',
                            background: 'linear-gradient(90deg, rgba(42,90,186,1) 35%, rgba(0,255,112,1) 100%);',
                            duration: 2,
                            scrollTrigger: {
                                trigger: item,
                                scrub: true,
                            }
                        }, '<')
                    // .fromTo(audio, {
                    //     opacity: 0,
                    // }, {
                    //     opacity: 1,
                    // })

                });
            })()

            // const audio = resultRef.current.querySelector('audio');

        },
        [theme]
    )

    // 缓存waveform对应的wave对象, 后续可以用它控制播放
    let waves = []

    const navigate = useNavigate()

    return (
        <>
            <div className={' pt-20 w-screen min-h-screen flex flex-col items-center'}>
                <h1 className={'my-6 font-bold text-3xl text-cyan-400'}>搜索结果</h1>
                {/*<div className={'h-96'}>*/}
                {/*    ai*/}
                {/*</div>*/}
                <div
                    ref={resultRef}
                    className={`bg-cover 
                    ${theme === 'dark' ?
                        'bg-[url("/photos/record-music-vinyl-turntable-black-and-white-technology-1175483-pxhere.com.jpg")]' :
                        'bg-[url("/photos/music-technology-gadget-ear-pink-player-1283476-pxhere.com.jpg")]'
                    } mt-12 results w-full flex flex-col justify-between items-center`}>
                    {musics && musics.map(m =>
                        (<div
                                key={m.id} className={'mt-4 w-[60%]'}>
                                <div
                                    className={`shadow-xl ${'items'} mt-4 p-2 h-24 rounded-lg flex flex-row justify-between items-center`}>

                                    {/*封面 名称*/}
                                    <div className={'flex flex-row'}>
                                        <img
                                            onClick={() => {
                                                navigate(`/musics/${m.id}`)
                                            }}
                                            className={'cursor-pointer h-20 w-20 rounded-lg'}
                                            // src="/cover/可惜没如果.webp"
                                            src={m.cover}
                                            alt=""/>
                                        <div className={'flex flex-col justify-center gap-1 ml-6'}>
                                            <span className={'text-xl truncate w-44 overflow-ellipsis'}>{m.name}</span>
                                            <span className={'truncate w-44 overflow-ellipsis'}>{m.singer}</span>
                                        </div>
                                    </div>

                                    {/*<div></div>*/}

                                    {/*<div className={'flex-1'}></div>*/}

                                    {/*可视化音频*/}
                                    <div className={'flex flex-col items-center justify-center w-[50%] '}>
                                        {/*<audio*/}
                                        {/*    // controls*/}
                                        {/*    className={'h-full w-full'}*/}
                                        {/*    src="/music/可惜没如果-林俊杰.320.mp3">*/}
                                        {/*    可惜没如果*/}
                                        {/*</audio>*/}
                                        {/*可视化音乐播放*/}
                                        <div id={"waveform" + m.id}
                                            // ref={ref}
                                             className={'w-full'}>
                                            {/*the waveform will be rendered here */}
                                        </div>
                                    </div>

                                    {/*<div className={'flex-1'}></div>*/}

                                    {/*播放按钮*/}
                                    <div className={'flex flex-row items-center justify-start gap-2 mr-6'}>
                                        <img
                                            onClick={async () => {
                                                if (!waves[m.id]) {
                                                    const wavesurfer = WaveSurfer.create({
                                                        container: '#waveform' + m.id,
                                                        // container: items.querySelector('#wavesurfer'),
                                                        // container: ref,
                                                        waveColor: '#4F4A85',
                                                        progressColor: '#383351',
                                                        height: 20,
                                                        // height: 14,
                                                        // barHeight: 0,
                                                        // url: audio.src,
                                                        // url: "/music/可惜没如果-林俊杰.320.mp3",
                                                        url: "/music/" + m.path,
                                                    })

                                                    wavesurfer.on('interaction', () => {
                                                        wavesurfer.play()
                                                    })

                                                    waves[m.id] = wavesurfer
                                                }

                                                console.log('play')
                                                let wavesurfer = waves[m.id]
                                                wavesurfer && wavesurfer.playPause()
                                            }}
                                            className={'w-7 h-7 cursor-pointer'}
                                            src="/play.png" alt=""/>
                                        {/*<img*/}
                                        {/*    className={'w-7 h-7 cursor-pointer'}*/}
                                        {/*    onClick={() => {*/}
                                        {/*        let wavesurfer = waves[m.id]*/}
                                        {/*        wavesurfer && wavesurfer.playPause()*/}
                                        {/*    }}*/}
                                        {/*    src="/play.png" alt=""/>*/}
                                    </div>
                                </div>
                            </div>
                        ))}
                    <div className={'h-8'}></div>
                </div>
            </div>
        </>
    )
}