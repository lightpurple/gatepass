import { Terminals } from "../../models/terminals.model.js";

export const getTerminals = async () => {
	const terminals = await Terminals.getTerminals();
	return terminals;
}

export const createTerminal = async (terminal) => {
	const newTerminal = await Terminals.create(terminal);
	return newTerminal;
}

export const modifyTerminal = async (terminalId, number) => {
	await Terminals.modifyTerminal(terminalId, number)
}

export const deleteTerminal = async (terminalId) => {
	await Terminals.deleteTerminal(terminalId);
}
