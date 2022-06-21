import * as AuthService from './auth.service.js';
import { getErrorResponse, getSuccessResponse } from '../../lib/utils.js';

export const authTerminal = async (req, res) => {
	let response;
	const { terminalNumber, serialNumber } = req.body;

	try {
		await AuthService.authTerminal(terminalNumber, serialNumber);
		response = getSuccessResponse({});
	} catch (error) {
		response = getErrorResponse(error);
	}
	return res.json(response);
}
