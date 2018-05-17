<template>
  <div class="profile">
    <div class="row">
      <div class="col-12 mt-3">
          <h6><strong>If you only want to change your username, then you can leave the new password and confirm password blank</strong></h6>
      </div>
    </div>
      <div class="formProfile">
        <div class="formBody">
          <label>Username:</label>
          <input v-model="username" class="form-control" type="text">
          <label>Old Password:</label>
          <input v-model="oldPassword" class="form-control" id="newPass" type="password" placeholder="Minimum 6 Alphanumeric Characters">
          <label>New Password:</label>
          <input v-model="newPassword" class="form-control" id="oldPass" type="password" placeholder="Minimum 6 Alphanumeric Characters">
          <label>Confirm Password:</label>
          <input v-model="confirm" class="form-control" type="password" placeholder="Confirm Password">
          <button class="btnUpdate btn btn-success mt-4" v-on:click="updateUser()">Update</button>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return{
      username: localStorage.getItem('username'),
      oldPassword: '',
      newPassword: '',
      confirm: ''
    }
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
  },
  methods: {
    updateUser () {
      let userData = {
        username: this.username,
        oldPass: this.oldPassword,
        newPass: this.newPassword,
        confirm: this.confirm,
        token: localStorage.getItem('token')
      }
      this.$store.dispatch('updateProfile', userData)          
    }
  }
}
</script>

<style scoped>
.formProfile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3%;
    padding: 2%;
    border: 1px solid orange;
}

button.btnUpdate.btn.btn-outline-success {
    margin: 2%;
}

.row.footer {
    background-color: bisque;
    /* position: fixed; */
    left: 0;
    bottom: 0;
    width: 100%;
    color: white;
    -webkit-text-stroke: 1px lightsalmon;
    font-size: 15px;
    text-align: center;
}

label {
  margin-top: 3%;
  font-weight: bold;
  text-align: left
}

.formBody {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3%;
  width: 50%;
  background-color: rgb(252, 79, 48);
  color: white;
}
</style>
