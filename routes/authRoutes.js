 const express = require('express')
 const router = express.Router()
 const {
    register,
    login,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    blockUser,
    unblockUser,
    handleRefreshToken,
    logout,
    updatePassword,
    forgotPasswordToken
    
    } = require('../controllers/authController')

const {authProtect, isAdmin} = require('../middlewares/authMiddleware')
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/forgotPassword').post(forgotPasswordToken)
router.route('/getUsers').get( authProtect,getAllUsers)
router.route('/refresh').get(handleRefreshToken)
router.route('/logout').get(logout)
router.route('/updatePassword').patch(authProtect ,updatePassword)
router.route('/blockUser/:id').patch( authProtect,isAdmin,blockUser)
router.route('/unblockUser/:id').patch( authProtect,isAdmin,unblockUser)
router.route('/:id').get(authProtect,isAdmin ,getUser).patch(authProtect ,updateUser).delete( authProtect,deleteUser)

 module.exports = router