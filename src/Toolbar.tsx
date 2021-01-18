import {Icon, IconButton, VStack} from '@chakra-ui/react'
import {Square} from 'react-feather'

export const Toolbar = () => {
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
                onClick={() => console.log('Add rectangle!')}
                aria-label="Add rectangle"
                icon={<Icon style={{width: 24, height: 24}} as={Square} />}
            />
        </VStack>
    )
}
