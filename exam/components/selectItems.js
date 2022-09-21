let template =
  `
<div>
  <ul id="myUL">
  <template v-for="item in itemList">
  <li :key="item.no" :class = "{checked : item.yn}" @click="checkedItem(item.no, item.todoyn)">
  {{ item.contents }}
  <span class="close" @click.self.stop="deleteItem(item.no)">x</span>
  </li>
  </template>
  </ul>
</div> 
`

export default {
  template,
  data: function () {
    return {
      items: [],
      updateItem: {}
    }
  },
  computed: {
    itemList: function () {
      return $.map(this.items, function (item) {
        item.yn = item.todoyn == '1' ? true : false;
        return item;
      })
    }
  },
  watch: {
    // updateItem: function () {
    //   const component = this;
    //   $.ajax({
    //     url: 'http://localhost:8086/java/todoList/',
    //     type: 'PUT',
    //     data: component.updateItem,
    //     dataType: 'json',
    //     success: function (data) {
    //       if (data != null) {
    //         alert("todoList update");
    //         component.loadData()
    //       }
    //     },
    //     error: function (reject) {
    //       console.log(reject);
    //     }
    //   })
    // }
  },
  created: function () {
    this.loadData()
  },
  methods: {
    loadData: function () {
      const component = this;
      $.ajax({
        url: 'http://localhost:8088/java/todoSelect',
        data: {
          id : 0,
        },
        dataType: 'json',
        success: function (data) {
          component.items = data;
        },
        error: function (reject) {
          console.log(reject)
        }
      })
    },
    // checkedItem: function (no) {
    //   const component = this;
    //   console.log(this.items)
    //   $(this.items).each(function (item) {
    //     item = item + 1
    //     if (item == no) {
    //       console.log(item.yn)
    //      //item.todoyn = item.todoyn == '1' ? '0' : '1';
    //     component.updateItem = item;
    //    }
    //   })
    //   },

    checkedItem: function (no, todoyn) {
      const component = this;
      $.ajax({
        url: 'http://localhost:8088/java/todoUpdate/' + no + '/' + todoyn,
        type: 'PUT',
        data: {
          id: 0,
          no: no,
          todoyn : todoyn
        },
        dataType: 'json',
        success: function (data) {
          console.log(todoyn)
          if (data != null) {
            alert("todoList update");
            component.loadData()
          }
        },
        error: function (reject) {
          console.log(reject);
        }
      })
    },

    deleteItem: function (no) {
      console.log(no)
      const component = this;
      $.ajax({
        url: 'http://localhost:8088/java/todoDelete/' + no,
        type: 'delete',
        data: {
          id: 0,
          no: no
        },
        dataType: 'json',
        success: function (data) {
          if (data != null) {
            alert("todoList Delete");
            component.items = $.grep(component.items, function (item) {
              return (item.no != no);
            })
          }
        },
        error: function (reject) {
          console.log(reject);
        }
      })
    }
  }
}