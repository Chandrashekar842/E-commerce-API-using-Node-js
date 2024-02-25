import { Product } from "../models/product.js";
import { Category } from "../models/category.js";
import { User } from "../models/user.js";

export const addProduct = async (req, res, next) => {
  const { title, price, description, itemsAvailable, categoryId } = req.body;
  const user = req.user;

  const loggedInUser = await User.findOne({ where: { id: user.id } });

  if (loggedInUser.isAdmin === false) {
    return res
      .status(402)
      .json({ message: "Has to be Admin in order to add Product" });
  }

  try {
    const existingCategory = await Category.findByPk(categoryId);

    if (!existingCategory) {
      return res.status(404).json({ message: "Category Doesn't exist!" });
    }

    Product.create({
      title,
      price,
      description,
      itemsAvailable,
      categoryCategoryId: categoryId,
    })
      .then((newProduct) => {
        return res.status(201).json({
          message: "product created Successfully",
          product: newProduct,
        });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const deleteProductById = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const deleteProduct = await Product.findByPk(productId);
    if (!deleteProduct) {
      return res.status(404).json({ message: "product doesn't exist" });
    }
    await Product.destroy({ where: { productId: productId } }).then(() => {
      return res.status(200).json({ message: "Product deleted successfully" });
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    if (!products) {
      return res.status(401).json({ message: "No products to fetch!" });
    }

    return res.status(201).json({ products });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const getProductById = async (req, res, next) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    return res.status(200).json({ product });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const getProductsByCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const category = await Category.findByPk(categoryId);

    if (!category) {
      return res.statsu(404).json({ message: "Category doesnot exist!" });
    }

    const products = await Product.findAll({
      where: { categoryCategoryId: categoryId },
    });

    if (!products) {
      return res
        .status(200)
        .json({ message: "No products to fetch in this category" });
    }

    return res
      .status(200)
      .json({ category: category.category_name, products: products });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const editProductById = async (req, res, next) => {
  const productId = req.params.productId;
  const {
    updatedTitle,
    updatedPrice,
    updatedDescription,
    updatedItemsAvailable,
    updatedCategoryId,
  } = req.body;

  try {
    const editProduct = await Product.findByPk(productId);

    if (!editProduct) {
      return res.status(404).json({ message: "Product doesn't exist" });
    }
    const updatedProduct = await Product.update({
      title: updatedTitle,
      price: updatedPrice,
      description: updatedDescription,
      itemsAvailable: updatedItemsAvailable,
      categoryCategoryId: updatedCategoryId
    }, { where: { productId: productId } });

    return res.status(200).json({ message: 'Product updated successfully' })
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};
