
let template = `<div id="myDIV" class="header">
                <h2>My To Do List</h2>
                <input type="text" id="myInput" v-model="title" placeholder="Title...">
                <!-- <span onclick="newElement()" class="addBtn">Add</span> -->
                <span v-on:click="addItem" class="addBtn">
                Add
                </span>
                </div>`

//받은 값 서버에 넘기고 출력할 컴포넌트 호출 -> 해당컴포넌트에서 서버 데이터가지고옴
export default{
  template : template,
  
  data : function(){
    return {
      title : ''
    }
  },
  methods : {
    addItem : function(){
      const component = this;
      $.ajax({
        url : 'http://localhost:8088/java/todoInsert',
        type : 'post',
        data : {
          id : 0,
          contents : component.title
        },
        dataType : 'json',
        success : function(data){
          if(data != null){
            alert('To Do List Add!!');
            //새로고침
            component.$router.go(0);
          }
        },
        error : function(reject){
          console.log(reject)
        }
      })
    }
  }
}