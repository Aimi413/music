<template>
    <div class="">
       <div id="song_heder">
           {{RankingStr}}
       </div>
    </div>
  </template>

<script>
    export default {
        data() {
            return {
                str: this.RankingStr
            }
        },
        props: ['RankingStr'],
        watch: {
            Song() {
                // console.log(this.str);
            }
        },
        mounted() {
            // console.log(this.str);
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