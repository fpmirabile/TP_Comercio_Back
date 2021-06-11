import { getRepository } from "typeorm";
import { Category } from "../../models";

export const getCategory = async (id: string): Promise<Category> => {
  const categoryRepository = getRepository(Category);
  const category = await categoryRepository.findOne({ id: id });
  if (!category) {
    throw 'CATEGORY_NOT_FOUND';
  }
  
  return category;
};