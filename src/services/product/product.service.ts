import { getRepository } from "typeorm";
import { CreateProductDto, UpdateProductDto } from "../../dto/product/product.dto";
import { Product } from "../../models";
import { getCategory } from "../category/category.service";

export const getProducts = async (payload: Object): Promise<Array<Product>> => {
  const productRepository = getRepository(Product);
  return productRepository.find();
};

export const createProduct = async (payload: CreateProductDto): Promise<Product> => {
  const productRepository = getRepository(Product);
  const product = new Product();
  const category = await getCategory(payload.categoryId);
  return productRepository.save({
    ...product,
    name: payload.name,
    stock: payload.stock,
    imageUrl: 'send to cloudify',
    msrp: payload.price,
    category
  });
};

export const getProduct = async (id: string): Promise<Product> => {
  const productRepository = getRepository(Product);
  const product = await productRepository.findOne({ id });
  if (!product) {
    throw 'PRODUCT_NOT_FOUND';
  }

  return product;
};

export const updateProduct = async (payload: UpdateProductDto): Promise<Product> => {
  const productRepository = getRepository(Product);
  const product = await productRepository.findOne({ id: payload.id });
  if (!product) {
    throw 'PRODUCT_NOT_FOUND';
  }

  const category = await getCategory(payload.categoryId);
  return productRepository.save({
    ...product,
    name: payload.name,
    stock: payload.stock,
    msrp: payload.price,
    imageUrl: 'cloudify image',
    category
  });
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const productRepository = getRepository(Product);
  const product = await productRepository.findOne({ id });
  if (!product) {
    throw 'PRODUCT_NOT_FOUND';
  }

  const deletedProd = await productRepository.delete(product);
  return !!deletedProd.affected;
};