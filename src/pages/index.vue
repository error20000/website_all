<template>
<div>
    <template v-if="showLoading">
      <div class="loading-box">
				<div class="loading-icon">
					<i class="fa fa-spinner fa-pulse fa-4x fa-fw"></i>
				</div>
        <p class="loading-tips">数据加载中，请耐心等待...</p>
      </div>
    </template>

    <template v-else>
   <el-container>
    <el-header>
      <el-row>
        <el-col :span="24" class="header">
          <el-col :span="4" class="logo" style="width: 210px;">
            <router-link :to="{path: '/'}">{{sysName}}</router-link>
          </el-col>
          <el-col :span="10">
            <el-menu router :default-active="$route.path" background-color="#20a0ff" text-color="#fff" active-text-color="#ffd04b" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item :index="item.app.domain" v-for="(item, index) in apps" :key="index">{{item.app.name}}</el-menu-item>
            </el-menu>
          </el-col>
          <el-col :span="4" class="userinfo">
						<el-dropdown>
							<span class="el-dropdown-link userinfo-inner">
							{{sysUserName}}<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<!--<el-dropdown-item>我的消息</el-dropdown-item>
								<el-dropdown-item>设置</el-dropdown-item>-->
								<!-- <el-dropdown-item><i class="fa fa-address-card fa-fw"></i>&nbsp; 个人信息</el-dropdown-item> -->
								<el-dropdown-item @click.native="handlepwdChange"><i class="fa fa-key fa-fw"></i>&nbsp; 修改密码</el-dropdown-item>
								<el-dropdown-item @click.native="logout"><i class="fa fa-power-off fa-fw"></i>&nbsp; 退出登录</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
          </el-col>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="main">
        <el-aside>
	  <!--导航菜单-->
          <el-menu router unique-opened :default-active="$route.path" class="el-menu-vertical-demo">
            <template v-for="(item,index) in menus">
              <el-submenu :index="index+''" :key="index" v-if="item.children">
                <template slot="title">
                  <span>{{item.name}}</span>
                </template>
                <el-menu-item v-for="child in item.children" :index="child.url" :key="child.url" v-if="!child.hidden">
                  {{child.name}}
                </el-menu-item>
              </el-submenu>
              <el-menu-item :index="item.url" :key="index" v-else>
                <span>{{item.name}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main class="content-container">
            <router-view/>
          </el-main>

	<!--修改密码界面-->
	<el-dialog title="修改密码" :visible.sync="pwdFormVisible" :close-on-click-modal="false">
		<el-form :model="pwdForm" label-width="100px" :rules="pwdFormRules" ref="pwdForm">
			<el-form-item label="原始密码" prop="oldPwd">
				<el-input type="text" v-model="pwdForm.oldPwd"></el-input>
			</el-form-item>
			<el-form-item label="新密码" prop="newPwd">
				<el-input type="text" v-model="pwdForm.newPwd"></el-input>
			</el-form-item>
			<el-form-item label="确认新密码" prop="newPwd2">
				<el-input type="text" v-model="pwdForm.newPwd2"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="pwdChangeClose">取消</el-button>
			<el-button type="primary" @click="pwdChange" :loading="pwdLoading">提交</el-button>
		</div>
	</el-dialog>

      </el-container>
    </el-container>
  </el-container>
    </template>
</div>
</template>

<script>
import Utils from "../js/utils";
import authApps from "../js/auth";

const page = name => () => import("./" + name);

export default {
  name: "index",
  data() {
    return {
      sysName: "后台管理",
      collapsed: false,
			sysUserName: "admin",
			showLoading: false,
      apps: authApps,
      menus: [],
      //pwd
      pwdFormVisible: false,
      pwdLoading: false,
      pwdFormRules: {
        oldPwd: [
          { required: true, message: "请输入原始密码", trigger: "blur" }
        ],
        newPwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        newPwd2: [
          { required: true, message: "请再次输入新密码", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              if (value !== this.pwdForm.newPwd) {
                callback(new Error("两次输入密码不一致!"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      },
      pwdForm: {
        oldPwd: "",
        newPwd: "",
        newPwd2: ""
      }
    };
  },
  methods: {
    handleSelect: function(domain) {
      this.initMenus(domain);
    },

    //创建菜单
    initMenus: function(domain) {
      domain = domain || "/" + this.$route.path.split("/")[1];
      console.log(domain);
      console.log(this.$route);
      this.menus = [];
      let data = [];
      for (let i = 0; i < this.apps.length; i++) {
        if (this.apps[i].app.domain == domain) {
          data = this.apps[i].menus;
        }
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].parent == 0) {
          let children = [];
          for (let j = 0; j < data.length; j++) {
            if (data[i].pid == data[j].parent) {
              children.push(data[j]);
            }
          }
          if (children.length > 0) {
            data[i].children = children;
          }
          this.menus.push(data[i]);
        }
      }
    },

    //创建路由
    initRoutes: function() {
      let routes = [];
      for (let i = 0; i < this.apps.length; i++) {
        let app = {
          path: this.apps[i].app.domain,
          name: this.apps[i].app.name,
          component: page("index"),
          children: []
        };
        for (let j = 0; j < this.apps[i].menus.length; j++) {
          let menu = {
            path: this.apps[i].menus[j].url.replace(
              this.apps[i].app.domain + "/",
              ""
            ),
            name: this.apps[i].menus[j].name,
            component: page(this.apps[i].menus[j].url.substring(1))
          };
          app.children.push(menu);
        }
        routes.push(app);
      }
      console.log("=======initRoutes========");
      console.log(routes);
      this.$router.addRoutes(routes);
    },
    //修改密码
    handlepwdChange: function() {
      this.pwdFormVisible = true;
      this.pwdForm = {
        oldPwd: "",
        newPwd: "",
        newPwd2: ""
      };
    },
    pwdChangeClose: function() {
      this.pwdFormVisible = false;
      this.pwdLoading = false;
      this.$refs.pwdForm.resetFields();
    },
    pwdChange: function() {
      this.$refs.pwdForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            var params = Object.assign({}, this.pwdForm);
            delete params.newPwd2;
            var self = this;
            this.pwdLoading = true;
            var url = "/api/user/changePWD";
            ajaxReq(url, params, function(res) {
              self.addLoading = false;
              if (res.code > 0) {
                self.$message({
                  message: "新增成功",
                  type: "success"
                });
                self.addFormVisible = false;
                parent.window.location.href = "login.html";
              } else {
                self.$message({
                  message: res.msg,
                  type: "warning"
                });
              }
            });
          });
        }
      });
    },
    //退出登录
    logout: function() {
      this.$confirm("确认退出吗?", "提示", {
        //type: 'warning'
      })
        .then(() => {
          var url = baseUrl + "api/user/logout";
          var params = {};
          ajaxReq(url, params, function(res) {
            if (res.code > 0) {
              parent.window.location.href = "login.html";
            }
          });
        })
        .catch(() => {});
    },
    //是否登录
    isLogin: function() {
      window.localStorage.setItem("apps", JSON.stringify(this.apps));
      var apps = JSON.parse(window.localStorage.getItem("apps"));
      if (apps) {
        //this.initRoutes();
        this.initMenus();
      } else {
        window.location.href = "/admin/login";
      }
    },
    //折叠导航栏
    handlecollapse: function() {
      this.collapsed = !this.collapsed;
    },
    showMenu(i, status) {
      this.$refs.menuCollapsed.getElementsByClassName(
        "submenu-hook-" + i
      )[0].style.display = status ? "block" : "none";
    },
    showIframe: function(index) {
      var items = String(index).split("_");
      this.menuNames = []; //面包屑
      var name = "";
      var url = "";

      switch (items.length) {
        case 1:
          this.menuNames.push(this.authMenu[Number(items[0])].name);
          name = this.authMenu[Number(items[0])].name;
          url = this.authMenu[Number(items[0])].path;
          break;
        case 2:
          this.menuNames.push(this.authMenu[Number(items[0])].name);
          this.menuNames.push(
            this.authMenu[Number(items[0])].children[Number(items[1])].name
          );
          name = this.authMenu[Number(items[0])].children[Number(items[1])]
            .name;
          url = this.authMenu[Number(items[0])].children[Number(items[1])].path;
          break;
        case 3:
          this.menuNames.push(this.authMenu[Number(items[0])].name);
          this.menuNames.push(
            this.authMenu[Number(items[0])].children[Number(items[1])].name
          );
          this.menuNames.push(
            this.authMenu[Number(items[0])].children[Number(items[1])].children[
              Number(items[2])
            ].name
          );
          name = this.authMenu[Number(items[0])].children[Number(items[1])]
            .children[Number(items[2])].name;
          url = this.authMenu[Number(items[0])].children[Number(items[1])]
            .children[Number(items[2])].path;
          break;

        default:
          break;
      }
      //			$('.breadcrumb-container .title').html(name);
      $(".content-iframe").attr("src", url);
    }
  },
  mounted: function() {
    this.isLogin();
  }
};
</script>
<style>
.el-header {
  line-height: 60px;
  text-align: center;
  background: #20a0ff;
  color: #333;
}
.el-aside {
  background: #d3dce6;
  color: #333;
}
.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
}
.el-header .userinfo {
  text-align: right;
  padding-right: 35px;
  float: right;
}
.el-header .userinfo .userinfo-inner {
  cursor: pointer;
  color: #fff;
}
.el-header .userinfo .userinfo-inner img {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 10px 0px 10px 10px;
  float: right;
}
.el-header .logo {
  height: 60px;
  font-size: 22px;
  border-color: rgba(238, 241, 146, 0.3);
  border-right-width: 1px;
  border-right-style: solid;
}
.el-header .logo a {
  width: 100%;
  height: 100%;
  text-align: center;
  color: #fff;
  display: inline-block;
}
.main {
  display: flex;
  position: absolute;
  top: 60px;
  bottom: 0px;
  overflow: hidden;
}
.main aside {
  flex: 0 0 230px;
  width: 230px;
}
.main aside .el-menu {
  height: 100%;
}
.main aside .collapsed .item {
  position: relative;
}
.main aside .collapsed .submenu {
  position: absolute;
  top: 0px;
  left: 60px;
  z-index: 99999;
  height: auto;
  display: none;
}
.main .content-container {
  flex: 1;
  overflow-y: scroll;
  padding: 20px;
}
.main .content-container .breadcrumb-container.title {
  width: 200px;
  float: left;
  color: #475669;
}
.main .content-container .breadcrumb-container.breadcrumb-inner {
  float: right;
}
.main .content-container .content-wrapper {
  background-color: #fff;
  box-sizing: border-box;
}
</style>
