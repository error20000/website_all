<template>
    <section>
        <!--筛选条件-->
		<el-tabs type="border-card" style="margin-bottom: 20px;">
			<el-tab-pane label="筛选条件">
				<el-row type="flex">
                    <el-col :span="24">
                        <el-form size="mini" :inline="true" :model="filters">
                            <el-form-item label="分类" prop="type">
                                <el-select v-model="filters.app" placeholder="请选择" >
                                    <el-option label="全部" value=""></el-option>
                                    <el-option v-for="item in typeOptions" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
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
							<el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" label-width="200px" inline class="demo-table-expand">
                                        <el-form-item v-for="(item, index) in props.row.attr" :key="index">
                                            <template slot="label">
                                                <span>{{ item.name }}</span>
                                            </template>
                                            <span>{{ formatterTableItem(item, item.value) }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column prop="pid" label="编号" sortable>
							</el-table-column>
							<el-table-column prop="name" label="名称" sortable>
							</el-table-column>
							<el-table-column prop="type" label="分类" sortable :formatter="formatterByTypes">
							</el-table-column>
							<el-table-column prop="status" label="状态" sortable :formatter="formatterByStatus">
							</el-table-column>
							<el-table-column prop="sort" label="排序" sortable :formatter="formatterBySort">
							</el-table-column>
							<el-table-column prop="desc" label="描述" sortable>
							</el-table-column>
							<el-table-column prop="smode" label="成功后操作" sortable :formatter="formatterBySmode">
							</el-table-column>
							<el-table-column prop="svalue" label="操作内容" sortable :formatter="formatterBySvalue">
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
                <el-form-item prop="type">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.type" :effect="tips.effect" :placement="tips.forms.type.placement">
                            <div slot="content" v-html="tips.forms.type.content"></div>
                            <span>活动分类<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>活动分类</span>
                    </span>
                    <el-select v-model="addForm.type" placeholder="请选择" @change="changeType">
                        <el-option 
                            v-for="item in typeOptions" 
                            :key="item.pid" :label="item.name" 
                            :value="item.pid" 
                            :disabled="item.status == 1 ? false : true"> 
                        </el-option>
                    </el-select>
                </el-form-item>
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
                <el-form-item prop="sort">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.sort" :effect="tips.effect" :placement="tips.forms.sort.placement">
                            <div slot="content" v-html="tips.forms.sort.content"></div>
                            <span>排序<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>排序</span>
                    </span>
					<el-input v-model="addForm.sort"></el-input>
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
				<el-form-item prop="desc">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.desc" :effect="tips.effect" :placement="tips.forms.desc.placement">
                            <div slot="content" v-html="tips.forms.desc.content"></div>
                            <span>描述<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>描述</span>
                    </span>
					<el-input type="textarea" v-model="addForm.desc"></el-input>
				</el-form-item>
				<el-form-item prop="smode">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.smode" :effect="tips.effect" :placement="tips.forms.smode.placement">
                            <div slot="content" v-html="tips.forms.smode.content"></div>
                            <span>成功后操作<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>成功后操作</span>
                    </span>
                    <el-select v-model="addForm.smode" placeholder="请选择">
                        <el-option 
                            v-for="item in smodeOptions" 
                            :key="item.pid" :label="item.name" :value="item.pid" > 
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item prop="svalue">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.svalue" :effect="tips.effect" :placement="tips.forms.svalue.placement">
                            <div slot="content" v-html="tips.forms.svalue.content"></div>
                            <span>操作内容<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>操作内容</span>
                    </span>
                    <el-input v-model="addForm.svalue"></el-input>
				</el-form-item>
                <fieldset class="fieldset paddingRight" v-if="addForm.type">
                <legend class="legend">属性&nbsp;&nbsp;<el-button type="text" icon="el-icon-plus" @click="handleCustomAdd()">自定义</el-button></legend>
                    <el-form-item  v-for="item in typeAttrs" :key="item.pid" :prop="item.code">
                        <span slot="label">
                            <el-tooltip v-if="item.desc" placement="right">
                                <div slot="content" v-html="item.desc"></div>
                                <span>{{item.name}}<i class="el-icon-question"></i></span>
                            </el-tooltip>
                            <span v-else>{{item.name}}</span>
                        </span>
                        <el-input v-if="item.input === 0" v-model="addForm[item.code]"></el-input>
                        <el-input v-else-if="item.input === 1" type="textarea" v-model="addForm[item.code]"></el-input>
                        <el-input v-else-if="item.input === 2" v-model="addForm[item.code]">
                            <el-button slot="append" icon="el-icon-upload">上传</el-button>
                        </el-input>
                        <el-select v-else-if="item.input === 3" v-model="addForm[item.code]" placeholder="请选择">
                            <el-option
                                v-for="opt in item.options"
                                :key="opt.code"
                                :label="opt.name"
                                :value="opt.value">
                            </el-option>
                        </el-select>
                        <el-radio-group v-else-if="item.input === 4" v-model="addForm[item.code]">
                            <el-radio 
                                v-for="opt in item.options"
                                :key="opt.code"
                                :label="opt.value">
                                {{opt.name}}
                            </el-radio>
                        </el-radio-group>
                        <el-checkbox-group v-else-if="item.input === 5" v-model="addForm[item.code]">
                            <el-checkbox 
                                v-for="opt in item.options"
                                :key="opt.code"
                                :label="opt.value">
                                {{opt.name}}
                            </el-checkbox>
                        </el-checkbox-group>
                        <el-select v-else-if="item.input === 6" multiple v-model="addForm[item.code]" placeholder="请选择">
                            <el-option
                                v-for="opt in item.options"
                                :key="opt.code"
                                :label="opt.name"
                                :value="opt.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </fieldset>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click.native="addFormVisible = false">取消</el-button>
				<el-button size="mini" type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
            <!-- 自定义 -->
            <el-dialog
                width="90%"
                title="自定义属性"
                :close-on-click-modal="false"
                :visible.sync="customFormVisible"
                append-to-body>
				<el-form>
                    <fieldset class="fieldset">
                    <legend class="legend"><el-button type="text" icon="el-icon-plus" @click="addCustom">新增</el-button></legend>
                    <el-table
                        size="mini"
                        :data="customForm"
                        style="width: 100%">
                        <el-table-column label="名称">
                            <template slot-scope="scope">
                                <el-input size="mini" v-model="scope.row.name"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="字段">
                            <template slot-scope="scope">
                                <el-input size="mini" v-model="scope.row.code"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="值">
                            <template slot-scope="scope">
                                <el-input size="mini" v-model="scope.row.value"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="描述">
                            <template slot-scope="scope">
                                <el-input size="mini" type="textarea" v-model="scope.row.desc"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="类型">
                            <template slot-scope="scope">
                                <el-select size="mini" v-model="scope.row.input" placeholder="请选择类型">
                                    <el-option
                                        v-for="item in inputTypeOptions"
                                        :key="item.pid" :label="item.name" :value="item.pid">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="是否必填">
                            <template slot-scope="scope">
                                <el-switch v-model="scope.row.isnull" :active-value="1" :inactive-value="0"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column label="是否展示">
                            <template slot-scope="scope">
                                <el-switch v-model="scope.row.isshow" :active-value="1" :inactive-value="0"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column label="是否隐藏">
                            <template slot-scope="scope">
                                <el-switch v-model="scope.row.ishide" :active-value="1" :inactive-value="0"></el-switch>
                            </template>
                        </el-table-column>
                        <el-table-column label="效验正则">
                            <template slot-scope="scope">
                                <el-input size="mini" v-model="scope.row.regexp"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="效验提示">
                            <template slot-scope="scope">
                                <el-input size="mini" v-model="scope.row.regtips"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="80">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="delCustom(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    </fieldset>
			    </el-form>
            </el-dialog>
		</el-dialog>

		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
			<el-form size="mini" :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
				<el-form-item prop="type">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.type" :effect="tips.effect" :placement="tips.forms.type.placement">
                            <div slot="content" v-html="tips.forms.type.content"></div>
                            <span>活动分类<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>活动分类</span>
                    </span>
                    <el-select v-model="editForm.type" placeholder="请选择" disabled>
                        <el-option 
                            v-for="item in typeOptions" 
                            :key="item.pid" :label="item.name" 
                            :value="item.pid" 
                            @change="changeType"
                            :disabled="item.status == 1 ? false : true"> 
                        </el-option>
                    </el-select>
                </el-form-item>
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
                <el-form-item prop="sort">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.sort" :effect="tips.effect" :placement="tips.forms.sort.placement">
                            <div slot="content" v-html="tips.forms.sort.content"></div>
                            <span>排序<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>排序</span>
                    </span>
					<el-input v-model="editForm.sort"></el-input>
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
				<el-form-item prop="desc">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.desc" :effect="tips.effect" :placement="tips.forms.desc.placement">
                            <div slot="content" v-html="tips.forms.desc.content"></div>
                            <span>描述<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>描述</span>
                    </span>
					<el-input type="textarea" v-model="editForm.desc"></el-input>
				</el-form-item>
				<el-form-item prop="smode">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.smode" :effect="tips.effect" :placement="tips.forms.smode.placement">
                            <div slot="content" v-html="tips.forms.smode.content"></div>
                            <span>成功后操作<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>成功后操作</span>
                    </span>
                    <el-select v-model="editForm.smode" placeholder="请选择">
                        <el-option 
                            v-for="item in smodeOptions" 
                            :key="item.pid" :label="item.name" :value="item.pid" > 
                        </el-option>
                    </el-select>
				</el-form-item>
				<el-form-item prop="svalue">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.svalue" :effect="tips.effect" :placement="tips.forms.svalue.placement">
                            <div slot="content" v-html="tips.forms.svalue.content"></div>
                            <span>操作内容<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>操作内容</span>
                    </span>
                    <el-input v-model="editForm.svalue"></el-input>
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
import Tips from '../../tips/act/config';
import {Type, Config} from "../../api/act";

export default {
    data() {
        return {
            filters: {
                app: ''
            },
            list: [],
            total: 0,
            page: 1,
            rows: 10,
            listLoading: false,
            tips: Tips,
            typeOptions: [],
            usedPids: [],
            smodeOptions: [],
            typeAttrs: [],
            configAttrs: [],
            inputTypeOptions: [{
                    pid: 0,
                    name: '文本（text）'
                },{
                    pid: 1,
                    name: '文本域（textarea）'
                },{
                    pid: 2,
                    name: '文件上传（file）'
                },{
                    pid: 3,
                    name: '选择框（select）'
                },{
                    pid: 4,
                    name: '单选（radio）'
                },{
                    pid: 5,
                    name: '多选（checkbox）'
                },{
                    pid: 5,
                    name: '多选框（multiple select）'
                }
            ],

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
                type: [
                    { required: true, message: '请选择分类', trigger: 'blur' }
                ]
            },
            addForm: {
                pid: '',
                type: '',
                name: '',
                sort: 999,
                desc: '',
                status: 0,
                smode: '',
                svalue: ''
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
                type: [
                    { required: true, message: '请选择分类', trigger: 'blur' }
                ]
            },
            editForm: {},

            customFormVisible: false,
            customLoading: false,
            customForm: []
        }
    },
    watch: {
        'addForm.type'(val) {
            this.handleAddPid();
        }
    },
    methods: {
        formatterByTypes: function (row, column) {
            for (var i = 0; i < this.typeOptions.length; i++) {
                if(row.type == this.typeOptions[i].pid){
                    return this.typeOptions[i].name;
                }
            }
        },
        formatterByStatus: function (row, column) {
            return row[column.property] ? '启用' : '禁用';
        },
        formatterBySort: function (row, column) {
            return row[column.property] == 999 ? '' : row[column.property];
        },
        formatterBySmode: function (row, column) {
           
        },
        formatterBySvalue: function (row, column) {
           
        },
        formatterTableItem: function (obj, value) {
            if(obj.options){
                for (let i = 0; i < obj.options.length; i++) {
                    const e = obj.options[i];
                    if(value === e.value){
                        value = e.name;
                        break;
                    }
                }
            }
            return value;
        },
        changePage: function (val) {
            this.page = val;
            this.queryByPage();
        },
        changeRows: function (val) {
            this.rows = val;
            this.queryByPage();
        },
        initTypes: function(){
            let params = {};
            Type.findForOptions(this, params, (res, vm, cp) => {
                if(res.code > 0){
                    this.typeOptions = res.data;
                }else{
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration: 5 * 1000
                    });
                }
            });
        },
        //查询分类属性
        changeType: function(val){
            let params = {
                pid: val
            };
            Type.findAttrs(this, params, (res, vm, cp) => {
                if(res.code > 0){
                    this.typeAttrs = res.data;
                    this.handleTypeAttr();
                }else{
                    this.$message({
                        message: res.msg,
                        type: 'error',
                        duration: 5 * 1000
                    });
                }
            });
        },
        //处理分类属性
        handleTypeAttr: function(){
            let form = this.addForm;
            for (let i = 0; i < this.typeAttrs.length; i++) {
                const e = this.typeAttrs[i];
                let value = e.def;
                if(e.input == 3 || e.input == 4){ //单选
                    for (let j = 0; j < e.options.length; j++) {
                        const e2 = e.options[j];
                        if(e2.checked === 1){
                            value = e2.value;
                            break;
                        }
                    }
                }else if(e.input == 5 || e.input == 6){ //多选
                    value = [];
                    for (let k = 0; k < e.options.length; k++) {
                        const e2 = e.options[k];
                        if(e2.checked === 1){
                            value.push(e2.value);
                        }
                    }
                }
                form[e.code] = value
            }
            this.addForm = Object.assign({}, form);
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
            Config.findByPage(this, params, (res, vm, cp) => {
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
        //自定义属性
        handleCustomAdd: function(){
            this.customForm = [];
            this.customLoading = false;
            this.customFormVisible = true;
        },
        handleCustomEdit: function(){
            this.customLoading = false;
            this.customFormVisible = true;
        },
        addCustom: function(){
            this.customForm.push({
                type: this.addForm.type,
                config: this.addForm.pid,
                name: '',
                code: '',
                value: '',
                desc: '',
                input: 0,
                isnull: 0,
                isshow: 1,
                ishide: 0,
                sys: 0,
                regexp: '',
                regtips: ''
            });
        },
        delCustom: function(index){
            this.customForm.splice(index, 1);
        },
        //显示新增界面
        handleAdd: function () {
            this.addForm = {
                pid: '',
                type: '',
                name: '',
                sort: 999,
                desc: '',
                status: 0,
                smode: '',
                svalue: ''
            };
            this.addLoading = false;
            this.addFormVisible = true;
            //查询已使用pid
            if(this.usedPids.length != 0){
                this.handleAddPid();
                return;
            }
            this.queryPids();
        },
        //查询已使用pid
        queryPids: function(){
            Config.findForPids(this, {}, (res, vm, cp) => {
                if(res.code > 0){
                    this.usedPids = res.data;
                    this.handlePids();
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
        //自动生成pid
        handleAddPid: function(){
            let test = this.addForm.type;
            if(!test){
                return;
            }
            let pids = this.usedPids;
            let minPid = Number(test + "001");
            let maxPid = Number(test + "999");
            let curPid = 0;
            for (let i = 0; i < pids.length; i++) {
                const e = pids[i];
                if(e >= minPid && e <= maxPid){
                    curPid = Math.max(e, minPid);
                }
            }
            curPid = curPid == 0 ? minPid : curPid + 1;
            this.addForm.pid = curPid;
        },
        //新增
        addSubmit: function () {
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        let params = Object.assign({}, this.addForm);
                        console.log(params);
                        this.addLoading = false;
                        return;
                        Config.add(this, params, (res, vm, cp) => {
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
                        Config.update(this, params, (res, vm, cp) => {
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
                Config.del(this, params, (res, vm, cp) => {
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
        this.initTypes();
        this.queryByPage();
    },
    mounted() {
    }
}
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .fieldset{
    border: none;
    font-size: 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    margin-bottom: 18px; 
    margin-top: -16px; 
  }
  .fieldset .legend{
    color: #dcdfe6;
    margin-left: 10px;
  }
  .paddingRight{
    padding-right: 10px;
  }
</style>