import * as UserService from './user.service.js';
import { getResponse, getSuccessResponse, parseRequest } from '../../lib/utils.js';
import { ApiError, parseError } from '../../lib/error.js';
import { apiCode } from '../../lib/api-code.js';
import logger from '../../lib/logger.js';

export const getUsers = async (req, res) => {
	let result;
	let response;

	try {
		let users = await UserService.getUsers();
		result = { users: users };
		response = getSuccessResponse(result);
	} catch (error) {
		error.code = error.code || apiCode.INTERNAL_SERVER_ERROR;
		error.code === apiCode.INTERNAL_SERVER_ERROR ? logger.error(parseError(error)) : logger.info(parseError(error));
		response = getResponse(error);
	}
	return res.json(response);
}

export const createUser = async (req, res) => {
	let result;
	let response;
	let { name, phone, serialNumber } = req.body;

	try {
		logger.req(parseRequest(req));
		if ([name, phone, serialNumber].some(param => param === undefined)) {
			throw new ApiError(apiCode.BAD_REQUEST, 'some value is invalid');
		}
		let newUser = await UserService.createUser({ name, phone, serial_number: serialNumber });
		result = { user: newUser };
		response = getSuccessResponse(result);
	} catch (error) {
		error.code = error.code || apiCode.INTERNAL_SERVER_ERROR;
		error.code === apiCode.INTERNAL_SERVER_ERROR ? logger.error(parseError(error)) : logger.info(parseError(error));
		response = getResponse(error);
	}
	return res.json(response);
}

export const modifyUser = async (req, res) => {
	let result;
	let response;
	const userId = parseInt(req.params.userId);
	const { name, phone, serialNumber } = req.body;

	try {
		logger.req(parseRequest(req));
		if (isNaN(userId)) throw new ApiError(apiCode.BAD_REQUEST, 'userId is NaN');
		await UserService.modifyUser(userId, { name, phone, serial_number: serialNumber });
		result = {
			user: {
				id: userId
			}
		};
		response = getSuccessResponse(result);
	} catch (error) {
		error.code = error.code || apiCode.INTERNAL_SERVER_ERROR;
		error.code === apiCode.INTERNAL_SERVER_ERROR ? logger.error(parseError(error)) : logger.info(parseError(error));
		response = getResponse(error);
	}
	return res.json(response);
}

export const deleteUser = async (req, res) => {
	let response;
	const userId = parseInt(req.params.userId);

	try {
		logger.req(parseRequest(req));
		if (isNaN(userId)) throw new ApiError(apiCode.BAD_REQUEST, 'userId is NaN');
		await UserService.deleteUser(userId);
		response = getSuccessResponse({});
	} catch (error) {
		error.code = error.code || apiCode.INTERNAL_SERVER_ERROR;
		error.code === apiCode.INTERNAL_SERVER_ERROR ? logger.error(parseError(error)) : logger.info(parseError(error));
		response = getResponse(error);
	}
	return res.json(response);
}

export const getUserGrants = async (req, res) => {
	let result;
	let response;
	const userId = parseInt(req.params.userId);

	try {
		logger.req(parseRequest(req));
		if (isNaN(userId)) throw new ApiError(apiCode.BAD_REQUEST, 'userId is NaN');
		const grants = await UserService.getUserGrants(userId);
		result = {
			terminals: grants
		};
		response = getSuccessResponse(result);
	} catch (error) {
		error.code = error.code || apiCode.INTERNAL_SERVER_ERROR;
		error.code === apiCode.INTERNAL_SERVER_ERROR ? logger.error(parseError(error)) : logger.info(parseError(error));
		response = getResponse(error);
	}
	return res.json(response);
}

export const addUserGrants = async (req, res) => {
	let result;
	let response;
	const userId = parseInt(req.params.userId);
	const terminalId = parseInt(req.body.terminalId);

	try {
		logger.req(parseRequest(req));
		if (isNaN(userId)) throw new ApiError(apiCode.BAD_REQUEST, 'userId is NaN');
		if (isNaN(terminalId)) throw new ApiError(apiCode.BAD_REQUEST, 'terminalId is NaN');
		const newGrant = await UserService.addUserGrants(userId, terminalId);
		result = {
			terminal: newGrant
		};
		response = getSuccessResponse(result);
	} catch (error) {
		error.code = error.code || apiCode.INTERNAL_SERVER_ERROR;
		error.code === apiCode.INTERNAL_SERVER_ERROR ? logger.error(parseError(error)) : logger.info(parseError(error));
		response = getResponse(error);
	}
	return res.json(response);
}
