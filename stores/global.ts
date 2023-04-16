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
        return {}
    },
    actions: {
        async authenticate() {
            const token = useCookie("token").value;

            if(!token) return;

            if(token) this.token = token;
            await this.fetchUser();

            if(this.user) {
                console.log(`Logged in as ${this.user.email}`);

                const router = useRouter();
                const route = useRoute();
            }

            return true;
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