const worker = wx.createWorker('../request/index.js')
console.info(worker)
worker.postMessage({
  msg: 'hello worker'
});