$(".navActive li").click(function(){$(this).addClass("active").siblings().removeClass("active")});var myChart=echarts.init(document.getElementById("Pie"));option={tooltip:{trigger:"item",formatter:"{a} <br/>{b}: {c} ({d}%)"},legend:{orient:"vertical",x:"left",data:["直达","营销广告","搜索引擎","邮件营销","联盟广告","视频广告","百度","谷歌","必应","其他"]},series:[{name:"访问来源",type:"pie",selectedMode:"single",radius:[0,"60%"],label:{normal:{position:"inner"}},labelLine:{normal:{show:!1}},data:[{value:335,name:"直达",selected:!0},{value:679,name:"营销广告"},{value:1548,name:"搜索引擎"}]},{name:"访问来源",type:"pie",radius:["60%","55%"]}]},myChart.setOption(option);