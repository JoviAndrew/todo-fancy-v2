<template>
  <div id="app">
    <nav v-if="isLogin" class="navbar navbar-expand-lg navbar-dark bg-warning">
      <router-link class="navbar-brand" to="home">To-Do Fancy</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="btn btn-warning" to="home">Home</router-link>
          </li>
          <li class="navbar-nav active">
            <router-link class="btn btn-warning" to="task">Tasks</router-link>
          </li>
          <li class="navbar-nav active">
            <router-link v-if="notFbLogin" class="btn btn-warning logoutBtn" to="profile">Profile</router-link>
          </li>
        </ul>
        <button class="btn btn-warning" @click="logout">Logout</button>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['isLogin', 'notFbLogin'])
  },
  methods: {
    logout () {
      swal({
        title: "Alert",
        text: "Do you really want to log out?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((logout) => {
        if (logout) {
          swal("You have successfully logged out!", {
            icon: "success",
          })
          localStorage.removeItem('token')
          localStorage.removeItem('firstname')
          localStorage.removeItem('lastname')
          localStorage.removeItem('username')
          localStorage.removeItem('fb')
          this.$store.commit('userLoggedOut')
          this.$router.push('/')
        } 
      })
    },
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

a.btn.btn-warning {
  color: white;
}

button.btn.btn-warning {
  color: white;
}
</style>
