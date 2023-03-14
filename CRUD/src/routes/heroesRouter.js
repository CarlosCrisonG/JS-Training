// ************ Require's ************
const express = require("express");
const router = express.Router();

// ************ Controller Require ************
const heroesController = require('../controllers/heroesController');

const uploadFile = require('../middlewares/multerMiddleware');

router.get('/', heroesController.index); //Ruta para mostrar página principal
router.get('/detail/create', heroesController.create); //Ruta para mostrar página crear heroe
router.post('/detail', uploadFile.single('imgFile'), heroesController.store);  //Ruta para metodo crear heroe
router.get('/detail/:id', heroesController.detail); //Ruta para mostar la página de detalle de heroe
router.get('/detail/edit/:id', heroesController.edit); //Ruta para mostar el formulario de edición
router.put('/detail/edit/:id', uploadFile.single('imgFile'), heroesController.update); //Ruta para metodo editar
router.delete('/detail/delete/:id', heroesController.delete); //Ruta para metodo borrar


module.exports = router;
