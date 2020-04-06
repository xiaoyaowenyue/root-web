export interface UserVO {
    id: string;
    username: string;
    nickname: string;
    email: string;
    avatar: string;
}

export interface UserInfo extends UserVO {
    menus: any;
}