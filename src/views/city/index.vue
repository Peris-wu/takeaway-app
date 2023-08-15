<!--  -->
<template>
  <div class="city">
    <van-nav-bar
      class="ty-nav"
      :title="cityName"
      right-text="切换城市"
      left-arrow
      @click-left="$router.back()"
      @click-right="triggerCity"
    />
    <div class="search-wrap">
      <van-field
        :border="true"
        autofocus
        v-model="searchValue"
        placeholder="输入学校、商务楼、地址"
        class="ipt"
      />
      <van-button block size="small" type="info" @click="searchAddressByKeyword"
        >提交</van-button
      >
    </div>
    <div class="main">
      <div class="search-result" v-if="searchList.length">
        <van-cell
          v-for="addressInfo in searchList"
          :key="addressInfo.id"
          @click="selectSearchResult(addressInfo)"
        >
          <div slot="title">{{ addressInfo.name }}</div>
          <div slot="label">{{ addressInfo.address }}</div>
        </van-cell>
      </div>
      <div class="history-result" v-else>
        <div class="title">
          <span class="f12">搜索历史</span>
        </div>
        <div class="history">
          <van-cell
            @click="selectSearchResult(addressInfo)"
            v-for="addressInfo in searchHistory"
            :key="addressInfo.id"
          >
            <div slot="title">{{ addressInfo.name }}</div>
            <div slot="label">{{ addressInfo.address }}</div>
          </van-cell>
          <div
            class="clear-all"
            v-if="searchHistory.length"
            @click="clearHistory"
          >
            清空所有
          </div>
        </div>
      </div>
      <van-cell v-if="emptySearchResult">
        <div slot="title">很抱歉！无搜索结果</div>
      </van-cell>
    </div>
  </div>
</template>

<script>
import { searchPosByCityId } from '@/api/city'
import { SEARCH_HISTORY_KEY } from '@/const/storage.const'
import { getStorage, setStorage } from '@/utils/handleStorage'
export default {
  name: 'CityView',
  props: {
    id: {
      type: [String, Number]
    }
  },
  data() {
    return {
      cityName: '',
      searchValue: '',
      emptySearchResult: false,
      searchList: [],
      searchHistory: []
    }
  },
  watch: {
    searchValue: {
      handler(nVal) {
        if (!nVal) {
          this.searchList = []
          this.emptySearchResult = false
        }
      }
    }
  },
  methods: {
    triggerCity() {
      this.$router.push({
        name: 'chooseCity'
      })
    },
    clearHistory() {
      this.searchHistory = []
      setStorage(SEARCH_HISTORY_KEY, [])
    },
    selectSearchResult(addressInfo) {
      console.log(addressInfo)
      this.$router.push({
        name: 'takeaway',
        query: btoa(addressInfo.geohash)
      })
      const historyList = getStorage(SEARCH_HISTORY_KEY)
      if (historyList) {
        historyList.unshift(addressInfo)
        setStorage(SEARCH_HISTORY_KEY, historyList)
      } else {
        setStorage(SEARCH_HISTORY_KEY, [addressInfo])
      }
    },
    async searchAddressByKeyword() {
      const { data } = await searchPosByCityId(this.id, this.searchValue)
      this.searchList = data
      if (!data?.length) {
        this.emptySearchResult = true
      }
    }
  },
  mounted() {
    this.cityName = this.$route.query.cityName

    // init searchHistory
    this.searchHistory = getStorage(SEARCH_HISTORY_KEY) || []
    // console.log(JSON.parse(atob(decodeURIComponent())))
    // console.log(JSON.parse(decodeURIComponent(atob(this.$route.query.data))))
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.city {
  //
  .ty-nav {
    ::v-deep .van-icon {
      color: #ffffff;
      font-size: 20px;
    }
    ::v-deep .van-nav-bar__title {
      color: #ffffff;
      font-size: 19px;
      font-weight: bold;
    }
    ::v-deep .van-nav-bar__text {
      color: #ffffff;
      font-size: 16px;
    }
  }
  .search-wrap {
    margin-top: 10px;
    padding: 14px 25px;
    background-color: #ffffff;
    .ipt {
      height: 32px;
      padding: 0 8px;
      margin-bottom: 12px;
      border: 1px solid #e4e4e4;
      ::v-deep .van-field__body {
        height: 100%;
      }
    }
  }
  .main {
    position: fixed;
    left: 0;
    right: 0;
    top: 160px;
    bottom: 0;
    overflow-y: scroll;
    .search-result {
      margin-top: 5px;
      background-color: #ffffff;
    }
    .history-result {
      .title {
        display: flex;
        align-items: center;
        padding: 5px 10px;
      }
      .history {
        background-color: #ffffff;
        .clear-all {
          display: flex;
          justify-content: center;
          align-items: center;
          color: #666666;
          font-size: 16px;
          padding: 15px 0;
        }
      }
    }
  }
}
</style>
