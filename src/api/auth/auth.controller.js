import * as AuthService from './auth.service.js';
import { getResponse, getSuccessResponse, parseRequest } from '../../lib/utils.js';
import { ApiError, parseError } from '../../lib/error.js';
import { apiCode } from '../../lib/api-code.js';
import logger from '../../lib/logger.js';

export const authTerminal = async (req, res) => {
	let response;
	const { terminalNumber, serialNumber } = req.body;

	try {
		logger.req(parseRequest(req));
		if (terminalNumber === undefined || serialNumber === undefined) throw new ApiError(apiCode.BAD_REQUEST, 'some value is invalid');
		await AuthService.authTerminal(terminalNumber, serialNumber);
		response = getSuccessResponse({});
	} catch (error) {
		error.code = error.code || apiCode.INTERNAL_SERVER_ERROR;
		error.code === apiCode.INTERNAL_SERVER_ERROR ? logger.error(parseError(error)) : logger.info(parseError(error));
		response = getResponse(error);
	}
	return res.json(response);
}
