import { DataTypes, Model } from 'sequelize';

export class Logs extends Model {

	static initModel(sequelize) {
		Logs.init({
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			user_name: {
				type: DataTypes.STRING,
				allowNull: true
			},
			user_phone: {
				type: DataTypes.STRING,
				allowNull: true
			},
			terminal_id: {
				type: DataTypes.INTEGER,
				allowNull: false
			},
			terminal_number: {
				type: DataTypes.STRING,
				allowNull: true
			},
			status: {
				type: DataTypes.STRING,
				allowNull: true
			}
		}, {
			sequelize,
			tableName: 'logs',
			modelName: 'log',
			freezeTableName: true,
			timestamps: true,
			paranoid: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at'
		});
		return Logs;
	}

	static async getLogs() { // offset, limit 설정하기
		return await this.findAll({
			order: [['id', 'DESC']],
			raw: true
		});
	}

	static async createLog(user, terminal, status) {
		await this.create({
			user_id: user.id,
			user_name: user.name,
			user_phone: user.phone,
			terminal_id: terminal.id,
			terminal_number: terminal.number,
			status: status
		});
	}

	static async deleteLog(logId) {
		await this.destroy({
			where: {
				id: logId
			}
		});
	}
}
