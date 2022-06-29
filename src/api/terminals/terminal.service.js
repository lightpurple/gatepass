import { apiCode } from "../../lib/api-code.js";
import { ApiError } from "../../lib/error.js";
import { Terminals } from "../../models/terminals.model.js";

export const getTerminals = async () => {
	const terminals = await Terminals.getTerminals();
	return terminals;
}

export const createTerminal = async (number) => {
	const terminal = await Terminals.getTerminalByNumber(number);
	if (terminal) throw new ApiError(apiCode.CONFLICT, `The terminal(${terminal.id}) already exist`);
	const newTerminal = await Terminals.create({ number });
	return newTerminal;
}

export const modifyTerminal = async (terminalId, number) => {
	const terminal = await Terminals.getTerminal(terminalId);
	if (!terminal) throw new ApiError(apiCode.NOT_FOUND, `The terminal(${terminal.id}) does not exist`);
	await Terminals.modifyTerminal(terminalId, number);
}

export const deleteTerminal = async (terminalId) => {
	const terminal = await Terminals.getTerminal(number);
	if (!terminal) throw new ApiError(apiCode.NOT_FOUND, `The terminal(${terminal.id}) does not exist`);
	await Terminals.deleteTerminal(terminalId);
}
