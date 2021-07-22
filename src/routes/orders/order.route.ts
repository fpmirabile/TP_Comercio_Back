import express from 'express'
import OrderController from '../../controller/order/order.controller'
import { authenticated } from '../../middleware/auth'
import { isAdmin } from '../../middleware/user'

const router = express.Router()
const controller = new OrderController()

router.get('/getAll', authenticated, isAdmin, controller.getAll)

router.get('/:id', authenticated, controller.getOne)

router.get('/', authenticated, controller.getMine)

router.post('/', authenticated, controller.create)

export default router
