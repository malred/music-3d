import {motion} from "framer-motion";
import {useTheme} from "next-themes";

export default function PlaylistItem({item, index}) {
    const {theme, _} = useTheme();

    return (
        <motion.div
            rel={'preload'}
            initial={{
                opacity: 0,
                // width: 0,
                // height: 0,
            }}
            whileInView={{
                opacity: .8,
                // width: 208,
                // height: 208,
            }}
            transition={{
                duration: 1.5,
                delay: .5,
            }}
            className={'my-2 w-52 h-48 gap-4'}
            // key={index}
        >
            <div
                key={index}
                className={`playlist-item items-center flex flex-col w-52 h-48
                                      ${theme !== 'dark' ? 'bg-blue-200' : 'bg-amber-800'} rounded-xl shadow-xl transition duration-300 hover:scale-110`}>
                <img rel={'prefetch'} className={'w-52 h-40 rounded-t-xl'} src={item.cover}
                     alt=""/>
                <span className={`mt-2.5 font-bold ${theme !== 'dark' ?
                    'text-indigo-600' : 'text-white'}`}>{item.name}</span>
            </div>
        </motion.div>
    )
}