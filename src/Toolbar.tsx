import {Icon, IconButton, VStack} from '@chakra-ui/react'
import {Folder, GitHub, Save, Square} from 'react-feather'
import {filePersist} from './FilePersist'
import {useAddElement} from './state'

export const Toolbar = () => {
    const addElement = useAddElement()

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
                onClick={() => addElement()}
                aria-label="Add rectangle"
                icon={<Icon style={{width: 24, height: 24}} as={Square} />}
            />
            <IconButton
                onClick={() => filePersist.openFile()}
                aria-label="Open drawing"
                icon={<Icon style={{width: 24, height: 24}} as={Folder} />}
            />
            <IconButton
                onClick={() => filePersist.saveFile()}
                aria-label="Save drawing"
                icon={<Icon style={{width: 24, height: 24}} as={Save} />}
            />
            <IconButton
                as="a"
                aria-label="View on GitHub"
                icon={<Icon style={{width: 24, height: 24}} as={GitHub} />}
                href="https://github.com/jacques-blom/recoil-course"
            />
        </VStack>
    )
}
