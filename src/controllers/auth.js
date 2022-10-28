'use strict'

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {

    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado!' })

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) return res.status(422).json({ msg: 'Senha inválida!' })

    try {
        const secret = process.env.SECRET
        const token = jwt.sign({
            id: user._id
        }, secret)
        res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token: token })
    } catch (err) {
        return res.status(500).json({ msg: 'Erro na autenticação!' })
    }
}

exports.register = async (req, res) => {

    const { name, email, password, confirmPassword } = req.body

    if (!name) return res.status(422).json({ msg: 'O nome é obrigatório!' })
    if (!email) return res.status(422).json({ msg: 'O email é obrigatório!' })
    if (!password) return res.status(422).json({ msg: 'O senha é obrigatória!' })
    if (password !== confirmPassword) return res.status(422).json({ msg: 'As senhas não conferem!' })

    const userExists = await User.findOne({ email: email })
    if (userExists) return res.status(422).json({ msg: 'Por favor utilize outro email' })

    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(toString(password), salt)

    const user = new User({
        name, email, password: passwordHash
    })
    try {
        await user.save()
        res.status(201).json({ msg: 'Usuário criado com sucesso!' })

    } catch (error) {
        return res.status(500).json({ error: error })
    }

}
