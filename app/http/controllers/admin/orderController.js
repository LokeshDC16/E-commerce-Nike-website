const order = require('../../../models/order')

const Order = require('../../../models/order')

// function orderController() {
//     return {
//         index(req, res) {
//             order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } }).populate('customerId', '-password').exec((err, orders) => {
//                 if (req.xhr) {
//                     return res.json(orders)
//                 }
//                 else {
//                     return res.render('admin/orders')
//                 }
//             })
//         }
//     }
// }

function orderController() {
    return {
        async index(req, res) {
            try {
                const orders = await Order.find({ status: { $ne: 'completed' } })
                    .sort({ 'createdAt': -1 })
                    .populate('customerId', '-password')
                    .exec();

                if (req.xhr) {
                    return res.json(orders);
                } else {
                    return res.render('admin/orders');
                }
            } catch (err) {
                // Handle any errors that occur during the database query
                console.error(err);
                return res.status(500).json({ error: 'An error occurred' });
            }
        }
    }
}

module.exports = orderController






//13917