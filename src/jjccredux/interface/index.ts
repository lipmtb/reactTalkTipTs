//用户信息
interface userInfo{
    userName:string,
    userId:string,
    token:string
}



interface actionType{
    type:string,
    data:userInfo
}


// 根state
interface MyStoreState {
    user:userInfo
   
}

export type{
    MyStoreState,
    userInfo,
    actionType
}