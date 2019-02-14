import { get, postJson, postForm, loadFile } from "./http";
import { WxLogin } from "../utils/util";

// 接口统一文件

/**
 * 统计
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function signactityStatis_(body = {}){
  return postJson('/xcx/signactity/statis', body)
}

/**
 * 关闭活动
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function actityDisactive_(body = {}){
  return get('/xcx/signactity/disactive', body)
}

/**
 * 分享活动
   activityId	是	int	活动Id
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function shareActity_(body = {}){
  return postJson('/xcx/signactity/share', body)
}

/**
 * 收藏活动
   activityId	是	int	活动Id
   collectStatus	是	int	收藏：1：收藏；0：取消收藏
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function collectActity_(body = {}){
  return postJson('/xcx/signactity/collect', body)
}

/**
 * 观看
   activityId	是	int	活动Id
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function viewActity_(body = {}){
  return postJson('/xcx/signactity/view', body)
}

/**
 * 参与活动
   activityId	是	int	活动Id
   userPhomeNum	是	String	打卡用户手机号
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function signactityJoin_(body = {}){
  return postJson('/xcx/signactity/join', body)
}

/**
 * 活动打卡
  activityId	是	int	活动Id
  addressId	是	int	地址Id
  latitude	是	String	经度
  longitude	是	String	纬度
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function signActitySign_(body = {}) {
  return postJson("/xcx/signactity/sign", body);
}

/**
 * 活动用户列表
 * @export
 * @param {*} [body={}] activityId=1
 * @returns
 */
export function getParticipator_(body = {}) {
  return get("/xcx/signactity/getparticipator", body);
}
/**
 * 活动列表详情
 * @export
 * @param {*} [body={}] activityId=1
 * @returns
 */
export function getSignActity_(body = {}) {
  return get("/xcx/signactity/get", body);
}

/**
 * 我发起活动
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function myCreateActivity_(body = {}) {
  return postJson("/xcx/signactity/mycreateactivity", body);
}

/**
 * 我参与活动
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function myPartakeActivity_(body = {}) {
  return postJson("/xcx/signactity/mypartakeactivity", body);
}

/**
 * 活动列表
  page	是	int	页码
  limit	是	int	页数
  isPublic	是	int	是否公开 1：公开;0：不公开
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function getActityList_(body = {}) {
  return postJson("/xcx/signactity/getlist", body);
}

/**
 * 添加活动
  activityTitle	是	String	活动标题
  activityLabel	是	String	活动标签
  isPublic	是	int	是否公开 1：公开;0：不公开
  sginActivityMediaList	否	sginActivityMedia	活动图片，视频
  sginActivityAddressList	是	sginActivityAddress	活动地址

  sginActivityMedia:
    imageUrl	是	String	图片，视频地址
    smallImageUrl	是	String	缩率图地址

  sginActivityAddress:
    address	是	String	地址
    remark	是	String	备注
    startTime	是	int	开始时间
    endTime	是	list	结束时间
    latitude	是	list	纬度
    longitude	是	list	经度
    sginActivityMediaList	否	sginActivityMedia	地址图片，视频
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function addActity(body = {}) {
  return postJson("/xcx/signactity/add", body);
}

/**
 * 登陆
 * @export
 * @returns
 */
export async function login_() {
  let wRes: any = await WxLogin();
  if (!wRes.code) throw `登录失败！${wRes.errMsg}`;
  let lgsRes = await postJson("/web/lgs", {
    loginAccount: wRes.code
  });
  return lgsRes;
}

/**
 *
 * 授权获取用户信息
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function webUis_(body = {}) {
  return postJson("/web/uis", body);
}

interface UploadFileOption {
  filePath: string;
  /** 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容 */
  name: string;
}

/**
 * 文件上传
 * @export
 * @param {wx.UploadFileOption} option
 * @returns
 */
export function loadFile_(option: UploadFileOption) {
  return loadFile("/xcx/gift/addImgs", <wx.UploadFileOption>option);
}
