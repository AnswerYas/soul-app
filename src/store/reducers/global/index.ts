import { AnyAction } from 'redux'
import { GLOABAL_SET_LANG } from '@/store/actions/global'

const initialState = {
    lang: 'zh',
}

export default (state = initialState, {type, payload}:AnyAction) => {
    switch (type) {
        case GLOABAL_SET_LANG:
            return { ...state, lang: payload }
        default:
            return state
    }
}
