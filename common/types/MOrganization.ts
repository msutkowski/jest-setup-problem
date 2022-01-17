import IMAccount from "./MAccount";

interface IMOrganization {
	id: number;
	name: string;
	owner: IMAccount;
	logoUrl: string;
	modules: string[];
	members: number[];
	pendingMembers: number[];
}

export default IMOrganization;
