const Product = require("../models/productSchema");

const loadproducts = async (req, res) => {
  try {
    const pdata = await Product.find();
    res.render("user/productslist", { products: pdata });
  } catch (error) {
    console.log(error.message);
  }
};

const loadproductdetail = async (req, res) => {
  try {
    const proid = req.query.id;
    const productdetail = await Product.findById({ _id: proid });
    const cat = productdetail.category_id;
    const pdata = await Product.find({
      _id: { $ne: proid },
      category_id: cat,
    }).limit(4);
    if (productdetail != null) {
      res.render("user/productdetail", { product: productdetail, rel: pdata });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  loadproducts,
  loadproductdetail,
};
