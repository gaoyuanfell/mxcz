import { wxSubject } from "../../utils/util";
import { globalConfig } from "../../service/global";

declare var Component:any;

Component({
  properties: {

  },
  data: {

  },
  methods: {
    getUserInfo(e){
      // globalConfig.userInfo = e.detail.userInfo
      console.log(e.detail.userInfo);
      console.log(globalConfig.userInfo);
    },
    startLoad(){
      console.info('user')
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
