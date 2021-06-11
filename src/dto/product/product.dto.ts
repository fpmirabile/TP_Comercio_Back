export interface CreateProductDto {
  name: string;
  stock?: number;
  price: number;
  image: Object;
  categoryId: string;
}

export interface UpdateProductDto extends CreateProductDto {
  id: string;
}
