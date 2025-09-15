import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const APILink = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL+ "/api/",
});

APILink.interceptors.request.use((config) => {
  let token = null;
  if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
     token = Cookies.get("admin_token"); // lấy token admin
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});
APILink.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 422) {
        toast.error(`Lỗi: ${data.message}`, { position: "top-right", autoClose: 3000 });

        if (data.errors) {
          Object.keys(data.errors).forEach((key) => {
            toast.error(`${key}: ${data.errors[key].join(", ")}`, {
              position: "top-right",
              autoClose: 3000,
            });
          });
        }
      }
    }

    return Promise.reject(error);
  }
);

export default APILink;
