import React from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import * as actions from '@/store/actions/global'
import { Button } from 'antd'
import './index.less'
import { IntlProvider, FormattedMessage } from 'react-intl'
import { BrowserRouter as Router } from 'react-router-dom'
import { connect } from 'react-redux'
import messages from '../../i18n'
import Header from '@/components/Header'

const Home = (props: any) => {
    const { global, setLang } = props

    const handleSetLang = () => {
        if (global.lang === 'zh') {
            setLang('en')
        }
        if (global.lang === 'en') {
            setLang('zh')
        }
    }
    return (
        <div>
            <Header />
            <div className="theme">
                <div>{global.lang}</div>
                <div>hello world</div>
                <IntlProvider locale={'en'} messages={messages['en']}>
                    <Router>
                        <FormattedMessage id="hello" />
                    </Router>
                </IntlProvider>
                <Button type="primary" onClick={handleSetLang}>
                    切换语言
                </Button>
            </div>
        </div>
    )
}

export default connect(
    (state: State) => ({ global: state.global }),
    (dispatch: Dispatch) => bindActionCreators<any, any>(actions, dispatch),
)(Home)
