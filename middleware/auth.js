const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
  //Get Token from Header
  const token = req.header('x-auth-token')
  //check if no token
  if (!token) {
    return res.status(401).json({ msg: 'no token, authorization denied' })
  }

  //Verify Token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))
    console.log(decoded)
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}
