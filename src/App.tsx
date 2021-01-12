import {Box, Icon, IconButton} from '@chakra-ui/react'
import {Square} from 'react-feather'
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil'
import {PageContainer} from './PageContainer'
import {Rectangle} from './Rectangle'
import {elementsState, selectedElementState} from './state'
import {Toolbar} from './Toolbar'

function App() {
    const elements = useRecoilValue(elementsState)
    const setSelectedElement = useSetRecoilState(selectedElementState)

    return (
        <PageContainer onClick={() => setSelectedElement(null)}>
            <Toolbar />
            {elements.map((id) => (
                <Rectangle id={id} key={id} />
            ))}
        </PageContainer>
    )
}

export default App
