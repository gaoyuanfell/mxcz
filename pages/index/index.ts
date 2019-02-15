//index.js
//获取应用实例
import { IMyApp } from '../../app'
import { wxSubject } from '../../utils/util';
import { globalConfig } from '../../service/global';

const app = getApp<IMyApp>()

Page({
  data: {
    userList:[1,2,3,4,5,6,7,8,9,10]
  },
  getUserInfo(e){
    // globalConfig.userInfo = e.detail.userInfo
    console.log(e.detail.userInfo);
    console.log(globalConfig.userInfo);
  },
  startLoad(){
    console.info('登陆了')
  },
  onLoad() {

  },
  onReady(){
    wxSubject.subscribe(() => {
      this.startLoad();
    });
  }
})
