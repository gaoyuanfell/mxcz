import { postJson, loadFile } from "./http";
import { WxLogin } from "../utils/util";

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
