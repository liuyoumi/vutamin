import {cleanObject} from "@/share/index.js";

export const useCruder = (config) => {
  const list = ref([]); // 列表数据
  const total = ref(0); // 数据总数
  const current = ref(1); // 当前页页码
  const pageSize = ref(10); // 每页数据显示数量
  const loading = ref(false); // 数据加载状态
  const params = reactive({}); // 页面参数
  
  /* 请求参数 */
  const reqParams = computed(() => {
    return {
      pageNo: current.value,
      pageSize: pageSize.value,
      ...cleanObject(params),
    };
  });
  
  /* 搜索方法，当页码等于1时直接请求，否则更新页码触发watcher */
  const search = (newParams = {}) => {
    Object.assign(params, newParams);
    if (current.value === 1) {
      getList();
    } else {
      current.value = 1;
    }
  };
  
  const getList = async () => {
    loading.value = true;
    const data = await config.getListApi(reqParams.value).finally(() => {
      loading.value = false;
    });
    list.value = data.list;
    total.value = data.total;
  };
  
  watch([current, pageSize], getList);
  
  return {
    list,
    total,
    current,
    pageSize,
    loading,
    params,
    search,
    getList,
  };
};
