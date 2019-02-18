import { wxSubject } from "../../utils/util";
import { globalConfig } from "../../service/global";

declare var Component:any;

Component({
  properties: {

  },
  data: {
    userList:[1,2,3,4,5,6,7,8,9,10]
  },
  methods: {
    getUserInfo(e){
      // globalConfig.userInfo = e.detail.userInfo
      console.log(e.detail.userInfo);
      console.log(globalConfig.userInfo);
    },
    startLoad(){
      console.info('index')
    },
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
