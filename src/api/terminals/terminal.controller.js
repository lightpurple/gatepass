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
		let newTerminal = await TerminalService.createTerminal({ number });
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
	const terminalId = req.params.terminalId;
	const { number } = req.body;

	try {
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
	const terminalId = req.params.terminalId;

	try {
		await TerminalService.deleteTerminal(terminalId);
		response = getSuccessResponse({});
	} catch (error) {
		response = getErrorResponse(error);
	}
	return res.json(response);
}
