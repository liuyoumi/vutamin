import {cleanObject} from "@/share/index.js";
import {merge} from "lodash-es";
import {DialogPlugin, MessagePlugin} from "tdesign-vue-next";

const defaultConfig = {
  pagination: {
    listKey: "list",
    totalKey: "total",
    pageSize: 10,
  },
  defaultParams: {},
};

export const useCruder = (config) => {
  config = merge({}, defaultConfig, config);
  
  const list = ref([]); // 列表数据
  const total = ref(0); // 数据总数
  const current = ref(1); // 当前页页码
  const pageSize = ref(config.pagination.pageSize); // 每页数据显示数量
  const loading = ref(false); // 数据加载状态
  const params = reactive({...config.defaultParams}); // 页面参数
  
  /* 请求参数 */
  const reqParams = computed(() => {
    const obj = cleanObject(params);
    if (pagination.value) {
      return {
        pageNo: current.value,
        pageSize: pageSize.value,
        ...obj,
      };
    }
    return obj;
  });
  
  const pagination = computed(() => config.pagination);
  
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
    if (pagination.value) {
      list.value = data[pagination.value.listKey];
      total.value = data[pagination.value.totalKey];
      return;
    }
    list.value = data;
    total.value = data.length;
  };
  
  const delList = (ids) => {
    const instance = DialogPlugin.confirm({
      header: "系统提示",
      body: "是否删除选中数据？",
      onConfirm: async () => {
        instance.setConfirmLoading(true);
        await config.delListApi(ids).finally(() => {
          instance.setConfirmLoading(false);
        });
        await MessagePlugin.success("删除成功");
        instance.destroy();
        await getList();
      },
      onClose: () => {
        instance.destroy();
      },
    });
  };
  
  watch([current, pageSize], getList);
  
  return {
    list,
    total,
    current,
    pageSize,
    loading,
    params,
    pagination,
    search,
    getList,
    delList,
  };
};
