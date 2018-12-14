<template>
    <section>
        <!--筛选条件-->
		<el-tabs type="border-card" style="margin-bottom: 20px;">
			<el-tab-pane label="筛选条件">
				<el-row type="flex">
                    <el-col :span="24">
                        <el-form size="mini" :inline="true" :model="filters">
                            <el-form-item>
                                <el-button type="primary" @click="queryByPage(1)">查询</el-button>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="handleAdd">新增</el-button>
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
							<el-table-column prop="start" label="开始时间" sortable>
							</el-table-column>
							<el-table-column prop="end" label="结束时间" sortable>
							</el-table-column>
							<el-table-column prop="offset" label="偏移量" sortable>
							</el-table-column>
							<el-table-column prop="time" label="更新时间" sortable :formatter="formatterByTime">
							</el-table-column>
							<el-table-column prop="vcode" label="验证码" sortable :formatter="formatterByStatus">
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
			<el-form size="mini" :model="addForm" label-width="128px" :rules="addFormRules" ref="addForm">
				<el-form-item prop="pid">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.pid" :effect="tips.effect" :placement="tips.forms.pid.placement">
                            <div slot="content" v-html="tips.forms.pid.content"></div>
                            <span>编号<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>编号</span>
                    </span>
					<el-input v-model="addForm.pid" placeholder="请输入整数"></el-input>
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
				<el-form-item prop="start">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.start" :effect="tips.effect" :placement="tips.forms.start.placement">
                            <div slot="content" v-html="tips.forms.start.content"></div>
                            <span>开始时间<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>开始时间</span>
                    </span>
					<el-date-picker v-model="addForm.start" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
				</el-form-item>
                <el-form-item prop="end">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.end" :effect="tips.effect" :placement="tips.forms.end.placement">
                            <div slot="content" v-html="tips.forms.end.content"></div>
                            <span>结束时间<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>结束时间</span>
                    </span>
                    <el-date-picker v-model="addForm.end" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
				<el-form-item prop="offset">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.offset" :effect="tips.effect" :placement="tips.forms.offset.placement">
                            <div slot="content" v-html="tips.forms.offset.content"></div>
                            <span>偏移量类型<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>偏移量类型</span>
                    </span>
					<!-- <el-slider v-model="addForm.offset" :min="0" :step="1" show-input></el-slider> -->
                    <!-- <el-input v-model="addForm.offset" placeholder="请输入正整数"></el-input> -->
					<el-checkbox-group v-model="addForm.offset" >
						<el-checkbox label="0">按总计</el-checkbox>
						<el-checkbox label="1">按平台</el-checkbox>
						<el-checkbox label="2">按来源</el-checkbox>
						<el-checkbox label="3">按势力</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item prop="time">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.time" :effect="tips.effect" :placement="tips.forms.time.placement">
                            <div slot="content" v-html="tips.forms.time.content"></div>
                            <span>更新时间<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>更新时间</span>
                    </span>
					<el-select v-model="addForm.time" placeholder="请选择">
						<el-option v-for="(item, index) in timeOptions" :key="index" :label="item.name" :value="item.pid"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="vcode">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.vcode" :effect="tips.effect" :placement="tips.forms.vcode.placement">
                            <div slot="content" v-html="tips.forms.vcode.content"></div>
                            <span>启用短信验证码<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>启用短信验证码</span>
                    </span>
					<el-switch v-model="addForm.vcode" :active-value="1" :inactive-value="0"></el-switch>
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
			<el-form size="mini" :model="editForm" label-width="128px" :rules="editFormRules" ref="editForm">
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
				<el-form-item prop="start">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.start" :effect="tips.effect" :placement="tips.forms.start.placement">
                            <div slot="content" v-html="tips.forms.start.content"></div>
                            <span>开始时间<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>开始时间</span>
                    </span>
					<el-date-picker v-model="editForm.start" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
				</el-form-item>
                <el-form-item prop="end">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.end" :effect="tips.effect" :placement="tips.forms.end.placement">
                            <div slot="content" v-html="tips.forms.end.content"></div>
                            <span>结束时间<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>结束时间</span>
                    </span>
                    <el-date-picker v-model="editForm.end" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
				<el-form-item prop="offset">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.offset" :effect="tips.effect" :placement="tips.forms.offset.placement">
                            <div slot="content" v-html="tips.forms.offset.content"></div>
                            <span>偏移量类型<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>偏移量类型</span>
                    </span>
					<el-checkbox-group v-model="editForm.offset" >
						<el-checkbox label="0">按总计</el-checkbox>
						<el-checkbox label="1">按平台</el-checkbox>
						<el-checkbox label="2">按来源</el-checkbox>
						<el-checkbox label="3">按势力</el-checkbox>
					</el-checkbox-group>
				</el-form-item>
				<el-form-item prop="time">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.time" :effect="tips.effect" :placement="tips.forms.time.placement">
                            <div slot="content" v-html="tips.forms.time.content"></div>
                            <span>更新时间<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>更新时间</span>
                    </span>
					<el-select v-model="editForm.time" placeholder="请选择">
						<el-option v-for="(item, index) in timeOptions" :key="index" :label="item.name" :value="item.pid"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="vcode">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.vcode" :effect="tips.effect" :placement="tips.forms.vcode.placement">
                            <div slot="content" v-html="tips.forms.vcode.content"></div>
                            <span>启用短信验证码<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>启用短信验证码</span>
                    </span>
					<el-switch v-model="editForm.vcode" :active-value="1" :inactive-value="0"></el-switch>
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
import Tips from '../../tips/yy/config';
import {BespeakType} from "../../api/yy";

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

            addFormVisible: false,
            addLoading: false,
            addFormRules: {
                pid: [
                    { required: true, message: '请输入编号', trigger: 'blur' },
                    { trigger: 'blur', validator: function(rule, value, callback){
                            if (!/^-?\d+$/.test(value)) { //整数
                                callback(new Error('请输入整数'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                start: [
                    { required: true, message: '请选择开始时间', trigger: 'blur' }
                ],
                end: [
                    { required: true, message: '请选择结束时间', trigger: 'blur' }
                ]/* ,
                offset: [
                    { trigger: 'blur', validator: function(rule, value, callback){
                            if (!/^\d+$/.test(value)) { //正整数
                                callback(new Error('请输入正整数'));
                            } else {
                                callback();
                            }
                        }
                    }
                ] */
            },
            addForm: {
                pid: '',
                name: '',
                start: '',
                end: '',
                offset: [],
                time: 0,
                vcode: 0,
                status: 0
            },

            editFormVisible: false,
            editLoading: false,
            editFormRules: {
                pid: [
                    { required: true, message: '请输入编号', trigger: 'blur' },
                    { trigger: 'blur', validator: function(rule, value, callback){
                            if (!/^-?\d+$/.test(value)) { //整数
                                callback(new Error('请输入整数'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                name: [
                    { required: true, message: '请输入名称', trigger: 'blur' }
                ],
                start: [
                    { required: true, message: '请选择开始时间', trigger: 'blur' }
                ],
                end: [
                    { required: true, message: '请选择结束时间', trigger: 'blur' }
                ]/* ,
                offset: [
                    { trigger: 'blur', validator: function(rule, value, callback){
                            if (!/^\d+$/.test(value)) { //正整数
                                callback(new Error('请输入正整数'));
                            } else {
                                callback();
                            }
                        }
                    }
                ] */
            },
            editForm: {
            },

            timeOptions: [
                { name: '立即更新', pid: 0 },
                { name: '01:00', pid: 1 },
                { name: '02:00', pid: 2 },
                { name: '03:00', pid: 3 },
                { name: '04:00', pid: 4 },
                { name: '05:00', pid: 5 },
                { name: '06:00', pid: 6 },
                { name: '07:00', pid: 7 },
                { name: '08:00', pid: 8 },
                { name: '09:00', pid: 9 },
                { name: '10:00', pid: 10 },
                { name: '11:00', pid: 11 },
                { name: '12:00', pid: 12 },
                { name: '13:00', pid: 13 },
                { name: '14:00', pid: 14 },
                { name: '15:00', pid: 15 },
                { name: '16:00', pid: 16 },
                { name: '17:00', pid: 17 },
                { name: '18:00', pid: 18 },
                { name: '19:00', pid: 19 },
                { name: '20:00', pid: 20 },
                { name: '21:00', pid: 21 },
                { name: '22:00', pid: 22 },
                { name: '23:00', pid: 23 },
                { name: '24:00', pid: 24 }
            ]
        }
    },
		methods: {
			formatterByTime: function (row, column) {
				for (var i = 0; i < this.timeOptions.length; i++) {
					if(row.time == this.timeOptions[i].pid){
						return this.timeOptions[i].name;
					}
				}
			},
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
				BespeakType.findByPage(this, params, (res, vm, cp) => {
					console.log("=============================");
				    this.listLoading = false;
					console.log(vm.$axios);
					console.log(vm);
				});
			},
			//显示新增界面
			handleAdd: function () {
				this.addForm = {
                    pid: '',
                    name: '',
                    start: '',
                    end: '',
                    offset: ['0'],
                    time: 0,
                    vcode: 0,
                    status: 0
				};
				this.addFormVisible = true;
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							let params = Object.assign({}, this.addForm);
							BESPEAKTYPE_ADD(this, params).then((res) => {
								this.addLoading = false;
								if(res.code > 0){
									this.$message({
										message: '提交成功',
										type: 'success'
									});
									this.$refs['addForm'].resetFields();
									this.addFormVisible = false;
									this.queryByPage();
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
							BESPEAKTYPE_UPDATE(this, params).then((res) => {
								this.editLoading = false;
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.editFormVisible = false;
								this.$refs['editForm'].resetFields();
								this.queryByPage();
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
					BESPEAKTYPE_DELETE(this, params).then((res) => {
						this.listLoading = false;
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.queryByPage();
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