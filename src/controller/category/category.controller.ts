import express from 'express';
import { Product } from "../../models";

export default class CategoryController {
  public async getCategories(req: express.Request, res: express.Response, next: express.NextFunction): Promise<Array<Product>> {
    return [];
  }

  public async createCategory(req: express.Request, res: express.Response, next: express.NextFunction): Promise<Product> {
    return new Product();
  }

  public async updateCategory(req: express.Request, res: express.Response, next: express.NextFunction): Promise<Product> {
    return new Product();
  }

  public async getCategory(req: express.Request, res: express.Response, next: express.NextFunction): Promise<Product | null> {
    return null;
  }

  public async deleteCategory(req: express.Request, res: express.Response, next: express.NextFunction): Promise<boolean | null> {
    return false;
  }
}
