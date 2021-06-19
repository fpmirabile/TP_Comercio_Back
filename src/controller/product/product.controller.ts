import express from 'express';
import { CreateProductDto, SearchProductDto, UpdateProductDto } from '../../dto/product/product.dto';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../../services/product/product.service';
import { CRUDController } from '../base.controller';

export default class ProductController implements CRUDController {
  public async getAll(req: express.Request, res: express.Response, next: express.NextFunction) {
    const request: SearchProductDto = {
      search: req.params.search,
      category: req.params.categoryId,
      page: Number(req.params.page),
      pageSize: Number(req.params.pageSize)
    };

    try {
      const products = getProducts(request);
      return res.status(200).send(products);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: express.Request, res: express.Response, next: express.NextFunction) {
    const request: CreateProductDto = {
      name: req.body.name,
      stock: req.body.stock,
      price: req.body.price,
      image: req.body.image,
      categoryId: req.body.categoryId
    };

    try {
      const newProduct = createProduct(request);
      return res.status(200).send(newProduct);
    } catch (e) {
      next(e);
    }
  }

  public async update(req: express.Request, res: express.Response, next: express.NextFunction) {
    const request: UpdateProductDto = {
      id: req.body.id,
      name: req.body.name,
      stock: req.body.stock,
      price: req.body.price,
      image: req.body.image,
      categoryId: req.body.categoryId
    };

    try {
      const updatedProduct = updateProduct(request);
      return res.status(200).send(updatedProduct);
    } catch (e) {
      next(e);
    }
  }

  public async getOne(req: express.Request, res: express.Response, next: express.NextFunction) {
    const id = req.params.id;

    try {
      const product = getProduct(id);
      return res.status(200).send(product);
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
    const id = req.params.id;

    try {
      const deleteCommand = deleteProduct(id);
      return res.status(200).send(deleteCommand);
    } catch (e) {
      next(e);
    }
  }
}
