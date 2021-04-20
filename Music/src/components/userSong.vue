<template>
    <div class="">
       <div id="song_heder">
           {{SongStr}}
       </div>
    </div>
  </template>

<script>
    export default {
        data() {
            return {
                str: this.SongStr
            }
        },
        props: ['SongStr'],
        watch: {
            Song() {
                // console.log(this.str);
            }
        },
        mounted() {
            // 根据id获取播放地址
            // this.axios.get('https://api.imjad.cn/getApi/playlist/hot', {}).then(res => {
            //     console.log(res);
            //     if (res.data.code == 200) {
            //         console.log(res);
            //     } else {
            //         this.$message.error('内部异常');
            //     }

            // })
        },
        methods: {}
    }
</script>

<style scoped>
    #song_heder {
        float: left;
        width: 100%;
    }
</style>