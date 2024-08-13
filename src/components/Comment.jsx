import {Canvas} from "@react-three/fiber";
import {Suspense} from "react";
import CanvasLoader from "@/components/Loader.jsx";
import {OrbitControls, Preload} from "@react-three/drei";
import Ball from "@/components/Ball.jsx";
import {useTheme} from "next-themes";
import Gsap from "gsap";

export default function Comment(props) {
    const {name, content, publishTime, likeCnt, commentCnt, shareCnt, avator, ...rest} = props;
    const {theme, setTheme} = useTheme('dark')

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

    // const commentBottomDivs = Gsap.utils.toArray('.comment-bottom');

    return (
        <div className={`flex flex-col gap-3 items-start
        ${theme === 'dark' ? '' : ''}`} {...rest}>
            <div
                className={'w-[800px] comment-top m-1 1border-b-2 flex flex-row gap-3 items-center'}>
                {/*头像*/}
                <div className={`${theme === 'dark' ? 'bg-black' : 'bg-white'} rounded-full
                w-12 h-12 cursor-pointer`}>
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
                            <Ball imgUrl={avator || '/3d/test/logo.png'}/>
                        </Suspense>
                        {/* 预加载 */}
                        <Preload all/>
                    </Canvas>
                </div>
                {/*发布时间*/}
                <div className={'comment-date justify-center flex flex-col'}>
                    <span className={'font-bold'}>{name ? name : 'username'}</span>
                    <span className={'text-sm'}>{publishTime ? publishTime : '2024-12-1'}</span>
                </div>
            </div>
            <div className={'comment-bottom mx-1 flex flex-col gap-3'}>
                <span className={'p-1 w-[800px] comment-content'}>
                    {props.content ? props.content : 'www! 100昏!!! 😍😍😍'}
                </span>
                <div className={'flex flex-row gap-2'}>
                    <span className={'cursor-pointer'} title={'点赞'}>
                        ❤{likeCnt ? likeCnt : '123'}
                    </span>
                    <span className={'cursor-pointer'} title={'评论'}>
                        💬{commentCnt ? commentCnt : '23'}
                    </span>
                    <span className={'cursor-pointer'} title={'分享'}>
                        🚀{shareCnt || '18'}
                    </span>
                </div>
            </div>
        </div>
    )
}