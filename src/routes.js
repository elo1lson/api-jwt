'use strict'

const { Router } = require('express')

const authController = require('./controllers/auth')
const userController = require('./controllers/user')
const authMiddleware = require('./middlewares/auth')
const router = Router()

router.post('/auth/login', authController.login)
router.post('/auth/register', authController.register)
router.get('/user/:id',authMiddleware, userController.user)

module.exports = router