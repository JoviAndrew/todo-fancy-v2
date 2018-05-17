<template>
  <div class="register">
    <div class="title">
        <h2>REGISTER!</h2>
    </div>
    <div class="form-group formBody">
      <label>First name</label>
      <input id="firstname" class="form-control" type="text" placeholder="Budi" v-model="firstname"><br>
      <label>Last name</label>
      <input id="lastname" class="form-control" type="text" placeholder="Budiman" v-model="lastname"><br>
      <label>Username</label>
      <input id="username" class="form-control" type="text" placeholder="budiman@mail.com" v-model="username"><br>
      <label>Password</label>
      <input type="password" class="form-control" placeholder="Minimum 6 alphanumeric characters" v-model="password"><br>
      <label>Confirm Password</label>
      <input type="password" class="form-control" placeholder="Minimum 6 alphanumeric characters" v-model="confirm"><br>
      <button class="btn btn-success" v-on:click="register">Register</button>
      <button class="btn btn-warning" @click="goToLogin">Cancel</button>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert'

export default {
  name: 'register',
  data () {
    return {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      confirm: ''
    }
  },
  methods: {
    goToLogin () {
      this.$router.push('/')
    },
    register () {
      let userData = {
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password
      }
      if (this.firstname === '') {
        swal('First name must be filled!', {icon: 'warning'})
      } else if (this.lastname === '') {
        swal('Last name must be filled!', {icon: 'warning'})
      } else if (this.username === '') {
        swal('Username must be filled!', {icon: 'warning'})
      } else if (this.password === '') {
        swal('Password must be filled!', {icon: 'warning'})
      } else if (this.password !== this.confirm) {
        swal('Password and confirm password is not the same!', {icon: 'warning'})
      } else {
        this.$store.dispatch('registerNewUser', userData)
      }
    }
  }
}
</script>

<style scoped>
.register{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3%;
  border: 1px solid orange;
}

div.title {
  align-self: center;
  margin-top: 3%;
  margin-bottom: 2%
}

.formBody {
  padding: 3%;
  width: 50%;
  background-color: rgb(252, 79, 48);
  color: white;
}

</style>
