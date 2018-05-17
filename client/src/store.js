import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    notFbLogin: true,
    tasks: [],
    weather: {},
  },
  mutations: {
    userLoginFB (state) {
      state.isLogin = true
      state.notFbLogin = false
    },
    userLoggedIn (state) {
      state.isLogin = true
    },
    userLoggedOut (state) {
      state.isLogin = false
      state.notFbLogin = true
    },
    setTodo (state, todoList) {
      state.tasks = todoList.data.list
    },
    setWeather (state, weatherData) {
      state.weather = weatherData.data.data[0]
    },
  },
  actions: {
    loginUser ({commit}, userData) {
      console.log('masuk store')
      axios.post('http://localhost:3000/index/login', 
        {username: userData.username, password: userData.password}
      )
        .then(function (response) {
          console.log(response.data)
          if (response.data.message != 'Success login') {
            swal(response.data.message, {icon: 'warning'})
          } else {
            swal(response.data.message, {icon: 'success'})
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('firstname', response.data.firstname)
            localStorage.setItem('lastname', response.data.lastname)
            localStorage.setItem('username', response.data.username)
            localStorage.setItem('fb', 0)
            commit('userLoggedIn')
            router.push('/home')
          }
        })
        .catch(function(error){
            swal(error.response.data.message, {icon: 'warning'})
        })
    },
    registerNewUser ({ dispatch }, userData) {
      axios.post('http://localhost:3000/index/register', {
        firstname: userData.firstname,
        lastname: userData.lastname,
        username: userData.username,
        password: userData.password
      })
        .then(function (response) {
          swal({
            title: 'Success',
            text: response.data.message,
            icon: 'success'
          })
          dispatch('loginAfterRegis', userData)
        })
        .catch(function(err){
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    loginAfterRegister ({ commit }, userData) {
      axios.post('http://localhost:3000/index/login', {
        username: userData.username,
        password: userData.password
      })
      .then(function (response) {
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('firstname', response.data.firstname)
        localStorage.setItem('lastname', response.data.lastname)
        localStorage.setItem('username', response.data.username)
        localStorage.setItem('fb', 0)
        commit('userLoggedIn')
        router.push('/home')
      })
      .catch(function (error) {
        swal({
          title: 'Error!',
          text: err.response.data.message,
          icon: 'warning'
        })
      })
    },
    loginFB ({ commit }, userProfile) {
      let username = userProfile.email
      let firstname = userProfile.first_name
      let lastname = userProfile.last_name
      let fbId = userProfile.id
      axios.post('http://localhost:3000/index/loginfb', {
        username: username,
        firstname: firstname,
        lastname: lastname,
        fbId: fbId
      })
        .then(function (response) {
          swal({
            title: 'Success',
            text: response.data.message,
            icon: 'success'
          })
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('firstname', response.data.firstname)
          localStorage.setItem('lastname', response.data.lastname)
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('fb', 1)
          commit('userLoginFB')
          router.push('/home')
        })
        .catch(function (err) {
          swal({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'warning'
          })
        })
    },
    getAllTasks ({ commit }, token) {
      axios.get('http://localhost:3000/todo/show', {headers: {token: token}})
      .then(function (todoList) {
        commit('setTodo', todoList)
      })
      .catch(function (err){
        swal({
          title: 'Error!',
          text: err.response.data.message,
          icon: 'warning'
        })
      })
    },
    getCurrentWeather ({ commit }) {
      axios.get('http://localhost:3000/weather/show-weather')
      .then(function (weatherData) {
        commit('setWeather', weatherData)
      })
      .catch(function (err) {
        swal({
          title: 'Error!',
          text: 'Something went wrong! Please contact the developer',
          icon: 'Warning'
        })
      })
    },
    addNewtask ({ dispatch }, taskDetail) {
      axios.post('http://localhost:3000/todo/add', {
        todo: taskDetail.task
      },
      {
        headers: {token: taskDetail.token}
      })
        .then(function (response) {
          swal(response.data.message, {icon: 'success'})
          dispatch('getAllTasks', taskDetail.token)
        })
        .catch(function (err) {
          swal(err.response.data.message, {icon: 'warning'})
        })
    },
    finishTask ({ dispatch }, taskDetail) {
      axios.put(`http://localhost:3000/todo/finish/${taskDetail.taskId}`, {}, {headers: {token: taskDetail.token}})
      .then(function (response) {
        swal(response.data.message, {icon: 'success'})
        dispatch('getAllTasks', taskDetail.token)
      })
      .catch(function (err) {
        swal(err.response.data.message, {icon: 'warning'})
      })
    },
    deleteTask ({ dispatch }, taskDetail) {
      axios.delete(`http://localhost:3000/todo/delete/${taskDetail.taskId}`, {headers: {token: taskDetail.token}})
      .then(function (response) {
        swal(response.data.message, {icon: 'success'})
        dispatch('getAllTasks', taskDetail.token)
      })
      .catch(function (err) {
        swal(err.response.data.message, {icon: 'warning'})
      })
    },
    updateTask ({ dispatch }, taskDetail) {
      axios.put(`http://localhost:3000/todo/update/${taskDetail.taskId}`, 
      {
        todo: taskDetail.task
      }, {
        headers: {
          token: taskDetail.token
        }
      })
      .then(function (response) {
        swal(response.data.message, {icon: 'success'})
        dispatch('getAllTasks', taskDetail.token)
      })
      .catch(function (err) {
        swal(err.response.data.message, {icon: 'warning'})
      })
    },
    getTaskByStatus ({ commit }, taskDetail) {
      axios.get(`http://localhost:3000/todo/show/${taskDetail.status}`, {headers: {token: taskDetail.token}})
      .then(function (taskData) {
        commit('setTodo', taskData)
      })
      .catch(function (err) {
        swal(err.response.data.message, {icon: 'warning'})
      })
    },
    updateProfile ({ commit }, userData) {
      //Change username only
      if (userData.newPass == '' && userData.confirm == '') {
        axios.put('http://localhost:3000/user/update-user',
        {
          username: userData.username,
          new_password: userData.newPass,
          old_password: userData.oldPass
        },
        {
          headers: {token: userData.token}
        })
          .then(function(response){
            let message = response.data.message
            if (message !== 'Successfully updated your profile') {
              swal(message, {icon: 'warning'})
            } else {
              swal(message, {icon: 'success'})
              localStorage.removeItem('username')
              localStorage.setItem('username', userData.username)
              router.push('/home')
            }
          })
          .catch(function(err){
            swal(err.response.data.message, {icon: 'warning'})
          })
      }
      //Change username + password 
      else {
        if(new_password != confirm){
          swal('Password and confirm password is not the same!', {icon: 'warning'})
        }else{
          axios.put('http://localhost:3000/user/update-user', 
          {
            username: username,
            new_password: new_password,
            old_password: old_password
          }, 
          {
            headers: {token: userData.token}
          })
            .then(function(response){
              let message = response.data.message
              if (message !== 'Successfully updated your profile') {
                swal(message, {icon: 'warning'})
              } else {
                swal(message, {icon: 'success'})
                localStorage.removeItem('username')
                localStorage.setItem('username', userData.username)
                router.push('/home')
              }
            })
            .catch(function(err){
              swal(err.response.data.message, {icon: 'warning'})
            })
        }
      } 
    }
  }
})
