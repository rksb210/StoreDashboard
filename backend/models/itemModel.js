module.exports = (sequelize, DataTypes) => {
    const Item = sequelize.define(
      "Item",
      {
        item_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        itemName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
  
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
          }
      },
      {
        tableName: "items",
        timestamps:false
      }
    );
    return Item;
  };
  