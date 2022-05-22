
import React, { lazy } from "react";
// import { FormComponentProps } from "antd/es/form"
// import { RouteComponentProps } from "react-router-dom";
const Talk = lazy(() => import("../views/talk"));
const Tip = lazy(() => import("../views/tip"));
const Login = lazy(() => import("../views/login"));
const Home = lazy(() => import("../views/home"));
const ServiceMap = lazy(() => import("../views/serviceMap"));
const LoadingGamePage = lazy(() => import("../views/loadingGamePage"));
const LoadingPage = lazy(() => import("../views/LoadingPage"));
const MoreHomePtt = lazy(() => import("../views/MoreHomePtt"));

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
        exact: false,
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
        path: "/map/:mapid",
        cache: true,
        name: "mappage",
        key: "jjccmap",
        meta: {
            id: "mapId",
            menuId: "map1101"
        }
    }, {
        component: LoadingGamePage,
        exact: true,
        path: "/loadingGame",
        cache: true,
        name: "loadinggame123",
        key: "loadingjjccgame",
        meta: {
            id: "loadinggame040401",
            menuId: "loadinggamemenuid040401"
        }
    }, {
        component: LoadingPage,
        exact: true,
        path: "/loadingArea",
        cache: true,
        name: "loadingArea2333",
        key: "loadingAreaCpn",
        meta: {
            id: "loadingArea23330501",
            menuId: "menu-loadingArea23330501"
        }
    }, {
        component: MoreHomePtt,
        exact: true,
        path: "/pttMore",
        cache: true,
        name: "pptPopupMore",
        key: "pptPopupMore050801",
        meta: {
            id: "pptPopupMore050801",
            menuId: "menu-pptpoupMore050801"
        }
    }];
}

export { getRoutes }