import React, { Component } from 'react'
import { Button } from 'antd'
import './index.less'
import { IntlProvider, FormattedMessage } from 'react-intl'
import { BrowserRouter as Router } from 'react-router-dom'
import messages from '../../i18n'

class App extends Component {
    state = {
        lang: 'en'
    }
    handleSelect = () => {
        this.setState({
            lang: 'zh'
        })
    }
    render() {
        const {lang} = this.state
        return (
            <div className="theme">
                <div>ff2332</div>
                <div>hello worl</div>
                <IntlProvider
                    locale={lang}
                    messages={messages[lang]}
                >
                    <Router>
                        <FormattedMessage id="hello" />
                    </Router>
                </IntlProvider>
                <Button type="primary" onClick={this.handleSelect}>切换语言</Button>
            </div>
        )
    }
}

export default App
