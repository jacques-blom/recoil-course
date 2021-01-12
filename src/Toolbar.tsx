import {Box, Icon, IconButton} from '@chakra-ui/react'
import {Square} from 'react-feather'
import {useAddElement} from './state'

export const Toolbar = () => {
    const addElement = useAddElement()

    return (
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
                onClick={() => addElement()}
                aria-label="Add rectangle"
                icon={<Icon style={{width: 24, height: 24}} as={Square} />}
            />
        </Box>
    )
}
