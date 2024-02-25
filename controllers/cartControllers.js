import { Cart } from "../models/cart.js";
import { CartItem } from "../models/cart-items.js"; 
import { User } from "../models/user.js";
import { Product } from "../models/product.js";

export const getCart = async (req, res, next) => {
    const user = req.user;
    const loggedInUser = await User.findOne({ where: { id: user.id } });
    let fetchedCart
    loggedInUser.getCart()
        .then(cart => {
            fetchedCart = cart.dataValues
            return cart.getProducts()
        })
        .then(products => {
            return res.status(200).json({ products })
        })
        .catch(err => console.log(err))
}

export const postCart = async (req, res, next) => {
    const productId = req.body.productId
    const user = req.user;
    const loggedInUser = await User.findOne({ where: { id: user.id } });

    try {
        const fetchedCart = await loggedInUser.getCart()

        const products = await fetchedCart.getProducts({ where: {productId: productId} })
        let newQuantity = 1
        let product
        if(products.length > 0) {
            let existingProductId = products[0].dataValues.productId
            let oldQuantity = products[0].dataValues.cartitem.dataValues.quantity
            product = await Product.findByPk(existingProductId)
            if(product) {
                newQuantity = oldQuantity + 1
            }
        } else {
            product = await Product.findByPk(productId)
        }
        if(product.itemsAvailable > 0) {
            let balance = product.itemsAvailable - 1
            if(balance === 0) {
                return res.status(200).json({ message: "Product out of stock" })
            }
            await Product.update({ itemsAvailable: balance }, {where: { productId: productId} })
            await fetchedCart.addProduct(product, { through: { quantity: newQuantity } })
        } 

        return res.status(200).json({ message: "Product added to the cart" })

    } catch(err) {
        console.log(err);
        return res.status(500).json({ err })
    }
}

export const deleteProductFromCart = async (req, res, next) => {
    const productId = req.params.productId

    const user = req.user;
    const loggedInUser = await User.findOne({ where: { id: user.id } });    

    const fetchedCart = await loggedInUser.getCart()

    const products = await fetchedCart.getProducts({where: {productId: productId}})

    const product = products[0]

    let quantity = product.dataValues.cartitem.dataValues.quantity

    const actualProduct = await Product.findByPk(productId)

    await product.cartitem.destroy().then(() => {
        Product.update({itemsAvailable: actualProduct.itemsAvailable + quantity}, {where: {productId: productId}})
        return res.status(200).json({ message: "product deleted from cart" })
    }).catch(err => {
        console.log(err)
    })
}