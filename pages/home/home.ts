import { wxSubject } from "../../utils/util";

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
