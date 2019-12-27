import React from 'react'
import {Menu} from 'antd'
import './index.less'

const Logo = () => {
    return (
        <div>logo</div>
    )
}

const SystemInfo = () => {
    return (
        <div className="system-info">
            <div>email</div>
            <div>language</div>
            <div>user</div>
        </div>
    )
}

const Header = () => {
    return(
        <div className="header">
            <Logo />
            <Menu theme='dark'>
                <Menu.Item>
                    Home
                </Menu.Item>
            </Menu>
            <SystemInfo />
        </div>
    )
}

export default Header