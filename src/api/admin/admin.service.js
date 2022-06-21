import { Admin } from "../../models/admin.model.js";

export const createAdmin = async (admin) => {
	const newAdmin = await Admin.create(admin);
	return newAdmin;
}
