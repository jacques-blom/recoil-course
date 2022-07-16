import {Box} from '@chakra-ui/react'
import {getBorderColor, getImageDimensions} from '../../util'
import {useRecoilState, selectorFamily, useRecoilValue, useSetRecoilState} from 'recoil'
import {elementState} from './Rectangle'
import {useEffect} from 'react'
import {editPropertyState} from '../../EditProperties'

const imageSizeState = selectorFamily({
    key: 'imageSize',
    get: (src: string | undefined) => () => {
        if (src === undefined) return
        return getImageDimensions(src)
    }
})

export const RectangleInner = ({selected, id}: {selected: boolean, id: number} ) => {
    const element = useRecoilValue(elementState(id))
    const imageSize = useRecoilValue(imageSizeState(element.image?.src))
    const setSize = useSetRecoilState(editPropertyState({path: 'style.size', id}))
    console.log('imageSize', imageSize)

    useEffect(() => {
        if (!imageSize) return
        setSize(imageSize)
    }, [imageSize])

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
                backgroundImage={`url('${element.image?.src}')`}
                backgroundSize="cover"
            />
        </Box>
    )
}
