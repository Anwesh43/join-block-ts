import { useAnimatedScale, useDimension } from "./hooks";
import React from "react"

const withContext = (MainComponent : React.FC<any>) : React.FC<any> => {
    return () => {
        const {w, h} = useDimension()
        const {scale, start : onClick} = useAnimatedScale()
        const props = {
            w, 
            h, 
            scale, 
            onClick 
        }
        return (
            <MainComponent {...props}></MainComponent>
        )
    }
}

export default withContext 