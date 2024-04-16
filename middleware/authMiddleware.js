export function ensureAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.send({ "user": false })
  }
}
export function ensureGuest(req, res, next) {
  if (!req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/')
  }
}
  