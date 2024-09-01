/*
 * @Author: ZRMYDYCG
 * @Date: 2024-09
 * @LastEditors: ZRMYDYCG
 * @LastEditTime: 2024-09
 * @Description: 网络请求
 */
const baseURL = 'http://192.168.80.45:7000'
/**
 * 添加拦截器:
 *   拦截 request 请求
 *   拦截 uploadFile 文件上传
 *
 * TODO:
 *   1. 非 http 开头需拼接地址
 *   2. 请求超时
 *   3. 添加小程序端请求头标识
 *   4. 添加 token 请求头标识
 */

/**
 * 请求函数
 * @param  UniApp.RequestOptions
 * @returns Promise
 *  1. 返回 Promise 对象
 *  2. 获取数据成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 *  3. 获取数据失败
 *    3.1 401错误  -> 清理用户信息，跳转到登录页
 *    3.2 其他错误 -> 根据后端错误信息轻提示
 *    3.3 网络错误 -> 提示用户换网络
 */
type Data<T> = {
    code: string
    msg: string
    result: T
  }
  
  // 添加类型，支持泛型
  export const http = <T>(options: UniApp.RequestOptions) => {
    // 返回 Promise 对象
    return new Promise<Data<T>>((resolve, reject) => {
      uni.request({
        ...options,
        // 响应成功
        success(res) {
          const status = res.statusCode
          if (typeof res.data === 'object' && res.data !== null) {
            switch (status) {
              case 200:
                resolve(res.data as Data<T>)
                break
              case 404:
                console.error('404 Not Found')
                reject(new Error('404 Not Found'))
                break
              case 401:
                console.error('401 Unauthorized')
                reject(new Error('401 Unauthorized'))
                break
              case 400: // 提示开发者
                console.error(res.data)
                reject(new Error('400 Bad Request'))
                break
              case 422: // 提示用户
                console.error('422 Bad Request')
                uni.showToast({
                  icon: 'none',
                  title: (res.data as Data<T>).msg
                })
                break
              case 500:
              case 501:
              case 502:
              case 503:
                console.error('服务器错误')
                uni.showToast({
                  icon: 'none',
                  title: '服务器错误, 请联系管理员'
                })
                reject(new Error('出现异常'))
                break
            }
          } else {
            console.error('Invalid response data type')
            reject(new Error('Invalid response data type'))
          }
        },
        // 响应失败
        fail(err) {
          reject(err)
        },
      })
    })
  }
  