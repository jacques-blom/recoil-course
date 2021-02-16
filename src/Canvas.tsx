import {useRecoilValue, useSetRecoilState} from 'recoil'
import {Rectangle, selectedElementState} from './components/Rectangle/Rectangle'
import {PageContainer} from './PageContainer'
import {elementsState, Toolbar} from './Toolbar'

function Canvas() {
    const elements = useRecoilValue(elementsState)
    const setSelectedElement = useSetRecoilState(selectedElementState)

    return (
        <PageContainer
            onClick={() => {
                setSelectedElement(null)
            }}
        >
            <Toolbar />
            {elements.map((id) => (
                <Rectangle key={id} id={id} />
            ))}
        </PageContainer>
    )
}

export default Canvas
