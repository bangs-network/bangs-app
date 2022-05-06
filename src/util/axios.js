import axios from 'axios'
import React from 'react';
import ReactDOM from 'react-dom';
import '../css/loading.css';

let user;

function getUser() {
    if (localStorage.getItem('userInfo')) {
        user = JSON.parse(localStorage.getItem('userInfo'));
    }
}

axios.defaults.headers["Content-Type"] = "application/json";

axios.interceptors.request.use(
    config => {
        //getUser();
        showLoading();
        config.baseURL  = "https://api.bangs.network/";
        config.timeout  = 10000;
        if(user){
            config.headers.authorization = user.token
        }
        return config;
    },
    error => {
        hideLoading();
        return Promise.reject(error);
    }
);


axios.interceptors.response.use(
    response => {
        hideLoading();
        // if(response.data === '0014'){
        //     localStorage.clear();
        //     message.success({
        //         content: '您的登录已经失效，请重新登录',
        //         duration: 2
        //     });
        //     setTimeout(() => {
        //         window._ROUTER_.push('/login');//router是在顶级入口app.js文件定义了window._ROUTER_ = this.props.history;
        //     }, 2000)
        // }
        return response;
    },
    error => {
        hideLoading();
        return Promise.resolve(error.response);
    }
);

function checkStatus(response) {
    return new Promise((resolve, reject) => {
        if(response && (response.status === 200)){
            resolve(response.data);
        }else{
            presentToast()
        }
    });
}

async function presentToast() {
    const toast = document.createElement('ion-toast');
    toast.message = 'Network error, try again';
    toast.duration = 3000;

    document.body.appendChild(toast);
    return toast.present();
}

export default {
    post(url, params) {
        return axios({
            method: "post",
            url,
            data: params
        }).then(response => {
            return checkStatus(response);
        });
    },
    get(url, params) {
        return axios({
            method: "get",
            url,
            params,
        }).then(response => {
            return checkStatus(response);
        });
    }
};




function showLoading () {
    let dom = document.createElement('div')
    dom.setAttribute('id', 'loading')
    document.body.appendChild(dom)
    ReactDOM.render(<ion-progress-bar />, dom)
}

function hideLoading () {
    document.body.removeChild(document.getElementById('loading'))
}