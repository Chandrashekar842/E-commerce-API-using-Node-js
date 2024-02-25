import { Order } from "../models/order.js";
import { OrderItem } from "../models/order-items.js";
import { User } from "../models/user.js";

export const postOrder = async (req, res, next) => {
  const user = req.user;
  const loggedInUser = await User.findOne({ where: { id: user.id } });

  const fetchedCart = await loggedInUser.getCart();

  const products = await fetchedCart.getProducts();

  await loggedInUser
    .createOrder()
    .then((order) => {
      return order.addProducts(
        products.map((product) => {
          product.orderitem = { quantity: product.cartitem.quantity };
          return product;
        })
      );
    })
    .then(() => {
      return fetchedCart.setProducts(null);
    })
    .then(() => {
      return res.status(200).json({ message: "order placed successfully" });
    })
    .catch((err) => console.log(err));
};

export const getOrderDetailsById = async (req, res, next) => {
  const orderId = req.params.orderId;
  const user = req.user;
  const loggedInUser = await User.findOne({ where: { id: user.id } });

  const orders = await loggedInUser
    .getOrders({ where: { orderId: orderId }, include: ["products"] })

  const orderDetails = {
    orderId: orders[0].orderId,
    products: orders[0].products,
  };

  return res.status(200).json({ orderDetails });
};

export const getOrderHistory = async (req, res, next) => {
    const user = req.user;
    const loggedInUser = await User.findOne({ where: { id: user.id } });

    const orders = await loggedInUser.getOrders({include: ['products']})

    const orderDetails = orders.map(order => {
        return { ...order.dataValues }
    })

    return res.status(200).json({ orderDetails })
}