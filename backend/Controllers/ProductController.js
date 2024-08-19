import asyncHandler from "express-async-handler";
import { prisma } from "../Config/PrismaConfig.js";

export const createProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    brand,
    model,
    image,
    userEmail,
    category,
    additionalInfo,
    country,
    city,
    area,
    contactNumber,
  } = req.body;

  const validCategories = ["CAR", "MOBILE", "LAPTOP", "OTHER"];

  if (!category || !validCategories.includes(category)) {
    return res.status(400).json({ error: "Invalid category value." });
  }

  try {
    if (!userEmail) {
      return res.status(400).json({ error: "User email is required" });
    }

    let user = await prisma.user.findUnique({ where: { email: userEmail } });

    if (!user) {
      user = await prisma.user.create({ data: { email: userEmail } });
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        brand,
        model,
        image,
        category,
        additionalInfo,
        user: { connect: { id: user.id } },
        country,
        city,
        area,
        contactNumber: contactNumber || "",
      },
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      error: "Internal server error.",
      details: error.message,
    });
  }
});

// Get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  const { category } = req.query;

  try {
    const products = await prisma.product.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: "desc" },
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({
      error: "Internal server error.",
      details: error.message,
    });
  }
});

// Get a product by ID
export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({
      error: "Internal server error.",
      details: error.message,
    });
  }
});
