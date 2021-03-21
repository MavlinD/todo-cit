import Vue from 'vue'
import App from './App.vue'
import { router } from './routes'
import './main.scss'
import mixins from 'src/tools/mixins'

Vue.config.productionTip = false
Vue.mixin(mixins)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
