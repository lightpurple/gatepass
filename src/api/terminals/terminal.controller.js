import * as TerminalService from './terminal.service.js';
import { getErrorResponse, getSuccessResponse } from '../../lib/utils.js';

export const getTerminals = async (req, res) => {
	let result;
	let response;

	try {
		let terminals = await TerminalService.getTerminals();
		result = { terminals: terminals };
		response = getSuccessResponse(result);
	} catch (error) {
		response = getErrorResponse(error);
	}
	return res.json(response);
}

export const createTerminal = async (req, res) => {
	let result;
	let response;
	let { number } = req.body;

	try {
		if (number === undefined) {
			throw new ApiError(apiCode.BAD_REQUEST, 'some value is invalid');
		}
		let newTerminal = await TerminalService.createTerminal(number);
		result = { terminal: newTerminal };
		response = getSuccessResponse(result);
	} catch (error) {
		response = getErrorResponse(error);
	}
	return res.json(response);
}

export const modifyTerminal = async (req, res) => {
	let result;
	let response;
	const terminalId = parseInt(req.params.terminalId);
	const { number } = req.body;

	try {
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
		response = getErrorResponse(error);
	}
	return res.json(response);
}

export const deleteTerminal = async (req, res) => {
	let response;
	const terminalId = parseInt(req.params.terminalId);

	try {
		if (isNaN(terminalId)) throw new ApiError(apiCode.BAD_REQUEST, 'terminalId is NaN');
		await TerminalService.deleteTerminal(terminalId);
		response = getSuccessResponse({});
	} catch (error) {
		response = getErrorResponse(error);
	}
	return res.json(response);
}
