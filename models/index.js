
var path = require('path');

// Cargar ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
//    DATABASE_URL = sqlite:///
//    DATABASE_STORAGE = quiz.sqlite
// Usar BBDD Postgres:
//    DATABASE_URL = postgres://user:passwd@host:port/database

var url, storage;

if (!process.env.DATABASE_URL) {
    url = "sqlite:///";
    storage = "quiz.sqlite";
} else {
    url = process.env.DATABASE_URL;
    storage = process.env.DATABASE_STORAGE || "";
}

var sequelize = new Sequelize(url, 
	 						  { storage: storage,
				              	omitNull: true 
				              });

// Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

// Importar la definciin de la tabla Attachments de attachment.js
var Attachment = sequelize.import(path.join(__dirname,'attachment'));

//Importar la definicion de tabla Comments
var Comment = sequelize.import(path.join(__dirname,'comment'));

//Importar la definicion de la tabla Users de user.js
var User = sequelize.import(path.join(__dirname,'user'));

//Relaciones entre modelos
Comment.belongsTo(Quiz); //un comentario pertenece a quiz
Quiz.hasMany(Comment); //un quiz puede tener varios comentarios

// Relacion 1 a N entre User y Quiz
User.hasMany(Quiz, {foreignKey: 'AuthorId'});
Quiz.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});

// Relacion 1-a-1 ente Quiz y Attachment
Attachment.belongsTo(Quiz);
Quiz.hasOne(Attachment);

// Relacion 1 a N entre User y Comment
User.hasMany(Comment, {foreignKey: 'AuthorId'});
Comment.belongsTo(User, {as:'Author', foreignKey: 'AuthorId'});

exports.Quiz = Quiz; // exportar definición de tabla Quiz
exports.Comment = Comment; //exportar definicion de tabla Comment
exports.User = User; //exportar definicion de tabla Users
exports.Attachment = Attachment; //exportar definicion de tabla Attachment
