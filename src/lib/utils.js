// 随机字符中打字
export function randomType(element, characters, duration, sequential = false) {
    let originalText = element.innerText;
    let textArray = originalText.split('');
    let charactersArray = characters.split('');
    let startTime = new Date().getTime();
    let interval;

    if (sequential) {
        let currentIndex = 0;
        interval = setInterval(function () {
            textArray[currentIndex] = charactersArray[Math.floor(Math.random() * charactersArray.length)];
            element.innerText = textArray.join('');
            currentIndex++;
            if (currentIndex === textArray.length) {
                currentIndex = 0;
            }
            if (new Date().getTime() - startTime >= duration) {
                clearInterval(interval);
                element.innerText = originalText;
            }
        }, 20);
    } else {
        interval = setInterval(function () {
            for (let i = 0; i < textArray.length; i++) {
                textArray[i] = charactersArray[Math.floor(Math.random() * charactersArray.length)];
            }
            element.innerText = textArray.join('');
            if (new Date().getTime() - startTime >= duration) {
                clearInterval(interval);
                element.innerText = originalText;
            }
        }, 0);
    }
}

// useSize.js

import {useCallback, useEffect, useState} from 'react';

// custom hook to get the width and height of the browser window
export const useSize = () => {
    // initialize width and height to 0
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    // setSizes callback function to update width and height with current window dimensions
    const setSizes = useCallback(() => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }, [setWidth, setHeight]);

    // add event listener for window resize and call setSizes
    useEffect(() => {
        window.addEventListener('resize', setSizes);
        setSizes();
        return () => window.removeEventListener('resize', setSizes);
    }, [setSizes]);

    // return width and height
    return [width, height];
};

export function getFileFromUrl(url, fileName) {
    return new Promise(async (resolve, reject) => {
        const response = await fetch(url);
        const blob = await response.blob()
        let file = new File([blob], fileName, {type: blob.type});
        resolve(file)
    })
}