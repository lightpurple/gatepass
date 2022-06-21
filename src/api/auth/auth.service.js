import { Grants } from "../../models/grants.model.js";
import { Logs } from "../../models/logs.model.js";
import { Terminals } from "../../models/terminals.model.js";
import { Users } from "../../models/users.model.js";

export const authTerminal = async (terminalNumber, serialNumber) => {
	let status;
	let terminal = await Terminals.getTerminalByNumber(terminalNumber);
	let user = await Users.getUserBySn(serialNumber);
	let grant = await Grants.getGrant(user?.id, terminal?.id);
	status = grant !== null ? '성공' : '실패';
	await Logs.createLog(user, terminal, status);
}
