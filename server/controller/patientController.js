const PermissionLevelController = require('./permissionLevelController')
const constants = require('../configurations/constants')

const patientDao = require('../model/dao/patientDao')
const serviceMailer = require('../services/mailer')

const PatientController = {}

PatientController.GetById = (req,res) =>{
    let {id} = req.params

    patientDao.GetById(id)
    .then(r=>res.send(r))
    .catch(e=>res.send(e))
}

PatientController.SaveProntuary = (req,res) =>{
    let {id} = req.params 
    let {body} = req

    patientDao.SaveProntuary(id,body)
    .then(r=>res.send(r))
    .catch(e=>res.send(e))
}

PatientController.SendMail = (req,res) =>{
	let {email} = req.body
    let {id} = req.params
    // Check if user send e-mail 2 times
    serviceMailer.SendMail(id,email)
    //.then(r=>res.send({success:true}))
    //.catch(e=>res.send({success:false}))
    res.send({success:true})
}

module.exports = PatientController