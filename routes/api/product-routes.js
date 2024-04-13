const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Products not found!" });
  }
});

// get one product
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    !product
      ? res.status(404).json({ message: "Product not found!" })
      : res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Product not found!" });
  }
});

// create new product
router.post('/', async (req, res) => {

  try {
  // Create a new category using the data in the request body
    const newProduct = await ProductTag.create(req.body)

    res.status(200).json(newProduct);
  } catch (err) {
    // Handle errors by sending a 400 status with a custom message
    res.status(400).json({ message: 'creation failed' });
  }
 
  
});


// update product
router.put('/:id', async (req, res) => {
  // update product data
  try {
  await Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
    
     

      // Respond with updated product
    const product = await Product.findByPk(req.params.id, { include: [{ model: Tag }] });
    return res.json(product);
   
}  catch(err) {
  console.log(err);
  return res.status(400).json(err);
}
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    // Delete the product with the matching ID
    const deleted = await ProductTag.destroy({ where: { id: req.params.id } });
    // If the product is not found, send a 404 status with a custom message
    // Otherwise, return the deleted data
    !deleted
      ? res.status(404).json({ message: "id not found" })
      : res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ message: "Product not deleted!", error: err });
  }
});

module.exports = router;
