import {defineStore} from "pinia";

export const useTagsViewStore = defineStore("tagsView", {
  state: () => ({
    views: [],
  }),
  actions: {
    addView(view) {
      if (this.views.some(v => v.fullPath === view.fullPath)) {
        return false;
      }
      if (view.meta.noTagsView) {
        return false;
      }
      this.views.push(Object.assign({}, view, {title: view.meta.title}));
    },
    clearViews() {
      this.views = [];
    },
    removeView(value) {
      this.views = this.views.filter(v => v.fullPath !== value);
    },
  },
});
