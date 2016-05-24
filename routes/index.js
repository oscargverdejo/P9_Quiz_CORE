var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');

var commentController = require('../controllers/comment_controller');

var userController = require('../controllers/user_controller');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// Autoload 
router.param('quizId', quizController.load); //autoload :quizId
router.param('userId', userController.load); //autoload :userId

//Definicion de rutas de /quizzes
router.get('/quizzes.:format?', quizController.index);
router.get('/quizzes/:quizId(\\d+).:format?', quizController.show);
router.get('/quizzes/:quizId(\\d+)/check', quizController.check);
router.get('/quizzes/new', quizController.new);
router.post('/quizzes', quizController.create);
router.get('/quizzes/:quizId(\\d+)/edit', quizController.edit);
router.put('/quizzes/:quizId(\\d+)', quizController.update);
router.delete('/quizzes/:quizId(\\d+)', quizController.destroy);

router.get('/quizzes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizzes/:quizId(\\d+)/comments/', commentController.create);

//GET author
router.get('/author', function(req, res, next) {
  res.render('author');
});

//Definicion de rutas de cuenta
router.get('/users', userController.index);//listado de usuarios
router.get('/users/:userId(\\d+)', userController.show);//ver un usuario
router.get('/users/new', userController.new);//formulario sign in
router.post('/users', userController.create);//registrar usuario
router.get('/users/:userId(\\d+)/edit', userController.edit);//editar cuenta
router.put('/users/:userId(\\d+)', userController.update);//actualizar cuenta
router.delete('/users/:userId(\\d+)', userController.destroy);//borrar cuenta

module.exports = router;
