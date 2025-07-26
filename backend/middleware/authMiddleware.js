const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModels')

const protect = asyncHandler(async (req, res, next) => {

    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //Obtenemos el token
            token = req.headers.authorization.split(' ')[1]

            //Verificamos que el token sea valido (firma, caducidad)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //Obtener los datos del usuario del token a traves del id_usuario que esta en el paylod
            //para que cualquier endpoint que use proteccion tenga acesso a esos datos
            req.user = await User.findById(decoded.id_usuario).select('-password')

            //Continuamos con un Next ara salir de aqui y evitar quedarnos para siempre
            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Acceso no autorizado')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Acceso no autorizado, no se proporciono token')
    }

})

module.exports = protect
