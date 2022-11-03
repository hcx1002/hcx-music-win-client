export interface UserProfile {
	userId: number;
	userType: number;
	nickname: string;
	avatarImgId: number;
	avatarUrl: string;
	backgroundImgId: number;
	backgroundUrl: string;
	signature?: any;
	createTime: number;
	userName: string;
	accountType: number;
	shortUserName: string;
	birthday: number;
	authority: number;
	gender: number;
	accountStatus: number;
	province: number;
	city: number;
	authStatus: number;
	description?: any;
	detailDescription?: any;
	defaultAvatar: boolean;
	expertTags?: any;
	experts?: any;
	djStatus: number;
	locationStatus: number;
	vipType: number;
	followed: boolean;
	mutual: boolean;
	authenticated: boolean;
	lastLoginTime: number;
	lastLoginIP: string;
	remarkName?: any;
	viptypeVersion: number;
	authenticationTypes: number;
	avatarDetail?: any;
	anchor: boolean;
}
export interface CommonUser {
	avatarUrl: string;
	userId: number;
	nickname: string;
}
export interface UserQRCodeKey{
	code:number
	unikey:string
}
export interface UserQRCode{
	qrurl:string
	qrimg:string
}
export interface checkQRCode{
	avatarUrl?:string
	code:number
	cookie:string
	message:string
	nickname?:string
}
