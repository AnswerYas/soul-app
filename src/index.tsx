import React from 'react'
import ReactDom from 'react-dom'
import Routes from '@/routes'
import { createBrowserHistory } from 'history'
import { Router } from 'react-router-dom'
import 'normalize.css'
import './style/common.less'

const history = createBrowserHistory()
const App = () => <Router history={history}>{Routes()}</Router>

ReactDom.render(<App />, document.querySelector('#root'))

if (module.hot) {
    module.hot.accept()
}
