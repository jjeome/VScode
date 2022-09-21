import selectItems from '../components/selectItems.js';


export default new VueRouter({
  mode : 'hash',
  routes : [
    {
      path : '/',
      name : 'selectItems',
      component : selectItems
    },

    {
      path : '*',
      redirect : '/'
    }
  ]
})