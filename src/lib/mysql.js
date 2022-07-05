import { Users } from '../models/users.model.js'
import { Terminals } from '../models/terminals.model.js'
import { Logs } from '../models/logs.model.js'
import { Admin } from '../models/admin.model.js'
import { Grants } from '../models/grants.model.js'
import { Sequelize } from 'sequelize'
import { env } from '../env.js'

const sequelize = new Sequelize(env.db.database, env.db.username, env.db.password, {
	host: env.db.host,
	dialect: 'mysql',
	port: env.db.port,
	define: {
		charset: 'utf8mb4',
		collate: 'utf8mb4_general_ci',
		freezeTableName: true
	},
	timezone: '+09:00',
	logging: false
});

function initModels() {
	Users.initModel(sequelize);
	Admin.initModel(sequelize);
	Terminals.initModel(sequelize);
	Logs.initModel(sequelize);
	Grants.initModel(sequelize);

	Users.belongsToMany(Terminals, { through: Grants , foreignKey: 'user_id', otherKey: 'terminal_id'});
	Terminals.belongsToMany(Users, { through: Grants , foreignKey: 'terminal_id', otherKey: 'user_id'});
}

export async function connect() {
	initModels();
	try {
		await sequelize.authenticate();
		await sequelize.sync({ force: false });
		console.log('Connection has been established sucqcessfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
}
