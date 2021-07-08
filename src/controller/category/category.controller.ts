import express from 'express'
import { CategoryDto } from '../../dto/category/category.dto'
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from '../../services/category/category.service'
import { CRUDController } from '../base.controller'

export default class CategoryController implements CRUDController {
  public async getAll(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const categories = await getAllCategories()
      return res.status(200).send(categories)
    } catch (e) {
      next(e)
    }
  }

  public async create(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const request: CategoryDto = {
      name: req.body.name,
    }

    try {
      const newCategory = await createCategory(request)
      return res.status(200).send({ name: newCategory.name })
    } catch (e) {
      next(e)
    }
  }

  public async update(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const request: CategoryDto = {
      id: req.body.id,
      name: req.body.name,
    }

    try {
      const updatedCategory = await updateCategory(request)
      return res.status(200).send(updatedCategory)
    } catch (e) {
      next(e)
    }
  }

  public async getOne(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const id = req.params.id

    try {
      const category = await getCategory(id)
      return res.status(200).send(category)
    } catch (e) {
      next(e)
    }
  }

  public async delete(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const id = req.params.id

    try {
      const delCommand = await deleteCategory(id)
      return res.status(200).send(delCommand)
    } catch (e) {
      next(e)
    }
  }
}
