import { getRepository } from "typeorm";
import { CategoryDto } from "../../dto/category/category.dto";
import { Category } from "../../models";

export const getAllCategories = async(): Promise<Category[]> => {
  const categoryRepository = getRepository(Category);
  return await categoryRepository.find();
}

export const getCategory = async (id: string): Promise<Category> => {
  const categoryRepository = getRepository(Category);
  const category = await categoryRepository.findOne({ id: id });
  if (!category) {
    throw 'CATEGORY_NOT_FOUND';
  }
  
  return category;
};

export const createCategory = async (payload: CategoryDto): Promise<Category> => {
  const categoryRepository = getRepository(Category);
  const category = new Category();
  return await categoryRepository.save({
    ...category,
    name: payload.name
  })
}

export const updateCategory = async (payload: CategoryDto): Promise<Category> => {
  if (!payload.id) {
    throw 'INVALID_CATEGORY';
  }

  const categoryRepository = getRepository(Category);
  const category = await categoryRepository.findOne({ id: payload.id })
  if (!category) {
    throw 'CATEGORY_NOT_FOUND';
  }

  return await categoryRepository.save({
    ...category,
    name: payload.name,
  });
}

export const deleteCategory = async (id: string): Promise<boolean> => {
  const categoryRepository = getRepository(Category);
  const operation = await categoryRepository.delete({ id });
  return !!operation.affected;
}
