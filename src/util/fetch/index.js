import { get, endpoints } from "./fetch";

export const fetchPostList = () => get(endpoints.post);
