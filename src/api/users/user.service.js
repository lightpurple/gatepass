import { Users } from "../../models/users.model.js";
import { Terminals } from "../../models/terminals.model.js";
import { Grants } from "../../models/grants.model.js";

export const getUsers = async () => {
	const users = await Users.getUsers();
	return users;
}

export const createUser = async (user) => {
	const newUser = await Users.createUser(user);
	return newUser;
}

export const modifyUser = async (userId, user) => {
	await Users.updateUser(userId, user)
}

export const deleteUser = async (userId) => {
	await Users.deleteUser(userId);
}

export const getUserGrants = async (userId) => {
	const grants = await Users.getUserGrants(userId);
	return grants.map((grant) => {
		delete grant.terminals.grant;
		return grant.terminals;
	});
}

export const addUserGrants = async (userId, terminalId) => {
	await Grants.addGrant(userId, terminalId);
	return Terminals.getTerminal(terminalId);
}
