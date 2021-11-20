
import {FC} from 'react'
interface LoginProps{
  operInfo:object
}
let LoginCpn:FC<LoginProps>=(props:LoginProps)=> {
    return (
        <div>
            <h2>登录注册</h2>
        </div>
    )
}

export default LoginCpn;
