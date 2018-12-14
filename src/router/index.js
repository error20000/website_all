import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/pages/index'
import Login from '@/pages/login'
import NotFound from '@/pages/404'

Vue.use(Router)

const page = name => () => import('@/pages/'+ name);
 
const router = new Router({
  base: '/admin',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'default',
      component: Index
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    //auth
    {
      path: '/auth',
      name: 'auth',
      component: Index,
      children: [{
        path: 'app',
        name: '应用管理',
        component: page('auth/app')
      },{
        path: 'menu',
        name: '菜单管理',
        component: page('auth/menu')
      },{
        path: 'ifs',
        name: '接口管理',
        component: page('auth/ifs')
      },{
        path: 'user',
        name: '用户管理',
        component: page('auth/user')
      }]
    },
    //www
    {
      path: '/www',
      name: 'www',
      component: Index,
      children: [{
        path: '',
        name: '',
        component: page('')
      }]
    },
    //yy
    {
      path: '/yy',
      name: 'yy',
      component: Index,
      children: [{
        path: 'config',
        name: '预约配置',
        component: page('yy/config')
      },{
        path: 'list',
        name: '预约记录',
        component: page('yy/list')
      },{
        path: 'offset',
        name: '预约偏移量',
        component: page('yy/offset')
      },{
        path: 'count',
        name: '预约统计',
        component: page('yy/count')
      },{
        path: 'smslog',
        name: '短信日志',
        component: page('yy/smslog')
      }/* ,{
        path: 'ad/config',
        name: '短信推广',
        component: page('yy/ad/config')
      },{
        path: 'ad/list',
        name: '短信推广记录',
        component: page('yy/ad/list')
      },{
        path: 'ad/count',
        name: '短信推广统计',
        component: page('yy/ad/count')
      } */]
    },
    //act
    {
      path: '/act',
      name: 'act',
      component: Index,
      children: [{
        path: 'type',
        name: '活动分类',
        component: page('act/type')
      },{
        path: 'config',
        name: '活动配置',
        component: page('act/config')
      },{
        path: 'list',
        name: '活动记录',
        component: page('act/list')
      },{
        path: 'count',
        name: '活动统计',
        component: page('act/count')
      },{
        path: 'model',
        name: '活动模版',
        component: page('act/model')
      },{
        path: 'custom/type',
        name: '分类属性',
        component: page('act/custom/type')
      },{
        path: 'custom/config',
        name: '配置属性',
        component: page('act/custom/config')
      },{
        path: 'custom/model',
        name: '模版属性',
        component: page('act/custom/model')
      }]
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log("to path: "+ to.path);
  console.log("from path: "+ from.path);
  next();
})
export default router;