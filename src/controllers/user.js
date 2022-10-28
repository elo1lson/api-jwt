'use strict'

exports.user = async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id, '-password')

    } catch (e) {
        return res.status(404).json({ msg: 'Usuário não encontrado' })
    }

    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' })
    return res.status(200).json({ user: user })
}
