import express from "express";
import auth from "../middleware/auth.js";
import role from "../middleware/role.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", auth, role(["admin"]), createProduct);
router.get("/", auth, getProducts);
router.get("/:id", auth, getProductById);
router.put("/:id", auth, role(["admin"]), updateProduct);
router.delete("/:id", auth, role(["admin"]), deleteProduct);

export default router;