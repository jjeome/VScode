let template = `<div>
                  <ul id="myUL">
                    <template v-for="item in items">
                     <li v-bind:key="item.no"
                          v-bind:class="{ checked : item.yn }"
                          v-on:click="checkedItem(item.no)">
                          {{ item.contents }}
                          <span class="close"
                                v-on:click="deleteItem(item.no)">x</span>
                      </li>
                    </template>
                  </ul>
                </div>`; 


export default {
  template : template,
  
  data : function(){
    return {
      //created로 data를 items으로 받고, itemList로 뿌림
      items : [],
      updateItem : {} 
    }
  },
  computed : {
    itemList : function(){
      
    }
  },

  watch: {
    updateItem : function(){

    }
  },

  //데이터들어오는 created속성
  created : function(){
    const component = this;
    $.ajax({
      url : 'http://localhost:8088/java/todoSelect',
      data : {
        id : 0
      },
      dataType : 'json',
      success : function(data){
        if(data != null){
          component.items = data;
        }
      },
      error : function(reject){
        console.log(reject);
      }
    })
    

  },
  methods : {
    loadData : function(){
     
    },
    checkedItem : function(no, todoyn){
      const component = this; 

      if(todoyn == 0){
        let zero = todoyn;
      } else if(todoyn == 1){
        let one = todoyn;
      }

      $.ajax({
        url:'http://localhost:8088/java/todoUpdate',
        type : 'put',
        data : {
          id : 0,
          no : no,
          todoyn : zero
        },
        dataTyep : 'json',
        success : function(data){
          if(todoyn == zero){
            component.todoyn = true;
          } 

          if(todoyn == one){
            component.todoyn = false;
          }
        },
        error : function(reject){
          console.log(reject)
        }
      })
    },
    deleteItem : function(no){
      const component = this;
      $.ajax({
        url:'http://localhost:8088/java/todoDelete/' + no,
        type : 'delete',
        data : {
          id : 0,
          no : no
        },
        dataType : 'json',
        success : function(data){
          if(data != null){
            component.$router.go(0);
          }
        },
        error : function(reject){
          console.log(reject);
        }
      })
    }
  }
}