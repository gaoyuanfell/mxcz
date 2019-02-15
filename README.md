小程序名称：百万竞答
认证主体：银橙(上海)信息技术有限公司
账号：dati@ycmedia.cn
密码：dti.yc.20180122

https://mp.weixin.qq.com

http://192.168.100.149:8181/  // 文档 活动小程序

import { IMyApp } from '../../app'
import { wxSubject } from '../../utils/util';

const app = getApp<IMyApp>()

Page({
  data: {
    
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
