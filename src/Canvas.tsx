import {createContext, useState} from 'react'
import {Element, Rectangle} from './components/Rectangle/Rectangle'
import {PageContainer} from './PageContainer'
import {Toolbar} from './Toolbar'

type ElementsContextType = {
    elements: Element[]
    addElement: () => void
    setElement: SetElement
}

export const ElementsContext = createContext<ElementsContextType>({
    elements: [],
    addElement: () => {},
    setElement: () => {},
})

type SelectedElementContextType = {
    selectedElement: number | null
    setSelectedElement: (index: number) => void
}

export const SelectedElementContext = createContext<SelectedElementContextType>({
    selectedElement: null,
    setSelectedElement: () => {},
})

export type SetElement = (indexToSet: number, newElement: Element) => void

function Canvas() {
    const [elements, setElements] = useState<Element[]>([])
    const [selectedElement, setSelectedElement] = useState<number | null>(null)

    const setElement: SetElement = (indexToSet, newElement) => {
        setElements(
            elements.map((element, index) => {
                if (indexToSet === index) return newElement
                return element
            }),
        )
    }

    const addElement = () => {
        setElements((elements) => {
            return [
                ...elements,
                {
                    style: {
                        position: {top: 100 + elements.length * 30, left: 100 + elements.length * 30},
                        size: {width: 100, height: 100},
                    },
                },
            ]
        })
    }

    return (
        <SelectedElementContext.Provider value={{selectedElement, setSelectedElement}}>
            <ElementsContext.Provider value={{elements, addElement, setElement}}>
                <PageContainer
                    onClick={() => {
                        setSelectedElement(null)
                    }}
                >
                    <Toolbar />
                    {elements.map((element, index) => (
                        <Rectangle key={index} element={element} index={index} />
                    ))}
                </PageContainer>
            </ElementsContext.Provider>
        </SelectedElementContext.Provider>
    )
}

export default Canvas
