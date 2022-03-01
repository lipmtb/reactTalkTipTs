
import React, { lazy } from "react";
// import { FormComponentProps } from "antd/es/form"
// import { RouteComponentProps } from "react-router-dom";
const Talk = lazy(() => import("../views/talk"));
const Tip = lazy(() => import("../views/tip"));
const Login = lazy(() => import("../views/login"));
const Home = lazy(() => import("../views/home"));
const ServiceMap = lazy(() => import("../views/serviceMap"));
export type Path = {
    pathname: string;
    state: object;

}

export interface ItRoute {
    // component: React.LazyExoticComponent<React.ComponentType<RouteComponentProps|FormComponentProps>>;
    component: React.LazyExoticComponent<React.ComponentType<any>>;
    exact?: boolean;
    path: string | undefined;
    cache?: boolean;
    key?: string;
    name?: string;
    meta?: object;
    [props: string]: unknown;
}
const getRoutes: () => ItRoute[] = () => {
    return [{
        component: Home,
        exact: true,
        path: "/home",
        key: "myhome",
        cache: false,
        name: "homepage",
        meta: {
            id: "homeid",
            menuId: "1000"
        }
    }, {
        component: Login,
        exact: true,
        path: "/",
        cache: false,
        key: "userloginpage",
        name: "loginpage",
        meta: {
            id: "login",
            menuId: "1100"
        }
    }, {
        component: Talk,
        exact: true,
        path: "/talk",
        key: "mytalk",
        cache: true,
        name: "talkpage",
        meta: {
            id: "talkId",
            menuId: "1101"
        }
    }, {
        component: Tip,
        exact: true,
        path: "/tip",
        cache: true,
        name: "tippage",
        key: "mytip",
        meta: {
            id: "tipId",
            menuId: "1102"
        }
    }, {
        component: ServiceMap,
        exact: true,
        path: "/map",
        cache: true,
        name: "mappage",
        key: "jjccmap",
        meta: {
            id: "mapId",
            menuId: "map1101"
        }
    }];
}

export { getRoutes }