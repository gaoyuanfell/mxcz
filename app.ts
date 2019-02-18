import { wxSubject, GetSetting, GetUserInfo } from "./utils/util";
import { login_ } from "./service/service";
import { globalConfig } from "./service/global";
import { init } from "./utils/init";

//app.ts
export interface IMyApp {
  userInfoReadyCallback?(res: wx.UserInfo): void;
}

App<IMyApp>({
  async onLaunch(options: App.ILaunchShowOption) {
    init()
    globalConfig.shareTicket = options.shareTicket
    if(options.shareTicket){
      wx.getShareInfo({
        shareTicket: globalConfig.shareTicket,
        success:(res)=> {
          globalConfig.shareData = res;
        }
      })
    }

    // 登陆
    let lRes:any = await login_();
    globalConfig.tokenSign = lRes.Data
    globalConfig.token = lRes.token
    const getSetting = await GetSetting()
    if(getSetting.authSetting["scope.userInfo"]){
      const getUserInfo = await GetUserInfo()
      globalConfig.userInfo = getUserInfo.userInfo
    }
    wxSubject.next()
  }
});
