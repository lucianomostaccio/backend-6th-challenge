const express = require("express");
const router = express.Router();
const ProductManager = require("../dao/services/mongodb/ProductManager");
const productManager = new ProductManager();

// Rutas para manejo de productos

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const limit = Number(req.query.limit);
    const products = await productManager.getProducts();
    if (!isNaN(limit)) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Obtener un producto por ID
router.get("/:pid", async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productManager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el producto por ID:", error);
    res.status(500).send("Error interno del servidor");
  }
});

// Agregar un nuevo producto
router.post("/", async (req, res) => {
  const productData = req.body;
  try {
    await productManager.addProduct(productData);
    res.status(201).json({ message: "Producto agregado exitosamente" });
    console.log("Producto agregado:", productData);
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualizar un producto por ID
router.put("/:pid", async (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;
  try {
    await productManager.updateProduct(productId, updatedProduct);
    res.json({
      message: "Producto actualizado exitosamente",
    });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Eliminar un producto por ID
router.delete("/:pid", async (req, res) => {
  const productId = req.params.pid;
  try {
    await productManager.deleteProduct(productId);
    res.json({
      message: "Producto eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
