export const GLOABAL_SET_LANG = 'GLOABAL_SET_LANG'
import { Dispatch } from 'redux'

export const setLang = (lang: string) => (dispatch: Dispatch) => {
    dispatch({
        type: GLOABAL_SET_LANG,
        payload: lang,
    })
}
