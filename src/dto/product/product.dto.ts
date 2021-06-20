export interface CreateProductDto {
  active: boolean;
  name: string;
  stock?: number;
  price: number;
  discount?: number;
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