import {writable} from "svelte/store";
import {create} from "apisauce";
export const apiInstance = create({
    baseURL: "http://localhost:8080"
});

//export const apiStore = writable(apiInstance);