import axios from "axios";

export const rootApi = axios.create({
    baseURL: "/api"
    })