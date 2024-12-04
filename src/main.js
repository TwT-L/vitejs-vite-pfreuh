import { createApp } from 'vue';
import 'vant/lib/index.css';
import './style.css';
import App from './App.vue';
import { Icon, PullRefresh, List, Cell, Tabbar, TabbarItem } from 'vant';
createApp(App)
  .use(PullRefresh)
  .use(List)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Cell)
  .use(Icon)
  .mount('#app');
