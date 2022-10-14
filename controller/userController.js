const { User } = require('../models/index')
const bcrypt = require('bcryptjs')

class userController {
    static loginForm(req, res){
        const { error } = req.query
        res.render('formLogin', { error })
    }
    static registerForm(req, res){
        res.render('formRegister')
    }
    static postRegister(req, res){
        const {username, email, password, role } = req.body

        User.create({ username, email, password, role})
        .then(newUser => {
            res.redirect('/login')
        })
        .catch(err => res.send(err))
    }
    static postLogin(req, res) {
        const { username, password } = req.body
    
    User.findOne({ where: { username } })
    .then(user => {
        if (user) {
            const isvalidPassword = bcrypt.compareSync(password, user.password)

            if (isvalidPassword) {
                req.session.userId = user.id
                req.session.role = user.role
                return res.redirect('/home')
            } else {
                const error = "Invalid username/password"
                return res.redirect(`/login?error=${error}`)
            }
        } else {
            const error = "Invalid username/password"
            return res.redirect(`/login?error=${error}`)
        }
    })
    .catch(err => res.send(err))

    } 
    static getlogOut(req, res) {
        req.session.destroy((err) => {
            if (err) res.send(err)
            else {
                res.redirect('/login')
            }
        })
    }

}

module.exports = userController