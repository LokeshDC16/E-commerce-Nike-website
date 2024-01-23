//factory functions - creates , returns object
//closures

const Products = require('../../models/products')

function homeController() {
    return {
        async index(req, res) {

            const shoes = await Products.find()
            // console.log(shoes)
            return res.render('home', { shoes: shoes})




            // Products.find().then(function (shoes) { //we can give anythinh name instead of shoes
            //     console.log(shoes)
            //     return res.render('home', { shoes: shoes})
            // })
        }
    }
}

module.exports = homeController 