import { wxSubject, NavigateTo } from "../../utils/util";

Page({
  data: {
    type: 1
  },
  changeType(e) {
    let type = e.currentTarget.dataset.type;
    console.info(type)
    this.setData({
      type: type
    });
  },
  // 跳转到详情
  goDetail(e){
    NavigateTo({
      url: `/pages/detail/detail?activityId=${e.detail.activityId}&index=${e.detail.index}`
    })
  },
  getUserInfo(e){
    console.info(e);
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
