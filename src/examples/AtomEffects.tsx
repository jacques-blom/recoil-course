import {Button} from '@chakra-ui/button'
import {Input} from '@chakra-ui/input'
import {Box, Divider, Heading, VStack} from '@chakra-ui/layout'
import produce from 'immer'
import React, {useState} from 'react'
import {atom, DefaultValue, useRecoilState, useResetRecoilState} from 'recoil'

type ItemType = {
    label: string
    checked: boolean
}

const shoppingListState = atom<ItemType[]>({
    key: 'shoppingList',
    default: [],
    effects_UNSTABLE: [
        ({onSet, setSelf}) => {
            const storedItems = localStorage.getItem('shoppingList')
            if (storedItems != null) {
                setSelf(JSON.parse(storedItems))
            }

            onSet((newItems) => {
                if (newItems instanceof DefaultValue) {
                    localStorage.removeItem('shoppingList')
                } else {
                    localStorage.setItem('shoppingList', JSON.stringify(newItems))
                }
            })
        },
    ],
})

export const AtomEffects = () => {
    const [items, setItems] = useRecoilState(shoppingListState)
    const resetList = useResetRecoilState(shoppingListState)

    const toggleItem = (index: number) => {
        setItems(
            produce(items, (draftItems) => {
                draftItems[index].checked = !draftItems[index].checked
            }),
        )
    }

    const insertItem = (label: string) => {
        setItems([...items, {label, checked: false}])
    }

    return (
        <Container onClear={() => resetList()}>
            {items.map((item, index) => (
                <Item
                    key={item.label}
                    label={item.label}
                    checked={item.checked}
                    onClick={() => {
                        toggleItem(index)
                    }}
                />
            ))}
            <NewItemInput
                onInsert={(label) => {
                    insertItem(label)
                }}
            />
        </Container>
    )
}

const Container: React.FC<{onClear: () => void}> = ({children, onClear}) => {
    return (
        <Box display="flex" flexDir="column" alignItems="center" pt={10}>
            <Box width="400px" backgroundColor="yellow.100" p={5} borderRadius="lg">
                <Heading size="lg" mb={4}>
                    Shopping List
                </Heading>
                <VStack spacing={3} divider={<Divider borderColor="rgba(86, 0, 0, 0.48)" />}>
                    {children}
                </VStack>
            </Box>
            <Button variant="link" mt={3} onClick={onClear}>
                Clear list
            </Button>
        </Box>
    )
}

type ItemProps = {
    label: string
    checked: boolean
    onClick: () => void
}

const Item = ({label, checked, onClick}: ItemProps) => {
    return (
        <Box
            rounded="md"
            textDecoration={checked ? 'line-through' : ''}
            opacity={checked ? 0.5 : 1}
            _hover={{textDecoration: 'line-through'}}
            cursor="pointer"
            width="100%"
            onClick={onClick}
        >
            {label}
        </Box>
    )
}

const NewItemInput = ({onInsert}: {onInsert: (label: string) => void}) => {
    const [value, setValue] = useState('')

    return (
        <Input
            value={value}
            placeholder="New item"
            padding={0}
            height="auto"
            border="none"
            _focus={{border: 'none'}}
            _placeholder={{color: 'rgba(86, 0, 0, 0.48)'}}
            onChange={(e) => {
                setValue(e.currentTarget.value)
            }}
            onKeyPress={({key}) => {
                if (key === 'Enter') {
                    onInsert(value)
                    setValue('')
                }
            }}
        />
    )
}
