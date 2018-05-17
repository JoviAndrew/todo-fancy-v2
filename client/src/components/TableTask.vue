<template>
  <tr>
    <th scope="row">{{ index+1 }}</th>
    <td>{{ task.todo }}</td>
    <td>{{ task.status }}</td>
    <td>
      <button class="btn btn-outline-warning" data-toggle="modal" data-target="#modalUpdateTask" @click="setForUpdate(task)">Edit</button>
      <button class="btn btn-outline-success" @click="finishTask(task._id)">Done</button>
      <button class="btn btn-outline-danger" @click="deleteTask(task._id)">Remove</button>
    </td>
    <!-- Update Modal -->
    <div class="modal fade" id="modalUpdateTask" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Update Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <label>Task Name:</label>
            <input type="text" class="form-control" v-model="newTask">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-success" @click="updateTask(task)" data-dismiss="modal">Update</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </tr>
</template>

<script>
export default {
  name: 'table-task',
  props: ['task', 'index'],
  data () {
    return {
      newTask: '',
      taskId: ''
    }
  },
  methods: {
    setForUpdate (taskDetail) {
      this.newTask = taskDetail.todo
      this.taskId = taskDetail._id
    },
    finishTask (id) {
      let taskDetail = {
        taskId: id,
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('finishTask', taskDetail)
    },
    deleteTask (id) {
      let taskDetail = {
        taskId: id,
        token: localStorage.getItem('token')
      }
      let self = this
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this task!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          self.$store.dispatch('deleteTask', taskDetail)
        }
      })
    },
    updateTask (taskDetail) {
      let payloadUpdateTask = {
        task: this.newTask,
        taskId: taskDetail._id,
        token: localStorage.getItem('token')
      }
      let self = this
      swal({
        title: "Are you sure?",
        text: "Do you really want to update the task?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willUpdate) => {
        self.$store.dispatch('updateTask', payloadUpdateTask)
      })
    }
  }
}
</script>

<style>

</style>
