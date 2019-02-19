import { wxSubject } from "../../utils/util";
import { globalConfig } from "../../service/global";
import { activityList_ } from "../../service/service";

declare var Component:any;

Component({
  properties: {

  },
  data: {
    userList:[1,2,3,4,5,6,7,8,9,10],
    query:{
      "page":1,
	    "limit":10
    },
    list:[]
  },
  methods: {
    getUserInfo(e){
      // globalConfig.userInfo = e.detail.userInfo
      console.log(e.detail.userInfo);
      console.log(globalConfig.userInfo);
    },
    startLoad(){
      console.info('1111')
      activityList_(this.data.query).then(res => {
        console.info(res)
        if(res.code){
          this.setData({
            list: res.data
          })
        }
      })
    },
    goDetail(e){
      let activityId = e.currentTarget.dataset.activityId
      console.info(e.currentTarget.dataset)
      let index = e.currentTarget.dataset.index
      this.triggerEvent('detail', {activityId, index})
    }
  },
  lifetimes: {
    attached() {
      wxSubject.subscribe(() => {
        this.startLoad();
      });
    },
    detached() {

    },
  },
})
