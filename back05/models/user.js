const Sequelize = require('sequelize');


class User extends Sequelize.Model{
    // 컬럼 정의 하는 함수
    static initiate(sequelize){
        User.init({
            name:{
                type:Sequelize.STRING(20),
                allowNull: false,
                unique:true
            },
            age:{
                type:Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married:{
                type:Sequelize.BOOLEAN,
                allowNull: false,
            },
            comment:{
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW
            }

        },
        {
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:"USER",
            tableName:"users",
            paranoid:false,
            charset:"utf8",
            collate:"utf8_general_ci",
        }
    );
    }

    static associate(db){
        db.User.hasMany(db.Comment,{foreignKey:'commenter',targetKey:'id'});
    }
}

module.exports = User;