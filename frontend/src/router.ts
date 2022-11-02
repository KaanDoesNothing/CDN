import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/home.vue";
import Login from "./pages/authentication/login.vue";
import Register from "./pages/authentication/register.vue";
import Uploads from "./pages/dashboard/uploads.vue";
import Settings from "./pages/dashboard/settings.vue";
import Collections from "./pages/dashboard/collections.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/auth/login",
        name: "Login",
        component: Login
    },
    {
        path: "/auth/register",
        name: "Register",
        component: Register
    },
    {
        path: "/dashboard/uploads",
        name: "Uploads",
        component: Uploads
    },
    {
        path: "/dashboard/settings",
        name: "Settings",
        component: Settings
    },
    {
        path: "/dashboard/collections",
        name: "Collections",
        component: Collections
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;