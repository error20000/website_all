<template>
    <section>
        <!--筛选条件-->
		<el-tabs type="border-card" style="margin-bottom: 20px;">
			<el-tab-pane label="筛选条件">
				<el-row type="flex">
                    <el-col :span="24">
                        <el-form size="mini" :inline="true" :model="filters">
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
							<el-table-column prop="secretKey" label="密钥" sortable>
							</el-table-column>
							<el-table-column prop="domain" label="域名" sortable>
							</el-table-column>
							<el-table-column prop="icon" label="图标" sortable>
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
			<el-form size="mini" :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item prop="pid">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.pid" :effect="tips.effect" :placement="tips.forms.pid.placement">
                            <div slot="content" v-html="tips.forms.pid.content"></div>
                            <span>编号<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>编号</span>
                    </span>
					<el-input v-model="addForm.pid" placeholder="请输入正整数"></el-input>
				</el-form-item>
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
                <el-form-item prop="domain">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.domain" :effect="tips.effect" :placement="tips.forms.domain.placement">
                            <div slot="content" v-html="tips.forms.domain.content"></div>
                            <span>域名<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>域名</span>
                    </span>
					<el-input v-model="addForm.domain"></el-input>
                </el-form-item>
				<el-form-item prop="icon">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.icon" :effect="tips.effect" :placement="tips.forms.icon.placement">
                            <div slot="content" v-html="tips.forms.icon.content"></div>
                            <span>图标<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>图标</span>
                    </span>
					<el-input v-model="addForm.icon">
                        <el-button slot="append" icon="el-icon-upload">上传</el-button>
                    </el-input>
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
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click.native="addFormVisible = false">取消</el-button>
				<el-button size="mini" type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form size="mini" :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item prop="pid">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.pid" :effect="tips.effect" :placement="tips.forms.pid.placement">
                            <div slot="content" v-html="tips.forms.pid.content"></div>
                            <span>编号<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>编号</span>
                    </span>
					<el-input v-model="editForm.pid" placeholder="请输入正整数" disabled></el-input>
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
                <el-form-item prop="domain">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.domain" :effect="tips.effect" :placement="tips.forms.domain.placement">
                            <div slot="content" v-html="tips.forms.domain.content"></div>
                            <span>域名<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>域名</span>
                    </span>
					<el-input v-model="editForm.domain"></el-input>
                </el-form-item>
				<el-form-item prop="secretKey">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.secretKey" :effect="tips.effect" :placement="tips.forms.secretKey.placement">
                            <div slot="content" v-html="tips.forms.secretKey.content"></div>
                            <span>密钥<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>密钥</span>
                    </span>
					<el-input v-model="editForm.secretKey" maxlength='32'>
                        <el-button slot="append" icon="el-icon-edit" @click.native="resetKey" :loading="resetKeyLoading">重置</el-button>
                    </el-input>
				</el-form-item>
				<el-form-item prop="icon">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.icon" :effect="tips.effect" :placement="tips.forms.icon.placement">
                            <div slot="content" v-html="tips.forms.icon.content"></div>
                            <span>图标<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>图标</span>
                    </span>
					<el-input v-model="editForm.icon">
                        <el-button slot="append" icon="el-icon-upload">上传</el-button>
                    </el-input>
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
import Tips from '../../tips/auth/app';
import {App} from "../../api/auth";

export default {
    data() {
        return {
            filters: {
            },
            list: [],
            total: 0,
            page: 1,
            rows: 10,
            listLoading: false,
            tips: Tips,
            resetKeyLoading: false,
            usedPids: [],

            addFormVisible: false,
            addLoading: false,
            addFormRules: {
                pid: [
                    { required: true, message: '请输入编号', trigger: 'blur' },
                    { trigger: 'blur', validator: function(rule, value, callback){
                            if (!/^-?\d+$/.test(value) || value <= 0) { //正整数
                                callback(new Error('请输入正整数'));
                            } else {
                                callback();
                            }
                        }
                    },
                    { trigger: 'blur', validator: (rule, value, callback) => {
                            let flag = false;
                            for (let i = 0; i < this.usedPids.length; i++) {
                                if(this.usedPids[i] == value){
                                    flag = true;
                                    break;
                                }
                            }
                            if (flag) {
                                callback(new Error('该编号已使用，请重新输入'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                domain: [
                    { required: true, message: '请输入域名', trigger: 'blur' }
                ]
            },
            addForm: {
                pid: '',
                name: '',
                secretKey: '',
                domain: '',
                status: 0
            },

            editFormVisible: false,
            editLoading: false,
            editFormRules: {
                pid: [
                    { required: true, message: '请输入编号', trigger: 'blur' },
                    { trigger: 'blur', validator: function(rule, value, callback){
                            if (!/^-?\d+$/.test(value) || value <= 0) { //正整数
                                callback(new Error('请输入正整数'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                domain: [
                    { required: true, message: '请输入域名', trigger: 'blur' }
                ]
            },
            editForm: {
            }

        }
    },
    methods: {
        formatterByStatus: function (row, column) {
            return row[column.property] ? '启用' : '禁用';
        },
        changePage: function (val) {
            this.page = val;
            this.queryByPage();
        },
        changeRows: function (val) {
            this.rows = val;
            this.queryByPage();
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
            this.listLoading = true;
            App.findByPage(this, params, (res, vm, cp) => {
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
        //重置应用密钥
        resetKey: function(){
            let params = {
                pid: this.editForm.pid
            };
            this.resetKeyLoading = true;
            App.resetKey(this, params, (res, vm, cp) => {
                this.resetKeyLoading = false;
                if(res.code > 0){
                    this.editForm.secretKey = res.data;
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
                secretKey: '',
                domain: '',
                status: 0
            };
            this.addLoading = false;
            this.addFormVisible = true;
            //查询已使用pid
            if(this.usedPids.length != 0){
                //自动生成pid
                this.handleAddPid();
                return;
            }
            this.queryPids();
        },
        //查询已使用pid
        queryPids: function(){
            App.findForPids(this, {}, (res, vm, cp) => {
                if(res.code > 0){
                    this.usedPids = res.data;
                    //美化提示
                    this.handlePids();
                    //自动生成pid
                    this.handleAddPid();
                }else{
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration: 5 * 1000
                    });
                }
            });
        },
        //美化pid提示
        handlePids: function(pid){
            if(pid){
                this.usedPids.push(pid);
            }
            let temp = [];
            if(this.usedPids.length < 11){
                temp = this.usedPids;
            }else{
                temp = this.usedPids.slice(0, 5);
                temp.push('......');
                temp = temp.concat(this.usedPids.slice(-5));
            }
            let str = this.tips.forms.pid.content.split('：');
            this.tips.forms.pid.content = str[0] + '：';
            this.tips.forms.pid.content += str[1] + '：';
            this.tips.forms.pid.content += temp.join(',');
        },
        //自动生成pid -- 自增
        handleAddPid: function(){
            let pids = this.usedPids;
            let curPid = 0;
            for (let i = 0; i < pids.length; i++) {
                curPid = Math.max(pids[i], curPid);
            }
            curPid = curPid == 0 ? 1 : curPid + 1;
            this.addForm.pid = curPid;
        },
        //新增
        addSubmit: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        let params = Object.assign({}, this.addForm);
                        App.add(this, params, (res, vm, cp) => {
                            this.addLoading = false;
                            if(res.code > 0){
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.addFormVisible = false;
                                this.queryByPage();
                                this.handlePids(params.pid);
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
                        App.update(this, params, (res, vm, cp) => {
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
                App.del(this, params, (res, vm, cp) => {
                    this.listLoading = false;
                    if(res.code > 0){
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.queryByPage();
                        this.usedPids = [];
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
        this.queryByPage();
    },
    mounted() {
    }
}
</script>

<style>
</style>