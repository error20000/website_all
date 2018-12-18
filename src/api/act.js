//menu ifs

import Utils from "../js/utils";

const baseUrl = "http://192.168.106.67:8105/api";

//Type
export const Type = {
    baseUrl: baseUrl,
    findByPage: function(vm, params, callback, cp){
        const url = this.baseUrl + "/activeType/findPage";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    findForOptions: function(vm, params, callback, cp){
        const url = this.baseUrl + "/activeType/options";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    findForPids: function(vm, params, callback, cp){
        const url = this.baseUrl + "/activeType/pids";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    add: function(vm, params, callback, cp){
        const url = this.baseUrl + "/activeType/add";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    update: function(vm, params, callback, cp){
        const url = this.baseUrl + "/activeType/update";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    del: function(vm, params, callback, cp){
        const url = this.baseUrl + "/activeType/delete";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    }
}

//Config
export const Config = {
    baseUrl: baseUrl,
    findByPage: function(vm, params, callback, cp){
        const url = this.baseUrl + "/activeConfig/findPage";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    findForOptions: function(vm, params, callback, cp){
        const url = this.baseUrl + "/activeConfig/options";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    findForPids: function(vm, params, callback, cp){
        const url = this.baseUrl + "/activeConfig/pids";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    add: function(vm, params, callback, cp){
        const url = this.baseUrl + "/activeConfig/add";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    update: function(vm, params, callback, cp){
        const url = this.baseUrl + "/activeConfig/update";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    del: function(vm, params, callback, cp){
        const url = this.baseUrl + "/activeConfig/delete";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    }
}


//Interface
export const Interface = {
    baseUrl: baseUrl,
    findByPage: function(vm, params, callback, cp){
        const url = this.baseUrl + "/interface/findPage";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    findForOptions: function(vm, params, callback, cp){
        const url = this.baseUrl + "/interface/options";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    add: function(vm, params, callback, cp){
        const url = this.baseUrl + "/interface/add";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    update: function(vm, params, callback, cp){
        const url = this.baseUrl + "/interface/update";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    del: function(vm, params, callback, cp){
        const url = this.baseUrl + "/interface/delete";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    }
}