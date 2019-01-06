
import Utils from "../js/utils";

const baseUrl = "http://127.0.0.1:8115/api";

//app
export const App = {
    baseUrl: baseUrl,
    findByPage: function(vm, params, callback, cp){
        const url = this.baseUrl + "/app/findPage";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    findForOptions: function(vm, params, callback, cp){
        const url = this.baseUrl + "/app/options";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    findForPids: function(vm, params, callback, cp){
        const url = this.baseUrl + "/app/pids";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    resetKey: function(vm, params, callback, cp){
        const url = this.baseUrl + "/app/resetKey";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    add: function(vm, params, callback, cp){
        const url = this.baseUrl + "/app/add";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    update: function(vm, params, callback, cp){
        const url = this.baseUrl + "/app/update";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    del: function(vm, params, callback, cp){
        const url = this.baseUrl + "/app/delete";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    }
}

//menu
export const Menu = {
    baseUrl: baseUrl,
    findByPage: function(vm, params, callback, cp){
        const url = this.baseUrl + "/menu/findPage";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    findForOptions: function(vm, params, callback, cp){
        const url = this.baseUrl + "/menu/options";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    findForPids: function(vm, params, callback, cp){
        const url = this.baseUrl + "/menu/pids";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    add: function(vm, params, callback, cp){
        const url = this.baseUrl + "/menu/add";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    update: function(vm, params, callback, cp){
        const url = this.baseUrl + "/menu/update";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    del: function(vm, params, callback, cp){
        const url = this.baseUrl + "/menu/delete";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    }
}

//menu ifs
export const MenuIfs = {
    baseUrl: baseUrl,
    findByPage: function(vm, params, callback, cp){
        const url = this.baseUrl + "/menuIfs/findPage";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    add: function(vm, params, callback, cp){
        const url = this.baseUrl + "/menuIfs/add";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    update: function(vm, params, callback, cp){
        const url = this.baseUrl + "/menuIfs/update";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    del: function(vm, params, callback, cp){
        const url = this.baseUrl + "/menuIfs/delete";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    }
}

//User
export const User = {
    baseUrl: baseUrl,
    findByPage: function(vm, params, callback, cp){
        const url = this.baseUrl + "/user/findPage";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    findAll: function(vm, params, callback, cp){
        const url = this.baseUrl + "/user/all";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    loginAuthMenu: function(vm, params, callback, cp){
        const url = this.baseUrl + "/user/authMenu";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    userAuthMenu: function(vm, params, callback, cp){
        const url = this.baseUrl + "/user/userMenu";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    updateAuthMenu: function(vm, params, callback, cp){
        const url = this.baseUrl + "/user/updateMenu";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    add: function(vm, params, callback, cp){
        const url = this.baseUrl + "/user/add";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    update: function(vm, params, callback, cp){
        const url = this.baseUrl + "/user/update";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    },
    del: function(vm, params, callback, cp){
        const url = this.baseUrl + "/user/delete";
        Utils.ajaxReq(url, params, function (res) {
            if (typeof callback === "function") {
                callback(res, vm, cp);
            }
        });
    }
}