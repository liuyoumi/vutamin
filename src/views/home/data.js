export const schemas = [
  {
    label: "日期",
    field: "date",
  },
  {
    label: "供应商",
    field: "supplierName",
  },
  {
    label: "曝光量",
    field: "exposeNum",
    table: {
      sorter: true,
    },
  },
  {
    label: "点击量",
    field: "clickNum",
    table: {
      sorter: true,
    },
  },
  {
    label: "回传量",
    field: "orderSuccessNum",
    table: {
      sorter: true,
    },
  },
  {
    label: "点击率",
    field: "clickRateStr",
    table: {
      sorter: true,
    },
  },
  {
    label: "回传率",
    field: "convertRateStr",
    table: {
      sorter: true,
    },
  },
  {
    label: "消耗",
    field: "totalPrice",
    table: {
      sorter: true,
    },
  },
  {
    label: "结算费用",
    field: "totalSettlePrice",
    table: {
      sorter: true,
    },
  },
];

export const panels = [
  {key: "advertNum", label: "有消耗广告数", color: "#5ed1cc"},
  {key: "cost", label: "消耗（元）", color: "#ff9076"},
  {key: "settle", label: "结算（元）", color: "#c94f4f"},
  {key: "convertNum", label: "回传量", color: "#2277e4"},
];

export const graphKeyMap = {
  totalPrice: "消耗",
  orderSuccessNum: "回传量",
  clickNum: "点击量",
  exposeNum: "曝光量",
  clickRate: "点击率",
  convertRate: "回传率",
  totalSettlePrice: "结算费用",
};

export const chartOptions = reactive({
  legend: {
    icon: "roundRect",
    itemWidth: 10,
    itemHeight: 10,
    itemGap: 20,
    textStyle: {
      color: "#AAAAAA",
    },
    data: Object.values(graphKeyMap),
  },
  tooltip: {
    trigger: "axis",
  },
  toolbox: {
    show: true,
    feature: {},
  },
  grid: {
    left: "0",
    right: "0",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: true,
      color: "#AAAAAA",
    },
    axisLine: {
      lineStyle: {
        color: "#AAAAAA",
      },
    },
  },
  yAxis: [
    {
      type: "value",
      axisLabel: {
        show: true,
        color: "#AAAAAA",
        fontSize: 14,
        formatter: e => e.toFixed(2),
      },
      nameTextStyle: {
        color: "#3388FF",
        align: "right",
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(221,223,230,.4)",
        },
      },
      min: 0,
      max: "dataMax",
      splitNumber: 5,
    },
    {
      type: "value",
      axisLabel: {
        show: true,
        color: "#AAAAAA",
        fontSize: 14,
        formatter: e => e + "%",
      },
      nameTextStyle: {
        color: "#36C2CF",
        align: "left",
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(221,223,230,.4)",
        },
      },
      min: 0,
      max: "dataMax",
      splitNumber: 5,
    },
  ],
});
