<template>
    <div>
        <!-- Swiper -->
		<div class="swiper-container">
			<div class="swiper-wrapper" >
                <div class="swiper-slide" v-for="(item,index) in imgList">
                  <img :src="item" alt="">
                </div>
			</div>
			<!-- Add Pagination -->
			<div class="swiper-pagination"></div>
		</div>
          <div class="per_list">
            <div>
                <img src="../../static/img/11.jpg" alt="">
                <p>我愿你好，即使后来你与我无关。</p>
            </div>
            <div class="pre_list_zho">
                <img src="../../static/img/22.jpg" alt="">
                <p>“最怕温柔与爱抵不过新鲜感”</p>
            </div>
            <div>
                <img src="../../static/img/33.jpg" alt="">
                <p>喜欢又不代表什么,喜欢又不一定要在一起</p>
            </div>
          </div>

          <p class="per_listTlete">
             <span>歌曲列表</span>
          </p>
          
        <div class="per_conter">
            <div v-for='(item,index) in list' @click='detailsClick(item.id)'>
                <p>{{item.name}}</p>
                <p class="per_conter_p  iconfont icon-yinle">
                    <span v-if='item.alias[0]'>{{item.alias[0]}}</span>
                    <span v-if='!item.alias[0]'>天外之物</span>
                    一  {{item.artists[0].name}}
                </p>
                <span class="iconfont icon-bofang"></span>
            </div>
        </div>
    </div>

  </template>

<script>
    export default {
        name: 'userPersonality',
        data() {
            return {
                list: [],
                imgList:['../../static/img/1.jpg','../../static/img/2.jpg','../../static/img/4.jpg','../../static/img/5.jpg','../../static/img/6.jpg'],
                mymsg: ''
            }
        },
        props: ['searchString'],
        watch: {
            searchString() {
                this.mymsg = this.searchString;
                this.Axios(this.mymsg);
            }
        },
        mounted() {
            this.Axios('薛之谦');

            var mySwiper = new Swiper('.swiper-container', {
                loop: true,
                autoplay: {
                    delay: 3000,//3秒切换一次
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            });
        },
        methods: {
            Axios(keywords) {
                if (keywords) {
                    this.axios.post('https://v1.alapi.cn/api/music/search?keyword=' + keywords + '&limit=10', {}).then(res => {
                        this.list = res.data.data.songs;
                        let arr = [];
                        let arrText = [];
                        res.data.data.songs.forEach(item => {
                            arr.push(item.id);
                            arrText.push(item.artists[0].name + ' - ' + item.name);
                        });

                        // 存入vuex
                        this.$store.commit('setSrc', arr);
                        this.$store.commit('setText', arrText);
                    })
                } else {
                    this.$message.error('请输入搜索内容');
                }
            },
            detailsClick(e) {
                e && this.$router.push({
                    path: '/userDetails/' + e
                })
            }
        }
    }
</script>

<style lang="scss">
    #imgList {
        width: 100%;
        height: 100%;
        background-size: 100% 100%;
    }

    .per_list {
        width: 100%;
        overflow: hidden;
        margin-top: 10px;
        div {
            width: 32%;
            float: left;
            height: 158px;
            img {
                width: 100%;
                height: 120px;
            }
            p {
                height: 38px;
                font-size: 12px;
                padding: 0 5px;
                color: #333;
            }
        }
    }

    .pre_list_zho {
        margin: 0 2%;
    }

    .per_listTlete {
        height: 50px;
        padding: 0 20px;
        line-height: 50px;
        font-size: 16px;
        margin: 20px 0 10px 0;
        span {
            border-bottom: 2px solid #d43c33;
            padding: 2px 0;
        }
    }


    .per_conter {
        width: 100%;
        overflow: hidden;
        div {
            width: 100%;
            height: 45px;
            border-bottom: 1px solid #e6e1e1ab;
            position: relative;
            >span {
                position: absolute;
                right: 14px;
                top: 10px;
                font-size: 25px;
                color: #555555a8;
            }
            p {
                height: 20px;
                padding: 0 20px;
                color: #333;
                line-height: 20px;
                span {
                    color: red;
                    border: 1px solid red;
                }
            }
        }
    }

    .per_conter_p {
        font-size: 12px;
        padding: 0 25px !important;
        color: #c7640f !important;
    }

    .swiper-container {
        width: 100%;
        height: 200px;
    }

    .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: #fff;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
    }

    .swiper-slide img {
        width: 100%;
        height: 100%;
    }
</style>
