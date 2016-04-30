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

// sequelize.sync() crea e inicializa la tabla de preguntas en DB
sequelize
.sync()
.then(function() {
	return Quiz
		.count()
		.then(function (c){
			if (c === 0){
				return Quiz
					.create({ question: 'Capital de Italia', answer: 'Roma'})
					.then(function(){
						console.log('Base de datos inicializada con datos');
					});
			}
		});
}).catch(function(error) {
	console.log("Error sincronizando las tablas de la BBDD", error);
	process.exit(1);
});

exports.Quiz = Quiz;//exportar definicion de la tabla Quiz