import {random} from "lodash-es";

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
  return random(1000, 2000);
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