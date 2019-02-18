import { IMyApp } from '../../app'
import { wxSubject } from '../../utils/util';
import { webBp_ } from '../../service/service';

const app = getApp<IMyApp>()

Page({
  data: {
    startLoad: false,
    imgUrls: [
      '/img/1.jpg',
      '/img/2.jpg',
      '/img/3.jpg'
    ],
    indicatorDots: true,
    indicatorColor: '#fff',
    indicatorActiveColor: '#ff6600',
    circular: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,

    toView: '',
    scrollTop: 0,
    opacity: 0,

    goodsList:[],
    goods:{
      number: 1
    },
    activity:{},
    user:{},
  },

  addGoods(){
    this.data.goodsList.push(this.data.goods)
    this.setData({
      goodsList: this.data.goodsList
    });
    this.data.goods = {number: 1}
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
      [name]: value
    });
  },
  goodsSubmit(){
    console.info()
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
    let query = wx.createSelectorQuery()
    query.select(`#a`).boundingClientRect()
    query.exec((res)=> {
      console.info(res[0].top)
    })
    // if(this.data.isTap){
    //   this.setData({
    //     isTap: false,
    //     scrollTop: scrollTop - 45
    //   })
    // }
  },
  scrollTo(e){

    if(this.data.opacity < 0.5) return;
    let id = e.target.dataset.id;
    this.setData({
      toView: id,
      // isTap: true,
    })

    // let query = wx.createSelectorQuery()

    // query.select(`#${id}`).boundingClientRect()
    // query.selectViewport().scrollOffset()
    // this.setData({
    //   scrollTop: 0
    // })
    // query.exec( (res)=> {
    //   this.setData({
    //     scrollTop: this.data.scrollTop + res[0].top - 45
    //   })
    //   console.info(res[0])
    // })

    // query.select(`#${id}`).boundingClientRect((res)=> {
    //   this.setData({
    //     scrollTop: res.top
    //   })
    //   console.info(res.top)
    // }).exec()
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
