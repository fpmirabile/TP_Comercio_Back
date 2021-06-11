export interface OrderDto {
    comments: string;
    details: OrderDetailDto;
}

export interface OrderDetailDto {
    productIds: string[];
}