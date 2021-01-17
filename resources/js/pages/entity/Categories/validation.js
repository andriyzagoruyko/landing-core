export default values => {
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