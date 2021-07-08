import express from 'express'
import PaymentController from '../../controller/pay/payment.controller'
import { authenticated } from '../../middleware/auth'
import { isAdmin } from '../../middleware/user'

const router = express.Router()
const controller = new PaymentController()

router.post('/', authenticated, controller.doPay)

router.get('/:id', authenticated, controller.getPayment)

router.post('/cancel', authenticated, controller.cancelPayment)

router.put('/', authenticated, isAdmin, controller.update)

export default router
