<template>
  <div class="home">
    <h1 class="title">Welcome, {{ firstname }}</h1>
    <h6>You currently have <strong>{{ notDone }} task(s)</strong> that are not done yet and <strong>{{ finished }} task(s)</strong> finished</h6>
    <div class="weatherInfo">
      <h4>{{ weather.location.name }}</h4>
      <h1><strong>{{ weather.current.temperature}} Degrees Celcius</strong></h1>
      <img :src="weather.current.imageUrl">
      <h6>{{ weather.current.day}}, {{ weather.current.date}}</h6>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      firstname: localStorage.getItem('firstname'),
      notDone: 0,
      finished: 0
    }
  },
  computed: {
    ...mapState(['isLogin', 'notFbLogin', 'tasks', 'weather'])
  },
  beforeCreate () {
    this.$store.dispatch('getCurrentWeather')
  },
  created () {
    this.$store.dispatch('getAllTasks', localStorage.getItem('token'))
    this.getTaskStatuses()
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
    getTaskStatuses () {
      if (this.tasks.length !== 0) {
        let self = this
        let tasksTemp = this.tasks
        tasksTemp.forEach(task => {
          if (task.status === 'Done') {
            self.finished++
          }else if (task.status === 'Not Done') {
            self.notDone++
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.title {
  margin: 3%;
}

.weatherInfo{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid blue;
  border-radius: 8px;
  width: 50%;
  margin-right: auto;
  margin-left: auto;
  margin-top: 2%;
  padding: 2%;
  background: rgb(210, 242, 253)
}
</style>
