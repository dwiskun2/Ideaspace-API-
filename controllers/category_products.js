const Category = require('../models/category_product');   
const Product = require('../models/product');






module.exports = {
    //validation: done
    index: async (req, res, next) => {
        const categories = await Category.find({});
        res.status(200).json(categories);
    },
    //validation: done
    newCategory: async (req, res, next) => {
        const newCategory = new Category(req.value.body);
        const category = await newCategory.save();
        res.status(201).json(category);
    },
    //validation: done
    getCategory: async (req, res, next) => {      
        const { categoryId } = req.value.params;
        const category = await Category.findOne({ _id: req.value.params.categoryId })
        .populate('products')
        .populate('events')
        .populate('donations')
        .exec();
        res.status(200).json(category);

    
    },

    // getProduct: async (req, res, next) => {
    //     const product = await Product.findOne({ _id: req.value.params.productId })
    //       .populate('categories')
    //       .populate('events')
    //       .populate('donations')
    //       .populate('transactions')
    //       .exec();
    //       res.status(200).json(product);
 
    // },
    //validation: done
    replaceCategory: async (req, res, next) => {
        // enforce that req.body must contain all the fields
        const { categoryId } = req.value.params;
        const newCategory = req.value.body;
        const result = await Category.findByIdAndUpdate(categoryId, newCategory);
        res.status(200).json({ success: true });
    },
    //validation: done
    updateCategory: async (req, res, next) => {
        // req.body may contain any number of fields
        const { categoryId } = req.value.params;
        const newCategory = req.value.body;
        const result = await Category.findByIdAndUpdate(categoryId, newCategory);
        res.status(200).json({ success: true });
    },
    //validation: done
    getCategoryProducts: async (req, res, next) => {
        const { categoryId } = req.value.params;
        const category = await Category.findById(categoryId).populate('products');
        res.status(200).json(category.products)
    },

    newCategoryProduct: async (req, res, next) => {
        const { categoryId } = req.value.params;
        // Create new product
        const newProduct = new Product(req.value.body);
        // Get Category
        const category = await Category.findById(categoryId);
        // assign category as a product's seller
        newProduct.categories = category;
        //save the product
        await newProduct.save();
        // Add product to the category's categories array 'products'
        category.products.push(newProduct);
        // Save the category
        await category.save();
        res.status(201).json(newProduct)
    }
};