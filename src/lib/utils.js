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

export const getResponse = (error) => {
	const payload = {
		code: error.code,
		message: error.message
	}
	return payload;
}

