import Category from "../models/Category.js";

export const listCategories = async (req, res) => res.json(await Category.find().sort({ name: 1 }));

export async function createCategory(req, res) {
  res.status(201).json(await Category.create(req.body));
}

export async function updateCategory(req, res) {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json(category);
}

export async function deleteCategory(req, res) {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return res.status(404).json({ message: "Category not found" });
  res.json({ message: "Category deleted" });
}
