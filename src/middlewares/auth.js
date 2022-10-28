'use strict'

const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(401).json({ msg: 'acesso negado!' })

    try {
        const secret = process.env.SECRET
        jwt.verify(token, secret)
        next()

    } catch (error) {
        return res.status(400).json({ msg: 'Token inválido!' })
    }
}
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNWIwNWQ0MzkyMGIyZDgyZWZlNTE5ZSIsImlhdCI6MTY2Njk5MzQ3MX0.H3D9r9tX3MNzU6KSxs3n9r8PZhwoK7uJ3-9j-FuUjU0