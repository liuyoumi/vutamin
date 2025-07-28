import dayjs from "dayjs";

const getLast7Days = () => {
  return Array.from({length: 7}, (_, i) =>
      dayjs().subtract(6 - i, "day").format("MM-DD"),
  );
};

const getRandomData = () => {
  return Array.from({length: 7}, () => Math.floor(Math.random() * 20) + 1);
};

export const loginTrendOptions = {
  title: {
    text: "最近7天活跃用户",
    left: "center",
    top: 10,
    textStyle: {
      fontSize: 16,
      fontWeight: 500,
      color: "#1D2129",
    },
  },
  tooltip: {
    trigger: "axis",
    backgroundColor: "#fff",
    borderColor: "#E5E6EB",
    borderWidth: 1,
    textStyle: {
      color: "#4E5969",
      fontSize: 12,
    },
  },
  grid: {
    top: 50,
    left: 40,
    right: 30,
    bottom: 40,
  },
  xAxis: {
    type: "category",
    data: getLast7Days(),
    boundaryGap: false,
    axisLine: {
      lineStyle: {color: "#E5E6EB"},
    },
    axisLabel: {
      color: "#86909C",
      fontSize: 12,
    },
  },
  yAxis: {
    type: "value",
    splitLine: {
      lineStyle: {color: "#F0F0F0"},
    },
    axisLine: {show: false},
    axisTick: {show: false},
    axisLabel: {
      color: "#86909C",
      fontSize: 12,
    },
  },
  series: [
    {
      name: "活跃用户数",
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 6,
      lineStyle: {
        color: "#0052D9",
        width: 2,
      },
      itemStyle: {
        color: "#0052D9",
        borderColor: "#fff",
        borderWidth: 2,
      },
      areaStyle: {
        color: "rgba(0, 82, 217, 0.08)",
      },
      data: getRandomData(),
    },
  ],
  color: ["#0052D9"],
};

export const roleStatsOptions = {
  title: {
    text: "角色用户分布",
    left: "center",
    top: 10,
    textStyle: {
      fontSize: 16,
      fontWeight: 500,
      color: "#1D2129", // TDesign 字体主色
    },
  },
  tooltip: {
    trigger: "item",
    formatter: "{b}<br/>用户数：{c}（{d}%）",
    backgroundColor: "#ffffff",
    borderColor: "#E5E6EB",
    borderWidth: 1,
    textStyle: {
      color: "#4E5969",
      fontSize: 12,
    },
  },
  legend: {
    bottom: "0%",
    left: "center",
    itemWidth: 8,
    itemHeight: 8,
    textStyle: {
      color: "#86909C",
      fontSize: 12,
    },
  },
  series: [
    {
      name: "角色用户分布",
      type: "pie",
      radius: ["42%", "70%"],
      center: ["50%", "50%"],
      avoidLabelOverlap: false,
      label: {
        show: true,
        position: "outside",
        formatter: "{b}\n{d}%",
        color: "#1D2129",
        fontSize: 12,
      },
      labelLine: {
        length: 10,
        length2: 8,
        lineStyle: {
          color: "#E5E6EB",
        },
      },
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 2,
      },
      data: [
        {value: 6, name: "运营人员"},
        {value: 3, name: "管理员"},
        {value: 10, name: "访客"},
        {value: 2, name: "测试账号"},
      ],
      color: ["#0052D9", "#36BFFF", "#FFC300", "#5BD8A6"], // TDesign 默认蓝、青、黄、绿
      emphasis: {
        scale: true,
        itemStyle: {
          shadowBlur: 8,
          shadowColor: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  ],
};
