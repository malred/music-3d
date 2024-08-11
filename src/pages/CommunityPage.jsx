import {useTheme} from "next-themes";
import {Canvas} from "@react-three/fiber";
import {Suspense, useRef} from "react";
import CanvasLoader from "@/components/Loader.jsx";
import {OrbitControls, Preload} from "@react-three/drei";
import Ball from "@/components/Ball.jsx";
import Comment from "@/components/Comment.jsx";
import gsap from 'gsap'

export default function CommunityPage() {
    const {theme, setTheme} = useTheme('dark')
    // const commentRef = useRef()
    // gsap.fromTo(commentRef.current, {
    //     clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%);'
    // }, {
    //     clipPath: 'polygon(0% 0%, 100% 0%, 100% 65%, 75% 65%, 75% 100%, 50% 65%, 0 65%);'
    // })

    return (
        <>
            <div className={'min-h-screen items-center justify-center flex flex-col gap-5'}>
                <div className={`h-screen w-screen bg-cover ${theme === 'dark' ?
                    'bg-[url("/photos/hand-music-light-crowd-concert-audience-111746-pxhere.com.jpg")]' :
                    'bg-[url("/photos/play-number-community-close-up-font-toys-1091567-pxhere.com.jpg")]'
                }`}></div>
                <div className={'min-h-screen my-8 flex-col flex w-full items-center gap-12'}>
                    {[1, 2, 3, 4, 5].map((idx) =>
                        <div
                            // ref={commentRef}
                            className={'bg-violet-50 p-4 rounded-lg '}>
                            <Comment content={'prazkhanal 今天分享了歌曲: Whip Afro Dancehall Music'}/>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}