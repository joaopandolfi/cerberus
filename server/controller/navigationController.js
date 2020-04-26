const constants = require('../configurations/constants')
const pass = require('../configurations/pass')

const NavigationController = {}



// ==> PAGES
NavigationController.Home = (req,res) =>{
    res.render(`home.hbs`)
}


NavigationController.Test = (req,res) =>{
	res.render("test.hbs")
}

NavigationController.TryalPage = (req,res) =>{
	res.render("404.hbs")
}

module.exports = NavigationController
