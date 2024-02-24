import { Category } from "../models/category.js";

export const addCategory = async (req, res, next) => {
  const category_name = req.body.categoryName;

  try {
    const existingCategory = await Category.findOne({
      where: { category_name: category_name },
    });
    if (existingCategory) {
      return res.status(422).json({ error: "category exists already!" });
    }
  } catch (err) {
    console.log(err);
  }

  const newCategory = await Category.create({
    category_name: category_name,
  })
    .then((newCategory) => {
      return res
        .status(200)
        .json({ message: "category created", Category: newCategory });
    })
    .catch((err) => console.log(err));
};

export const getCategories = async (req, res,next) => {
    try {
        const categories = await Category.findAll()

        if(!categories) {
            return res.status(404).json({message: "couldn't fetch categories"})
        }

        return res.status(201).json({categories})
    } catch(err) {
        return res.status(404).json({error: err})
    }
}

export const deleteCateoryById = async (req, res, next) => {
    try {
        const categoryId = req.params.id
        const cateogoryToBeDeleted = await Category.findByPk(categoryId)
        if(!cateogoryToBeDeleted) {
            return res.status(404).json({message: 'category to be deleted does not exist'})
        }
        await Category.destroy({ where: {categoryId: categoryId} }).then(() => {
            return res.status(200).json({message: "category deleted successfully!"})
        })

    } catch(err) {
        return res.status(404).json({error: err})
    }
}

export const editCategoryById = async (req, res, next) => {
    const id = req.params.id
    const updatedName = req.body.categoryName
    try {
        const existingCategory = await Category.findOne({ where: { categoryId: id } })
        if(!existingCategory) {
            return res.status(404).json({message: "category does not exist"})
        }
        const updatedCategory = await Category.update({ category_name: updatedName }, {where: {categoryId: id}})

        return res.status(201).json({ updatedCategory: {updatedCategory, updatedName} })
    } catch(err) {
        return res.status(400).json({error: err})
    }
}