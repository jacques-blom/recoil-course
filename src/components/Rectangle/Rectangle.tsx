import {Suspense} from 'react'
import {atom, atomFamily, useRecoilState} from 'recoil'
import {Drag} from '../Drag'
import {Resize} from '../Resize'
import {RectangleContainer} from './RectangleContainer'
import {RectangleInner} from './RectangleInner'
import {RectangleLoading} from './RectangleLoading'

export type ElementStyle = {
    position: {top: number; left: number}
    size: {width: number; height: number}
}

export type Element = {
    style: ElementStyle
    image?: {src: string; id: number}
}

export const defaultStyle = {
    position: {top: 0, left: 0},
    size: {width: 200, height: 200},
}

export const elementState = atomFamily<Element, number>({
    key: 'element',
    default: {
        style: defaultStyle,
    },
})

export const selectedElementState = atom<number | null>({
    key: 'selectedElement',
    default: null,
})

export const Rectangle = ({id}: {id: number}) => {
    const [element, setElement] = useRecoilState(elementState(id))
    const [selectedElement, setSelectedElement] = useRecoilState(selectedElementState)

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
                position={element.style.position}
                size={element.style.size}
                onResize={(style) => setElement({...element, style})}
                lockAspectRatio={element.image !== undefined}
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
                        <Suspense fallback={<RectangleLoading selected={selected} />}>
                            <RectangleInner selected={selected} id={id} />
                        </Suspense>
                    </div>
                </Drag>
            </Resize>
        </RectangleContainer>
    )
}
