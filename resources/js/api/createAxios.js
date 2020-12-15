import axios from "axios";

export default axios.create({
    baseURL: "/api/admin/",
    responseType: "json",
    headers: {
        post: {
            'Content-Type': 'application/json'
        }
    }
});