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

exports.Quiz = Quiz;//exportar definicion de la tabla Quiz