import { Terminals } from './terminals.model.js';
import { DataTypes, Model } from 'sequelize';
import { Grants } from './grants.model.js';

export class Users extends Model {
	static initModel(sequelize) {
		Users.init({
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			name: {
				type: DataTypes.STRING,
				allowNull: true
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: true
			},
			serial_number: {
				type: DataTypes.STRING,
				allowNull: true
			}
		}, {
			sequelize,
			tableName: 'users',
			modelName: 'user',
			freezeTableName: true,
			timestamps: true,
			paranoid: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at'
		});
		return Users;
	}

	static async getUsers() {
		return await this.findAll({
			order: [['id', 'ASC']],
			raw: true
		});
	}

	static async getUser(userId) {
		return await this.findOne({
			where: {
				id: userId
			}
		});
	}

	static async getUserBySn(sn) {
		return await this.findOne({
			where: {
				serial_number: sn
			}
		});
	}

	static async createUser(user) {
		return await this.create(user);
	}

	static async updateUser(userId, user) {
		return await this.update(
			user,
			{
				where: {
					id: userId
				}
			});
	}

	static async deleteUser(userId) {
		await this.destroy(
			{
				where: {
					id: userId
				}
			}
		)
	}

	static async getUserGrants(userId) {
		return await this.findAll({
			include: [{
				model: Terminals,
				required: false,
				attributes: ['id', 'number', 'created_at', 'updated_at']
			}],
			where: {
				id: userId
			},
			attributes: ['id'],
			raw: true,
			nest: true
		});
	}
}
