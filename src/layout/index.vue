<!--  -->
<template>
  <div class="layout">
    <router-view></router-view>
    <van-tabbar
      @change="trigger"
      v-model="active"
      active-color="#2595E8"
      inactive-color="#666"
    >
      <van-tabbar-item name="takeaway">
        <span>外卖</span>
        <template #icon>
          <i class="takeaway-icon takeaway-waimai icon-size"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="search">
        <span>搜索</span>
        <template #icon>
          <i class="takeaway-icon takeaway-compass icon-size"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="order">
        <span>订单</span>
        <template #icon>
          <i class="takeaway-icon takeaway-dingdan icon-size"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item name="my">
        <span>我的</span>
        <template #icon>
          <i class="takeaway-icon takeaway-my icon-size"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
const mapActive = {
  takeaway: 0,
  search: 1,
  order: 2,
  my: 3
}
const mapRoute = {
  0: 'takeaway',
  1: 'search',
  2: 'order',
  3: 'my'
}
export default {
  name: 'LayoutView',
  data() {
    return {
      active: 0
    }
  },
  watch: {
    $route: {
      handler(val) {
        if (val.name !== mapRoute[this.active]) {
          this.active = mapActive[val.name]
        }
      },
      immediate: true
    }
  },
  methods: {
    trigger(name) {
      this.$router.push({
        name
      })
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.layout {
  ::v-deep .van-tabbar {
    box-shadow: 0 -0.5px 0.2px rgba(0, 0, 0, 0.1);
  }
}
.icon-size {
  font-size: 19px;
}
</style>
