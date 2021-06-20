import { FindOperator, getRepository, Like } from "typeorm";
import { CreateProductDto, SearchProductDto, UpdateProductDto } from "../../dto/product/product.dto";
import { Product } from "../../models";
import { getCategory } from "../category/category.service";
import CloudinaryService from "../cloudinary/cloudinary.service";

interface ProductSearchWhere {
  name?: FindOperator<string>;
  category?: { id: string };
}

export const getProducts = async (payload: SearchProductDto): Promise<Array<Product>> => {
  const productRepository = getRepository(Product);

  // Page - 1, porque el frontend  maneja + 1 para gusto del usuario.
  // No podemos ponerle pagina 0, no tiene sentido.
  const skip = (payload.page - 1) * payload.pageSize; // Salteamos pagina * size, entonces nos aseguramos que estamos en la posicion correcta.
  const where: ProductSearchWhere = {};
  if (payload.search) {
    where.name = Like(`%${payload.search}%`);    
  }

  if (payload.category) {
    where.category = { id: payload.category }
  }

  console.log(where);
  return productRepository.find({ take: payload.pageSize, skip, where, relations: [ 'category' ] });
};

export const createProduct = async (payload: CreateProductDto): Promise<Product> => {
  const productRepository = getRepository(Product);
  const cloudinaryService = CloudinaryService.getInstance();

  const product = new Product();
  const category = await getCategory(payload.categoryId);
  let image: string | undefined;
  if (payload.image) {
    image = await cloudinaryService.uploadImage(payload.image);
  }

  return productRepository.save({
    ...product,
    name: payload.name,
    stock: payload.stock,
    imageUrl: image,
    msrp: payload.price,
    category,
    discount: payload.discount,
    active: payload.active,
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
  const cloudinaryService = CloudinaryService.getInstance();
  const product = await productRepository.findOne({ id: payload.id });
  if (!product) {
    throw 'PRODUCT_NOT_FOUND';
  }

  const category = await getCategory(payload.categoryId);
  let image: string | undefined;
  if (payload.image) {
    image = await cloudinaryService.uploadImage(payload.image);
  }
  return productRepository.save({
    ...product,
    name: payload.name,
    stock: payload.stock,
    msrp: payload.price,
    imageUrl: image,
    category,
    active: payload.active
  });
};

export const deleteProductById = async (id: string): Promise<boolean> => {
  const productRepository = getRepository(Product);
  const product = await productRepository.findOne({ id });
  if (!product) {
    throw 'PRODUCT_NOT_FOUND';
  }

  const deletedProd = await productRepository.delete({ id });
  return !!deletedProd.affected;
};