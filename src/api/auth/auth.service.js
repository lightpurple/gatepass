import { apiCode } from "../../lib/api-code.js";
import { ApiError } from "../../lib/error.js";
import { Grants } from "../../models/grants.model.js";
import { Logs } from "../../models/logs.model.js";
import { Terminals } from "../../models/terminals.model.js";
import { Users } from "../../models/users.model.js";

export const authTerminal = async (terminalNumber, serialNumber) => {
	let status;
	let terminal = await Terminals.getTerminalByNumber(terminalNumber);
	if (!terminal) throw new ApiError(apiCode.NOT_FOUND, `The terminal(${terminal.id}) does not exist`)
	let user = await Users.getUserBySn(serialNumber);
	if (!user) throw new ApiError(apiCode.NOT_FOUND, `The user(${user.id}) does not exist`)
	let grant = await Grants.getGrant(user?.id, terminal?.id);
	if (grant) throw new ApiError(apiCode.NOT_FOUND, `The user(${user.id}) already has grant for terminal(${terminal.id})`);

	status = grant !== null ? '성공' : '실패';
	await Logs.createLog(user, terminal, status);
}
