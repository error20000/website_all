<template>
    <section>
        <!--筛选条件-->
		<el-tabs type="border-card" style="margin-bottom: 20px;">
			<el-tab-pane label="筛选条件">
				<el-row type="flex">
                    <el-col :span="24">
                        <el-form size="mini" :inline="true" :model="filters">
                            <el-form-item label="所属应用" prop="app">
                                <el-select v-model="filters.app" placeholder="请选择" >
                                    <el-option label="全部" value=""></el-option>
                                    <el-option v-for="item in appOptions" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所属菜单" prop="menu">
                                <el-select v-model="filters.menu" placeholder="请选择" >
                                    <el-option label="全部" value=""></el-option>
                                    <el-option 
                                        v-if="item.app == filters.app" 
                                        v-for="item in menuOptions" 
                                        :key="item.pid" 
                                        :label="item.name" 
                                        :value="item.pid">
                                        <span style="float: left" v-html="formatterByMenusOptions(item.pid)">{{ item.name }}</span>
                                    </el-option>
                                </el-select>
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
							<el-table-column prop="pid" label="编号" sortable>
							</el-table-column>
							<el-table-column prop="name" label="名称" sortable>
							</el-table-column>
							<el-table-column prop="app" label="所属应用" sortable :formatter="formatterByApps">
							</el-table-column>
							<el-table-column prop="menu" label="所属菜单" sortable
                                :filters="[{text: '公开', value: ''}, {text: '私有', value: '1'}]"
                                :filter-method="filterMenu">
                                <template slot-scope="scope">
                                    <span v-if="scope.row.menu.length == 0">
                                        <el-tag :type="'primary'" disable-transitions>公开</el-tag>
                                    </span>
                                    <span v-else>
                                        <el-tag 
                                            v-for="(item, index) in scope.row.menu"
                                            :key="index"
                                            :type="index%3 === 0 ? 'primary' : index%3 === 1 ? 'success' : 'info'"
                                            disable-transitions v-html="formatterByMenus(scope.row, item)">{{item}}</el-tag>
                                    </span>
                                </template>
                            </el-table-column>
							<el-table-column prop="url" label="接口地址" sortable>
							</el-table-column>
							<el-table-column prop="status" label="状态" sortable :formatter="formatterByStatus">
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
			<el-form size="mini" :model="addForm" label-width="100px" :rules="addFormRules" ref="addForm">
				<el-form-item prop="name">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.name" :effect="tips.effect" :placement="tips.forms.name.placement">
                            <div slot="content" v-html="tips.forms.name.content"></div>
                            <span>名称<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>名称</span>
                    </span>
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
				<el-form-item prop="url">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.url" :effect="tips.effect" :placement="tips.forms.url.placement">
                            <div slot="content" v-html="tips.forms.url.content"></div>
                            <span>接口地址<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>接口地址</span>
                    </span>
					<el-input v-model="addForm.url"></el-input>
				</el-form-item>
				<el-form-item prop="status">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.status" :effect="tips.effect" :placement="tips.forms.status.placement">
                            <div slot="content" v-html="tips.forms.status.content"></div>
                            <span>状态<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>状态</span>
                    </span>
					<el-switch v-model="addForm.status" :active-value="1" :inactive-value="0"></el-switch>
				</el-form-item>
                <el-form-item prop="app">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.app" :effect="tips.effect" :placement="tips.forms.app.placement">
                            <div slot="content" v-html="tips.forms.app.content"></div>
                            <span>所属应用<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>所属应用</span>
                    </span>
                    <el-select v-model="addForm.app" placeholder="请选择">
                        <el-option v-for="item in appOptions" :key="item.pid" :label="item.name" :value="item.pid"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="menu" v-if="!!addForm.app">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.menu" :effect="tips.effect" :placement="tips.forms.menu.placement">
                            <div slot="content" v-html="tips.forms.menu.content"></div>
                            <span>所属菜单<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>所属菜单</span>
                    </span>
                    <el-radio-group v-model="menuOpen">
                        <el-radio :label="1">公开</el-radio>
                        <el-radio :label="0">私有</el-radio>
                    </el-radio-group>
                    <template v-if="menuOpen == 0">
                        <div style="margin: 15px 0;"></div>
                        <el-tree
                            :data="menuTree"
                            show-checkbox
                            node-key="pid"
                            :default-expand-all="true"
                            :props="menuTreeDefaultProps"
                            :check-on-click-node="true"
                            ref="addFormMenuTree">
                        </el-tree>
                    </template>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click.native="addFormVisible = false">取消</el-button>
				<el-button size="mini" type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form size="mini" :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item prop="pid">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.pid" :effect="tips.effect" :placement="tips.forms.pid.placement">
                            <div slot="content" v-html="tips.forms.pid.content"></div>
                            <span>编号<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>编号</span>
                    </span>
					<el-input v-model="editForm.pid" placeholder="请输入整数" disabled></el-input>
				</el-form-item>
				<el-form-item prop="name">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.name" :effect="tips.effect" :placement="tips.forms.name.placement">
                            <div slot="content" v-html="tips.forms.name.content"></div>
                            <span>名称<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>名称</span>
                    </span>
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item prop="url">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.url" :effect="tips.effect" :placement="tips.forms.url.placement">
                            <div slot="content" v-html="tips.forms.url.content"></div>
                            <span>接口地址<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>接口地址</span>
                    </span>
					<el-input v-model="editForm.url"></el-input>
				</el-form-item>
				<el-form-item prop="status">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.status" :effect="tips.effect" :placement="tips.forms.status.placement">
                            <div slot="content" v-html="tips.forms.status.content"></div>
                            <span>状态<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>状态</span>
                    </span>
					<el-switch v-model="editForm.status" :active-value="1" :inactive-value="0"></el-switch>
				</el-form-item>
                <el-form-item prop="app">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.app" :effect="tips.effect" :placement="tips.forms.app.placement">
                            <div slot="content" v-html="tips.forms.app.content"></div>
                            <span>所属应用<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>所属应用</span>
                    </span>
                    <el-select v-model="editForm.app" placeholder="请选择">
                        <el-option v-for="item in appOptions" :key="item.pid" :label="item.name" :value="item.pid"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="menu">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.menu" :effect="tips.effect" :placement="tips.forms.menu.placement">
                            <div slot="content" v-html="tips.forms.menu.content"></div>
                            <span>所属菜单<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>所属菜单</span>
                    </span>
                    <el-radio-group v-model="menuOpen">
                        <el-radio :label="1">公开</el-radio>
                        <el-radio :label="0">私有</el-radio>
                    </el-radio-group>
                    <template v-if="menuOpen == 0">
                        <div style="margin: 15px 0;"></div>
                        <el-tree
                            :data="menuTree"
                            show-checkbox
                            node-key="pid"
                            :default-expand-all="true"
                            :default-checked-keys="editForm.menu"
                            :props="menuTreeDefaultProps"
                            :check-on-click-node="true"
                            ref="editFormMenuTree">
                        </el-tree>
                    </template>
                </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click.native="editFormVisible = false">取消</el-button>
				<el-button size="mini" type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
    </section>
</template>

<script>

import Utils from "../../js/utils";
import Tips from '../../tips/auth/ifs';
import {App, Menu, MenuIfs} from "../../api/auth";

export default {
    data() {
        return {
            filters: {
                app: '',
                menu: ''
            },
            list: [],
            total: 0,
            page: 1,
            rows: 10,
            listLoading: false,
            tips: Tips,
            appOptions: [],
            menuOptions: [],
            menuOpen: 1,
            menuTree: [],
            menuTreeDefaultProps: {
                children: 'children',
                label: 'name'
            },

            addFormVisible: false,
            addLoading: false,
            addFormRules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                app: [
                    { required: true, message: '请选择应用', trigger: 'blur' }
                ]
            },
            addForm: {
                pid: '',
                name: '',
                app: '',
                menu: [],
                url: '',
                status: 1
            },

            editFormVisible: false,
            editLoading: false,
            editFormRules: {
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                domain: [
                    { required: true, message: '请选择应用', trigger: 'blur' }
                ]
            },
            editForm: {
            }

        }
    },
    watch: {
        'addForm.app'(val) {
            this.initMenusTree(val);
        },
        'editForm.app'(val) {
            this.initMenusTree(val);
        }
    },
    methods: {
        formatterByApps: function (row, column) {
            for (var i = 0; i < this.appOptions.length; i++) {
                if(row.app == this.appOptions[i].pid){
                    return this.appOptions[i].name;
                }
            }
        },
        formatterByMenus: function (row, column) {
            for (var i = 0; i < this.menuOptions.length; i++) {
                if(column == this.menuOptions[i].pid){
                    return this.menuOptions[i].name;
                }
            }
            return column;
        },
        formatterByMenusOptions: function (cpid) {
            var html = "";
            for (var i = 0; i < this.menuOptions.length; i++) {
                if(cpid == this.menuOptions[i].pid){
                    if(this.menuOptions[i].parent == 0 || cpid == 0){
                        html = this.menuOptions[i].name;
                    }else{
                        html = this.formatterByMenusOptions(this.menuOptions[i].parent)+" / "+this.menuOptions[i].name;
                    }
                }
            }
            return html;
        },
        formatterByStatus: function (row, column) {
            return row[column.property] ? '启用' : '禁用';
        },
        filterMenu: function(value, row, column){
            if(value){
                return row.menu.length != 0;
            }else{
                return row.menu.length == 0;
            }
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
                    //菜单树
                    //this.initMenusTree();
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
            this.menuTree = [];
            for (let i = 0; i < data.length; i++) {
                const e = data[i];
                if(e.parent == 0 && (!app || app == e.app)){
                    let children = findChildren(e.pid);
                    if(children.length > 0){
                        e.children = children;
                    }
                    this.menuTree.push(e);
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
                if(this.filters[key] || this.filters[key] === 0){
                    params[key] = this.filters[key];
                }
            }
            this.listLoading = true;
            MenuIfs.findByPage(this, params, (res, vm, cp) => {
                this.listLoading = false;
                if(res.code > 0){
                    this.list = res.data;
                    this.total = res.total;
                    for (let i = 0; i < this.list.length; i++) {
                        if(this.list[i].menu){
                            this.list[i].menu = this.list[i].menu.split(',');
                        }else{
                            this.list[i].menu = [];
                        }
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
        //显示新增界面
        handleAdd: function () {
            this.addForm = {
                pid: '',
                name: '',
                app: '',
                menu: [],
                url: '',
                status: 1
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
                        params.menu = "";
                        if(this.menuOpen == 0){
                            let menuIds = this.$refs.addFormMenuTree.getCheckedKeys(true);
                            params.menu = menuIds.join(',');
                        }
                        MenuIfs.add(this, params, (res, vm, cp) => {
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
            //tree
            this.initMenusTree(this.editForm.app);
            this.menuOpen = 1;
            if(this.editForm.menu.length != 0){
                this.menuOpen = 0;
            }
        },
        //显示编辑界面
        editSubmit: function (index, row) {
            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true;
                        let params = Object.assign({}, this.editForm);
                        params.menu = "";
                        if(this.menuOpen == 0){
                            let menuIds = this.$refs.editFormMenuTree.getCheckedKeys(true);
                            params.menu = menuIds.join(',');
                        }
                        MenuIfs.update(this, params, (res, vm, cp) => {
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
                    pid: row.pid
                };
                MenuIfs.del(this, params, (res, vm, cp) => {
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
        }
    },
    created() {
        this.initApps();
        this.initMenus();
        this.queryByPage();
    },
    mounted() {
    }
}
</script>

<style>
</style>