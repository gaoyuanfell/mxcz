import { IMyApp } from '../../app'
import { wxSubject } from '../../utils/util';

const app = getApp<IMyApp>()

Page({
  data: {

  },
  startLoad(){
    console.info('进来了')
  },
  onLoad() {

  },
  onReady(){
    wxSubject.subscribe(() => {
      this.startLoad();
    });
  }
})
