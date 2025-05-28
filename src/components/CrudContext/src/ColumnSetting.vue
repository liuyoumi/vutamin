<script setup>
import {IconButton} from "@/components/IconButton";
import {VueDraggableNext} from "vue-draggable-next";

defineOptions({name: "ColumnSetting"});

const props = defineProps({
  fields: Array,
  schemas: Array,
});
const emits = defineEmits(["confirm"]);

const fields = ref(inject("fields") || props.fields);
const schemas = inject("schemas") || props.schemas;
const columns = computed(() => {
  return fields.value.map(key => {
    const schema = schemas.find(schema => schema.key === key);
    return {
      key: schema.key,
      title: schema.title,
      fixed: schema.table?.fixed,
    };
  });
});
const setSharedFields = inject("setSharedFields");

const visible = ref(false);
const showModal = () => {
  visible.value = true;
};

const removeItem = (item) => {
  const index = fields.value.findIndex(v => v === item.key);
  fields.value.splice(index, 1);
};

/**
 * 发送事件，关闭弹窗
 */
const onConfirm = () => {
  if (setSharedFields) {
    setSharedFields(unref(fields));
  } else {
    emits("confirm", unref(fields));
  }
  visible.value = false;
};

/**
 * 禁止拖放fixed列
 */
const onDragMove = ({draggedContext}) => {
  let {index, futureIndex} = draggedContext;
  let source = columns.value[index];
  let target = columns.value[futureIndex];
  return !(source.fixed || target.fixed);
};

/**
 * 更新时改变元素位置
 */
const onDragUpdate = ({newIndex, oldIndex}) => {
  [fields.value[newIndex], fields.value[oldIndex]] = [fields.value[oldIndex], fields.value[newIndex]];
};

/**
 * 根据 checkbox 的 DOM 顺序更新 fields，保持视觉顺序一致
 */
const checkboxWrapperRef = ref();
const updateCheckedFields = () => {
  fields.value = Array
  .from(checkboxWrapperRef.value.$el.querySelectorAll("input:checked"))
  .map(el => el.value);
};
</script>

<template>
  <IconButton
      icon="list"
      theme="default"
      variant="outline"
      @click="showModal"
  >
    自定义列
  </IconButton>
  <t-dialog
      v-model:visible="visible"
      width="800px"
      header="自定义列"
      @confirm="onConfirm"
  >
    <div class="panel">
      <div class="panel-item flex-1 mr-4">
        <div class="top">
          <span>可添加的列</span>
        </div>
        <div class="content">
          <t-checkbox-group
              ref="checkboxWrapperRef"
              :value="fields"
              @change="updateCheckedFields">
            <t-checkbox
                v-for="item of schemas"
                :key="item.key"
                :value="item.key"
                :disabled="!!item.table?.fixed"
            >
              <template #label>
                <span class="w-30 line-clamp-1">{{ item.title }}</span>
              </template>
            </t-checkbox>
          </t-checkbox-group>
        </div>
      </div>
      <div class="panel-item w-[30%]">
        <div class="top justify-between">
          <span>已选{{ fields.length }}列</span>
          <span class="cursor-pointer">清空全部</span>
        </div>
        <div class="content">
          <VueDraggableNext
              filter=".disable"
              :list="columns"
              :animation="300"
              :move="onDragMove"
              @update="onDragUpdate"
          >
            <div
                v-for="item of columns"
                :key="item.key"
                :class="['columns-item', item.fixed && 'disable']"
            >
              <t-space size="small">
                <t-icon name="move-1" v-if="!item.fixed"/>
                <span :class="[item.fixed && 'ml-2']">{{ item.title }}</span>
              </t-space>
              <div class="cursor-pointer" @click="removeItem(item)" v-if="!item.fixed">
                <t-icon name="close"/>
              </div>
            </div>
          </VueDraggableNext>
        </div>
      </div>
    </div>
  </t-dialog>
</template>

<style lang="scss" scoped>
.panel {
  display: flex;
  height: 400px;

  &-item {
    border: 1px #e5e5e5 solid;

    .top {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 0 1.25rem;
      background-color: #f5f7fa;
    }

    .content {
      height: calc(100% - 40px);
      overflow: auto;
      padding: 0.75rem;
    }
  }
}

.columns-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  margin-bottom: 12px;
  padding: 0 12px;
  border-radius: 4px;
  cursor: move;
  background-color: #f5f7fa;

  &.disable {
    cursor: not-allowed;
    background-color: #eeeeee;
  }
}
</style>
