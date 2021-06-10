import express from 'express';
import { Product } from "../../models";

export default class ProductController {
  public async getProducts(req: express.Request, res: express.Response, next: express.NextFunction): Promise<Array<Product>> {
    return [];
  }

  public async createProduct(req: express.Request, res: express.Response, next: express.NextFunction): Promise<Product> {
    return new Product();
  }

  public async updateProduct(req: express.Request, res: express.Response, next: express.NextFunction): Promise<Product> {
    return new Product();
  }

  public async getProduct(req: express.Request, res: express.Response, next: express.NextFunction): Promise<Product | null> {
    return null;
  }

  public async deleteProduct(req: express.Request, res: express.Response, next: express.NextFunction): Promise<boolean | null> {
    return false;
  }
}
