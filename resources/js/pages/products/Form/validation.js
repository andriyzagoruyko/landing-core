const validate = values => {
    const errors = {}
    const requiredFields = [
        'title',
        'article',
        'price',
    ]

    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = 'Required'
        }
    })

    return errors;
}

export default validate;