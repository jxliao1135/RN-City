import axios from 'axios'

const BASEURL ='https://easy-mock.com/mock/5ce214b7f562956b85fa6c37/WeChat.City'

const http = axios.create({
   baseURL: BASEURL,
   timeout: 6000,
   headers: { 'Content-Type': 'appliction/json' }
})

//http request 拦截器
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