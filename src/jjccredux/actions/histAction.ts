import { SETBROWSERHIS, CLEARHIS } from "../actionType";
import * as H from "history";
type HistAction = {
    type: string,
    data: H.BrowserHistory | H.HashHistory | null
}

//保存登录views/login的history
export function setBrowserHisAction(data: H.BrowserHistory | H.HashHistory | null): HistAction {
    return {
        type: SETBROWSERHIS,
        data: data
    }
}
export function clearHisAction(data: H.BrowserHistory | H.HashHistory | null = null): HistAction {
    return {
        type: CLEARHIS,
        data: data
    }
}