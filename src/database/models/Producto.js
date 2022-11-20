module.exports = (sequelize, dataTypes) => {
    let alias = "Producto";

    let cols = {

        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45), //Controlar si esta bien que ponga 45. En clave de sol decia 50.
            allowNull: false
        },
        type: {
            type:dataTypes.STRING(45),
            allowNull: false
        },
        model: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        image: {
            type: dataTypes.STRING(60),
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER,
            allowNull: false, 
            references:{
                model: "productsCategories",
                key: "id"
            }
        }
    };
        
    let config = {
        tableName: "products",
        timestamps: false
    };

    const Producto = sequelize.define(alias,cols,config);

    //Asociación relacion de muchos a uno
    Producto.associate = function (models) {
        Producto.belongsTo(models.Categoria, { 
            as: "categorias",
            foreignKey: "category_id", 
            
        })
    }

    return Producto;
}