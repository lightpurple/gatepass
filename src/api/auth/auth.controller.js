import * as AuthService from './auth.service.js';
import { getResponse, getSuccessResponse } from '../../lib/utils.js';
import { ApiError } from '../../lib/error.js';
import { apiCode } from '../../lib/api-code.js';

export const authTerminal = async (req, res) => {
	let response;
	const { terminalNumber, serialNumber } = req.body;

	try {
		if (terminalNumber === undefined || serialNumber === undefined) throw new ApiError(apiCode.BAD_REQUEST, 'some value is invalid');
		await AuthService.authTerminal(terminalNumber, serialNumber);
		response = getSuccessResponse({});
	} catch (error) {
		error.code = error.code || apiCode.INTERNAL_SERVER_ERROR;
		response = getResponse(error);
	}
	return res.json(response);
}
