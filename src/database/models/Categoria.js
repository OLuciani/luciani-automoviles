module.exports = (sequelize, dataTypes) => {
    let alias = "Categoria";

    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        category: {
            type: dataTypes.STRING(45), //Controlar si esta bien que ponga 45. En clave de sol decia 50.
            allowNull: false
        }, 
    };
        
    let config = {
        tableName: "productscategory",
        timestamps: false
    };

    const Categoria = sequelize.define(alias,cols,config);

    //Asociación relacion de muchos a uno
    Categoria.associate = function (models) {
        Categoria.hasMany(models.Producto, { 
            as: "productos",
            foreignKey: "category_id", 
            
        })
    }

    return Categoria;
}