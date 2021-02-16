import {atom, atomFamily, useRecoilState} from 'recoil'
import {Drag} from '../Drag'
import {RectangleContainer} from './RectangleContainer'
import {RectangleInner} from './RectangleInner'

export type ElementStyle = {
    position: {top: number; left: number}
    size: {width: number; height: number}
}

export type Element = {style: ElementStyle}

const elementState = atomFamily<Element, number>({
    key: 'element',
    default: {
        style: {
            position: {top: 0, left: 0},
            size: {width: 200, height: 200},
        },
    },
})

export const selectedElementState = atom<number | null>({
    key: 'selectedElement',
    default: null,
})

export const Rectangle = ({id}: {id: number}) => {
    const [element, setElement] = useRecoilState(elementState(id))
    const [selectedElement, setSelectedElement] = useRecoilState(selectedElementState)

    return (
        <Drag
            position={element.style.position}
            onDrag={(position) => {
                setElement({
                    style: {
                        ...element.style,
                        position,
                    },
                })
            }}
        >
            <div>
                <RectangleContainer
                    position={element.style.position}
                    size={element.style.size}
                    onSelect={() => {
                        setSelectedElement(id)
                    }}
                >
                    <RectangleInner selected={selectedElement === id} />
                </RectangleContainer>
            </div>
        </Drag>
    )
}
