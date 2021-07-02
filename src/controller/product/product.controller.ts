import express from 'express';
import { CreateProductDto, SearchProductDto, UpdateProductDto } from '../../dto/product/product.dto';
import { createProduct, deactiveProduct, getProduct, getProducts, getTopProducts, updateProduct } from '../../services/product/product.service';
import { CRUDController } from '../base.controller';

export default class ProductController implements CRUDController {
  public async getAll(req: express.Request, res: express.Response, next: express.NextFunction) {
    const request: SearchProductDto = {
      search: req.query.search as string | undefined,
      category: req.query.categoryId as string | undefined,
      categoryName: req.query.categoryName as string | undefined,
      page: Number(req.query.page),
      pageSize: Number(req.query.pageSize),
      onlyDiscountItems: !!req.query.onlyDiscount,
    };

    try {
      const products = await getProducts(request);
      return res.status(200).send(products);
    } catch (e) {
      next(e);
    }
  }

  public async getTop(req: express.Request, res: express.Response, next: express.NextFunction) {
    try {
      const products = await getTopProducts();
      return res.status(200).send(products);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: express.Request, res: express.Response, next: express.NextFunction) {
    const request: CreateProductDto = {
      name: req.body.name,
      active: req.body.active,
      stock: req.body.stock,
      price: req.body.price,
      image: req.body.image,
      categoryId: req.body.categoryId,
      discount: req.body.discount,
    };

    try {
      const newProduct = await createProduct(request);
      return res.status(200).send(newProduct);
    } catch (e) {
      next(e);
    }
  }

  public async update(req: express.Request, res: express.Response, next: express.NextFunction) {
    const request: UpdateProductDto = {
      id: req.body.id,
      active: req.body.active,
      name: req.body.name,
      stock: req.body.stock,
      price: req.body.price,
      image: req.body.image,
      categoryId: req.body.categoryId,
      discount: req.body.discount,
    };

    try {
      const updatedProduct = await updateProduct(request);
      return res.status(200).send(updatedProduct);
    } catch (e) {
      next(e);
    }
  }

  public async getOne(req: express.Request, res: express.Response, next: express.NextFunction) {
    const id = req.params.id;

    try {
      const product = await getProduct(id);
      return res.status(200).send(product);
    } catch (e) {
      next(e);
    }
  }

  public async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
    const id = req.params.id;

    try {
      const deleteCommand = await deactiveProduct(id);
      return res.status(200).send({ operation: deleteCommand });
    } catch (e) {
      next(e);
    }
  }
}
