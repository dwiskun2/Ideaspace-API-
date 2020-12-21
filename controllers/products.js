const Product = require('../models/product');
const Category = require('../models/category_product');
const Event = require('../models/user_event');
const Donation = require('../models/donation');
module.exports = {
   index: async (req, res, next) => {
       //Get All products
    const products = await Product.find({})
      .populate('categories')
      .populate('events')
      .populate('donations')
      .exec();
    res.status(200).json(products);
   },
   
   newProduct: async (req, res, next) => {
    //1.find the actual categories & events
    const categories = await Category.findById(req.value.body.categories);
    const events = await Event.findById(req.value.body.events);
    const donations = await Donation.findById(req.value.body.donations);
    //2.Create a new product
    const newProduct = req.value.body
    //coba2 disini, kalo ga bisa delete, pisah events nya
    delete newProduct.categories; 
    delete newProduct.events;
    delete newProduct.donations;

    const product = new Product(newProduct);
    //coba2 disini, kalo ga bisa delete, pisah events nya
    product.categories = categories;
    product.events = events;
    product.donations = donations;
    await product.save(); 

    // 3. Add newly created product to the actual categories
    //coba2 disini, kalo ga bisa delete, pisah events nya, coba tambah tanda kurung
    categories.products.push(product); 
    events.products.push(product); 
    donations.products.push(product);
    await categories.save();
    await events.save(); 
    await donations.save();

    res.status(200).json(product);
   },

   getProduct: async (req, res, next) => {
       const product = await Product.findOne({ _id: req.value.params.productId })
         .populate('categories')
         .populate('events')
         .populate('donations')
         .populate('transactions')
         .exec();
         res.status(200).json(product);

   },

   

   getCategoryProducts: async (req, res, next) => {
    const { productId } = req.value.params;
    const product = await Product.findById(productId)
    .populate('categories')
    .populate('events')
    .populate('donations').exec();
    res.status(200).json(product.categories)
    },

   

   replaceProduct: async (req, res, next) => {
       const { productId } = req.value.params;
       const newProduct = req.value.body;
       const result = await Product.findByIdAndUpdate(productId, newProduct);
       res.status(200).json({ success: true});
   },

   updateProduct: async (req, res, next) => {
    const { productId } = req.value.params;
    const newProduct = req.value.body;
    const result = await Product.findByIdAndUpdate(productId, newProduct);
    res.status(200).json({ success: true});
   },

   deleteProduct: async (req, res, next) => {
    const { productId } = req.value.params;
    //Get a product
    const product = await Product.findById(productId);
    if (!product) {
       return res.status(404).json({ error: 'Product doesn\'t exist'});
    }

    const categoriesId = product.categories;
    const eventsId = product.events;
    const donationsId = product.donations;
    //Get a categories events danations
    const categories = await Category.findById(categoriesId);
    const events = await Event.findById(eventsId);
    const donations = await Donation.findById(donationsId);
    
    

    // Remove the product
    await product.remove();
    // Remove product from the categories's categories list products dari product model schema
    //Coba2 disini
    categories.products.pull(product);
    events.products.pull(product);
    donations.products.pull(product);
    await categories.save();
    await events.save();
    await donations.save();

    res.status(200).json({ success: true });
   }
}