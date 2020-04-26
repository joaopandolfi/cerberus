const router = require('express').Router();
const navigationController = require('../controller/navigationController')

router.get('/', navigationController.Home)
router.get('/test', navigationController.Test)

module.exports = router