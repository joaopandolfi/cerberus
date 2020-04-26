const router = require('express').Router();
const navigationRouter = require('./home')

router.use('/', navigationRouter)

router.get('*', function(req, res){
  res.render('404.hbs')
});

module.exports = router