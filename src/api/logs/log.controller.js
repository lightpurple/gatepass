import * as LogService from './log.service.js';
import { getErrorResponse, getSuccessResponse } from '../../lib/utils.js';

export const getLogs = async (req, res) => {
	let result;
	let response;

	try {
		let logs = await LogService.getLogs();
		result = { logs: logs };
		response = getSuccessResponse(result);
	} catch (error) {
		response = getErrorResponse(error);
	}
	return res.json(response);
}

export const deleteLogs = async (req, res) => {
	let response;
	let { logs } = req.body;

	try {
		await LogService.deleteLogs(logs);
		response = getSuccessResponse({});
	} catch (error) {
		response = getErrorResponse(error);
	}
	return res.json(response);
}
