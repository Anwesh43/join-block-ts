import React from 'react'
import {useStyle} from './hooks'
import withContext from './withContext'

interface JBCProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : Function
}
const JoinBlockComponent = (props : JBCProps) => {
    const {w, h, scale, onClick} = props
    const {parentStyle, lineStyle, blockStyle} = useStyle(w, h, scale) 
    return (
        <React.Fragment>
            <div style ={parentStyle()} onClick = {() => onClick()}>
                {[0, 1].map(i => (<div style = {blockStyle(i)} key = {`block_${i}`}></div>))}
                <div style = {lineStyle()}></div>
            </div>
        </React.Fragment>
    )
}

export default withContext(JoinBlockComponent)