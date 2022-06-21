import * as UserService from './user.service.js';
import { getErrorResponse, getSuccessResponse } from '../../lib/utils.js';

export const getUsers = async (req, res) => {
	let result;
	let response;

	try {
		let users = await UserService.getUsers();
		result = { users: users };
		response = getSuccessResponse(result);
	} catch (error) {
		response = getErrorResponse(error);
	}
	return res.json(response);
}

export const createUser = async (req, res) => {
	let result;
	let response;
	let { name, phone, serialNumber } = req.body;

	try {
		let newUser = await UserService.createUser({ name, phone, serialNumber });
		result = { user: newUser };
		response = getSuccessResponse(result);
	} catch (error) {
		response = getErrorResponse(error);
	}
	return res.json(response);
}

export const modifyUser = async (req, res) => {
	let result;
	let response;
	const userId = req.params.userId;
	const { name, phone, serialNumber } = req.body;

	try {
		await UserService.modifyUser(userId, { name, phone, serial_number: serialNumber });
		result = {
			user: {
				id: userId
			}
		};
		response = getSuccessResponse(result);
	} catch (error) {
		response = getErrorResponse(error);
	}
	return res.json(response);
}

export const deleteUser = async (req, res) => {
	let response;
	const userId = req.params.userId;

	try {
		await UserService.deleteUser(userId);
		response = getSuccessResponse({});
	} catch (error) {
		response = getErrorResponse(error);
	}
	return res.json(response);
}

export const getUserGrants = async (req, res) => {
	let result;
	let response;
	const userId = req.params.userId;

	try {
		const grants = await UserService.getUserGrants(userId);
		result = {
			terminals: grants
		};
		response = getSuccessResponse(result);
	} catch (error) {
		response = getErrorResponse(error);
	}
	return res.json(response);
}

export const addUserGrants = async (req, res) => {
	let result;
	let response;
	const userId = req.params.userId;
	const { terminalId } = req.body;

	try {
		const newGrant = await UserService.addUserGrants(userId, terminalId);
		result = {
			terminal: newGrant
		};
		response = getSuccessResponse(result);
	} catch (error) {
		response = getErrorResponse(error);
	}
	return res.json(response);
}
