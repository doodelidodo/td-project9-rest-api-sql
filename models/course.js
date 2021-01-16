'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    class Course extends Sequelize.Model {}
    Course.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A title is required',
                },
                notEmpty: {
                    msg: 'Please provide a title',
                },
            },
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A description is required',
                },
                notEmpty: {
                    msg: 'Please provide a description',
                },
            },
        },
        estimatedTime: {
            type: Sequelize.STRING,
        },
        materialsNeeded: {
            type: Sequelize.STRING,
        },
    }, { sequelize });

    Course.associate = (models) => {
        Course.belongsTo(models.User, {
            as: "user",
            foreignKey: {
                fieldName: 'userId',
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'A user-id is required'
                    },
                    notEmpty: {
                        msg: 'Please provide a user-id'
                    }
                }
            },
        });
    };

    return Course;
};
