const express = require("express")
const adminController = require("../controller/adminController")
const userController = require("../controller/userController")
const router = express.Router()

router.get('/register', userController.registerForm)
router.post('/register', userController.postRegister)

router.get('/login', userController.loginForm)
router.post('/login', userController.postLogin)

router.get('/logout', userController.getlogOut)

router.get('/admin', (req,res) => res.render('admin'))
// router.get('/admin/user', (req,res) => res.render('admin-usertable'))

router.get("/add", adminController.renderadd)
router.post('/add', adminController.handleadd)
router.get('/admin/investment', adminController.readInventsments)
router.get('/admin/user', adminController.readuser)
router.get('/admin/investment/:id', adminController.getInvestmentId)
router.use(function (req, res, next) {
    if(!req.session.userId) {
        const error = "Please Login First"
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})

router.use(function (req, res, next) {
    if(req.session.userId && req.session.role === 'admin') {
        res.redirect('/admin/investment')
    } else {
        next()
    }
    // console.log(('Time:', Date.now()))
    // next()
})

router.get('/home', (req,res) => res.render('home'))
router.get('/customers', (req,res) => res.render('customers'))
router.get('/admin/user/delete/:id', adminController.deleteUser)

module.exports = router