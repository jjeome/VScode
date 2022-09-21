import router from './router/router.js';
import todoHeader from './components/todoHeader.js';

let template = `<div>
                  <todo-header></todo-header>
                  <router-view></router-view>
                </div>`;

//Vue instance
let app = new Vue({
  el : '#app',
  template : template,
  components : {
    todoHeader
  },
  router
})