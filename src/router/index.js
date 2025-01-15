import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import(/* webpackChunkName: "CreateLink" */ '../views/home.vue');
const GletscherSpalte  = () => import(/* webpackChunkName: "GletscherSpalte" */ '../views/GletscherSpalte.vue');
const BergLodge  = () => import(/* webpackChunkName: "BrunniBerglodgeRestaurantRistis" */ '../views/BrunniBerglodgeRestaurantRistis.vue');
const AperoLaub  = () => import(/* webpackChunkName: "CafeAperoBarLaub" */ '../views/CafeAperoBarLaub.vue');
const Hoheneck  = () => import(/* webpackChunkName: "CafezumHoheneck" */ '../views/CafezumHoheneck.vue');
const GrandBarSingh  = () => import(/* webpackChunkName: "GrandBarSingh" */ '../views/GrandBarSingh.vue');
const Sportingpark  = () => import(/* webpackChunkName: "Sportingpark" */ '../views/Sportingpark.vue');
const TitlisBaerghuisJochpass  = () => import(/* webpackChunkName: "TitlisBaerghuisJochpass" */ '../views/TitlisBaerghuisJochpass.vue');
const Admin  = () => import(/* webpackChunkName: "TitlisBaerghuisJochpass" */ '../views/AdminDashboard.vue');



const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/gletscherspalte',
        name: 'GletscherSpalte',
        component: GletscherSpalte
    },
    {
        path: '/brunni-berglodge',
        name: 'BrunniBerglodgeRestaurantRistis',
        component: BergLodge
    },
    {
        path: '/laub',
        name: 'Café&ApéroBarLaub',
        component: AperoLaub
    },
    {
        path: '/hoheneck',
        name: 'DasVerrückteCafezumHoheneck',
        component: Hoheneck
    },
    {
        path: '/grand-bar-singh',
        name: 'GrandBarSingh',
        component: GrandBarSingh
    },
    {
        path: '/sportingpark',
        name: 'Sportingpark',
        component: Sportingpark
    },
    {
        path: '/titlis-baerghuis',
        name: 'TitlisBaerghuisJochpass',
        component: TitlisBaerghuisJochpass
    },
    {
        path: '/administrator',
        name: 'administrator',
        component: Admin
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;