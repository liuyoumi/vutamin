import Provider from "./src/index.vue";
import {useCruder} from "@/hooks/useCruder.js";

export {default as Table} from "./src/Table.vue";
export {default as Search} from "./src/Search.vue";
export {default as Toolbar} from "./src/Toolbar.vue";
export {default as ColumnSetting} from "./src/ColumnSetting.vue";

export const createCrudContext = (options = {}) => {
  const {
    id,
    schemas,
    immediate = true,
    ...config
  } = options;
  
  if (!schemas) {
    throw new Error("createCrudContext: 'schemas' is required.");
  }
  
  const cruder = useCruder(config);
  
  if (immediate) {
    cruder.getList();
  }
  
  const CrudContextProvider = defineComponent({
    name: "CrudContextProvider",
    setup(_, {slots}) {
      return () => h(Provider, {id, cruder, schemas}, slots);
    },
  });
  
  return {
    cruder,
    CrudContextProvider,
  };
};
