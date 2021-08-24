<template>
  <div class="listTable">
    <div class="left">
      <!-- 封面 -->
      <img :src="sheetObject.coverImgUrl" alt="" @click="clickCover(sheetObject.id)">
    </div>
    <div class="right">
       <!--使用el-tab改起来有很多问题，所以自己封装一个table  -->
       <table>
          <tr
            class="listRows"
            v-for="(item, index) in (sheetObject.tracks &&
              sheetObject.tracks.slice(0, 5)) "
            :key="index"
          >
            <td class="index">{{ index + 1 }}</td>
            <td class="musicName">{{ item.name }}</td>
            <td class="singer">{{ item.ar[0].name }}</td>
          </tr>
        </table>
         <div
          class="checkAll"
          @click="clickCheckAll(sheetObject.id)"
          v-show="isCheckAllShow"
        >
          查看全部 <i class="iconfont icon-arrow-right-bold"></i>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'listTable',
  props:{
    sheetObject:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      isCheckAllShow:true
    }
  },
  methods: {
    clickCover(id){
      // 向父组件传递
      this.$emit('toDetail',id)
    },
    clickCheckAll(id){
       this.$emit("clickCheckAll", id)
    }
  },
  
}
</script>

<style scoped>
.listTable{
  margin-bottom: 60px;
  display: flex;
}
  .left {
     width: 150px;
    height: 150px;
    margin-right: 20px;
    cursor: pointer;
  }
  .left img{
    height: 100%;
     border-radius: 10px;
  }
</style>