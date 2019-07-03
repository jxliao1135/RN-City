import axios from 'axios'


class Http {
   constructor(baseUrl) {
      // this.header = { 'Content-Type': 'application/x-www-form-urlencoded' }
      this.header = header || { 'Content-Type': 'application/json' }
      this.baseUrl = baseUrl
      this.init()
   }
   //============================初始化==================================
   init() {
      this.http = axios.create({
         baseURL: this.baseUrl,
         // timeout: 5000,
         responseType: 'json',
      })
      //http request 拦截器
      this.http.interceptors.request.use(
         config => {
            config.data = JSON.stringify(config.data);
            config.headers = this.header
            let login = $store.fetch('login')
            let vailParams = {
               appid: '1',
               shijianchuo: new Date().valueOf() + Math.floor(Math.random() * 100) + '',
               yanzheng: $.md5('1' + new Date().valueOf() + "upqvk54gneu0jwcnivlfhsr2efwoywey"),
               acessToken: login.token,
            }
            config.params = Object.assign({}, vailParams, config.params)
            return config;
         },
         error => {
            return Promise.reject(error);
         }
      );
      //http response 拦截器
      this.http.interceptors.response.use(response => {
         // 对响应数据做点什么
         return response.data;
      }, error => {
         // 对响应错误做点什么
         return Promise.reject(error);
      });
   }
}

const BASEURL ='https://easy-mock.com/mock/5ce214b7f562956b85fa6c37/WeChat.City/'
const HEADER = { 'Content-Type': 'application/json' }

const http = axios.create({
   baseURL: BASEURL,
   timeout: 5000,
   responseType: 'json',
})

http.interceptors.request.use(
   // config => {
   //    config.data = JSON.stringify(config.data);
   //    config.headers = this.header
   //    let login = $store.fetch('login')
   //    let vailParams = {
   //       appid: '1',
   //       shijianchuo: new Date().valueOf() + Math.floor(Math.random() * 100) + '',
   //       yanzheng: $.md5('1' + new Date().valueOf() + "upqvk54gneu0jwcnivlfhsr2efwoywey"),
   //       acessToken: login.token,
   //    }
   //    config.params = Object.assign({}, vailParams, config.params)
   //    return config;
   // },
   // error => {
   //    return Promise.reject(error);
   // }
);
//http response 拦截器
http.interceptors.response.use(response => {
   // 对响应数据做点什么
   return response.data;
}, error => {
   // 对响应错误做点什么
   return Promise.reject(error);
});

export default http