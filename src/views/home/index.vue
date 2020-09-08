<template>
  <div class="dashboard-container">
    <div class="dashboard-text">{{ msg }}</div>
  </div>
</template>

<script>
// import { getUserList } from '@/service/'

export default {
  name: 'home',
  data () {
    return {
      msg: 'home'
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    async initData () {
      // console.log(this.$route)
      try {
        // let res=await getUserList()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
