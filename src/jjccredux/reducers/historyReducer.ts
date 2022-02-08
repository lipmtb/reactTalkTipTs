import * as H from "history";
import { SETBROWSERHIS, CLEARHIS } from "../actionType";
const initHistory = { historyme: null };


//保存登录界面的props.history
export default function historyReducer(prevState: { historyme: H.HashHistory | H.BrowserHistory | null } = initHistory, action: { type: string, data: H.HashHistory | H.BrowserHistory }) {
    const { type, data } = action;
    switch (type) {
        case SETBROWSERHIS: {
            (prevState as {
                historyme: H.HashHistory | H.BrowserHistory;
            }).historyme = data;
            return {
                ...prevState
            }
        }
        case CLEARHIS: {
            (prevState as {
                historyme: H.HashHistory | H.BrowserHistory | null;
            }).historyme = null;
            return {
                ...prevState
            }
        }
        default: {
            return prevState;
        }
    }
}