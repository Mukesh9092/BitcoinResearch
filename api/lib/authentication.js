const { createHmac, randomBytes } = require('crypto')

exports.genRandomString = (length) => {
  return randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
}

exports.sha512 = (password, salt) => {
  return {
    salt: salt,
    passwordHash: createHmac('sha512', salt)
      .update(password)
      .digest('hex')
  }
}
