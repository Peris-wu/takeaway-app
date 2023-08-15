<!--  -->
<template>
  <div class="choose-city">
    <div class="header">
      <van-nav-bar class="ty-nav" right-text="登录|注册" left-arrow />
    </div>

    <div class="main">
      <!-- 当前定位城市 -->
      <div class="current-city">
        <div class="position-text">
          <span>当前定位</span>
        </div>
        <div class="position-city">
          <div class="left" @click="selectHotCity(currentPositionInfo)">
            <i class="takeaway-icon takeaway-dingwei3 icon-color"></i>
            {{ currentPositionInfo.name || '定位中...' }}
          </div>
          <div class="right" @click="getCurrentPositionCity">重新定位</div>
        </div>
      </div>
      <!--热门 城市 -->
      <div class="hot-city">
        <div class="ty-hot-text">热门城市</div>
        <div class="ty-hot-city-content">
          <van-grid :column-num="3" :border="false" :gutter="10">
            <van-grid-item
              :text="city.name"
              v-for="city in hotCity"
              :key="city.id"
              @click="selectHotCity(city)"
            />
          </van-grid>
        </div>
        <div class="ty-all-city">
          <van-index-bar
            highlight-color="#ccc"
            ref="refIndexBar"
            :index-list="Object.keys(allCity)"
          >
            <div v-for="(cityCollect, key) in allCity" :key="key">
              <van-index-anchor :index="key" />
              <van-cell
                :title="city.name"
                v-for="city in cityCollect"
                :key="city.id"
                @click="selectHotCity(city)"
              />
            </div>
          </van-index-bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCity } from '@/api/city'
import { sortAlphabet } from '@/utils/sort-alphabet'
export default {
  name: 'ChooseCityView',
  data() {
    return {
      currentPositionInfo: {},
      hotCity: [],
      allCity: {}
    }
  },
  methods: {
    selectHotCity(city) {
      this.$router.push({
        name: 'city',
        params: {
          id: city.id
        },
        query: {
          // data: btoa(encodeURIComponent(JSON.stringify(city)))
          cityName: city.name
        }
      })
    },
    async getCurrentPositionCity() {
      try {
        this.currentPositionInfo = {}
        const { data } = await getCity('guess')
        this.currentPositionInfo = data
      } catch (err) {
        console.log(err)
      }
    },
    async getHotCity() {
      try {
        const { data } = await getCity('hot')
        this.hotCity = Object.freeze(data)
        // this.hotCity = data
      } catch (err) {
        console.log(err)
      }
    },
    async getAllCity() {
      try {
        const { data } = await getCity('group')
        this.allCity = sortAlphabet(Object.freeze(data))
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: {},
  mounted() {
    this.getCurrentPositionCity()
    // get hot city
    this.getHotCity()
    // get all city
    this.getAllCity()
  }
}
</script>
<style lang="scss" scoped>
//
@import '@/style/var.scss';
.choose-city {
  .header {
    position: fixed;
    width: 100%;
    top: 0;
    // background-color: #3190e8;
    ::v-deep .van-icon {
      color: #ffffff;
      font-size: 20px;
    }
    ::v-deep .van-nav-bar__text {
      color: #ffffff;
      font-size: 16px;
    }
  }
  .main {
    position: fixed;
    top: 46px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: scroll;
    .current-city {
      background-color: #ffffff;
      .position-text {
        display: flex;
        align-items: center;
        height: 34px;
        font-size: $f12;
        padding: 0 $pad14;
      }
      .position-city {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: $pad8 $pad14;
        .left {
          font-size: 17px;
          font-weight: 600;
          .icon-color {
            color: #02b6fd;
          }
        }
        .right {
          font-size: 16px;
          color: #02b6fd;
        }
      }
    }
    .hot-city {
      margin-top: 10px;
      background-color: #ffffff;
      padding: $pad8 $pad14;
      .ty-hot-text {
        color: #8b8a8a;
        font-size: 12px;
      }
      .ty-hot-city-content {
        margin-top: $pad10;
        ::v-deep .van-grid-item__content {
          padding-top: $pad8;
          padding-bottom: $pad8;
          background-color: rgba(132, 131, 131, 0.1);
        }
      }
      .ty-all-city {
        margin-top: 10px;
        ::v-deep .van-index-anchor {
          padding: 0;
        }
        ::v-deep .van-index-bar__index {
          font-size: 400;
          color: #777777;
        }
      }
    }
  }
}
</style>
