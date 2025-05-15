import {groupBy} from "lodash-es";
import {SystemDictDataApi} from "@/api/system/dict.js";

/**
 * 更新了字典数据？是选择重置状态，等待路由守卫加载状态还是重置时立即loadState，我选择第二种，因为更新不代表一次，可能很多次，如果重置即load，那么是没有必要的。
 * 权限认证失败（401）?
 */
export const useDictStore = defineStore("dict", {
  state: () => ({
    dictMap: {},
    isSynced: false,
  }),
  actions: {
    async loadState() {
      const data = await SystemDictDataApi.getAll();
      this.dictMap = groupBy(data, item => item.dictType);
      this.isSynced = true;
    },
    resetState() {
      this.dictMap = {};
      this.isSynced = false;
    },
  },
});