<template>
    <section>
        <!--筛选条件-->
		<el-tabs type="border-card" style="margin-bottom: 20px;">
			<el-tab-pane label="筛选条件">
				<el-row type="flex">
                    <el-col :span="24">
                        <el-form size="mini" :inline="true" :model="filters">
                            <el-form-item label="" prop="staffId">
                                <el-input placeholder="请输入工号" v-model="filters.staffId" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="" prop="nick">
                                <el-input placeholder="请输入昵称" v-model="filters.nick" clearable></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="queryByPage(1)" icon="el-icon-search">查询</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button @click="queryRefresh()" icon="el-icon-refresh">重置</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
                            </el-form-item>
                        </el-form>
                    </el-col>
				</el-row>
			</el-tab-pane>
		</el-tabs>

		<!--查询结果-->
		<el-tabs type="border-card">
			<el-tab-pane label="查询结果">
				<el-row type="flex">
					<el-col :span="24">
						<el-table size="mini" :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;">
							<el-table-column prop="staffId" label="工号" sortable>
							</el-table-column>
							<el-table-column prop="nick" label="昵称" sortable>
							</el-table-column>
							<el-table-column prop="admin" label="超管" sortable :formatter="formatterByAdmin">
							</el-table-column>
                            <el-table-column label="授权" width="150" fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="success" size="mini" @click="handleAuth(scope.$index, scope.row)">授权</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="150" fixed="right">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                    <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
						</el-table>
					</el-col>
				</el-row>

				<!--分页查询-->
				<el-row>
					<el-col :span="24">
						<el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="changeRows" @current-change="changePage" :current-page.sync="page" :page-sizes="[10, 20, 50, 100]" :page-size="rows" :total="total" style="float:right;">
						</el-pagination>
					</el-col>
				</el-row>
			</el-tab-pane>
		</el-tabs>

		<!--新增界面-->
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
			<el-form size="mini" :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item prop="staffId">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.staffId" :effect="tips.effect" :placement="tips.forms.staffId.placement">
                            <div slot="content" v-html="tips.forms.staffId.content"></div>
                            <span>工号<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>工号</span>
                    </span>
                    <el-select v-model="addForm.staffId" filterable placeholder="请选择" @change="handleNick">
                        <el-option
                            v-for="(item, index) in userOptions"
                            :key="index"
                            :label="item.staffId + '(' +item.nick+ ')'"
                            :value="item.staffId">
                            <span>{{item.nick + '(' +item.staffId+ ')'}}</span>
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item prop="nick">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.nick" :effect="tips.effect" :placement="tips.forms.nick.placement">
                            <div slot="content" v-html="tips.forms.nick.content"></div>
                            <span>昵称<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>昵称</span>
                    </span>
					<el-input v-model="addForm.nick"></el-input>
				</el-form-item>
				<el-form-item prop="admin">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.admin" :effect="tips.effect" :placement="tips.forms.admin.placement">
                            <div slot="content" v-html="tips.forms.admin.content"></div>
                            <span>超管<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>超管</span>
                    </span>
					<el-switch v-model="addForm.admin" :active-value="1" :inactive-value="0"></el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click.native="addFormVisible = false">取消</el-button>
				<el-button size="mini" type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form size="mini" :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item prop="staffId">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.staffId" :effect="tips.effect" :placement="tips.forms.staffId.placement">
                            <div slot="content" v-html="tips.forms.staffId.content"></div>
                            <span>工号<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>工号</span>
                    </span>
					<el-input v-model="editForm.staffId" disabled></el-input>
				</el-form-item>
				<el-form-item prop="nick">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.nick" :effect="tips.effect" :placement="tips.forms.nick.placement">
                            <div slot="content" v-html="tips.forms.nick.content"></div>
                            <span>昵称<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>昵称</span>
                    </span>
					<el-input v-model="editForm.nick"></el-input>
				</el-form-item>
				<el-form-item prop="admin">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.admin" :effect="tips.effect" :placement="tips.forms.admin.placement">
                            <div slot="content" v-html="tips.forms.admin.content"></div>
                            <span>超管<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>超管</span>
                    </span>
					<el-switch v-model="editForm.admin" :active-value="1" :inactive-value="0"></el-switch>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click.native="editFormVisible = false">取消</el-button>
				<el-button size="mini" type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

        <!--授权界面-->
		<el-dialog title="授权" :visible.sync="authFormVisible" :close-on-click-modal="false" width="90%">
            <div>
                <el-row>
                    <el-col 
                        style="overflow-x: auto;"
                        :span="Math.floor(24/appOptions.length)"
                        v-for="item in appOptions" 
                        :key="item.pid" 
                        :label="item.name" 
                        :value="item.pid">
                        <el-card class="box-card">
                            <b style="font-size:18px; margin: 0 10px 0 0;">{{ item.name }}</b>
                            <el-checkbox 
                                :indeterminate="checkAll['indeterminate_'+item.pid]" 
                                v-model="checkAll['all_'+item.pid]"
                                @change="handleCheckAllChange(item.pid, checkAll['all_'+item.pid])">
                                全选
                            </el-checkbox>
                            <div style="margin: 15px 0;"></div>
                            <el-tree
                                :data="menuTree['tree_'+item.pid]"
                                show-checkbox
                                node-key="pid"
                                :default-expand-all="true"
                                :props="menuTreeDefaultProps"
                                :check-on-click-node="true"
                                :expand-on-click-node="false"
                                :ref="'authMenuTree_'+item.pid"
                                @check="handleCheckedTreeCheck(item.pid)">
                            </el-tree>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click.native="authFormVisible = false">取消</el-button>
				<el-button size="mini" type="primary" @click.native="authSubmit" :loading="authLoading">提交</el-button>
			</div>
		</el-dialog>

    </section>
</template>

<script>

import Utils from "../../js/utils";
import Tips from '../../tips/auth/user';
import {App, Menu, User} from "../../api/auth";

export default {
    data() {
        return {
            filters: {
                staffId: '',
                nick: ''
            },
            list: [],
            total: 0,
            page: 1,
            rows: 10,
            listLoading: false,
            tips: Tips,
            appOptions: [],
            menuOptions: [],
            userOptions: [],
            menuTree: {},
            menuTreeDefaultProps: {
                children: 'children',
                label: 'name'
            },
            checkAll: {}, //全选

            addFormVisible: false,
            addLoading: false,
            addFormRules: {
                staffId: [
                    { required: true, message: '请输入工号', trigger: 'blur' }
                ],
                nick: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ]
            },
            addForm: {
                staffId: '',
                nick: '',
                admin: 0
            },

            editFormVisible: false,
            editLoading: false,
            editFormRules: {
                staffId: [
                    { required: true, message: '请输入工号', trigger: 'blur' }
                ],
                nick: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ]
            },
            editForm: {
            },

            authFormVisible: false,
            authLoading: false,
            authUser: ''

        }
    },
    methods: {
        formatterByAdmin: function (row, column) {
            return row[column.property] ? '是' : '';
        },
        changePage: function (val) {
            this.page = val;
            this.queryByPage();
        },
        changeRows: function (val) {
            this.rows = val;
            this.queryByPage();
        },
        initApps: function(){
            let params = {};
            App.findForOptions(this, params, (res, vm, cp) => {
                if(res.code > 0){
                    this.appOptions = res.data;
                }else{
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration: 5 * 1000
                    });
                }
            });
        },
        initMenus: function(){
            let params = {};
            Menu.findForOptions(this, params, (res, vm, cp) => {
                if(res.code > 0){
                    this.menuOptions = res.data;
                }else{
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration: 5 * 1000
                    });
                }
            });
        },
        initAuth: function(){
            let params = {};
            User.loginAuthMenu(this, params, (res, vm, cp) => {
                if(res.code > 0){
                    this.appOptions = [];
                    this.menuOptions = [];
                    for (let i = 0; i < res.data.length; i++) {
                        const e = res.data[i];
                        this.appOptions.push(e.app);
                        this.menuOptions = this.menuOptions.concat(e.menus); 
                    }
                }else{
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration: 5 * 1000
                    });
                }
            });
        },
        initMenusTree: function(app){
            let data = this.menuOptions;
            this.menuTree = {};
            if(app){
                this.menuTree['tree_'+app] = [];
                this.checkAll['all_'+app] = false;
                this.checkAll['indeterminate_'+app] = false;
            }else{
                for (let i = 0; i < this.appOptions.length; i++) {
                    const e = this.appOptions[i];
                    this.menuTree['tree_'+e.pid] = [];
                    this.checkAll['all_'+e.pid] = false;
                    this.checkAll['indeterminate_'+e.pid] = false;
                }
            }
            this.checkAll = Object.assign({}, this.checkAll);
            for (let i = 0; i < data.length; i++) {
                const e = data[i];
                if(e.parent == 0 && (!app || app == e.app)){
                    let children = findChildren(e.pid);
                    if(children.length > 0){
                        e.children = children;
                    }
                    this.menuTree['tree_'+e.app].push(e);
                }
            }
            function findChildren(pid){
                let children = [];
                for (let i = 0; i < data.length; i++) {
                    const e = data[i];
                    if(e.parent == pid){
                        let children2 = findChildren(e.pid);
                        if(children2.length > 0){
                            e.children = children2;
                        }
                        children.push(e);
                    }
                }
                return children;
            }
        },
        initAllUser: function(){
            let params = {};
            User.findAll(this, params, (res, vm, cp) => {
                if(res.code > 0){
                    this.userOptions = [];
                    for (let i = 0; i < res.data.length; i++) {
                        const e1 = res.data[i].user;
                        if(e1){
                            for (let j = 0; j < e1.length; j++) {
                                const e2 = e1[j];
                                this.userOptions.push({staffId: e2.userid, nick: e2.name});
                            }
                        }
                    }
                    //排序
                    this.userOptions.sort((e1, e2) => 
                        e1.nick.charAt(0).localeCompare(e2.nick.charAt(0)) == 0 ? 
                        e1.staffId.localeCompare(e2.staffId) : e1.nick.charAt(0).localeCompare(e2.nick.charAt(0)));
                }else{
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration: 5 * 1000
                    });
                }
            });
        },
        queryRefresh: function(){
            for(let key in this.filters){
                this.filters[key] = '';
            }
            this.queryByPage(1);
        },
        //获取分页列表
        queryByPage: function (page) {
            if(page){
                this.page = page
            }
            let params = {
                page: this.page,
                rows: this.rows
            };
            for(let key in this.filters){
                if(this.filters[key]){
                    params[key] = this.filters[key];
                }
            }
            this.listLoading = true;
            User.findByPage(this, params, (res, vm, cp) => {
                this.listLoading = false;
                if(res.code > 0){
                    this.list = res.data;
                    this.total = res.total;
                }else{
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration: 5 * 1000
                    });
                }
            });
        },
        handleNick: function(val){
            let obj = {};
            for (let i = 0; i < this.userOptions.length; i++) {
                const e1 = this.userOptions[i];
                if(e1.staffId == val){
                    obj = e1;
                    break;
                }
            }
            this.addForm.nick = obj.nick;
        },
        //显示新增界面
        handleAdd: function () {
            this.addForm = {
                staffId: '',
                nick: '',
                admin: 0
            };
            this.addLoading = false;
            this.addFormVisible = true;
        },
        //新增
        addSubmit: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        let params = Object.assign({}, this.addForm);
                        User.add(this, params, (res, vm, cp) => {
                            this.addLoading = false;
                            if(res.code > 0){
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.addFormVisible = false;
                                this.queryByPage();
                            }else{
                                this.$message({
                                    message: res.msg,
                                    type: 'error',
                                    duration: 5 * 1000
                                });
                            }
                        });
                    });
                }
            });
        },
        //显示编辑界面
        handleEdit: function (index, row) {
            this.editForm = Object.assign({}, row);
            this.editFormVisible = true;
        },
        //显示编辑界面
        editSubmit: function (index, row) {
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true;
                        let params = Object.assign({}, this.editForm);
                        User.update(this, params, (res, vm, cp) => {
                            this.editLoading = false;
                            if(res.code > 0){
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.editFormVisible = false;
                                this.queryByPage();
                            }else{
                                this.$message({
                                    message: res.msg,
                                    type: 'error',
                                    duration: 5 * 1000
                                });
                            }
                        });
                    });
                }
            });
        },
        //删除
        handleDel: function (index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                let params = {
                    staffId: row.staffId
                };
                User.del(this, params, (res, vm, cp) => {
                    this.listLoading = false;
                    if(res.code > 0){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.queryByPage();
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'error',
                            duration: 5 * 1000
                        });
                    }
                });
            }).catch(() => {

            });
        },
        //显示授权界面
        handleAuth: function (index, row) {
            this.initMenusTree();
            this.authFormVisible = true;
            //获取用户权限
            this.authUser = row.staffId;
            let params = {
                staffId: row.staffId
            };
            User.userAuthMenu(this, params, (res, vm, cp) => {
                if(res.code > 0){
                    let checked = [];
                    for (let i = 0; i < res.data.length; i++) {
                        const e = res.data[i];
                        checked.push(e.pid);
                    }
                    for (let i = 0; i < this.appOptions.length; i++) {
                        const e = this.appOptions[i];
                        this.$refs['authMenuTree_'+e.pid][0].setCheckedKeys(checked);
                        this.handleCheckedTreeCheck(e.pid);
                    }
                }else{
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration: 5 * 1000
                    });
                }
            });
        },
        handleCheckedTreeCheck: function(app){
            let tree = this.$refs['authMenuTree_'+app][0];
            let checked = tree.getCheckedKeys();
            let allOptionsCount = 0; //所有节点
            for (let i = 0; i < this.menuOptions.length; i++) {
                const e = this.menuOptions[i];
                if(e.app == app){
                    allOptionsCount += 1;
                }
            }
            this.checkAll['all_'+app] = checked.length == allOptionsCount;
            this.checkAll['indeterminate_'+app] = checked.length > 0 && checked.length < allOptionsCount;
        },
        handleCheckAllChange: function(app, val){
            let tree = this.$refs['authMenuTree_'+app][0];
            let allRoot = this.menuTree['tree_'+app]; //根节点个数，根选中那么根下所有节点都选中
            let checked = [];
            if(val){
                for (let i = 0; i < allRoot.length; i++) {
                    const e = allRoot[i];
                    checked.push(e.pid);
                }
            }
            tree.setCheckedKeys(checked);
            this.checkAll['indeterminate_'+app] = false;
        },
        authSubmit: function(){
            let params = {
                staffId: this.authUser,
                menuIds: ''
            };
            let menuIds = [];
            for (const key in this.$refs) {
                if (key.startsWith('authMenuTree_')) {
                    const e = this.$refs[key];
                    menuIds = menuIds.concat(e[0].getCheckedKeys(true));
                }
            }
            params.menuIds = menuIds.join(',');
            this.$confirm('确认提交吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.authLoading = true;
                User.updateAuthMenu(this, params, (res, vm, cp) => {
                    this.authLoading = false;
                    if(res.code > 0){
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.authFormVisible = false;
                    }else{
                        this.$message({
                            message: res.msg,
                            type: 'error',
                            duration: 5 * 1000
                        });
                    }
                });
            }).catch(() => {

            });
        }
    },
    created() {
        // this.initApps();
        // this.initMenus();
        this.initAuth();
        this.queryByPage();
        this.initAllUser();
    },
    mounted() {
    }
}
</script>

<style>
</style>