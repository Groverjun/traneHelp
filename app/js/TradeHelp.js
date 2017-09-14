$(".navActive li").click(function(){
	$(this).addClass("active").siblings().removeClass("active")
})

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('Pie'));
// 指定图表的配置项和数据
option = {
	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b}: {c} ({d}%)"
	},
	legend: {
		orient: 'vertical',
		x: 'left',
		data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
	},
	series: [{
			name: '访问来源',
			type: 'pie',
			selectedMode: 'single',
			radius: [0,'60%'],

			label: {
				normal: {
					position: 'inner'
				}
			},
			labelLine: {
				normal: {
					show: false
				}
			},
			data: [{
					value: 335,
					name: '直达',
					selected: true
				},
				{
					value: 679,
					name: '营销广告'
				},
				{
					value: 1548,
					name: '搜索引擎'
				},
			]
		},
		{
			name: '访问来源',
			type: 'pie',
			radius: ['60%', '55%'],
		}
	]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);