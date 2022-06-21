import { Terminals } from '../models/terminals.model.js';
import { Users } from '../models/users.model.js';
import { DataTypes, Model } from 'sequelize';

export class Grants extends Model {

	static initModel(sequelize) {
		Grants.init({
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: Users,
					key: 'id'
				}
			},
			terminal_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: Terminals,
					key: 'id'
				}
			}
		}, {
			sequelize,
			tableName: 'grants',
			modelName: 'grant',
			freezeTableName: true,
			timestamps: true,
			paranoid: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at'
		});
		return Grants;
	}

	static async getGrant(userId, terminalId) {
		return await this.findOne({
			where: {
				user_id: userId,
				terminal_id: terminalId
			},
			raw: true
		});
	}

	static async addGrant(userId, terminalId) {
		return await this.create({
			user_id: userId,
			terminal_id: terminalId,
		});
	}

}
