
import { LOCATION_CHANGE } from 'connected-react-router'

export const HISTORY_EXTRACT = 'HISTORY_EXTRACT';

export const historyState = (history) => (store) => (next) => (action) => {
    if (action.type === LOCATION_CHANGE) {
        if (action.payload.action === 'POP'
            && !action.payload.isFirstRendering
            && history.location.state) {
            return next({
                type: HISTORY_EXTRACT,
                payload: { ...history.location.state }
            });
        }
    }

    return next(action)
}