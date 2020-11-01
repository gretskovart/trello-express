const router = require('express').Router();
const loginService = require('./login.service');

router.route('/').post(async (req, res, next) => {
  try {
    const user = await loginService.getUser(req.body);
    const token = await loginService.signToken(user);

    res.send({ token });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
