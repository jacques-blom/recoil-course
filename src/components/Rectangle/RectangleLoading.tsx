import {Box, Spinner} from '@chakra-ui/react'
import {getBorderColor} from '../../util'

export const RectangleLoading = ({selected}: {selected: boolean}) => {
    return (
        <Box
            position="absolute"
            border={`1px solid ${getBorderColor(selected)}`}
            transition="0.1s border-color ease-in-out"
            width="100%"
            height="100%"
            display="flex"
            padding="2px"
        >
            <Box
                flex="1"
                border="3px dashed #101010"
                borderRadius="255px 15px 225px 15px/15px 225px 15px 255px"
                backgroundColor="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Spinner size="lg" thickness="3px" />
            </Box>
        </Box>
    )
}
