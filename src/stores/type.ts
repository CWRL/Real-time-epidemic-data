export interface RootObject {
	area: string;
	curConfirm: number;
}
export interface Message {
	id: number;
	city: string;
	confirmed: number;
	died: number;
	confirmedRelative: number;
	nativeRelative: number;
	curConfirm: number;
	asymptomaticLocalRelative: number;
	asymptomatic: number;
	crued: number;
	time: string;
	tworelative: number;
	threerelative: number;
}

export interface RootObject1 {
	state: number;
	message: Message[];
}
export interface RootObject2 {
	id: number;
	area: string;
	confirmed: number;
	died: number;
	confirmedRelative: number;
	nativeRelative: number;
	curConfirm: number;
	asymptomaticLocalRelative: number;
	asymptomatic: number;
	crued: number;
	time: string;
	tworelative: number;
}
export interface RootObject3 {
	city: string;
	danger: any[];
	modeldanger: any[];
}