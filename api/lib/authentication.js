const { createHmac, randomBytes } = require('crypto')

genRandomString = (length) => {
  return randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
}

sha512 = (password, salt) => {
  return {
    salt: salt,
    passwordHash: createHmac('sha512', salt)
      .update(password)
      .digest('hex')
  }
}

module.exports = {
  genRandomString,
  sha512,
}
