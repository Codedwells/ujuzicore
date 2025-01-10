import { Router } from 'express'
import * as UserController from '../../controllers/user.Controller'

const router = Router()

// User routes
router.get('/', UserController.getUsers)

export default router
