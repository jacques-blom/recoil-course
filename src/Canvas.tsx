import {createContext, useState} from 'react'
import {Element, Rectangle} from './components/Rectangle/Rectangle'
import {PageContainer} from './PageContainer'
import {Toolbar} from './Toolbar'
import {atom, useRecoilValue, useSetRecoilState} from 'recoil'
import {EditProperties} from './EditProperties'

export const selectedElementState = atom<number | null>({
    key: 'selectedElement',
    default: null,
})

export const elementsState = atom<number[]>({
    key: 'elements',
    default: [],
})

function Canvas() {
    const setSelectedElement = useSetRecoilState(selectedElementState)
    const elements = useRecoilValue(elementsState)

    return (
            <PageContainer
                onClick={() => {
                    setSelectedElement(null)
                }}
            >
                <Toolbar />
                <EditProperties />
                {elements.map((id) => (
                    <Rectangle key={id} id={id} />
                ))}
            </PageContainer>
    )
}

export default Canvas
