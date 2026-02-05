import axios from "axios";
axios.defaults.baseURL = '/api'; //프록시설정
axios.defaults.withCredentials = true; //보안쿠키 내용이 서버에 전달, 보안쿠키에 AT, RT 저장

export default axios;