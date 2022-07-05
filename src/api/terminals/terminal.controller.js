import * as TerminalService from './terminal.service.js';
import { getResponse, getSuccessResponse, parseRequest } from '../../lib/utils.js';
import logger from '../../lib/logger.js';
import { parseError } from '../../lib/error.js';

export const getTerminals = async (req, res) => {
	let result;
	let response;

	try {
		let terminals = await TerminalService.getTerminals();
		result = { terminals: terminals };
		response = getSuccessResponse(result);
	} catch (error) {
		error.code = error.code || apiCode.INTERNAL_SERVER_ERROR;
		error.code === apiCode.INTERNAL_SERVER_ERROR ? logger.error(parseError(error)) : logger.info(parseError(error));
		response = getResponse(error);
	}
	return res.json(response);
}

export const createTerminal = async (req, res) => {
	let result;
	let response;
	let { number } = req.body;

	try {
		logger.req(parseRequest(req));
		if (number === undefined) throw new ApiError(apiCode.BAD_REQUEST, 'some value is invalid');
		let newTerminal = await TerminalService.createTerminal(number);
		result = { terminal: newTerminal };
		response = getSuccessResponse(result);
	} catch (error) {
		error.code = error.code || apiCode.INTERNAL_SERVER_ERROR;
		error.code === apiCode.INTERNAL_SERVER_ERROR ? logger.error(parseError(error)) : logger.info(parseError(error));
		response = getResponse(error);
	}
	return res.json(response);
}

export const modifyTerminal = async (req, res) => {
	let result;
	let response;
	const terminalId = parseInt(req.params.terminalId);
	const { number } = req.body;

	try {
		logger.req(parseRequest(req));
		if (isNaN(terminalId)) throw new ApiError(apiCode.BAD_REQUEST, 'terminalId is NaN');
		if (number === undefined) {
			throw new ApiError(apiCode.BAD_REQUEST, 'some value is invalid');
		}
		await TerminalService.modifyTerminal(terminalId, number);
		result = {
			terminal: {
				id: terminalId
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

export const deleteTerminal = async (req, res) => {
	let response;
	const terminalId = parseInt(req.params.terminalId);

	try {
		logger.req(parseRequest(req));
		if (isNaN(terminalId)) throw new ApiError(apiCode.BAD_REQUEST, 'terminalId is NaN');
		await TerminalService.deleteTerminal(terminalId);
		response = getSuccessResponse({});
	} catch (error) {
		error.code = error.code || apiCode.INTERNAL_SERVER_ERROR;
		error.code === apiCode.INTERNAL_SERVER_ERROR ? logger.error(parseError(error)) : logger.info(parseError(error));
		response = getResponse(error);
	}
	return res.json(response);
}
