const Order = require("../../models/order");

exports.updateOrder = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId, "orderStatus.type": req.body.type },
    {
      $set: {
        "orderStatus.$": [
          { type: req.body.type, date: new Date(), isCompleted: true },
        ],
      },
    }
  ).exec((error, order) => {
    if (error) return res.status(400).json({ error });
    if (order) {
      res.status(201).json({ order });
    }
  });
};

exports.getCustomerOrders = async (req, res) => {
  let id = req.params.id
  // const orders = await Order.find({})
  //   .populate("items.productId", "name")
  //   .exec();

  const orders = await Order.find({
    'items.sellerId': id
  })
    // .populate('user', 'name email') // Optionally populate the 'user' field with specific fields
    // .populate('items.productId', 'name price');

  res.status(200).json({ orders });
};
