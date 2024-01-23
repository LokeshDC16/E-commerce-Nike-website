//importing
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController') //customer order controller
const adminOrderController = require('../app/http/controllers/admin/orderController') //admin oreder controller
const statusController = require('../app/http/controllers/admin/statusController')

//middlewares
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')

function initRoutes(app) {
    app.get('/', homeController().index)
    // (req, res) => {
    //     res.render('home')
    // }

    app.get('/login', guest, authController().login)
    // (req, res) => {
    //     res.render('auth/login')
    // }

    app.post('/login', authController().postLogin)

    app.get('/register', guest, authController().register)
    // (req, res) => {
    //     res.render('auth/register')
    // }
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)


    app.get('/cart', cartController().cart)
    // (req, res) => {
    //     res.render('customers/cart')
    // }

    app.post('/update-cart', cartController().update)

    //customer routes

    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)

    app.get('/customer/orders/:id', auth, orderController().show)  //for unique id

    //admin routes
    app.get('/admin/orders', admin, adminOrderController().index)

    //status change
    app.post('/admin/order/status', admin, statusController().update)

}

module.exports = initRoutes