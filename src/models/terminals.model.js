import { DataTypes, Model } from 'sequelize';

export class Terminals extends Model {
	static initModel(sequelize) {
		Terminals.init({
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true
			},
			number: {
				type: DataTypes.STRING,
				allowNull: true
			}
		}, {
			sequelize,
			tableName: 'terminals',
			modelName: 'terminal',
			freezeTableName: true,
			timestamps: true,
			paranoid: true,
			createdAt: 'created_at',
			updatedAt: 'updated_at',
			deletedAt: 'deleted_at',
		});
		return Terminals;
	}

	static async getTerminals() {
		return await this.findAll({
			order: [['id', 'ASC']],
			raw: true
		});
	}

	static async getTerminal(termianlId) {
		return await this.findOne({
			where: {
				id: termianlId
			}
		});
	}

	static async getTerminalByNumber(termianlNumber) {
		return await this.findOne({
			where: {
				number: termianlNumber
			}
		});
	}

	static async modifyTerminal(terminalId, number) {
		return await this.update({
			number
		}, {
			where: {
				id: terminalId
			}
		});
	}

	static async deleteTerminal(termianlId) {
		return await this.destroy({
			where: {
				id: termianlId
			}
		});
	}
}
