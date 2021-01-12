import {Resizable, ResizeHandle} from 'react-resizable'
import {useRecoilState, useRecoilValue} from 'recoil'
import {Handle} from './Handle'
import {elementState, isElementSelectedState} from './state'

const handlePlacements: ResizeHandle[] = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw']

export const Resize: React.FC<{id: number}> = ({id, children}) => {
    const [element, setElement] = useRecoilState(elementState(id))
    const isElementSelected = useRecoilValue(isElementSelectedState(id))

    return (
        <Resizable
            width={element.width}
            height={element.height}
            onResize={(_, {size, handle}) => {
                let topDiff = 0
                if (handle.includes('n')) {
                    topDiff = element.height - size.height
                }

                let leftDiff = 0
                if (handle.includes('w')) {
                    leftDiff = element.width - size.width
                }

                setElement({
                    ...element,
                    width: Math.round(size.width),
                    height: Math.round(size.height),
                    top: element.top + topDiff,
                    left: element.left + leftDiff,
                })
            }}
            resizeHandles={handlePlacements}
            handle={(placement) => (
                <div>
                    <Handle placement={placement} visible={isElementSelected} />
                </div>
            )}
        >
            <div>{children}</div>
        </Resizable>
    )
}
