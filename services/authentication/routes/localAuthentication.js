export default function localAuthentication(req, res) {
  res.send(req.session);
}
