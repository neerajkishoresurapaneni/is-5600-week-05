// orders.js
const cuid = require('cuid')
const db = require('./db')

// Define schema differently (rename fields slightly)
const OrderSchema = new db.Schema({
  _id: { type: String, default: cuid },
  email: { type: String, required: true }, // buyerEmail → email
  items: [{ // products → items
    type: String,
    ref: 'Product',
    required: true
  }],
  state: { // status → state
    type: String,
    default: 'NEW',
    enum: ['NEW', 'PROCESSING', 'FINISHED']
  }
})

const OrderModel = db.model('Order', OrderSchema)

// CRUD
async function createOrder(input) {
  const order = new OrderModel(input)
  await order.save()
  return await order.populate('items')
}

async function listOrders({ skip = 0, size = 20, productId, state } = {}) {
  const filters = {}
  if (productId) filters.items = productId
  if (state) filters.state = state
  return await OrderModel.find(filters)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(size)
}

async function getOrder(id) {
  return await OrderModel.findById(id).populate('items').exec()
}

async function editOrder(id, data) {
  return await OrderModel.findByIdAndUpdate(id, data, { new: true })
}

async function deleteOrder(id) {
  return await OrderModel.deleteOne({ _id: id })
}

module.exports = {
  createOrder,
  listOrders,
  getOrder,
  editOrder,
  deleteOrder
}
