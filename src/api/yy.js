
import Utils from "../js/utils";

const baseUrl = "http://127.0.0.1:8095/api";

export const BespeakType = {
    baseUrl: baseUrl,
    findByPage: function(vm, params, callback, cp){
        const url = this.baseUrl + "/bespeakType/findPage";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    }
}