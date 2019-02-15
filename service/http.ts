import { BASE_URL } from "./config";
import { globalConfig } from "./global";

class InterceptorsUse {
  use(...agrs) {
    this.list = Array.from(agrs || []);
  }
  list: any[] = [];
}

class Interceptors {
  request: InterceptorsUse = new InterceptorsUse();
  response: InterceptorsUse = new InterceptorsUse();
}

interface Result {
  Code?: any;
  Msg?: any;
  Data?: any;
  [key: string]: any;
}

/**
 * 数据请求
 * @export
 * @class Request
 */
export class Request {
  interceptors: Interceptors = new Interceptors();
  request(option: wx.RequestOption) {
    let requestList = this.interceptors.request.list;

    if (requestList.length) {
      if (requestList[0] instanceof Function) {
        option = requestList[0](option);
      }
    }
    return new Promise<Result>((resolve, reject) => {
      let responseList = this.interceptors.response.list;
      wx.request({
        url: option.url,
        data: option.data,
        header: option.header,
        method: option.method || "GET",
        dataType: option.dataType || "json",
        responseType: option.responseType || "text",
        success: (response: wx.RequestSuccessCallbackResult) => {
          if (responseList.length && responseList[0] instanceof Function) {
            try {
              response = responseList[0](response);
            } catch (error) {
              reject(JSON.parse(error));
            }
          }
          resolve(response);
        },
        fail: (error: wx.GeneralCallbackResult) => {
          if (responseList.length && responseList[1] instanceof Function) {
            error = responseList[1](error);
          }
          reject(error);
        },
        complete: option.complete
      });
    });
  }
}

/**
 * 文件上传
 * @export
 * @class UploadFile
 */
export class UploadFile {
  interceptors: Interceptors = new Interceptors();
  request(option: wx.UploadFileOption) {
    let requestList = this.interceptors.request.list;
    if (requestList.length) {
      if (requestList[0] instanceof Function) {
        option = requestList[0](option);
      }
    }
    return new Promise<Result>((resolve, reject) => {
      let responseList = this.interceptors.response.list;
      wx.uploadFile({
        url: option.url,
        filePath: option.filePath,
        name: option.name,
        header: option.header,
        formData: option.formData,
        success: (result: wx.UploadFileSuccessCallbackResult) => {
          if (responseList.length && responseList[0] instanceof Function) {
            try {
              result = responseList[0](result);
            } catch (error) {
              reject(JSON.parse(error));
            }
          }
          resolve(result);
        },
        fail: (error: wx.GeneralCallbackResult) => {
          if (responseList.length && responseList[1] instanceof Function) {
            error = responseList[1](error);
          }
          reject(error);
        },
        complete: option.complete
      });
    });
  }
}

const request = new Request();
const uploadFile = new UploadFile();

// 请求拦截器 请求
request.interceptors.request.use(
  (option: wx.RequestOption) => {
    if (!option.header) option.header = {};
    option.header["xcxSourceId"] = globalConfig.xcxSourceId;
    option.header["tokenSign"] = globalConfig.tokenSign;
    option.header["v"] = globalConfig.v;
    return option;
  },
  error => {
    return error;
  }
);

// 响应拦截器 响应
request.interceptors.response.use(
  (response: wx.RequestSuccessCallbackResult) => {
    if (response.statusCode == 200) {
      if ((<any>response.data).Code == "200") {
        return response.data;
      }
    }
    throw `${JSON.stringify(response.data)}`;
  },
  error => {
    return error;
  }
);

// 上传文件拦截器 请求
uploadFile.interceptors.request.use(
  (option: wx.UploadFileOption) => {
    if (!option.header) option.header = {};
    option.header["xcxSourceId"] = globalConfig.xcxSourceId;
    option.header["tokenSign"] = globalConfig.tokenSign;
    option.header["v"] = globalConfig.v;
    return option;
  },
  error => {
    return error;
  }
);

// 上传文件拦截器 响应
uploadFile.interceptors.response.use(
  (response: wx.UploadFileSuccessCallbackResult) => {
    if (response.statusCode == 200) {
      try {
        response.data = JSON.parse(response.data);
        if ((<any>response.data).Code == "200") {
          return response.data;
        }
      } catch (error) {
        return response.data;
      }
    }
    throw `${JSON.stringify(response.data)}`;
  },
  error => {
    return error;
  }
);

/**
 *
 * GET请求
 * @export
 * @param {string} url
 * @param {(string | IAnyObject | ArrayBuffer)} data
 * @param {wx.RequestOption} [option={ url: BASE_URL + url, data: data }]
 * @returns
 */
export function get(
  url: string,
  data: string | IAnyObject | ArrayBuffer,
  option: wx.RequestOption = { url: BASE_URL + url, data: data }
) {
  if(!option) option = {url: BASE_URL + url, data: data}
  option.method = "GET";
  if(!option.url) option.url = BASE_URL + url
  if(!option.data) option.data = data
  return request.request(option);
}

/**
 *
 * POST请求
 * @export
 * @param {string} url
 * @param {(string | IAnyObject | ArrayBuffer)} data
 * @param {wx.RequestOption} [option={ url: BASE_URL + url, data: data }]
 * @returns
 */
export function postJson(
  url: string,
  data: string | IAnyObject | ArrayBuffer,
  option: wx.RequestOption = { url: BASE_URL + url, data: data }
) {
  if(!option) option = {url: BASE_URL + url, data: data}
  option.method = "POST";
  if(!option.url) option.url = BASE_URL + url
  if(!option.data) option.data = data
  return request.request(option);
}

export function postForm(
  url: string,
  data: string | IAnyObject | ArrayBuffer,
  option: wx.RequestOption = { url: BASE_URL + url, data: data }
) {
  if(!option) option = {url: BASE_URL + url, data: data}
  option.method = "POST";
  if(!option.url) option.url = BASE_URL + url
  if(!option.data) option.data = data
  if (!option.header) option.header = {};
  option.header["content-type"] = "application/x-www-form-urlencoded; charset=utf-8";
  return request.request(option);
}

/**
 *
 * 文件上传
 * @export
 * @param {string} url
 * @param {string} name
 * @param {string} filePath
 * @param {wx.UploadFileOption} [option={ url: url, name: name, filePath: filePath }]
 * @returns
 */
export function loadFile(url: string, option?: wx.UploadFileOption) {
  if (!option) throw "参数不能为空";
  if (option) {
    option.url = BASE_URL + url;
  }
  return uploadFile.request(option);
}
