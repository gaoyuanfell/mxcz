import { IMyApp } from '../../app'
import { wxSubject } from '../../utils/util';
import { webBp_, activityGet_, attend_, attendAddexpress_ } from '../../service/service';

const app = getApp<IMyApp>()

Page({
  data: {
    startLoad: false,
    imgUrls: [
      '/img/1.jpg',
      '/img/2.jpg',
      '/img/3.jpg'
    ],
    swiper:{
      indicatorDots: true,
      indicatorColor: '#fff',
      indicatorActiveColor: '#ff6600',
      circular: true,
      autoplay: true,
      interval: 3000,
      duration: 300,
    },

    toView: '',
    scrollTop: 0,
    opacity: 0,

    goodsList:[],
    goodsCache:{
      number: 1
    },
    goods:{},
    activityId:0,
    activity:{},
    user:{},
    modeState: 0
  },
  // 参与
  partake(){
    let type = this.data.activity.type || 1
    if(type){
      switch(+type){
        case 1:
        attend_({
          activityId:this.data.activityId
        }).then(res => {
          if(res.code == 200){
            this.setData({
              'modeState':1
            })
          }
        })

        break;
        case 2:
        this.setData({
          'modeState':1
        })
        break;
      }
    }
  },

  addGoods(){
    this.data.goodsList.push(this.data.goodsCache)
    this.setData({
      goodsList: this.data.goodsList
    });
    this.setData({
      'goodsCache.number':1
    })
  },
  removeGoods(e){
    let index = e.currentTarget.dataset.index;
    this.data.goodsList.splice(index,1)
    this.setData({
      goodsList: this.data.goodsList
    });
  },
  expressChange(e){
    let name = e.currentTarget.dataset.name;
    let value = e.detail.value;
    this.setData({
      [name]: this.data.activity.listDemandGoods[value].demandGoodName
    });
  },
  expressChange2(e){
    let name = e.currentTarget.dataset.name;
    let value = e.detail.value;
    this.setData({
      [name]: ['圆通速递','韵达速递','申通快递','中通快递','顺丰快递'][value]
    });
  },
  goodsSubmit(){
    let donationGoods = this.data.goodsList.map(g => `${g.name}*${g.number}`).join(',')
    this.data.goods
    let goods = {...this.data.goods}
    goods.donationGoods = donationGoods;
    goods.activityId = this.data.activityId;
    console.info(goods)
    attendAddexpress_(goods).then(res => {
      if(res.code == 200){
        this.setData({
          modeState: 4
        })
      }
    })
  },
  getPhoneNumber(e){
    if ('getPhoneNumber:ok' != e.detail.errMsg) {
      wx.showToast({
        title: '绑定手机号码后才能继续下一步',
        icon: 'none'
      })
      return;
    }
    webBp_({
      encrypted: e.detail.encryptedData,
      iv: e.detail.iv
    }).then(res => {
      console.info(res)
    })
  },
  userDataSubmit(){
    console.info(this.data.user)
  },
  scroll(e){
    let scrollTop = e.detail.scrollTop
    this.setData({
      opacity: scrollTop / 150,
    })
    // let query = wx.createSelectorQuery()
    // query.select(`#a`).boundingClientRect()
    // query.exec((res)=> {
    //   console.info(res[0].top)
    // })
  },
  scrollTo(e){
    if(this.data.opacity < 0.5) return;
    let id = e.target.dataset.id;
    this.setData({
      toView: id,
    })
  },
  bindDataValue(e){
    let {name, value} = e.currentTarget.dataset;
    this.setData({
      [name]: value
    });
  },
  bindKeyInput(e) {
    let name = e.currentTarget.dataset.name;
    let value = e.detail.value;
    this.setData({
      [name]: value
    });
  },
  startLoad(){
    this.setData({
      'startLoad':true
    })
    activityGet_({activityId:this.data.activityId}).then(res => {
      if(res.code == 200){
        this.setData({
          activity: res.data
        })
      }
    })
  },
  onLoad(query) {
    console.info(query)
    this.data.activityId = query.activityId
  },
  onReady(){
    wxSubject.subscribe(() => {
      this.startLoad();
    });
  }
})
