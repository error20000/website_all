// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'

import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-chalk/index.css'
import './css/loading.css'
import './css/public.css'

Vue.config.productionTip = false

Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

//新增路由
/*const page = name => () => import('@/pages/'+ name);

 let apps = JSON.parse(window.localStorage.getItem('apps'));

 if(apps){
	let routes = [];
	//创建路由
	for (let i = 0; i < apps.length; i++) {
		let app ={
			  path: apps[i].app.domain,
			  name: apps[i].app.name,
			  component:  page('index'),
			  children: []
		}
		for (let j = 0; j < apps[i].menus.length; j++) {
			let menu ={
				  path: apps[i].menus[j].url.replace(apps[i].app.domain+"/", ""),
				  name: apps[i].menus[j].name,
				  component:  page(apps[i].menus[j].url.substring(1))
			}
			app.children.push(menu);
		}
		routes.push(app);
	}
	router.addRoutes(routes);
	console.log(router);
	console.log(routes);
 }*/
