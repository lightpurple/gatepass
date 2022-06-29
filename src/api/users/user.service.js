import { Users } from "../../models/users.model.js";
import { Terminals } from "../../models/terminals.model.js";
import { Grants } from "../../models/grants.model.js";
import { ApiError } from "../../lib/error";
import { apiCode } from "../../lib/api-code.js";
import { Op } from "sequelize";

export const getUsers = async () => {
	const users = await Users.getUsers();
	return users;
}

export const createUser = async (user) => {
	const user = await Users.findOne({
		where: {
			[Op.or]: [{
				serial_number: user.serial_number
			}, {
				phone: user.phone
			}]
		}
	});
	if (user) throw new ApiError(apiCode.CONFLICT, `The user(${user.id}) already exist`);
	const newUser = await Users.createUser(user);
	return newUser;
}

export const modifyUser = async (userId, param) => {
	const user = await Users.getUser(userId);
	if (!user) throw new ApiError(apiCode.BAD_REQUEST, `The user(${userId}) does not exist`);
	await Users.updateUser(userId, param)
}

export const deleteUser = async (userId) => {
	const user = await Users.getUser(userId);
	if (!user) throw new ApiError(apiCode.BAD_REQUEST, `The user(${userId}) does not exist`);
	await Users.deleteUser(userId);
}

export const getUserGrants = async (userId) => {
	const user = await Users.getUser(userId);
	if (!user) throw new ApiError(apiCode.NOT_FOUND, `The user(${userId}) does not exist`)
	const grants = await Users.getUserGrants(userId);
	return grants.map((grant) => {
		delete grant.terminals.grant;
		return grant.terminals;
	});
}

export const addUserGrants = async (userId, terminalId) => {
	const user = await Users.getUser(userId);
	if (!user) throw new ApiError(apiCode.NOT_FOUND, `The user(${userId}) does not exist`)
	const terminal = await Terminals.getTerminal(terminalId);
	if (!terminal) throw new ApiError(apiCode.NOT_FOUND, `The terminal(${terminalId}) does not exist`)
	const grant = await Grants.getGrant(user.id, terminal.id);
	if (grant) throw new ApiError(apiCode.NOT_FOUND, `The user(${userId}) already has grant for terminal(${terminalId})`);

	await Grants.addGrant(userId, terminalId);
	return terminal;
}
