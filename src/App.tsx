import {PageContainer} from './PageContainer'
import {Rectangle} from './Rectangle/Rectangle'
import {Toolbar} from './Toolbar'

function App() {
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

export default App
