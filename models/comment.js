//Definicion del modelo Comments:

module.exports = function(sequelize, DataTypes){
	return sequelize.define('Comment',
	  {text:{type:DataTypes.STRING,
		validate: {notEmpty:{msg:"Falta comentario"}}
		},
		accepted: { type: DataTypes.BOOLEAN,
				defaultValue: false},
		AuthorId: { type: DataTypes.INTEGER,
				defaultValue: false}
	});
};
