import {InputGroup, InputRightElement, NumberInput, NumberInputField, Text, VStack} from '@chakra-ui/react'
import produce from 'immer'
import _ from 'lodash'
import {selectorFamily, useRecoilState, useRecoilValue} from 'recoil'
import {elementState, selectedElementState} from './components/Rectangle/Rectangle'

const editProperty = selectorFamily<number | null, string>({
    key: 'editProperty',

    get: (path) => ({get}) => {
        const selectedElement = get(selectedElementState)
        if (selectedElement == null) return null

        const element = get(elementState(selectedElement))
        return _.get(element, path)
    },

    set: (path) => ({get, set}, newValue) => {
        const selectedElement = get(selectedElementState)
        if (selectedElement == null) return

        const element = get(elementState(selectedElement))
        const newElement = produce(element, (draft) => {
            _.set(draft, path, newValue)
        })
        set(elementState(selectedElement), newElement)
    },
})

export const EditProperties = () => {
    const selectedElement = useRecoilValue(selectedElementState)
    if (selectedElement == null) return null

    return (
        <Card>
            <Section heading="Position">
                <Property label="Top" property="style.position.top" />
                <Property label="Left" property="style.position.left" />
            </Section>
            <Section heading="Size">
                <Property label="Width" property="style.size.width" />
                <Property label="Height" property="style.size.height" />
            </Section>
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

const Property = ({label, property}: {label: string; property: string}) => {
    const [value, setValue] = useRecoilState(editProperty(property))
    if (value == null) return null

    return (
        <div>
            <Text fontSize="14px" fontWeight="500" mb="2px">
                {label}
            </Text>
            <InputGroup size="sm" variant="filled">
                <NumberInput value={value} onChange={(_, value) => setValue(value)}>
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
