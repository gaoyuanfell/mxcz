import { postJson, loadFile, get } from "./http";
import { WxLogin } from "../utils/util";

const mxczUrl = '/charitable_xcx'

/**
 *
 * 活动列表
 * page 是 int 页码
 * limit 是 int 条数
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function activityList_(body = {}){
  console.info(body)
  return postJson(`${mxczUrl}/activity/list`, body)
}

/**
 *
 * 我参加的活动
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function activityMy_(body = {}){
  return get(`${mxczUrl}/activity/my`, body)
}

/**
 *
 * 参加报名活动
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function attend_(body = {}){
  return postJson(`${mxczUrl}/attend/attend`, body)
}

/**
 *
 * 邮寄捐赠物品
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function attendAddexpress_(body = {}){
  return postJson(`${mxczUrl}/attend/addexpress`, body)
}


/**
 *
 * 参加报名活动
 * activityId
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function activityGet_(body = {}){
  return get(`${mxczUrl}/activity/get`, body)
}

/**
 *
 * 爱心榜单
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function activityRanking_(body = {}){
  return get(`${mxczUrl}/activity/ranking`, body)
}

// 接口统一文件
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

/**
 *
 * 授权获取用户手机号
 * @export
 * @param {*} [body={}]
 * @returns
 */
export function webBp_(body = {}) {
  return postJson("/xcx/bp", body);
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
