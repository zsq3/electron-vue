<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'photo'
  }
</script>

<style>
  /* CSS */
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    list-style: none;
  }
  body:before{
    content:'';
    position:fixed;
    top:-10px;
    left:0;
    width:100%;
    height:10px;
    -webkit-box-shadow: 0 0 10px rgba(0,0,0, .8);
    -moz-box-shadow:0 0 10px rgba(0,0,0, .8);
    box-shadow:0 0 10px rgba(0,0,0 .8);
    z-index:100;
  }

  #app{
    font-family: "Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  a{
    color: #fff;
  }
</style>
