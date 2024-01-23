const Order = require('../../../models/order')
const moment = require('moment')

function orderController() {
    return {
        async store(req, res) {
            //validate request
            const { phone, address } = req.body
            if (!phone || !address) {
                req.flash('error', 'All fields are required')
                return res.redirect('/cart')
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            })
            // order.save().then(result => {
            //     Order.populate(result, { path: 'customerId' }, (err, placedOrder) => {
            //         req.flash('success', 'Order placed successfully')
            //         req.session.cart.items = [];

            //         //emit
            //         //event emmitter
            //         const eventEmitter = req.app.get('eventEmitter')
            //         eventEmitter.emit('orderPlaced', placedOrder)
            //         return res.redirect('/customer/orders')
            //     })
            // }).catch(err => {
            //     req.flash('error', 'Something went wrong')
            //     return res.redirect('/cart')
            // })

            await order.save()

            // Populate the order with its customer
            await order.populate('customerId')

            // Set the flash success message
            req.flash('success', 'Order placed successfully')

            // Empty the cart
            req.session.cart.items = []

            // Emit the orderPlaced event
            const eventEmitter = req.app.get('eventEmitter')
            eventEmitter.emit('orderPlaced', order)

            // Redirect the user to their orders page
            return res.redirect('/customer/orders')
        },

        async index(req, res) {
            const orders = await Order.find({
                customerId: req.user._id
            },
                null,
                {
                    sort: { 'createdAt': -1 }
                })
            // res.header('Cache-Control', 'no-cache , private , no-storemust-revalidate , max-scale=0 , post-check=0 ; pre-check=0')
            res.render('customers/orders', { orders: orders, moment: moment })
        },

        async show(req, res) {
            const order = await Order.findById(req.params.id)
            // Authorize user
            if (req.user._id.toString() === order.customerId.toString()) {
                return res.render('customers/singleOrder', { order })
            }
            return res.redirect('/')
        }
    }
}

module.exports = orderController