import {atom, atomFamily, selectorFamily} from 'recoil'

const getCenteredCoordinates = (width: number, height: number) => {
    return {
        left: (window.innerWidth - width) / 2,
        top: (window.innerHeight - height) / 2,
    }
}

export const elementState = atomFamily({
    key: 'rectangle',
    default: () => {
        const {top, left} = getCenteredCoordinates(100, 100)
        return {top, left, width: 100, height: 100}
    },
})

export const selectedElementState = atom<number | null>({
    key: 'selectedElement',
    default: null,
})

export const isElementSelectedState = selectorFamily<boolean, number>({
    key: 'isElementSelected',
    get: (id) => ({get}) => {
        return get(selectedElementState) === id
    },
    set: (id) => ({set}, isSelected) => {
        set(selectedElementState, isSelected ? id : null)
    },
})
