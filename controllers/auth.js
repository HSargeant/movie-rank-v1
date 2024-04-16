import passport from 'passport';

export function logout(req, res) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy((err) => {
      if (err) console.log('Error : Failed to destroy the session during logout.', err);
      req.user = null;
      res.send({ success: true });
    });
  });
}
export function getUser(req, res) {
  res.json(req.user || null);
}