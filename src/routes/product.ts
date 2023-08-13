import express from "express";
import { AppDataSource } from "../database";
import { Product } from "../entities/Product";
import { authenticate } from "../middleware/authentication";
import { User } from "../entities/User";

const router = express.Router();

router.post("/create", authenticate, async (req, res) => {
  try {
    const { name, description } = req.body;
    const productRepository = AppDataSource.getRepository(Product);

    const newProduct = new Product();
    newProduct.name = name;
    newProduct.description = description;
    newProduct.user = res.locals.currentUser; // Attach the current user to the product

    await productRepository.save(newProduct);

    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:productId", authenticate, async (req, res) => {
  try {
    const { name, description } = req.body;
    const productId = req.params.productId as string;
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne({
      where: { id: +productId }, // Using the where option to filter by product ID
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.description = description;

    await productRepository.save(product);

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:productId", authenticate, async (req, res) => {
  try {
    const productId = req.params.productId;
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne({
      where: { id: +productId }, // Using the where option to filter by product ID
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await productRepository.remove(product);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
