<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs10 md6>
        <v-card>
          <v-card-text class="px2">
            <span style="font-size: 20px">捐赠物品类型统计</span>
            <div ref="sale" style="width: 100%;height:350px">

            </div>
          </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs10 md6>
        <v-card >
          <v-card-text class="px2">
            <span style="font-size: 20px">积分兑换商品类型统计</span>
            <div ref="pie" style="width: 100%;height:350px">

            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // 引入 ECharts 主模块
  var echarts = require('echarts/lib/echarts');
  require('echarts/lib/chart/bar');
  require('echarts/lib/chart/pie');

  export default {
    name: "dashboard",
    data(){
      return {

      }
    },
    mounted(){
      this.$nextTick(() => {
        var sale = echarts.init(this.$refs.sale);

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: '捐赠物品类型统计'
          },
          tooltip: {},
          legend: {
            data:['数量']
          },
          xAxis: {
            data: ["可再生物品","衣服","器皿","不再生物品","鞋子","盆栽"]
          },
          yAxis: {},
          series: [{
            name: '数量',
            type: 'bar',
            data: [10, 50, 90, 40, 50, 30]
          }]
        };

        // 使用刚指定的配置项和数据显示图表。
        sale.setOption(option);

        const pie = echarts.init(this.$refs.pie);

        pie.setOption({
          roseType: 'angle',
          title: {
            text: '积分兑换商品类型统计'
          },
          series : [
            {
              name: '兑换种类',
              type: 'pie',
              radius: '55%',
              data:[
                {value:250, name:'手机'},
                {value:200, name:'平板'},
                {value:200, name:'衣服'},
                {value:200, name:'鞋子'},
                {value:200, name:'绿植'}
              ]
            }
          ],
          itemStyle: {
            emphasis: {
              // 阴影的大小
              shadowBlur: 200,
              // 阴影水平方向上的偏移
              shadowOffsetX: 0,
              // 阴影垂直方向上的偏移
              shadowOffsetY: 0,
              // 阴影颜色
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        })
      })
    }
  }
</script>

<style scoped>

</style>
