import * as AdminService from './admin.service.js';
import { getResponse, getSuccessResponse, parseRequest } from '../../lib/utils.js';
import { ApiError, parseError } from '../../lib/error.js';
import { apiCode } from '../../lib/api-code.js';
import logger from '../../lib/logger.js';

export const createAdmin = async (req, res) => {
	let result;
	let response;
	let { email, password } = req.body;
	try {
		logger.req(parseRequest(req));
		if (email === undefined || password === undefined) {
			throw new ApiError(apiCode.BAD_REQUEST, 'some value is invalid');
		}
		let newAdmin = await AdminService.createAdmin({ email, password });
		result = { admin: newAdmin };
		response = getSuccessResponse(result);
	} catch (error) {
		error.code = error.code || apiCode.INTERNAL_SERVER_ERROR;
		error.code === apiCode.INTERNAL_SERVER_ERROR ? logger.error(parseError(error)) : logger.info(parseError(error));
		response = getResponse(error);
	}
	return res.json(response);
}
