// 在 Worker 线程执行上下文会全局暴露一个 worker 对象，直接调用 worker.onMeesage/postMessage 即可

worker.onMessage((res)=> {
  task(res)
});

function task(data:any){
  let i = 0;
  while (1000000000 > i) {
    ++i;
  }
  worker.postMessage({
    msg: "hello worker !!!!!!",
    ...data
  });
}
// 执行逻辑代码
