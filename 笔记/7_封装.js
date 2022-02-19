/**/ axios默认配置;
axios.defaults.method = "GET";
axios.defaults.baseURL = "xxxx"; //  url: '/sign-in'
axios.defaults.timeout = 5000; // timeout结束请求

/**/ 创建实例对象;
const instance = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

/**/ 拦截器;
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

/**/ 封装;
function axios({ method, url, params, headers, data }){
  // method方法转换大写
  method = method.toUpperCase();
  //返回值
  return new Promise((resolve, reject) => {
    // 1. 创建对象
    const xhr = new XMLHttpRequest();
    // 2. 初始化
    // 处理 params 对象 （eg. a=100&b=200）
    let str = "";
    for(let k in params) {
      str += `${k}=${params[k]}&`
    }
    str = str.slice(0,-1);

    xhr.open(method, url+'?'+str);
    // 3. 发送
    if(method === 'POST' || method === 'PUT' || method === 'DELETE'){
      // Content-type mime类型设置
      xhr.setRequestHeader('Content-Type', 'application/json')
      // 设置请求体
      xhr.send(JSON.stringify(data)) // 将data对象转化成字符串
    }else{
      xhr.send();
    }

    // 设置响应结果的类型为JSON
    xhr.responseType = 'json';
    // 4. 处理结果
    xhr.onreadystatechange = function(){
      // 
      if(readyState === 4){
        // 判断响应状态码 2xx
        if(xhr.status >= 200 && xhr.status < 300){
          // 成功状态
          resolve({
            status: xhr.status,
            message:xhr.responseText,
            body:xhr.response
          });
          }else{
            reject(new Error("失败，状态码为" + xhr.status))
          }
      }
    }  
  })
}


/**/  创建storageUtils 保存saveUser等方法
/**/   

# 问题： 又是search不能全部搜索的问题