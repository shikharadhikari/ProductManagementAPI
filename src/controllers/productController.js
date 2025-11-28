import { products } from "../database/memory.js";

export const createProduct = (req, res) => {
  const { name, price, category } = req.body;

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category,
  };

  products.push(newProduct);
  res.status(201).json({ message: "Product added", product: newProduct });
};

export const getProducts = (req, res) => {
  let result = [...products];

  if (req.query.category)
    result = result.filter(p => p.category === req.query.category);

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const start = (page - 1) * limit;
  const end = page * limit;

  res.json({
    page,
    total: result.length,
    products: result.slice(start, end),
  });
};

export const getProductById = (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product)
    return res.status(404).json({ message: "Product not found" });

  res.json(product);
};

export const updateProduct = (req, res) => {
  const id = Number(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product)
    return res.status(404).json({ message: "Product not found" });

  Object.assign(product, req.body);

  res.json({ message: "Updated", product });
};

export const deleteProduct = (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex(p => p.id === id);
  if (index === -1)
    return res.status(404).json({ message: "Product not found" });

  products.splice(index, 1);

  res.json({ message: "Product deleted" });
};
