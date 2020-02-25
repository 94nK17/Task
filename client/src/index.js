import React  from 'react'
import ReactDom from 'react-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import reduxThunk from 'redux-thunk'
import reducers from './reducers'

import App from './App'


const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(reduxThunk)))



ReactDom.render(
    <Provider store = {store}>
        <App />
    </Provider>, 
    document.querySelector('#root')
)