module.exports = (sequelize, dataTypes) => {
    let alias = "Usuario";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        firstName: {
            type: dataTypes.STRING(45), //Controlar si esta bien que ponga 45. En clave de sol decia 50.
            allowNull: false
        },
        lastName: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        nickname: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        birthday: {
            type: dataTypes.DATE, 
            allowNull: false
        },
        email: {
            type: dataTypes.STRING(60),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(60),
            allowNull: false
        },
        avatar: {
            type: dataTypes.STRING(60),
            allowNull: false
        },
        userProfile_id: {
            type: dataTypes.INTEGER,
            allowNull: false, 
            references:{
                model: "usersProfile", //ó probar con perfil
                key: "id",
            }
        }
    };
        
    let config = {
        tableName: "users",
        timestamps: false
    };

    const Usuario = sequelize.define(alias,cols,config);

    //Asociación relacion de muchos a uno
    Usuario.associate = function (models) {
        Usuario.belongsTo(models.Perfil, { 
            as: "perfiles",
            foreignKey: "userProfile_id", 
            
        })
    }

    return Usuario;
}