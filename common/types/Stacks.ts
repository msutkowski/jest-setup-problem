type PublicStackParamList = {
	SignIn: undefined;
	SignUp: undefined;
	ForgotPassword: undefined;
}

type ProtectedStackParamList = {
	ViewStack?: undefined;
}

type UserStackParamList = {
	Home: undefined;
	Saved: undefined;
	Explore: undefined;
	Tickets: undefined;
	Profile: undefined;
}

type OrgStackParamList = {
	Events: undefined;
	ScanTicket: undefined;
	Statistics: undefined;
	Profile: undefined;
}

export type { PublicStackParamList };
export type { ProtectedStackParamList };
export type { UserStackParamList };
export type { OrgStackParamList };
