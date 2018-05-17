<template>
  <div class="login">
    <div class="row" id="landingMain">
      <div class="col-lg-6 col-sm-12" id="title">
          <h1 id="title">To-Do Fancy!</h1>
      </div>
      <div class="col-lg-6 col-sm-12-" id="loginDiv">
          <h2>Login</h2>
          <input v-model="username" class="form-control" type="text" placeholder="Username">
          <input v-model="password" class="form-control mt-3 mb-3" type="password" placeholder="Password">
          <button class="btn btn-outline-warning" type="button" @click="login">Login</button>
          <router-link to="register" class="btn btn-link">Register</router-link>
          <button type="button" scope="public_profile, email, gender" class="btn btn-primary my-2 my-sm-0" @click="openFbLoginDialog">Login with Facebook</button>
      </div>
    </div>
  </div>
</template>
 
<script>
import swal from 'sweetalert'

window.fbAsyncInit = function() {
  FB.init({
    appId      : '191927258109113',
    cookie     : true,
    xfbml      : true,
    version    : 'v3.0'
  });
  FB.AppEvents.logPageView()  
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0]
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id
  js.src = "https://connect.facebook.net/en_US/sdk.js"
  fjs.parentNode.insertBefore(js, fjs)
}(document, 'script', 'facebook-jssdk'))

export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  created () {
    let token = localStorage.getItem('token')
    if (token !== null) {
      this.$router.push('/home')
    }
  },
  methods: {
    openFbLoginDialog () {
      FB.login(this.checkLoginState, { scope: 'email' })
    },
    checkLoginState: function (response) {
      let self = this
      if (response.status === 'connected') {
        FB.api('me', { fields: ['id', 'first_name', 'email', 'last_name'] }, function (profile) {
          self.$store.dispatch('loginFB', profile)
        })
      } else if (response.status === 'not_authorized') {
        // the user is logged in to Facebook,
        // but has not authenticated your app
      } else {
        // the user isn't logged in to Facebook.
        // alert('Please login!')
        // self.$router.push('/')
      }
    },
    sendtoRegis () {
      window.location.href = 'register.html'
    },
    login () {
      let username = this.username
      let password = this.password
      if (username === '' || password === '') {
        swal('Fields must not be empty!', {icon: 'warning'})
      }
      let userData = {
        username: username,
        password: password
      }
      this.$store.dispatch('loginUser', userData)
      this.username = '',
      this.password = ''
    }
  }
}
</script>

<style scoped>
div#landingMain{
    display: flex;
    align-items: center;
    margin: 15% 3%;
    padding:0;
    background-color: blanchedalmond
}

div#loginDiv{
    background-color: white;
}

div#title {
    align-self: center;
    padding: 0
}

#title{
  text-align: center;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  color: coral;
  font-size: 60px;
  -webkit-text-stroke: 2px white;
  font-weight: bold
}
</style>
