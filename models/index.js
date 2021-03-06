var path = require('path');

// Cargar modelo ORM
var Sequelize = require('sequelize');

var url, storage;

if (!process.env.DATABASE_URL){
	url = "sqlite:///";
	storage = "quiz.sqlite";
}else{
	url = process.env.DATABASE_URL;
	sorage = process.env.DATABASE_STORAGE || "";
}

var sequelize = new Sequelize(url,
								{ storage: storage,
								  omitNull: true
								});
//Usar BBDD SQLite
//var sequelize = new Sequelize(null, null, null,
						//{ dialect: "sqlite", storage: "quiz.sqlite"});

//Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

//Importar la definicion de la tabla Comments de comment.js
var Comment = sequelize.import(path.join(__dirname,'comment'));

//Importar la definicion de la abla Users de user.js
var User = sequelize.import(path.join(__dirname,'user'));

//Relaciones entre modelos
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);

//Relacion 1 a N entre User y Quiz:
User.hasMany(Quiz, {foreignKey: 'AuthorId'});
Quiz.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});

//Relacion 1 a N entre User y Comment
User.hasMany(Comment, {foreignKey: 'AuthorId'});
Comment.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});

exports.Quiz = Quiz;//exportar definicion de la tabla Quiz
exports.Comment = Comment;//exportar definicion de tabla Comments
exports.User = User;//exportar definicion de tabla Users