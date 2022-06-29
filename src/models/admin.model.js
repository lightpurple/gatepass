import { DataTypes, Model } from 'sequelize';

export class Admin extends Model {
	static initModel(sequelize) {
		Admin.init({
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			email: {
				type: DataTypes.STRING,
				allowNull: true
			},
			password: {
				type: DataTypes.STRING,
				allowNull: true
			}
		}, {
			sequelize,
			tableName: 'admins',
			modelName: 'admin',
			freezeTableName: true,
			timestamps: true,
			paranoid: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at',
			defaultScope: {
				attributes: { exclude: ['password'] },
			},
			hooks: {
				afterCreate: (model) => {
					delete model.dataValues.password;
				}
			}
		});
		return Admin;
	}
}
