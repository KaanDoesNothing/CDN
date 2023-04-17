import {defineStore} from "pinia";

export interface IGlobalStore {
    token?: string;
    user?: {
        username: string;
        email: string;
    },
}

export const useGlobalStore = defineStore("global", {
    state: (): IGlobalStore => {
        return {token: undefined}
    },
    actions: {
        async authenticate() {
            console.log("Authenticating!");
            if(!this.token) {
                const token = useCookie("token").value;

                console.log("Stored token", token);

                if(token) this.token = token;
            }

            console.log("Token", this.token);

            await this.fetchUser();

            if(this.user) {
                console.log(`Logged in as ${this.user.email}`);
            }else {
                console.log("Invalid token");
            }

            return;
        },
        async fetchUser() {
            const config = useRuntimeConfig();

            const res: any = await $fetch(`/api/user`, {body: {token: this.token}, method: "POST"}).catch(() => console.log("Unable to fetch user data"));

            if(!res) return;

            if(res.data) {
                this.user = res.data.user;
            }
        },
        async fetchExercises() {
            const config = useRuntimeConfig();

            const res: any = await $fetch(`${config.public.API}/user/exercises/list`, {body: {token: this.token}, method: "POST"}).catch(() => console.log("Unable to fetch user data"));

            return res.list;
        }
    }
});