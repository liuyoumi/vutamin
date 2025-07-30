import {random} from "lodash-es";
import dayjs from "dayjs";

export const R = {
  ok(data) {
    return {
      code: 0,
      msg: "OK",
      data,
    };
  },
  page(data, query) {
    const list = getPageData(data, query);
    return R.ok({list, total: data.length});
  },
  error(msg) {
    return {
      code: 400,
      msg,
    };
  },
};

export const getPageData = (data, {pageNo = 1, pageSize = 10}) => {
  pageNo = Math.max(1, Math.floor(pageNo));
  pageSize = Math.max(10, Math.floor(pageSize));
  
  const totalPages = Math.ceil(data.length / pageSize);
  
  if (pageNo > totalPages) {
    pageNo = totalPages;
  }
  
  const start = (pageNo - 1) * pageSize;
  const end = start + pageSize;
  
  return data.slice(start, end);
};

export const generateTime = () => {
  return random(100, 600);
};

export const convertToTree = (list, pid = 0) => {
  return list.filter(item => item.pid === pid).map(item => {
    const children = convertToTree(list, item.id);
    if (children.length) {
      item.children = children;
    }
    return item;
  });
};

export const getLast7Days = () => {
  const today = dayjs();
  const dates = [];
  
  for (let i = 6; i >= 0; i--) {
    dates.push(today.subtract(i, "day").format("YYYY-MM-DD"));
  }
  
  return dates;
};
