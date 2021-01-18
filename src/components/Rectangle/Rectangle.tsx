import {useState} from 'react'
import {RectangleContainer} from './RectangleContainer'
import {RectangleInner} from './RectangleInner'

export type ElementStyle = {
    position: {top: number; left: number}
    size: {width: number; height: number}
}

export const Rectangle = () => {
    const [element] = useState({
        style: {
            position: {top: 100, left: 100},
            size: {width: 100, height: 100},
        },
    })

    return (
        <RectangleContainer
            position={element.style.position}
            size={element.style.size}
            onSelect={() => {
                console.log("I've been selected!")
            }}
        >
            <RectangleInner selected={false} />
        </RectangleContainer>
    )
}
