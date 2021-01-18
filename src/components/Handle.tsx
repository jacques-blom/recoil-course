import {Box} from '@chakra-ui/react'
import {ResizeHandle} from 'react-resizable'
import {getBorderColor} from '../util'

type Position = {
    top?: number | string
    left?: number | string
    right?: number | string
    bottom?: number | string
}

export const Handle = ({placement, visible}: {placement: ResizeHandle; visible: boolean}) => {
    const size = 10

    const position: Position = {}

    if (placement.startsWith('n')) position.top = 0
    if (placement.startsWith('s')) position.bottom = 0
    if (placement.includes('w')) position.left = 0
    if (placement.includes('e')) position.right = 0

    if (placement === 'n' || placement === 's') position.left = '50%'
    if (placement === 'e' || placement === 'w') position.top = '50%'

    let cursor = `${placement}-resize`
    if (placement === 'n' || placement === 's') cursor = 'ns-resize'

    return (
        <Box
            position="absolute"
            style={{
                ...position,
                width: size - 2,
                height: size - 2,
                margin: -size / 2,
                cursor,
            }}
            border={`1px solid ${getBorderColor(visible)}`}
            transition="0.1s border-color ease-in-out"
            backgroundColor="white"
        />
    )
}
