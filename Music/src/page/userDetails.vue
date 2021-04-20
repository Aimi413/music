<template>
    <div id="userDetails">
       <p class="userDetails_go el-icon-arrow-left" @click='back'></p>
       <p class="userDetails_top">{{text}}</p>
       <img src="../../static/img/110.jpg" alt="">

       <!-- 歌词模块 -->
       <ul class="musicsUl" ref='musicsUl'>
            <li v-for='(item,index) in medisArray' ref='musicsLi' class="divs" :class="musicsIndex == index?'colour':''">{{item.lyric}}</li>
       </ul>

       <div class="details-centen">{{text}}</div>
       <div class="musicsDiv">
            <audio  id='ao' ref='easyaudio'>
                您的浏览器不支持audio元素
            </audio>
            <p class="musicsDiv-cur">{{cur}}</p>
                <!-- <el-slider
                    v-model="range"
                    :show-tooltip="false"
                    :max='maxRange'
                    @change='rangeChange'
                    ref='rangeDom'
                    class="musicsDiv-range"
                ></el-slider> -->

                <el-slider
                  v-model="range"
                  :show-tooltip="false"
                  :max='maxRange'
                  ref='rangeDom'
                  class="musicsDiv-range"
                  :format-tooltip="rangeChange"
                ></el-slider>
            <p class="musicsDiv-maxs">{{maxs}}</p>
       </div>

       <div class="musicsBut">
            <p :class="stateClass" @click='stateSwitch'></p>
            <p class="iconfont icon-shangyishou" @click='upper'></p>
            <p class="iconfont icon-bofang musicsBut-auto"  @click='play' v-if='state'></p>
            <p class="iconfont icon-zanting "  @click='pause' v-if='!state'></p>
            <p class="iconfont icon-xiayishou" @click='lower'></p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                musicsIndex: 0,
                //记录当前播放的音乐所处的musics索引
                index: 0,
                //记录选择的播放方式，默认为sequence顺序播放
                playtype: "sequence",
                // 滑块最大值
                maxRange: 0,
                // 滑块旁边时间
                maxs: '0.00',
                cur: '0.00',
                // 滑块value
                range: 0,
                // 定时器
                time: '',
                // 播放和暂停状态来回切换
                state: true,
                //歌词
                medisArray: [],
                // 播放id
                audioSrc: [],
                audioText: [],
                // 播放状态动态class
                stateClass: 'iconfont icon-danquxunhuan musicsBut_left',
                // 歌曲名称
                text: '',
                indexOrder: 0
            }
        },
        created() {
            // 歌曲列表
            this.audioSrc = this.$store.state.musicSrc;
            this.audioText = this.$store.state.musicText;
        },
        mounted() {
            this.audioSrc.forEach((item, i) => {
                if (item == this.$route.params.id) {
                    this.indexOrder = i; //得到当前点进来的歌曲下标
                    this.text = this.audioText[i]; //歌曲名称
                }
            })

            // 初次渲染数据
            this.requestInterface(this.$route.params.id);

            //当前音乐播放完成后触发该事件
            this.$refs.easyaudio.onended = () => {
                console.log('我播放结束了');
                this.state = true; //播放状态切换
                // this.play(); //播放
                this.$refs.musicsUl.scrollTop = 0; //歌词默认回最初位置
                //随机播放
                if (this.index == 2) {
                    console.log('我是随机播放');
                    //生成一个随机数
                    this.random();
                    return false;
                }

                //顺序播放
                if (this.index == 1) {
                    console.log('我是顺序播放');
                    this.upAndDown();
                    return false;
                }

                //单曲循环
                if (this.index == 0) {
                    console.log('我是单曲循环');
                    this.audioSrc.forEach((item, i) => {
                        if (item == this.$route.params.id) {
                            this.text = this.audioText[i]; //歌曲名称
                        }
                    })
                    this.requestInterface(this.$route.params.id);
                    return false;
                }
            };

            // 歌曲时间改变会调用此函数
            this.$refs.easyaudio.ontimeupdate = () => {
                var currentTime = parseInt(Math.round(this.$refs.easyaudio.currentTime)); //返回整数
                this.medisArray.forEach((item, index) => {
                    if (currentTime == item.time.toFixed(0)) {
                        this.musicsIndex = index;

                        // 歌词滚动
                        // 根据子元素的高度去相乘下标，
                        this.$refs.musicsUl.scrollTop = this.$refs.musicsLi[index].scrollHeight * index;
                    }
                })
            }
        },
        methods: {
            // 退一步
            back() {
                this.$router.go(-1); //返回上一层
            },

            // 上一首
            upper() {
                // 校验是什么模式播放
                if (this.index == 0 || this.index == 1) { //顺序和单曲
                    this.upAndDown();
                }

                // 校验是什么模式播放
                if (this.index == 2) { //随机
                    this.random();
                }
            },

            // 下一首
            lower() {
                // 校验是什么模式播放
                if (this.index == 0 || this.index == 1) { //顺序和单曲
                    var audioSrcIndex = this.audioSrc.length - 1;
                    this.indexOrder--;
                    if (this.indexOrder <= 0) {
                        this.indexOrder = audioSrcIndex;
                        this.requestInterface(this.audioSrc[this.indexOrder]);
                        this.text = this.audioText[this.indexOrder]; //歌曲名称
                    } else {
                        this.text = this.audioText[this.indexOrder]; //歌曲名称
                        this.requestInterface(this.audioSrc[this.indexOrder]);
                    }
                }

                // 校验是什么模式播放
                if (this.index == 2) { //随机
                    this.random();
                }
            },

            // 播放状态切换
            stateSwitch() {
                // 0代表单曲播放
                // 1代表顺序循环
                // 2代表随机播放
                if (this.index == 0) {
                    this.stateClass = 'iconfont icon-hanhan-01-01 musicsBut_left';
                    this.index = 1;
                    return false;
                }
                if (this.index == 1) {
                    this.stateClass = 'iconfont icon-icon-- musicsBut_left';
                    this.index = 2;
                    return false;
                }
                if (this.index == 2) {
                    this.stateClass = 'iconfont icon-danquxunhuan musicsBut_left';
                    this.index = 0;
                    return false;
                }
            },

            // 秒数转时间
            timeToStr(time) {
                var m = 0,
                    s = 0,
                    _m = '00',
                    _s = '00';
                time = Math.floor(time % 3600);
                m = Math.floor(time / 60);
                s = Math.floor(time % 60);
                _s = s < 10 ? '0' + s : s + '';
                _m = m < 10 ? '0' + m : m + '';
                return _m + ":" + _s;
            },

            //监听滑块，可以拖动
            rangeChange(val) {
                this.range = val; //得到滑块改变后的值，添加到滑块的value值里
                this.$refs.easyaudio.currentTime = val; //改变播放时间
            },

            // 点击停止
            pause() {
                this.$refs.easyaudio.pause(); //暂停播放
                this.state = true; //播放状态切换
            },

            // 点击播放
            play() {
                //触发播放事件
                var duration = this.$refs.easyaudio.duration; //得到秒数
                this.maxRange = duration //滑块最大值
                this.maxs = this.timeToStr(duration); //调用方法将秒数转日期格式
                this.$refs.easyaudio.play(); //开始播放
                this.state = false; //播放状态切换

                // console.log(localStorage.getItem('data'));

                this.time = setInterval(() => {
                        if (this.$refs.easyaudio) { //防止不在本组件还会继续加载
                             var currentTime = parseInt(Math.round(this.$refs.easyaudio.currentTime)); //返回整数
                             this.range = currentTime; //跟随改变 滑块
                             this.cur = this.timeToStr(currentTime); //跟随改变 秒数
                             if (currentTime == Math.round(duration)) {
                                 clearInterval(this.time); //清除定时器
                             }
                         } else {
                             return clearInterval(this.time); //清除定时器;
                         }
                        // var data = {
                        //   'currentTime':currentTime,  //滑块每次改变的值
                        //   'duration':duration,        //滑块最大值
                        //   'cur':this.cur              //时时刻刻在变的时间
                        // }

                        // 当用户触发退出按钮时
                         // window.addEventListener("popstate",(e)=> {
                         //    localStorage.setItem("data",JSON.stringify(data));
                         // }, false);
                }, 1000)
            },

            // 数据请求
            requestInterface(ids) {
                // 根据id获取播放地址
                this.axios.get('https://api.imjad.cn/cloudmusic/?type=song&id=' + ids, {}).then(res => {
                    if (res.data.code == 200) {
                        this.$refs.easyaudio.src = '';
                        res.data.data[0].url ? this.$refs.easyaudio.src = res.data.data[0].url : this.$message.error('播放链接失效或丢失');
                        this.$nextTick(() => {
                            this.$refs.easyaudio.load(); //每一次动态改变aduio的src后，都要load一次
                            this.$refs.easyaudio.oncanplay = () => { //准备开始播放时执行
                                this.play(); //默认播放
                            }
                        })
                    } else {
                        this.$message.error('内部异常');
                    }
                })

                // 根据id获取歌词
                this.axios.get('https://api.imjad.cn/cloudmusic/?type=lyric&id=' + ids, {}).then(res => {
                    if (res.data.code == 200) {
                        let arrLyric = res.data.lrc.lyric.split("\n"); //首先分割并换行
                        this.medisArray = [];
                        arrLyric.forEach(item => {
                            //substring() 方法用于提取字符串中介于两个指定下标之间的字符。
                            this.medisArray.push({
                                time: parseFloat(item.substr(1, 3)) * 60 + parseFloat(item.substring(4, 10)), //00:00.000转化为00.000格式
                                lyric: item.substring(item.indexOf("]") + 1, item.length)
                            })
                        });
                    } else {
                        this.$message.error('内部异常');
                    }

                })
            },

            // 播放生成随机下标
            random() {
                var index = Math.floor(Math.random() * this.audioSrc.length);
                this.audioSrc.forEach((item, i) => {
                    if (i == index) {
                        this.text = this.audioText[i]; //歌曲名称
                    }
                })
                this.requestInterface(this.audioSrc[index]);
            },

            // 顺序播放
            upAndDown() {
                var audioSrcIndex = this.audioSrc.length - 1;
                this.indexOrder++;
                if (this.indexOrder <= audioSrcIndex) {
                    this.requestInterface(this.audioSrc[this.indexOrder]);
                    this.text = this.audioText[this.indexOrder]; //歌曲名称
                } else {
                    this.indexOrder = 0;
                    this.requestInterface(this.audioSrc[0]);
                    this.text = this.audioText[0]; //歌曲名称
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    #userDetails {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #000;

        .userDetails_go {
            position: absolute;
            width: 30px;
            height: 30px;
            top: 15px;
            left: 15px;
            z-index: 10;
            color: #fff;
            font-size: 25px;
        }

        .userDetails_top {
            width: 100%;
            overflow: hidden;
            text-align: center;
            position: absolute;
            top: 17px;
            color: #fff;
        }

        >img {
            width: 100%;
            height: 63%;
        }

        >ul {
            width: 100%;
            height: 100px;
            overflow: auto;
            text-align: center;
            li {
                padding: 13px;
                color: #999;
            }
        }

        .details-centen {
            width: 100%;
            text-align: center;
            font-size: 14px;
            color: #fff;
            padding: 10px 0;
        }

        .musicsDiv {
            width: 100%;
            overflow: hidden;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            height: 40px;
            p {
                width: 20%;
                text-align: center;
                font-size: 14px;
                color: #fff;
                line-height: 40px;
            }

            .musicsDiv-range {
                width: 60%;
            }
        }

        .musicsBut {
            width: 80%;
            margin: 10px 0 0 10%;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            position: relative;
            >p {
                width: 30%;
                height: 100%;
                display: flex;
                justify-content: center;
                color: #fff;
                font-size: 40px;
            }

            .musicsBut_left {
                width: 10%;
                height: 100%;
                color: #fff;
                font-size: 20px;
                left: -20px;
                top: 10px;
                position: absolute;
            }

            .musicsBut-auto{
              font-size: 45px;
              margin-top: -3px;
            }
        }
    }


    .colour {
        color: #d20e44fa !important;
    }

    @media screen and (max-width: 415px) {
        #userDetails .musicsBut>p {
            font-size: 45px;
        }
        #userDetails .musicsBut .musicsBut_left {
            top: 12px;
            font-size: 25px;
        }
    }

    @media screen and (max-width: 376px) {
        #userDetails .details-centen {
            padding: 0;
        }
        #userDetails .musicsBut>p {
            font-size: 40px;
        }
        #userDetails .musicsBut .musicsBut_left {
            top: 12px;
            font-size: 20px;
        }
    }

    @media screen and (max-width: 321px) {
        #userDetails .details-centen {
            padding: 10px 0;
        }
        #userDetails>ul {
            height: 50px;
        }
        #userDetails .musicsBut>p {
            font-size: 35px;
        }
        #userDetails .musicsBut .musicsBut_left {
            top: 12px;
            font-size: 15px;
        }
    }
</style>
