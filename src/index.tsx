import React from 'react'
import { render } from 'react-dom'
import Routes from '@/routes'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
import store from '@/store'
import { Provider } from 'react-redux'
import 'normalize.css'
import './style/common.less'

const history = createBrowserHistory()
const App = () => <Router history={history}>{Routes()}</Router>

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root'),
)

if (module.hot) {
    module.hot.accept()
}
