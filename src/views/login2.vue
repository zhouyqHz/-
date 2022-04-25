<template>
    <div>
        <h1>登录页面</h1>
        <el-button @click="handlelogin">登录</el-button>
    </div>
</template>

<script>
    export default {
        name: "login",
        methods:{
            handlelogin(){
                this.$router.push('/index');
            },
        },
    }
</script>

<style scoped>

</style>
