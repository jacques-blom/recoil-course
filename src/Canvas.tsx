import {PageContainer} from './PageContainer'
import {Rectangle} from './components/Rectangle/Rectangle'
import {Toolbar} from './Toolbar'

function Canvas() {
    return (
        <PageContainer
            onClick={() => {
                console.log('Deselect all elements!')
            }}
        >
            <Toolbar />
            <Rectangle />
        </PageContainer>
    )
}

export default Canvas
