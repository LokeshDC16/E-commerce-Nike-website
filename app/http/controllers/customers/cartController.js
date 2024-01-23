function cartController() {
    return {
        cart(req, res) {
            res.render('customers/cart')
        },
        update(req, res) {
            // let cart = {
            //     items: {
            //         shoesId: { items: shoesObject, qty:0},
            //     },
            //     totalQty: 0,
            //     totalPrice: 0
            // }

            //for the first time creating cart
            if (!req.session.cart) {     //check if there is cart present or not under session
                req.session.cart = {     //if not create cart
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }

            }
            let cart = req.session.cart

            console.log(req.body)

            //check if item does not exist in cart
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    items: req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }

            else{
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }

            return res.json({ totalQty: req.session.cart.totalQty })
        }
    }
}

module.exports = cartController 