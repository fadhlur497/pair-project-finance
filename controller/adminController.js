const { User , Profile, Investment } = require("../models/index")
const convertsalary = require('../helpers/convertSalary')

class adminController {
    static readInventsments(req, res) {
        Investment.findAll()
        .then((data) => {
            res.render("admin-invenstmentTable", { data })
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static readuser(req, res) {
        User.findAll()
        .then((data) => {
            res.render("user", { data })
        })
        .catch((err) => {
            res.send(err)
        })
    }
    static renderadd (request, response){
        response.render('addfromuser')
    }

    static handleadd (request, response){
        console.log(request.body);
        const { username, email, role, BankBalance, password} = request.body
        User.create({username, email, role, BankBalance, password})
        .then((user) => {
            response.redirect('/admin/user')
        })
        .catch((err) => {
            // if (err.name == "SequelizeValidationError") {
            //     err = err.errors.map(el => el.message)
            // }
            // console.log(err);
            response.send(err)
            // console.log(err);
        })
    }
    static deleteUser(req, res) {
		const id = req.params.id
		User.destroy({            
            where: {
            id: id
        }})
		.then(data => {
			console.log(data);
			res.redirect('/admin/user')
		})
		.catch(err => {
			console.log(err);
			res.send(err)
		})
	}
    static getInvestmentId (request, response) {
        let id = +request.params.id
        Investment.findByPk(id, {
            attributes: ['id', 'name', 'amount'],
            include: {
                model: User,
                attributes: ['id','username', 'email', 'role', 'BankBalance']
            }  
        })
        .then((data) => {
            response.render('investmentId', { data }) 
            // response.send(data)
        })
        .catch((err) => {
            response.send(err)
            console.log(err);
        })
    }
}

module.exports = adminController