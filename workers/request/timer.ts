// 在 Worker 线程执行上下文会全局暴露一个 worker 对象，直接调用 worker.onMeesage/postMessage 即可

// 定时器
worker.onMessage((data: wx.WorkerOnMessageCallbackResult) => {
  setTimeout(() => {
    worker.postMessage(data);
  }, data.message);
});
