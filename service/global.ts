class Global {
  [key: string]: any;
  xcxSourceId: string = '8'; //小程序标识
  tokenSign: string = ""; // 登陆token
  token: string = ""; // 登陆token 新
  v:string = '0.0.1' // 版本

  shareTicket?:string = '' // 分享ticket
  shareData?:wx.GetShareInfoSuccessCallbackResult = undefined // 解析shareTicket后数据

  userInfo?: wx.UserInfo = undefined; // 用户信息
}

export const globalConfig = new Global();
