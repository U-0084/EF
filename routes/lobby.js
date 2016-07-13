var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.render('lobby', {title: 'ロビー'});
});

module.exports = router;