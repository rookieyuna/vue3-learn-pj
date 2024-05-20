export interface IssuanceInfo {
	isLogin: string;
	userName: string;
	result: IssuanceHistory[];
}

export interface IssuanceHistory {
	date: string;
	cardList: CardInfo[];
	grouped?: Record<string, CardInfo[]>;
	statusKeys?: string[];
}

export interface CardInfo {
	cardName: string;
	rpc: string; //응답코드
	ingbCode: string;
	imgPath: string;
	status: string;
}

// export interface NewList {
// 	[key: string]: CardInfo[];
// }
