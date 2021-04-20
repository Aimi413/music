<template>
	<view class="">
		<div class="musicsDiv">
		     <audio  id='ao' ref='easyaudio' >
		         您的浏览器不支持audio元素
		     </audio>
		     <p class="musicsDiv-cur">{{cur}}</p>
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
	</view>
</template>

<script>
	export default {
		// vue 实例的数据对象
		data(){
			return {

			}
		},
    props:['range','maxRange','rangeChange'],

		// vue实例生成后
		created(){},

		// vue dom节点生成
		mounted() {},

		// vue 自定义方法
		methods:{},
	}
</script>

<style lang="scss">
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
</style>
