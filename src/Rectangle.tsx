import {Box} from '@chakra-ui/react'
import {useRecoilState, useRecoilValue} from 'recoil'
import {Drag} from './Drag'
import {Resize} from './Resize'
import {elementState, isElementSelectedState} from './state'
import {getBorderColor} from './util'

export const Rectangle = ({id}: {id: number}) => {
    const rectangle = useRecoilValue(elementState(id))
    const [isElementSelected, setElementSelected] = useRecoilState(isElementSelectedState(id))

    return (
        <Box
            position="absolute"
            style={{
                top: rectangle.top,
                left: rectangle.left,
                width: rectangle.width,
                height: rectangle.height,
            }}
            onMouseDown={() => setElementSelected(true)}
            onClick={(e) => e.stopPropagation()}
        >
            <Resize id={id}>
                <Drag id={id}>
                    <Box
                        position="absolute"
                        border={`1px solid ${getBorderColor(isElementSelected)}`}
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
                        />
                    </Box>
                </Drag>
            </Resize>
        </Box>
    )
}
