const bcrypt = require('bcrypt')

const generatePassword = async (password) => {
    try {
        let passwordHash = await bcrypt.hash(password, 5)
        return passwordHash
    } catch (error) {
        console.log(error)
    }
}

const validatePassword = async(inputPassword, passwordHashFromDB) => {
    try {
        let isMatch = await bcrypt.compare(inputPassword, passwordHashFromDB)
        return isMatch
    } catch (error) {
        console.log(error)
    }
}

module.exports = { generatePassword, validatePassword}