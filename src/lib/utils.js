import { apiCode } from "./api-code.js";

export function normalizePort(port) {
	const parsedPort = parseInt(port, 10);
	return parsedPort;
}

export const getSuccessResponse = (result) => {
	const payload = {
		code: apiCode.OK,
		message: 'OK',
		result: result
	}
	return payload;
}

export const getErrorResponse = (error) => {
	const payload = {
		code: apiCode.INTERNAL_SERVER_ERROR,
		message: error,
		result: {}
	}
	return payload;
}
