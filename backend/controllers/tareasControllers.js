const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareasModels')

const getTareas = asyncHandler(async (req, res) => {

    const tareas = await Tarea.find({})

    res.status(200).json(tareas)
})

const createTareas = asyncHandler(async (req, res) => {

    if (!req.body.descripcion) {
        res.status(400)
        throw new Error('Por favor teclea una descripcion')
    }

    const tarea = await Tarea.create({
        descripcion: req.body.descripcion
    })

    res.status(201).json(tarea)
})

const updateTareas = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Tarea ${req.params.id} modificada` })
})

const deleteTareas = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Tarea ${req.params.id} eliminada` })
})

module.exports = {
    getTareas,
    createTareas,
    updateTareas,
    deleteTareas
}



