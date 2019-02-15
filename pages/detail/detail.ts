import { IMyApp } from '../../app'
import { wxSubject } from '../../utils/util';

const app = getApp<IMyApp>()

Page({
  data: {
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
    // isTap: false,
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
