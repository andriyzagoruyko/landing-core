import types from './types';
import { action } from '~s/ducks/helpers';

export default {
    setStatus: (entity, statuses) => action(entity, types.SET_STATUS, statuses),
}