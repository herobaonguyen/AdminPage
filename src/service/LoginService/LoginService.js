import axios from 'axios';

export const LoginService = {
    loginAPI: (userLogin) => {
        return axios({
            url:'http://movieapi.cyberlearn.vn/api/QuanLyNguoiDung/DangNhap',
            method:'POST',
            data:userLogin
        })
    }
}