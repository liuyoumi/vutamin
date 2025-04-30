import NProgress from "nprogress";

export const useNProgress = () => {
  NProgress.configure({showSpinner: false});
  
  const start = () => {
    NProgress.start();
  };
  
  const done = () => {
    NProgress.done();
  };
  
  return {
    start,
    done,
  };
};