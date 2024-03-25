<template>
  <view class="eitem" @click="onclick">
    <view class="eitem-image">
      <image :src="imageUrl" mode="aspectFill"></image>
    </view>
    <view class="eitem-title"><span class="eitem-tag" :style="{background:tagColor, color:fontColor}">{{ tagText }}</span><span class="eitem-title-item">{{ title }}</span></view>
    <view class="eitem-guide"><u-icon name="arrow-right" :label="guideText" labelPos="left" labelSize="20" labelColor="#33c0bbc8" size="18" color="#33c0bbc8" :bold="true"></u-icon></view>
</view>
</template>

<script>
import Vue from 'vue';

import {gotoUrl} from '../../../utils/utils.js';

export default Vue.extend({
  name: "EventsViewItem",
  props: {
    type: String,
    url: String,
    title: String,
    tagText: String,
    tagColor: String,
    fontColor:String,
    guideText: String,
    imageUrl: String,
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    onclick() {
      gotoUrl(this.url);
    }
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() { },
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() { },
  // 组件周期函数--监听组件数据更新之后
  updated() { },
  // 组件周期函数--监听组件激活(显示)
  activated() { },
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() { },
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() { },
}) 
</script>

<style lang="scss">
.eitem{
  display: grid;
  width: 100%;
  height: 520rpx;
  margin-bottom: $uni-spacing-col-lg*2;
  grid-template-rows:3fr auto;
  grid-template-columns:4fr 1fr;
}
.eitem-image{
  margin: $uni-spacing-row-sm 0;
  grid-column: 1 / 3;
  image{
    width: 100%;
    height: 100%;
    border-radius: $uni-border-radius-base;
  }
}
.eitem-title{
  line-height: $uni-font-size-base*2;
  font-size: $uni-font-size-base;

  .eitem-tag{
    margin-right: $uni-border-radius-base;
    padding: $uni-border-radius-base;
    background-color: $uni-color-base;
    border-radius: 0 20% 0 20%;
    font-weight: 700;
    font-size: $uni-font-size-sm;
  }
}
.eitem-guide{
  justify-self: end;
  align-self: center;
  font-size: $uni-font-size-sm;
}
</style>