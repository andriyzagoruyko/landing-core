import { useState, useCallback } from 'react';

const useSelected = (entities) => {
    const [selected, setSelected] = useState([]);

    const handleSelect = useCallback((id) => {
        setSelected(!selected.includes(id)
        ? [...selected].concat([id])
        : selected.filter(i => i !== id));
    }, [selected, entities]);

    const handleMultipleSelect = useCallback(() => {
        setSelected(selected.length ? [] : entities.map(e => e.id));
    }, [selected, entities]);

    return {
        selected,
        setSelected,
        handleSelect,
        handleMultipleSelect,
    }
}

export default useSelected;