import * as LogService from './log.service.js';
import { getResponse, getSuccessResponse, parseRequest } from '../../lib/utils.js';
import { ApiError, parseError } from '../../lib/error.js';
import { apiCode } from '../../lib/api-code.js';
import logger from '../../lib/logger.js';

export const getLogs = async (req, res) => {
	let result;
	let response;

	try {
		let logs = await LogService.getLogs();
		result = { logs: logs };
		response = getSuccessResponse(result);
	} catch (error) {
		error.code = error.code || apiCode.INTERNAL_SERVER_ERROR;
		error.code === apiCode.INTERNAL_SERVER_ERROR ? logger.error(parseError(error)) : logger.info(parseError(error));
		response = getResponse(error);
	}
	return res.json(response);
}

export const deleteLogs = async (req, res) => {
	let response;
	let { logs } = req.body;

	try {
		logger.req(parseRequest(req));
		if (logs === undefined) throw new ApiError(apiCode.BAD_REQUEST, 'some value is invalid');
		logs = logs.map((id) => {
			id = parseInt(id);
			if (isNaN(id)) throw new ApiError(apiCode.BAD_REQUEST, 'logId is NaN');
			return id;
		})
		await LogService.deleteLogs(logs);
		response = getSuccessResponse({});
	} catch (error) {
		error.code = error.code || apiCode.INTERNAL_SERVER_ERROR;
		error.code === apiCode.INTERNAL_SERVER_ERROR ? logger.error(parseError(error)) : logger.info(parseError(error));
		response = getResponse(error);
	}
	return res.json(response);
}
