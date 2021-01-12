import {DraggableCore} from 'react-draggable'
import {useSetRecoilState} from 'recoil'
import {elementState} from './state'

export const Drag: React.FC<{id: number}> = ({id, children}) => {
    const setRectangle = useSetRecoilState(elementState(id))

    return (
        <DraggableCore
            onDrag={(e: any) => {
                setRectangle((rectangle) => ({
                    ...rectangle,
                    left: e.movementX + rectangle.left,
                    top: e.movementY + rectangle.top,
                }))
            }}
        >
            {children}
        </DraggableCore>
    )
}
