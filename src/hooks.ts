import {useState, useEffect, CSSProperties} from 'react'
const scGap : number = 0.02 
const delay : number = 20 

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0 
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w, 
        h
    }
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)
const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 

export const useStyle = (w : number, h : number, scale : number) => {
    const sc1 : number = divideScale(scale, 0, 2)
    const sc2 : number = divideScale(scale, 1, 2)
    const position = 'absolute'
    const size : number = Math.min(w, h) / 11.2 
    const background = `indigo`
    return {
        parentStyle() : CSSProperties {
            const left = `${w / 2}px`
            const top = `${h / 2 + (h / 2 - size) * sc2}px`
            return {
                position, 
                left, 
                top 
            }
        },
        blockStyle(i : number) : CSSProperties {
            const left = `${-1.5 * size + (2 * size) * i}px`
            const top = `${0}px`
            const width = `${size}px`
            const height = `${size}px`
            return {
                position, 
                width, 
                left, 
                top, 
                height, 
                background 
            }
        }, 
        lineStyle() : CSSProperties  {
            const lineWidth = `${Math.min(w, h) / 90}px`
            const width = `${size * sc1}px`
            const height = `${lineWidth}px`
            const left = `${-size * 0.5 * sc1}px`
            const top = `${lineWidth}px`
            return {
                position, 
                left, 
                top, 
                width,
                height, 
                background
            }
        }
    }
}