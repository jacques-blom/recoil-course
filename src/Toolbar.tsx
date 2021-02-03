import {Icon, IconButton, VStack} from '@chakra-ui/react'
import {useContext} from 'react'
import {Square} from 'react-feather'
import {atom} from 'recoil'
import {ElementsContext} from './Canvas'

export const elementsState = atom<number[]>({
    key: 'elements',
    default: [],
})

export const Toolbar = () => {
    const {addElement} = useContext(ElementsContext)

    return (
        <VStack
            position="absolute"
            top="20px"
            left="20px"
            backgroundColor="white"
            padding={2}
            boxShadow="md"
            borderRadius="md"
            spacing={2}
        >
            <IconButton
                onClick={addElement}
                aria-label="Add rectangle"
                icon={<Icon style={{width: 24, height: 24}} as={Square} />}
            />
        </VStack>
    )
}
