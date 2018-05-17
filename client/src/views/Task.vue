<template>
  <div class="todo">
    <div class="row">
      <div class="col-12 mt-4">
        <h3>Current Tasks</h3>
        <button class="btn btn-success mt-3 mb-3" data-toggle="modal" data-target="#modalAddTask">Add new Task</button>
      </div>
      <div class="col-lg-3 col-xs-12 mt-3">
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <h6><strong>FILTER OPTIONS</strong></h6>
          </li>
          <li class="list-group-item">
            <button class="btn btn-link" @click="showAllTasks">Show All</button>
          </li>
          <li class="list-group-item">
            <button class="btn btn-link" @click="getNotFinishTasks">Show Not Done</button>
          </li>
          <li class="list-group-item">
            <button class="btn btn-link" @click="getFinishTasks">Show Done</button>
          </li>
        </ul>
      </div>
      <div class="col-lg-9 col-xs-12 mt-3">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Task</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody v-for="(task, index) in tasks" :key="index">
            <table-task :task="task" :index="index"></table-task>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Add Task Modal -->
    <div class="modal fade" id="modalAddTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label>Task Name:</label>
            <input type="text" class="form-control" v-model="taskName">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" v-on:click="addTask" data-dismiss="modal">Add</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TableTask from '../components/TableTask.vue'

export default {
  data () {
    return {
      taskName: '',
    }
  },
  computed: {
    ...mapState(['tasks']),
  },
  components: {
    'table-task': TableTask
  },
  created () {
    this.$store.dispatch('getAllTasks', localStorage.getItem('token'))
    let fbToken = localStorage.getItem('fb')
    let token = localStorage.getItem('token')
    if (token !== null) {
      if (fbToken == '1'){
        this.$store.commit('userLoginFB')
      }
      this.$store.commit('userLoggedIn')
    } else {
      this.$router.push('/')
    }
    this.$store.dispatch('getAllTasks', token)
  },
  methods: {
    addTask () {
      if (this.taskName == '') {
        swal('You must fill in a task!', {icon: 'warning'})
      }else{
        let taskDetail = {
          task: this.taskName,
          token: localStorage.getItem('token')
        }
        this.$store.dispatch('addNewtask', taskDetail)
      }
    },
    showAllTasks () {
      this.$store.dispatch('getAllTasks', localStorage.getItem('token'))
    },
    getNotFinishTasks () {
      let taskDetail = {
        status: 'Not Done',
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('getTaskByStatus', taskDetail)
    },
    getFinishTasks () {
      let taskDetail = {
        status: 'Done',
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('getTaskByStatus', taskDetail)
    }
  }
}
</script>

<style>

</style>
