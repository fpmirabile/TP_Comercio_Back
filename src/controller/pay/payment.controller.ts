import express from 'express';

export default class ProductController {
  public async doPay(req: express.Request, res: express.Response, next: express.NextFunction) {
    // const request = {
    //   name: req.body.name,
    //   active: req.body.active,
    //   stock: req.body.stock,
    //   price: req.body.price,
    //   image: req.body.image,
    //   categoryId: req.body.categoryId
    // };

    // try {
    //   const newProduct = await createProduct(request);
    //   return res.status(200).send(newProduct);
    // } catch (e) {
    //   next(e);
    // }
  }

  public async update(req: express.Request, res: express.Response, next: express.NextFunction) {
    //     const request = {
    //       id: req.body.id,
    //       active: req.body.active,
    //       name: req.body.name,
    //       stock: req.body.stock,
    //       price: req.body.price,
    //       image: req.body.image,
    //       categoryId: req.body.categoryId
    //     };

    //     try {
    //       const updatedProduct = await updateProduct(request);
    //       return res.status(200).send(updatedProduct);
    //     } catch (e) {
    //       next(e);
    //     }
    //   }
  }

  public async getPayment(req: express.Request, res: express.Response, next: express.NextFunction) {
    // const id = req.params.id;

    // try {
    //   const product = await getProduct(id);
    //   return res.status(200).send(product);
    // } catch (e) {
    //   next(e);
    // }
  }

  public async cancelPayment(req: express.Request, res: express.Response, next: express.NextFunction) {
    // const id = req.params.id;

    // try {
    //   const deleteCommand = await deleteProductById(id);
    //   return res.status(200).send(deleteCommand);
    // } catch (e) {
    //   next(e);
    // }
  }
}
