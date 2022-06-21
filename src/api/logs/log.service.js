import { Logs } from "../../models/logs.model.js";

export const getLogs = async () => {
	const terminals = await Logs.getLogs();
	return terminals;
}

export const deleteLogs = async (logs) => {
	for (let logId of logs) {
		await Logs.deleteLog(logId);
	}
}
