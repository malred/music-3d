export default function RankingsPage() {
    return (
        <div className={' flex flex-row '}>
            <div className={'flex flex-col items-center gap-2 fixed top-28 left-[10%] bg-violet-300 h-[80vh] w-[10%]'}>
                <div className={'w-full flex flex-col gap-2 h-full'}>

                    {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                        <div key={item}
                             className={'h-12 bg-blue-200 w-full'}>
                            item
                        </div>
                    ))}
                </div>
            </div>
            <div className={'w-[30vw]'}></div>
            <div className={' w-[60vw]  mt-12 min-h-screen bg-green-300'}>
                <ul className={'list-decimal gap-2 h-full w-full flex flex-col '}>
                    <li className={'flex flex-row items-center h-24 bg-blue-200'}>
                        {/*<span className={'size-24 text-2xl font-thin'}>1</span>*/}
                        <img className={'size-20'}
                             src="/cover/大鱼-周深.jpg" alt=""/>
                        <div className={'ml-2 justify-between w-[60%] border-gray-200 flex flex-row gap-1'}>
                            <div></div>
                            <span>name</span>
                            <div></div>
                            <span>singer</span>
                        </div>
                    </li>
                    <li className={'flex flex-row items-center h-24 bg-blue-200'}>
                        {/*<span className={'size-24 text-2xl font-thin'}>1</span>*/}
                        <img className={'size-20'}
                             src="/cover/大鱼-周深.jpg" alt=""/>
                        <div className={'ml-2 justify-between w-[60%] border-gray-200 flex flex-row gap-1'}>
                            <div></div>
                            <span>name</span>
                            <div></div>
                            <span>singer</span>
                        </div>
                    </li>
                    <li className={'flex flex-row items-center h-24 bg-blue-200'}>
                        {/*<span className={'size-24 text-2xl font-thin'}>1</span>*/}
                        <img className={'size-20'}
                             src="/cover/大鱼-周深.jpg" alt=""/>
                        <div className={'ml-2 justify-between w-[60%] border-gray-200 flex flex-row gap-1'}>
                            <div></div>
                            <span>name</span>
                            <div></div>
                            <span>singer</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}