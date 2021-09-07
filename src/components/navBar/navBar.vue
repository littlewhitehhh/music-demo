/*
  @data: 2021-8-22
  @用处：
       navbar   views文件中格格页面的头部导航部分



 */
<template>
  <div class="navBarContainer"> 
    <div class="navBar">
      <!-- 结构都一样，数据不一样，所以不需要定义，只需父组件传入数据就行 -->
       <div class="barItem" 
            v-for="(item,index) in navBarItem" 
            :key="index" 
            @click="clickBarItem(item.path,index)" 
            :class="{active:currentIndex == index?true:false}">
              {{item.name}}
       </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name:'navBarContainer',
  props:{
    navBarItem:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      currentIndex:0,
    }
  },
  created() {
    
    // this.currentIndex = window.sessionStorage.getItem('secondpathIndex') || 0  

    // 存在bug currentIndex存在了sessionstorage中,导致四个router-view页面共用一个secondpathIndex的值,所以报错

    // this.$router.push(this.navBarItem[this.currentIndex].path)

    
    
    
    // console.log(this.$route.path);
    /* console.log(this.navBarItem.findIndex(item =>{
      return item.path == this.$route.path
    }));  */
    this.currentIndex = this.navBarItem.findIndex(item =>{
      return item.path == this.$route.path
    })
    
  },
  methods: {
    clickBarItem(path,index){
      this.currentIndex = index
      // window.sessionStorage.setItem('secondpathIndex', index)
      // console.log(index,path);
      this.$emit('clickBarItem',path)
    }
  },
}
</script>
  
<style scoped>
.navBarContainer{
 padding-left:10px ;
  height: 60px;
  width: 100%;
  /* line-height: 60px; */
}
  .navBar{
    display: flex;

  }
  .barItem {
    margin: 10px 10px 0 10px;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
  }
  .active {
    font-size: 20px;
    font-weight: 700;
    color: #000;
    padding-bottom: 8px;
    border-bottom: 2px solid #ec4141;
  }
</style>