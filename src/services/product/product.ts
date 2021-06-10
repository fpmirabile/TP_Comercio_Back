import { getRepository } from "typeorm";
import { Product } from "../../models";

// export interface IUserPayload {
//   firstName: string;
//   lastName: string;
//   email: string;
// }

export const getProducts = async (): Promise<Array<Product>> => {
  const productRepository = getRepository(Product);
  return productRepository.find();
};

export const createProduct = async (payload: Object): Promise<Product> => {
  const productRepository = getRepository(Product);
  const product = new Product();
  return productRepository.save({
    ...product,
    ...payload,
  });
};

export const getProduct = async (id: number): Promise<Product | null> => {
  const productRepository = getRepository(Product);
  const product = await productRepository.findOne({ id: id });
  if (!product) return null;
  return product;
};
