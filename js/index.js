/* eslint-disable no-undef */
/* eslint-disable no-new */
// eslint-disable-next-line no-undef
const app = new Vue({
  el: '#todo-app',
  data: {
    newTodo: '',
    todos: [],
    todosActive: 0,
    filter: null,
    darkmode: false,
  },
  mounted() {
    this.getLocalStorage();
    const body = document.querySelector('body');
    this.darkmode = JSON.parse(localStorage.dark)
    if (this.darkmode) { 
      body.classList.add('dark');
    }
  },
  watch: {
    todos: function() {
      this.todosActive = this.todos.filter((todo) => !todo[1]).length;
    },
  },
  methods: {
    getLocalStorage() {
      if (localStorage.todo) {
        this.todos = JSON.parse(localStorage.todo);
        // this.todosActive = this.todos.filter((todo) => todo[1] === false);
      }
    },
    setlocalStorage() {
      localStorage.setItem('todo', JSON.stringify(this.todos));
    },
    addTodo() {
      this.todos.push([this.newTodo, false]);
      this.setlocalStorage();
      this.newTodo = '';
    },
    check(event) {
      const index = event.target.id;
      this.todos[index][1] = event.target.checked;
      this.setlocalStorage();
      this.getLocalStorage();
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
      this.setlocalStorage();
    },
    filterTodos(filter) {
      this.filter = filter;
    },
    clearCompleted() {
      this.todos = this.todos.filter((todo) => todo[1] === false);
      this.setlocalStorage();
    },
    darkMode() {
      const body = document.querySelector('body');
      body.classList.toggle('dark');
      localStorage.setItem('dark', JSON.stringify(body.classList.contains('dark')));
    },
  },
});