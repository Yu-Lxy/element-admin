<template>
  <div class="container-a">
    <div class="tab">
      <router-link v-for="(item, key) in tabList" :key="key" class="tabs" :to="{ path: item.path }">{{item.meta.title}}</router-link>
    </div>
    <div class="content">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RouterTabView',
  data () {
    return {
      tabList: []
    }
  },
  watch: {
    $route () {
      this.tab(this.routes)
    }
  },
  computed: {
    routes () {
      return this.$store.state.user.routers
    }
  },
  methods: {
    tab (routerMap, parent) {
      routerMap.forEach(item => {
        if (item.name === this.$route.name && parent && parent.children) {
          this.tabList = parent.children
          return false
        }
        if (item.children && item.children.length > 0) {
          this.tab(item.children, item)
        }
      })
    }
  },
  mounted () {
    this.tab(this.routes)
  }
}
</script>

<style lang="scss" scoped>
.container-a {
  padding: 30px 20px;
  .tab {
    width: 100%;
    padding-bottom: 7px;
    color: #aaa;
    border-bottom: #e4e7ed solid 1px;
    font-size: 14px;
    .active {
      color: #75a7dc;
      font-weight: 600;
      background: #f5f8fb;
    }
    .tabs {
      padding: 10px 20px;
      border-top:  #e4e7ed solid 1px;
      border-right:  #e4e7ed solid 1px;
    }
    .tabs:first-child {
      border-radius: 5px 0 0 0;
      border-left:  #e4e7ed solid 1px;
    }
    .tabs:last-child {
      border-radius: 0 5px 0 0;
    }
  }
  .content {
    padding: 20px 0;
  }
}
</style>
