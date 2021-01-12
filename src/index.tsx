import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {RecoilRoot} from 'recoil'
import {ChakraProvider} from '@chakra-ui/react'

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root'),
)
