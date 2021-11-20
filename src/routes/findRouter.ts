import {ComponentType} from "react";
import {RouteComponentProps} from "react-router-dom";
import myRouter from "./index"
export function findRouter(pathname: string): ComponentType | ComponentType<RouteComponentProps> | undefined {
    let cpn = undefined;
    myRouter.forEach((routeitem) => {
        if (routeitem.path === pathname) {
            cpn = routeitem.component;
        }
    })
    return cpn;
}