module.exports = (sequelize, dataTypes) => {
    let alias = "Perfil";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userProfile: {
            type: dataTypes.STRING(45), //Controlar si esta bien que ponga 45. En clave de sol decia 50.
            allowNull: false
        }
    };
        
    let config = {
        tableName: "usersprofile",
        timestamps: false
    };

    const Perfil = sequelize.define(alias,cols,config);

    //Asociación relacion de muchos a uno
    Perfil.associate = function (models) {
        Perfil.hasMany(models.Usuario, { 
            as: "usuarios",
            foreignKey: "userProfile_id", 
            
        })
    }

    return Perfil;
}