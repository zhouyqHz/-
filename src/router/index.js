import Vue from 'vue'
import VueRouter from 'vue-router'
//解决router多次点击报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};
import NewTest from '../views/NewTest'
Vue.use(VueRouter);

const routes = [
    {
      path: '/newtest',
      name: 'newtest',
      component: NewTest
    },
    {
        path: '/',
        component: () => import('@/views/login'),
        hidden: true
    },
    {
        path: '/home',
        component: () => import('@/views/NewMap'),
        hidden: true
    },
];

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
});
// router.beforeEach((to, from, next) => {
//     let token = sessionStorage.getItem("token");
//     if(!token){
//         to.path === '/login' ? next() : next("/login");
//     }else{
//         next();
//     }
//     history.pushState(null, null, document.URL);
// });
export default router
