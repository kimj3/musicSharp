const router = require('express').Router();
const { OrderProduct } = require('../db/models');

module.exports = router;

function adminGatekeeper(req, res, next) {
  if (!req.user) {
    return res.status(401).send('You are not logged in');
  }
  else if (!req.user.isAdmin) {
    return res.status(403).send('You are not authorized to perform this action');
  }
  next();
}

router.get('/', adminGatekeeper, (req, res, next) => {
  OrderProduct.findAll()
    .then(orderProduct => res.json(orderProduct))
    .catch(next);
});

router.get('/:orderId', (req, res, next) => {
  OrderProduct.findAll({
    where: { orderId: req.params.orderId } })
    .then(orderProductsByOrderId => res.json(orderProductsByOrderId))
    .catch(next);
});