<template>
	<div>
      <header>
          <div>
              <img src="../../dist/static/img/0.jpg" alt="">
              <div>
                <span>单车</span>
                <span>陈奕迅</span>
                <p>
                  <i class="iconfont icon-xiayishou"></i>
                </p>
              </div>
          </div>
      </header>
	</div>
</template>

<script>
	export default {
		// vue 实例的数据对象
		data(){
			return {
        // 热评
        hotComments:[],
        // 普通评论
        comments:[]
			}
		},

		// vue实例生成后
		created(){},

		// vue dom节点生成
		mounted() {
      this.axios.get('https://api.imjad.cn/cloudmusic/?type=comments&id=1463165983', {}).then(res => {
          if(res.data.code == 200){
            console.log(res.data);
          }else{
             this.$message.error('内部出错');
          }
      })
    },

		// vue 自定义方法
		methods:{},
	}
</script>

<style lang="scss">
    header{
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      >div{
        width: 90%;
        height: 85%;
        display: flex;
        position: relative;
        img{
          width: 85px;
          height: 85px;
        }
        div{
          margin: 20px 0 0 10px ;
          span{
            display: block;
            padding: 0 0 5px 0 ;
          }
          p{
            height: 100%;
            width: 10px;
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #999;
          }
        }
      }
    }
</style>
