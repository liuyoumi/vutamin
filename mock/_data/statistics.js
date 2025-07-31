import {getLast7Days} from "../_utils/index.js";

const data = {
  advertNum: 39,
  exposeNum: 26258,
  clickNum: 14962,
  orderNum: 8673,
  orderSuccessNum: 6076,
  orderFailNum: 2597,
  convertNum: 5712,
  smsNum: 25855,
  smsSuccessNum: 18711,
  clickRate: 0.5698,
  convertRate: 0.9401,
  clickRateStr: "56.98%",
  convertRateStr: "94.01%",
  totalPrice: 116642,
  totalSettlePrice: 101583,
};
const days = getLast7Days();

export const list = Array.from({length: 50}).map((item, index) => {
  const [start, end] = days;
  return {
    ...data,
    date: `${start}~${end}`,
    supplierName: `供应商-${index}`,
  };
});

export const chartData = {
  advertNum: 305,
  cost: 948358.9,
  settle: 869824,
  convertNum: 39208,
  convertRate: "90.83%",
  graphData: {
    date: days,
    totalPrice: [
      "102792.20",
      "74524.00",
      "113939.00",
      "158758.20",
      "174418.20",
      "209793.00",
      "114134.30",
    ],
    totalSettlePrice: [
      "86280.70",
      "64227.50",
      "102501.00",
      "148845.30",
      "165796.40",
      "196104.50",
      "106068.60",
    ],
    orderSuccessNum: [
      4441,
      3150,
      5136,
      6588,
      6877,
      8216,
      4800,
    ],
    clickNum: [
      13166,
      10346,
      16047,
      16031,
      16213,
      15764,
      11505,
    ],
    exposeNum: [
      108748,
      95962,
      159064,
      201621,
      246828,
      369300,
      248210,
    ],
    clickRate: [
      "12.11%",
      "10.78%",
      "10.09%",
      "7.95%",
      "6.57%",
      "4.27%",
      "4.64%",
    ],
    convertRate: [
      "96.64%",
      "94.70%",
      "91.02%",
      "89.13%",
      "87.73%",
      "88.72%",
      "93.10%",
    ],
  },
};
