const {Types} = require('mongoose')

const validateMongoId = (id) => {
    const isValid = Types.ObjectId.isValid(id)
    if (!isValid) {
        throw new Error('Invalid ID')
    }
}

module.exports = validateMongoId