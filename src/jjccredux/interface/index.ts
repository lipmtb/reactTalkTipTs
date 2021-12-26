//用户信息
interface userInfoState {
    userName: string;
    userId: string;
    jjccToken: string;
}



interface actionType {
    type: string;
    data: object;
}


// 根state
interface MyStoreState {
    user: userInfoState

}

export type {
    MyStoreState,
    userInfoState,
    actionType
}