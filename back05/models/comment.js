const Sequelize = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');

class Comment extends Sequelize.Model{
    static initiate(sequelize){
        Comment.init(
            {
                comment:{
                    type:Sequelize.STRING,
                    allowNull: false,
                },
                created_at:{
                    type:Sequelize.DATE,
                    allowNull:true,
                    defaultValue:Sequelize.NOW,
                },

            },
            {
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:"COMMENT",
            tableName:"comments",
            paranoid:false,
            charset:"utf8",
            collate:"utf8_general_ci",
        }
        );
    }
    static associate(db){
        db.Comment.belongsTo(db.User,{foreignKey:'commenter',targetKey:'id'});
    }
}

module.exports = Comment;