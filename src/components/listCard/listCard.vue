/** 
      严重怀疑element-ui的无限滚动存在bug，好烦啊
      因为歌单展示有的需要下拉加载更多，有的不需要 所以要自定义是否开启无限滚动
      在要实现滚动加载的列表上上添加v-infinite-scroll，并赋值相应的加载方法，可实现滚动到底部时自动执行加载方法。
      :infinite-scroll-disabled="disabled"   是否禁用无线滚动
*/

<template>
<!-- 滚动的容器 -->
  <div
    class="listCard"
    v-infinite-scroll="load"
    :infinite-scroll-disabled="disabled"
    :infinite-scroll-distance="300"
    :infinite-scroll-immediate="false"
    ref="listCard"
  >
  
    <div
      class="listCardItem"
      v-for="(item,index) in songSheetList"
      :key="index"
      @click="clickListCardItem(item.id)"
    >
      <div class="image">
        <img :src="(item.picUrl || item.coverImgUrl)" alt="" />
      </div>
      <div class="title">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListCard",
  props: {
    songSheetList: {
      type: Array,
      default() {
        return [];
      },
    },
    // 是否使用上拉触底事件
    isLoad: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      // 无限滚动是否禁用
      disabled:true,
    };
  },
  methods: {
    clickListCardItem(id) {
      this.$emit("clickListCardItem", id);
    },
    // 上拉触底触发
    load() {
      console.log("起飞",this.disabled);
      this.$emit("bottomLoad");
      // 触发load后加载数据 期间不允许再次触发load事件
      this.disabled = true;
     
    },
  },
  watch: {
    //   数据更新后，再次运行触发load事件
    songSheetList() {
      // console.log(this.songSheetList.length);
      if (this.isLoad == true) {
        if (this.songSheetList.length != 0) {
          this.disabled = false;
        } else {
          this.disabled = true;

        }
      }
    },
  },
};
</script>

<style scoped>
.listCard {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
}

.listCardItem {
  width: 18%;
  margin: 0 2% 20px 0;
  overflow: hidden;
  cursor: pointer;
}

.image img {
  width: 100%;
  border-radius: 10px;
}

.title {
  margin-top: 8px;
  padding: 0 2px;
  font-size: 12px;
  color: black;
}
</style>