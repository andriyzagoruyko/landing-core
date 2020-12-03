
import { APP_LOADING } from '../actionTypes/app'

const setLoading = (isLoading) => {
    return {
        type: APP_LOADING,
        payload: isLoading
    }
}

export { setLoading }