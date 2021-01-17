
import PropTypes from 'prop-types';

export const column = PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    component: PropTypes.func
})

export const row = PropTypes.shape({
    id: PropTypes.number.isRequired
})