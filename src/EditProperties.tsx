import {InputGroup, InputRightElement, NumberInput, NumberInputField, Text, VStack} from '@chakra-ui/react'
import produce from 'immer'
import _ from 'lodash'
import {selector, selectorFamily, useRecoilState, useRecoilValue} from 'recoil'
import {elementState, selectedElementState} from './components/Rectangle/Rectangle'
import {ImageInfo, ImageInfoFallback} from './components/ImageInfo'
import {Suspense} from 'react'

export const editProperty = selectorFamily<any, {path: string; id: number}>({
    key: 'editProperty',

    get: ({path, id}) => ({get}) => {
        const element = get(elementState(id))
        return _.get(element, path)
    },

    set: ({path, id}) => ({get, set}, newValue) => {
        const element = get(elementState(id))
        const newElement = produce(element, (draft) => {
            _.set(draft, path, newValue)
        })
        set(elementState(id), newElement)
    },
})

const editSize = selectorFamily<any, {dimension: 'width' | 'height'; id: number}>({
    key: 'editSize',

    get: ({dimension, id}) => ({get}) => {
        return get(editProperty({path: `style.size.${dimension}`, id}))
    },

    set: ({dimension, id}) => ({get, set}, newValue) => {
        const hasImage = get(editProperty({path: 'image', id})) !== undefined
        if (!hasImage) {
            set(editProperty({path: `style.size.${dimension}`, id}), newValue)
            return
        }

        const {width, height} = get(editProperty({path: 'style.size', id}))
        const aspectRatio = width / height

        if (dimension === 'width') {
            set(editProperty({path: 'style.size', id}), {
                width: newValue,
                height: Math.round(newValue / aspectRatio),
            })
        } else {
            set(editProperty({path: 'style.size', id}), {
                height: newValue,
                width: Math.round(newValue * aspectRatio),
            })
        }
    },
})

export const hasImageState = selector({
    key: 'hasImage',
    get: ({get}) => {
        const id = get(selectedElementState)
        if (id == null) return false
        return get(elementState(id)).image !== undefined
    },
})

export const EditProperties = () => {
    const selectedElement = useRecoilValue(selectedElementState)
    const hasImage = useRecoilValue(hasImageState)
    if (selectedElement == null) return null

    return (
        <Card>
            <Section heading="Position">
                <Property label="Top" path="style.position.top" id={selectedElement} />
                <Property label="Left" path="style.position.left" id={selectedElement} />
            </Section>
            <Section heading="Size">
                <SizeProperty label="Width" dimension="width" id={selectedElement} />
                <SizeProperty label="Height" dimension="height" id={selectedElement} />
            </Section>
            {hasImage && (
                <Section heading="Image">
                    <Suspense fallback={<ImageInfoFallback />}>
                        <ImageInfo />
                    </Suspense>
                </Section>
            )}
        </Card>
    )
}

const Section: React.FC<{heading: string}> = ({heading, children}) => {
    return (
        <VStack spacing={2} align="flex-start">
            <Text fontWeight="500">{heading}</Text>
            {children}
        </VStack>
    )
}

const SizeProperty = ({label, dimension, id}: {label: string; dimension: 'width' | 'height'; id: number}) => {
    const [value, setValue] = useRecoilState<number>(editSize({dimension, id}))
    return <PropertyInput label={label} value={value} onChange={setValue} />
}

const Property = ({label, path, id}: {label: string; path: string; id: number}) => {
    const [value, setValue] = useRecoilState<number>(editProperty({path, id}))
    return <PropertyInput label={label} value={value} onChange={setValue} />
}

const PropertyInput = ({label, value, onChange}: {label: string; value: number; onChange: (value: number) => void}) => {
    return (
        <div>
            <Text fontSize="14px" fontWeight="500" mb="2px">
                {label}
            </Text>
            <InputGroup size="sm" variant="filled">
                <NumberInput value={value} onChange={(_, value) => onChange(value)}>
                    <NumberInputField borderRadius="md" />
                    <InputRightElement pointerEvents="none" children="px" lineHeight="1" fontSize="12px" />
                </NumberInput>
            </InputGroup>
        </div>
    )
}

const Card: React.FC = ({children}) => (
    <VStack
        position="absolute"
        top="20px"
        right="20px"
        backgroundColor="white"
        padding={2}
        boxShadow="md"
        borderRadius="md"
        spacing={3}
        align="flex-start"
        onClick={(e) => e.stopPropagation()}
    >
        {children}
    </VStack>
)
