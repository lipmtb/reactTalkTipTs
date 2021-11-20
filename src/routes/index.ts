
import Home from "../views/home";
import Login from "../views/login";

const myRouter=[{
    path:"/login",
    name:"login",
    component:Login
},{
    path:"/home",
    name:"home",
    component:Home
}]


export default myRouter;