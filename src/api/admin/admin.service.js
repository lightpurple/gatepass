import { apiCode } from "../../lib/api-code.js";
import { ApiError } from "../../lib/error.js";
import { Admin } from "../../models/admin.model.js";

export const createAdmin = async (param) => {
	const admin = await Admin.findOne({
		where: {
			email: param.email
		}
	});
	if (admin) throw new ApiError(apiCode.CONFLICT, `The admin(${admin.id}) already exist`);
	let newAdmin = await Admin.create(param);
	return newAdmin;
}
