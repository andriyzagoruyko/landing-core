import types from './types'

const appSetLoading = (isLoading) => (
    { type: types.APP_LOADING, payload: { isLoading } }
)

export default {
    appSetLoading
}