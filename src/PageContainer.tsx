import {Box, Flex, Link, Text} from '@chakra-ui/react'

export const PageContainer: React.FC<{onClick: () => void}> = ({onClick, children}) => {
    return (
        <Flex direction="column" width="100vw" height="100vh" onClick={onClick}>
            <Box padding={3} textAlign="center" backgroundColor="yellow.100">
                <Text>This Excalidraw clone is part of my free Recoil course.</Text>
                <Text>You'll build this, and much more, in the course.</Text>
                <Text>
                    Access it now at 👉{' '}
                    <Link href="https://learnrecoil.com" target="_blank">
                        learnrecoil.com
                    </Link>{' '}
                    👈
                </Text>
            </Box>
            <Box flex={1} position="relative">
                {children}
            </Box>
        </Flex>
    )
}
