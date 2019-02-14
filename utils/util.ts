export function ShowModal(option: wx.ShowModalOption){
  return new Promise<wx.ShowModalSuccessCallbackResult>((resolve, reject) => {
    option.success = (res: wx.ShowModalSuccessCallbackResult) => {
      resolve(res)
    };
    option.fail = (res: wx.GeneralCallbackResult) => {
      reject(res);
    };
    wx.showModal(option)
  });
}

/**
 * 关闭当前页面，返回上一页面或多级页面。可通过 [getCurrentPages()]((页面路由#getcurrentpages)) 获取当前的页面栈，决定需要返回几层。
 * @export
 * @param {wx.NavigateBackOption} option
 * @returns
 */
export function NavigateBack(option: wx.NavigateBackOption){
  return new Promise<wx.GeneralCallbackResult>((resolve, reject) => {
    option.success = (res: wx.GeneralCallbackResult) => {
      resolve(res)
    };
    option.fail = (res: wx.GeneralCallbackResult) => {
      reject(res);
    };
    wx.navigateBack(option)
  });
}

/**
 *
 * @export
 * @param {wx.NavigateToOption} option
 * @returns
 */
export function NavigateTo(option: wx.NavigateToOption){
  return new Promise<wx.GeneralCallbackResult>((resolve, reject) => {
    option.success = (res: wx.GeneralCallbackResult) => {
      resolve(res)
    };
    option.fail = (res: wx.GeneralCallbackResult) => {
      reject(res);
    };
    wx.navigateTo(option)
  });
}
/**
 * 在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作。
 * @export
 * @param {wx.PreviewImageOption} option
 * @returns
 */
export function PreviewImage(option: wx.PreviewImageOption){
  return new Promise<wx.GeneralCallbackResult>((resolve, reject) => {
    option.success = (res: wx.GeneralCallbackResult) => {
      resolve(res)
    };
    option.fail = (res: wx.GeneralCallbackResult) => {
      reject(res);
    };
    wx.previewImage(option)
  });
}


/**
 * 从本地相册选择图片或使用相机拍照。
 * @export
 * @param {wx.ChooseImageOption} [option={}]
 * @returns
 */
export function ChooseImage(option: wx.ChooseImageOption = {}){
  return new Promise<wx.ChooseImageSuccessCallbackResult>((resolve, reject) => {
    option.success = (res: wx.ChooseImageSuccessCallbackResult) => {
      resolve(res)
    };
    option.fail = (res: wx.GeneralCallbackResult) => {
      reject(res);
    };
    wx.chooseImage(option)
  });
}

/**
 * 打开地图选择位置。
 * @param option
 */
export function ChooseLocation(option: wx.ChooseLocationOption = {}){
  return new Promise<wx.ChooseLocationSuccessCallbackResult>((resolve, reject) => {
    option.success = (res: wx.ChooseLocationSuccessCallbackResult) => {
      resolve(res)
    };
    option.fail = (res: wx.GeneralCallbackResult) => {
      reject(res);
    };
    wx.chooseLocation(option)
  });
}



/**
 * 调起客户端小程序权限配置界面
 * @export
 * @param {wx.GetLocationOption} [option={}]
 * @returns
 */
export function OpenSetting(option:wx.OpenSettingOption = {}) {
  return new Promise<wx.OpenSettingSuccessCallbackResult>((resolve, reject) => {
    option.success = (res: wx.OpenSettingSuccessCallbackResult) => {
      resolve(res)
    };
    option.fail = (res: wx.GeneralCallbackResult) => {
      reject(res);
    };
    wx.openSetting(option)
  });
}
/**
 * 获取权限配置
 * @export
 * @param {wx.GetLocationOption} [option={}]
 * @returns
 */
export function GetSetting(option:wx.GetSettingOption = {}) {
  return new Promise<wx.GetSettingSuccessCallbackResult>((resolve, reject) => {
    option.success = (res: wx.GetSettingSuccessCallbackResult) => {
      resolve(res)
    };
    option.fail = (res: wx.GeneralCallbackResult) => {
      reject(res);
    };
    wx.getSetting(option)
  });
}

/**
 * 获取用户信息
 * @export
 * @param {wx.GetLocationOption} [option={}]
 * @returns
 */
export function GetUserInfo(option: wx.GetUserInfoOption = {}){
  return new Promise<wx.GetUserInfoSuccessCallbackResult>((resolve, reject) => {
    option.success = (res: wx.GetUserInfoSuccessCallbackResult) => {
      resolve(res)
    };
    option.fail = (res: wx.GeneralCallbackResult) => {
      reject(res);
    };
    wx.getUserInfo(option)
  });
}


/**
 * 微信登陆
 * 用户登录凭证（有效期五分钟）。开发者需要在开发者服务器后台调用 [code2Session]((code2Session))，使用 code 换取 openid 和 session_key 等信息
 * @export
 * @param {wx.LoginOption} [option={}]
 * @returns
 */
export function WxLogin(option: wx.LoginOption = {}) {
  return new Promise<wx.LoginSuccessCallbackResult>((resolve, reject) => {
    option.success = (res: wx.LoginSuccessCallbackResult) => {
      resolve(res)
    };
    option.fail = (res: wx.GeneralCallbackResult) => {
      reject(res);
    };
    wx.login(option)
  });
}

/**
 * 获取坐标
 * @export
 * @param {wx.GetLocationOption} [option={}]
 * @returns
 */
export function GetLocation(option: wx.GetLocationOption = {}) {
  return new Promise<wx.GetLocationSuccessCallbackResult>((resolve, reject) => {
    option.success = (res: wx.GetLocationSuccessCallbackResult) => {
      resolve(res)
    };
    option.fail = (res: wx.GeneralCallbackResult) => {
      reject(res);
    };
    wx.getLocation(option);
  });
}

/**
 * 多线程 Worker
 * @param worker wx.Worker
 * @param data any
 */
export function Workers(worker: wx.Worker, data: object) {
  worker.postMessage(data);
  return new Promise((resolve, reject) => {
    worker.onMessage(res => {
      resolve(res);
      worker.terminate();
    });
  });
}

/**
 * 定时器
 * @param worker wx.Worker
 * @param data any
 */
export function Timer(option:object){
  return Workers(wx.createWorker("workers/request/timer.js"),option)
}

// const timer = await Workers(wx.createWorker("workers/request/timer.js"), {
//       message: 2000
//     });

/**
 * next只会执行一次 小程序专用 app.js 所有异步执行完后 调用 next方法，页面在 onLoad 回调中订阅，等待next方法执行
 */
export class WxBehaviorSubject {
  private func: Function[] = []
  private catchData: any;
  private behavior = false;

  next(data?: any) {
    this.catchData = data;
    this.behavior = true;
    if (this.func.length) {
      this.func.forEach(fn => {
        fn.call(fn, data)
      });
    }
  }

  subscribe(func){
    if (this.behavior) {
      func.call(func, this.catchData)
    }
    this.func.push(func)
    return () => {
      this.unsubscribe(func)
    }
  }

  private unsubscribe(func) {
    let index = this.func.indexOf(func)
    if (!!~index) this.func.splice(index, 1)
  }
}

export const wxSubject = new WxBehaviorSubject() // 微信登陆异步控制
export const wxMapSubject = new WxBehaviorSubject() // 地图选址后 新增页数据更新
export const wxIndexSubject = new WxBehaviorSubject() // 首页触发数据更新
