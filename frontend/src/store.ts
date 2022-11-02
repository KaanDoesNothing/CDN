import {defineStore} from "pinia";
import Axios from "axios";

export const useUserStore = defineStore("user", {
    state: (): userStore => {
        return {user: undefined, socket: {settings: undefined}}
    },
    actions: {
        async updateSession() {
            const session = await Axios.get("/api/session");

            if(!session.data.error) {
                this.$state.user = session.data;
            }
        }
    }
});

export interface userStore {
    user: any;
    socket: any
}