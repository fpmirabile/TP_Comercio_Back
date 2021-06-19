export interface CreateProductDto {
  name: string;
  stock?: number;
  price: number;
  image: string | null; // will be base 64 or url
  categoryId: string;
}

export interface UpdateProductDto extends CreateProductDto {
  id: string;
}

export interface SearchProductDto {
  search?: string;
  category?: string;
  page: number;
  pageSize: number;
}