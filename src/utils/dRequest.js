import Fly from 'flyio/dist/npm/wx';
const dbfly = new Fly();
// 添加请求拦截器
dbfly.interceptors.request.use((request) => {
  request.headers = {
    'X-Tag': 'flyio',
    'content-type': 'application/xml'
  };
  return request;
});

// 添加响应拦截器
dbfly.interceptors.response.use(
  (response) => {
    return response.data;// 请求成功之后将返回值返回
  },
  (err) => {
    // 请求出错，根据返回状态码判断出错原因
    console.log(err);
  }
);

export default dbfly;
