const PermissionLevelController = require('./permissionLevelController')
const constants = require('../configurations/constants')

//const daoAux = require('../model/dao/auxDao')
//const inspectionService = require('../services/inspectService')

const FormController = {}


function getUserPayload(req){
    return {
        name:req.session.name,
        permission: req.session.permission,
        userID: req.session.userID
    }
}


module.exports = FormController