import * as AdminService from './admin.service.js';
import { getErrorResponse, getSuccessResponse } from '../../lib/utils.js';

export const createAdmin = async (req, res) => {
	let result;
	let response;
	let { email, password } = req.body;
	try {
		let newAdmin = await AdminService.createAdmin({ email, password });
		result = { admin: newAdmin };
		response = getSuccessResponse(result);
	} catch (error) {
		response = getErrorResponse(error);
	}
	return res.json(response);
}
