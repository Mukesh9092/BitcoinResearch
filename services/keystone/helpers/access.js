const userIsAdmin = ({ authentication: { item: user } }) => {
  return Boolean(user && user.isAdmin)
}

const userOwnsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false
  }
  return { id: user.id }
}

const userIsAdminOrOwner = (auth) => {
  const isAdmin = userIsAdmin(auth)
  const isOwner = userOwnsItem(auth)
  return isAdmin || isOwner
}

module.exports = {
  userIsAdmin,
  userOwnsItem,
  userIsAdminOrOwner,
}
