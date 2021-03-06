var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var userController = require('../controllers/user_controller');
var sessionController = require('../controllers/session_controller');
var multer = require ('multer');
var upload = multer ({ dest : './uploads/'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});


// Autoload de rutas que usen :quizId
router.param('quizId', quizController.load);  // autoload :quizId
router.param('userId', userController.load); // autoload  :userId
router.param('commentId', commentController.load); //autoload :commentId

// Definicion de rutas de sesion
router.get('/session', 		sessionController.new); //formulario login
router.post('/session', 	sessionController.create); //crear
router.delete('/session',	sessionController.destroy); //destruir

// Definicion de rutas de cuenta
router.get('/users',			userController.index); //listado de usuarios
router.get('/users/:userId(\\d+)',      userController.show);    // ver un usuario
router.get('/users/new',                userController.new);     // formulario sign un
router.post('/users',                   userController.create);  // registrar usuario
router.get('/users/:userId(\\d+)/edit', sessionController.loginRequired, sessionController.adminOrMyselfRequired, userController.edit);     // editar información de cuenta
router.put('/users/:userId(\\d+)',      sessionController.loginRequired,sessionController.adminOrMyselfRequired, userController.update);   // actualizar información de cuenta
router.delete('/users/:userId(\\d+)',   sessionController.loginRequired,sessionController.adminAndNotMyselfRequired, userController.destroy);  // borrar cuenta

// Definición de rutas de /quizzes
router.get('/quizzes.:format?',            quizController.index);
router.get('/quizzes/:quizId(\\d+).:format?',       quizController.show);
router.get('/quizzes/:quizId(\\d+)/check', quizController.check);
router.get('/quizzes/new',                sessionController.loginRequired, quizController.new);
router.post('/quizzes',                    sessionController.loginRequired, upload.single('image'), quizController.create);
router.get('/author', quizController.author);
router.get('/quizzes/:quizId(\\d+)/edit',  sessionController.loginRequired,quizController.ownershipRequired, quizController.edit);
router.put('/quizzes/:quizId(\\d+)',	   sessionController.loginRequired,quizController.ownershipRequired, upload.single('image'), quizController.update);
router.delete('/quizzes/:quizId(\\d+)',	   sessionController.loginRequired,quizController.ownershipRequired, quizController.destroy);

// Rutas de comentarios
router.get('/quizzes/:quizId(\\d+)/comments/new',   sessionController.loginRequired, commentController.new);
router.post('/quizzes/:quizId(\\d+)/comments',   sessionController.loginRequired, commentController.create);
router.put('/quizzes/:quizId(\\d+)/comments/:commentId(\\d+)/accept', sessionController.loginRequired,quizController.ownershipRequired, commentController.accept);


module.exports = router;
