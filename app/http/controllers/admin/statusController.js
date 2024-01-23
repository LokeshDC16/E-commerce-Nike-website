const Order = require('../../../models/order');

function statusController() {
    return {
        async update(req, res) {
            try {
                const result = await Order.updateOne(
                    { _id: req.body.orderId },
                    { status: req.body.status }
                );

                if (result.nModified === 0) {
                    // Handle the case where the order was not found or not updated
                    return res.redirect('/admin/orders');
                }

                //event emmitter
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('orderUpdated', { id: req.body.orderId, status: req.body.status })

                // Order updated successfully
                return res.redirect('/admin/orders');
            } catch (err) {
                // Handle any errors that occur during the update
                console.error(err);
                return res.redirect('/admin/orders');
            }
        }
    };
}

module.exports = statusController;
