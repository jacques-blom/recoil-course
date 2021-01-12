import {Box, Icon, IconButton} from '@chakra-ui/react'
import {Square} from 'react-feather'
import {atom, useRecoilState, useSetRecoilState} from 'recoil'
import {Rectangle} from './Rectangle'
import {selectedElementState} from './state'

const elementsState = atom<number[]>({
    key: 'elements',
    default: [],
})

function App() {
    const [elements, setElements] = useRecoilState(elementsState)
    const setSelectedElement = useSetRecoilState(selectedElementState)

    return (
        <div style={{width: '100vw', height: '100vh'}} onClick={() => setSelectedElement(null)}>
            <Box
                position="absolute"
                top="20px"
                left="20px"
                backgroundColor="white"
                padding={2}
                boxShadow="md"
                borderRadius="md"
            >
                <IconButton
                    onClick={() => setElements([...elements, elements.length])}
                    aria-label="Add rectangle"
                    icon={<Icon style={{width: 24, height: 24}} as={Square} />}
                />
            </Box>
            {elements.map((id) => (
                <Rectangle id={id} key={id} />
            ))}
        </div>
    )
}

export default App
