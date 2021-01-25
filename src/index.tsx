import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Canvas from './Canvas'
import {ChakraProvider} from '@chakra-ui/react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

ReactDOM.render(
    <React.StrictMode>
        <ChakraProvider>
            <Router>
                <Switch>
                    <Route>
                        <Canvas />
                    </Route>
                </Switch>
            </Router>
        </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('root'),
)
