interface Global {
    lang: string
}

interface Params {
    [propName: string]: any
}

interface State {
    global: Global
}

type Options = {
    label: string
    value: string | number
}[]

interface HttpResponse<D> {
    success: boolean
    data: D
    message: string
}

interface LooseObject {
    [key: string]: any
}
