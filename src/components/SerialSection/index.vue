<template>
  <div class="serialItem" >
    <!-- 图片 -->
    <div class="serialItem-pic">
      <span class="icon-free" v-if="serialData.free == '1'"></span>
      <img :src="serialData.spic" v-err-img alt="">
    </div>
    <!-- 信息 -->
    <div class="serialItem-info">
      <!-- 标题、副标题 -->
      <div>
        <div class="serialItem-name">{{serialData.sname}}</div>
        <div class="serialItem-subTitle">{{serialData.subTitle}}</div>
      </div>
      <!-- 标签 -->
      <div class="serialItem-bot">
        <div class="serialItem-bot-btn" :style="{background: productTypeColor({type: serialData.productType})}">{{serialData.productType | productTypeFilter}}</div>
        <div v-if="serialData.free == '0'" class="serialItem-bot-point" :style="{color: productTypeColor({type: serialData.productType})}">
          {{serialData.sprice}}<i class="word">点</i>
          <span v-if="serialData.scheersVipPrice">/</span>
        </div>
        <div class="serialItem-bot-vipPrice" v-if="serialData.free == '0' && serialData.scheersVipPrice" :style="{color: productTypeColor({type: serialData.productType})}"> <i class="word">会员价</i> {{serialData.scheersVipPrice}} <i class="word">点</i></div>
      </div>
    </div>
    <!-- 跳转按钮 -->
    <div class="serialItem-goBtn">
      <img src="../../assets/img/icons/into@2x.png" alt="">
    </div>
  </div>
</template>

<script>
import { productTypeColor, productTypeFilter } from '@/plugins/filters'
export default {
  name: 'serialSection',
  props: {
    serialData: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      productTypeColor
    }
  },
  methods: {
    
  },
  filters: {
    productTypeFilter
  }
}
</script>

<style lang='scss' scoped>
.serialItem {
  width: 100%;
  height: 144px;
  box-shadow: 0 5px 15px 1px #eee;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 27px 16px;
  margin-bottom: 10px;
  &-pic {
    width: 67px;
    height: 90px;
    margin-right: 16px;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    border: solid 1px #EEEEEE;
    & .icon-free {
      width: 30px;
      height: 18px;
      position: absolute;
      top: 0;
      left: 0;
      background-image: url(../../assets/img/icons/label_free_book@2x.png);
      background-repeat: no-repeat;
      background-position: 0 0;
      background-size: 100%;
    }
    img {
      width: 67px;
      height: 100%;
    }
  }
  &-info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 234px;
  }
  &-name {
    font-size: 14px;
    color: #121212;
    line-height: 17px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  &-subTitle {
    font-size: 12px;
    color: #666;
    white-space: nowrap;
    line-height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 4px;
  }
  &-bot {
    display: flex;
    align-items: center;
    line-height: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .word {
      font-style: normal;
    }
    &-btn {
      color: #fff;
      font-size: 12px;
      width: 42px;
      height: 23px;
      line-height: 23px;
      text-align: center;
      border-radius: 8px;
      margin-right: 5px;
    }
    &-point {
      font-size: 12px;
      margin-right: 5px;
    }
    &-vipPrice {
      font-size: 12px;
    }
  }
  &-goBtn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    // padding-right: 10px;
    height: 100%;
    img {
      width: 5px;
    }
  }
}
</style>
