 const express = require('express')
 const router = express.Router()
 const {register, login, getAllUsers, getUser, updateUser, deleteUser} = require('../controllers/authController')

 const authProtect = require('../middlewares/authMiddleware')
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/getUsers').get( authProtect,getAllUsers)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)


 module.exports = router