import express from 'express'
import UserController from '../../controller/user/user.controller'
import { authenticated } from '../../middleware/auth'
import { isAdmin } from '../../middleware/user'

const router = express.Router()

const controller = new UserController()

router.get('/me', authenticated, controller.me)

router.get('/', authenticated, isAdmin, controller.getAll)

router.get('/:id', authenticated, isAdmin, controller.getOne)

router.post('/', authenticated, isAdmin, controller.create)

router.put('/', authenticated, isAdmin, controller.update)

router.delete('/:id', authenticated, isAdmin, controller.delete)

export default router
