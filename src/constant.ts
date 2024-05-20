export interface IssuanceInfo {
	isLogin: string;
	userName: string;
	result: IssuanceHistory[];
}

export interface IssuanceHistory {
	date: string;
	cardList: CardInfo[];
}

export interface CardInfo {
	cardName: string;
	rpc: string; //응답코드
	ingbCode: string;
	imgPath: string;
	status: string;
}
