<template>
  <div id="app">
<!--    <new-map></new-map>-->
<!--    <new-test></new-test>-->
    <!-- <new-test></new-test> -->
<!--    <log-in></log-in>-->

    <!-- <map-content></map-content> -->
    <router-view></router-view>
  </div>
</template>
<!--:element-loading-text="loadText"-->
<!--element-loading-spinner="el-icon-loading"-->
<!--element-loading-background="rgba(0, 0, 0, 0.7)"-->
<script>
    import {mapState} from 'vuex'
    // import MapContent from './views/MapContent'
    import NewMap from './views/NewMap'
    import NewTest from './views/NewTest'
    import LogIn from './views/login'
    // import NewTest from './views/NewTest'

    export default {
        name: 'app',
        components: {
          NewMap,
          NewTest,
          LogIn,
        },
        // components:{NewTest},
        computed:{
            ...mapState(['isLoaded','isLoading','loadText','allowBack']),
        },
        watch:{

        },
        mounted(){
            let that = this;
            window.onpopstate = () => {
                history.go(1);
            }
        }
    }
</script>

<style>
#app {
  background: #131a2f;
  width: 100%;
  height: 100%;
}
</style>
