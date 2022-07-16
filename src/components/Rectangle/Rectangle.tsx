import React, {Suspense} from 'react'
import {selectedElementState} from '../../Canvas'
import {Drag} from '../Drag'
import {RectangleContainer} from './RectangleContainer'
import {RectangleInner} from './RectangleInner'
import {atomFamily, useRecoilState} from 'recoil'
import {Resize} from '../Resize'
import {RectangleLoading} from './RectangleLoading'

export type ElementStyle = {
    position: {top: number; left: number}
    size: {width: number; height: number}
}

export type Element = {
    style: ElementStyle
    image?: {id: number, src: string}
}

export const defaultElement = {
    style: {
        position: {top: 70, left: 70},
        size: {width: 100, height: 100}
    }
}

export const elementState = atomFamily<Element, number>({
    key: 'element',
    default: defaultElement,
})

export const Rectangle = ({id}: {id: number}) => {
    const [selectedElement, setSelectedElement] = useRecoilState(selectedElementState)
    const [element, setElement] = useRecoilState(elementState(id))
    const selected = selectedElement === id

    return (
        <RectangleContainer
            position={element.style.position}
            size={element.style.size}
            onSelect={() => {
                setSelectedElement(id)
            }}
        >
            <Resize
                selected={selected}
                position={(element.style.position)}
                size={(element.style.size)}
                onResize={(style) => {
                    setElement({
                        ...element,
                        style,
                    })
                }}
                keepAspectRatio={element.image !== undefined}
            >
                <Drag
                    position={element.style.position}
                    onDrag={(position) => {
                        setElement({
                            ...element,
                            style: {
                                ...element.style,
                                position,
                            },
                        })
                    }}
                >
                    <div>
                        <Suspense fallback={<RectangleLoading selected={selected}/>}>
                            <RectangleInner selected={selected} id={id} />
                        </Suspense>
                    </div>
                </Drag>
            </Resize>
        </RectangleContainer>
    )
}
