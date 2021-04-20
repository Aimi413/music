<template>
    <div class="">
        <header>
            <div class="headerLeft">
                <img src="../../static/img/xia.png" alt="">
            </div>
            <div class="headerCenter">
                <input type="text" placeholder="搜索音乐、歌曲、电台" v-model='name'>
                <p class="el-icon-search" @click='clickSearch'></p>
            </div>
            <div class="headerRight">
                <img src="../../static/img/xia01.png" alt="">
            </div>
        </header>

        <ul class="userList">
           <li v-for='(item,index) in list' @click='titleTab(index)' ref='userListLi' :class="number==index?'active':''">{{item}}</li>
        </ul>

        <Personality :searchString="search" v-show='number == 0'></Personality>
        <Song :SongStr = 'list[1]'  v-show='number == 1'></Song>
        <Radio :RadioStr = 'list[2]'  v-show='number == 2'></Radio>
        <Ranking :RankingStr = 'list[3]'  v-show='number == 3'></Ranking>
    </div>
  </template>

<script>
    import Personality from '../components/userPersonality.vue'
    import Song from '../components/userSong.vue'
    import Radio from '../components/userRadio.vue'
    import Ranking from '../components/userRanking.vue'
    export default {
        components: {
            Personality,
            Song,
            Radio,
            Ranking
        },
        data() {
            return {
                name: null,
                number: 0,
                list: ['个性推荐', '歌单', '主播电台', '排行榜'],
                search: ''
            }
        },

        // DOM节点创建完成
        mounted() {},

        methods: {
            titleTab(e) {
                this.number = e; //状态改变显示
            },
            clickSearch() {
                this.number = 0;
                this.search = this.name;
            }
        }
    }
</script>

<style scoped lang="scss">
    header {
        width: 100%;
        height: 46px;
        background: #d43c33;
        display: flex;
        >div {
            position: relative;
            overflow: hidden;
        }
        >.headerLeft {
            width: 15%;
            height: 100%;
            >img {
                position: absolute;
                top: 15%;
                left: 15%;
            }
        }

        >.headerCenter {
            width: 68%;
            height: 100%;
            input {
                width: 84%;
                height: 30px;
                border-radius: 100px;
                border: none;
                outline: none;
                padding: 0 20px;
                position: absolute;
                top: 8px;
            }
            p {
                position: absolute;
                right: 2%;
                top: 5px;
                padding: 8px;
                color: #666;
                font-size: 19px;
            }
        }

        >.headerRight {
            width: 17%;
            height: 100%;
            img {
                width: 30px;
                height: 30px;
                position: absolute;
                right: 25%;
                top: 15%;
            }
        }
    }

    .userList {
        width: 100%;
        height: 40px;
        list-style: none;
        li {
            float: left;
            width: 25%;
            height: 100%;
            text-align: center;
            line-height: 40px;
            font-size: 14px;
            overflow: hidden;
            background: #f8f8f9;
            color: #333;
            text-decoration: none;
        }
    }

    .active {
        border-bottom: 1px solid #d43c33;
        color: #d43c33 !important;
    }

    #conten {
        width: 100%;
        overflow: hidden;
    }
</style>
