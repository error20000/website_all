<template>
    <section>
        <!--筛选条件-->
		<el-tabs type="border-card" style="margin-bottom: 20px;">
			<el-tab-pane label="筛选条件">
				<el-row type="flex">
                    <el-col :span="24">
                        <el-form size="mini" :inline="true" :model="filters">
                            <el-form-item label="所属模版" prop="model">
                                <el-select v-model="filters.model" placeholder="请选择" >
                                    <el-option label="全部" value=""></el-option>
                                    <el-option v-for="item in modelOptions" :key="item.pid" :label="item.name" :value="item.pid"></el-option>
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
						<el-table size="mini" :data="list" highlight-current-row v-loading="listLoading" style="width: 100%;" :stripe="true">
							<el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-form label-position="left" label-width="200px" inline class="demo-table-expand">
                                        <el-form-item label="编号">
                                            <span>{{ props.row.pid }}</span>
                                        </el-form-item>
                                        <el-form-item label="名称">
                                            <span>{{ props.row.name }}</span>
                                        </el-form-item>
                                        <el-form-item label="标识">
                                            <span>{{ props.row.en }}</span>
                                        </el-form-item>
                                        <el-form-item label="模版">
                                            <span>{{ formatterByModel(props.row) }}</span>
                                        </el-form-item>
                                        <el-form-item label="开始时间">
                                            <span>{{ props.row.start }}</span>
                                        </el-form-item>
                                        <el-form-item label="结束时间">
                                            <span>{{ props.row.end }}</span>
                                        </el-form-item>
                                        <el-form-item label="状态">
                                            <span>{{ formatterByStatus(props.row) }}</span>
                                        </el-form-item>
                                        <el-form-item label="描述">
                                            <span>{{ props.row.desc }}</span>
                                        </el-form-item>
                                        <el-form-item label="可参加次数（次）">
                                            <span>{{ formatterByCount(props.row) }}</span>
                                        </el-form-item>
                                        <el-form-item label="是否审核">
                                            <span>{{ formatterByAuth(props.row) }}</span>
                                        </el-form-item>
                                        <el-form-item label="是否验证">
                                            <span>{{ formatterBySign(props.row) }}</span>
                                        </el-form-item>
                                        <el-form-item label="是否分享">
                                            <span>{{ formatterByShare(props.row) }}</span>
                                        </el-form-item>
                                        <el-form-item label="分享模式">
                                            <span>{{ formatterByShareMode(props.row) }}</span>
                                        </el-form-item>
                                        <el-form-item label="每次分享获得参与次数（次）">
                                            <span>{{ formatterByShareCount(props.row) }}</span>
                                        </el-form-item>
                                        <el-form-item label="分享获得参与次数限制（次）">
                                            <span>{{ formatterByShareLimit(props.row) }}</span>
                                        </el-form-item>
                                        <el-form-item label="成功后操作">
                                            <span>{{ formatterBySmode(props.row) }}</span>
                                        </el-form-item>
                                        <el-form-item label="操作内容">
                                            <span>{{ formatterBySvalue(props.row) }}</span>
                                        </el-form-item>
                                    </el-form>
                                </template>
                            </el-table-column>
                            <el-table-column prop="pid" label="编号" sortable>
							</el-table-column>
							<el-table-column prop="name" label="名称" sortable>
							</el-table-column>
							<el-table-column prop="en" label="标识" sortable>
							</el-table-column>
							<el-table-column prop="model" label="模版" sortable :formatter="formatterByModel">
							</el-table-column>
							<el-table-column prop="start" label="开始时间" sortable>
							</el-table-column>
							<el-table-column prop="end" label="结束时间" sortable>
							</el-table-column>
							<el-table-column prop="status" label="状态" sortable :formatter="formatterByStatus">
							</el-table-column>
							<!-- <el-table-column prop="desc" label="描述" sortable>
							</el-table-column>
							<el-table-column prop="count" label="可参加次数" sortable :formatter="formatterByCount">
							</el-table-column>
							<el-table-column prop="auth" label="是否审核" sortable :formatter="formatterByAuth">
							</el-table-column>
							<el-table-column prop="sign" label="是否验证" sortable :formatter="formatterBySign">
							</el-table-column>
                                <el-table-column label="分享信息">
							<el-table-column prop="share" label="是否分享" sortable :formatter="formatterByShare">
							</el-table-column>
							<el-table-column prop="share_mode" label="分享模式" sortable :formatter="formatterByShareMode">
							</el-table-column>
							<el-table-column prop="share_count" label="每次分享获得参与次数" sortable :formatter="formatterByShareCount">
							</el-table-column>
							<el-table-column prop="share_limit" label="分享获得参与次数限制" sortable :formatter="formatterByShareLimit">
							</el-table-column>
                                </el-table-column>
							<el-table-column prop="smode" label="成功后操作" sortable :formatter="formatterBySmode">
							</el-table-column>
							<el-table-column prop="svalue" label="操作内容" sortable :formatter="formatterBySvalue">
							</el-table-column> -->
                            <el-table-column label="操作" width="220" fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="success" size="mini" @click="handleEdit(scope.$index, scope.row)">配置</el-button>
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
		<el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false" width="80%">
			<el-form size="mini" :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
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
                <el-form-item prop="en">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.en" :effect="tips.effect" :placement="tips.forms.en.placement">
                            <div slot="content" v-html="tips.forms.en.content"></div>
                            <span>标识<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>标识</span>
                    </span>
					<el-input v-model="addForm.en"></el-input>
                </el-form-item>
				<el-form-item prop="model">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.model" :effect="tips.effect" :placement="tips.forms.model.placement">
                            <div slot="content" v-html="tips.forms.model.content"></div>
                            <span>模版<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>模版</span>
                    </span>
                    <el-select v-model="addForm.model" placeholder="请选择">
                        <el-option 
                            v-for="item in modelOptions" 
                            :key="item.pid" :label="item.name" 
                            :value="item.pid" > 
                        </el-option>
                    </el-select>
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
				<el-form-item prop="frequency">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.frequency" :effect="tips.effect" :placement="tips.forms.frequency.placement">
                            <div slot="content" v-html="tips.forms.frequency.content"></div>
                            <span>频次<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>频次</span>
                    </span>
                    <el-radio-group v-model="addForm.frequency">
                        <el-radio v-for="item in freqOptions" :key="item.pid" :label="item.pid">{{item.name}}</el-radio>
                    </el-radio-group>
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
                    <el-input v-model="addForm.desc" type="textarea" size="mini"></el-input>
				</el-form-item>
				<el-form-item prop="count">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.count" :effect="tips.effect" :placement="tips.forms.count.placement">
                            <div slot="content" v-html="tips.forms.count.content"></div>
                            <span>可参加次数<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>可参加次数</span>
                    </span>
                    <el-input-number v-model="addForm.count" :min="-1"></el-input-number>
				</el-form-item>
				<el-form-item prop="auth">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.auth" :effect="tips.effect" :placement="tips.forms.auth.placement">
                            <div slot="content" v-html="tips.forms.auth.content"></div>
                            <span>是否审核<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>是否审核</span>
                    </span>
                    <el-radio-group v-model="addForm.auth">
                        <el-radio :label="0">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">自动</el-radio>
                    </el-radio-group>
				</el-form-item>
				<!-- <el-form-item prop="sign">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.sign" :effect="tips.effect" :placement="tips.forms.sign.placement">
                            <div slot="content" v-html="tips.forms.sign.content"></div>
                            <span>是否验证<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>是否验证</span>
                    </span>
					<el-switch v-model="addForm.sign" :active-value="1" :inactive-value="0"></el-switch>
				</el-form-item> -->
				<el-form-item prop="login">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.login" :effect="tips.effect" :placement="tips.forms.login.placement">
                            <div slot="content" v-html="tips.forms.login.content"></div>
                            <span>是否需登录<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>是否需登录</span>
                    </span>
					<el-switch v-model="addForm.login" :active-value="1" :inactive-value="0"></el-switch>
				</el-form-item>
                <fieldset class="fieldset"  v-if="addForm.login == 1" >
                <legend class="legend">登录配置&nbsp;&nbsp;<el-button type="text" icon="el-icon-plus" @click="loginModeAdd(addForm)">新增</el-button></legend>
                <el-table
                    size="mini"
                    :data="addForm.loginOptions"
                    style="width: 100%">
                    <el-table-column label="登录模式" min-width="140px">
                        <template slot-scope="scope">
                            <el-select size="mini" v-model="scope.row.login_mode" placeholder="请选择模式">
                                <el-option-group
                                    v-for="group in loginOptions"
                                    :key="group.name" :label="group.name">
                                    <el-option
                                        v-for="item in group.options"
                                        :key="item.pid" :label="item.name" :value="item.pid">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="指定活动接口" min-width="140px">
                        <template slot-scope="scope">
                            <el-select size="mini" v-model="scope.row.login_ifs" placeholder="请选择活动" :disabled="!changeLoginShow(scope.row.login_mode, 'login_ifs')">
                                <el-option
                                    v-for="item in loginIfsOptions"
                                    :key="item.pid" :label="item.name" :value="item.en">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="登录有效次数" min-width="140px">
                        <template slot-scope="scope">
                            <el-input-number size="mini" controls-position="right" v-model="scope.row.login_count" :min="-1" :disabled="!changeLoginShow(scope.row.login_mode, 'login_count')">
                            </el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="每次增加参与次数" min-width="140px">
                        <template slot-scope="scope">
                            <el-input-number size="mini" controls-position="right" v-model="scope.row.login_num" :min="0" :disabled="!changeLoginShow(scope.row.login_mode, 'login_num')">
                            </el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="总增加参与次数限制" min-width="140px">
                        <template slot-scope="scope">
                            <el-input-number size="mini" controls-position="right" v-model="scope.row.login_limit" :min="-1" :disabled="!changeLoginShow(scope.row.login_mode, 'login_limit')">
                            </el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80px" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="loginModeDel(addForm, scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </fieldset>
				<el-form-item prop="share">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.share" :effect="tips.effect" :placement="tips.forms.share.placement">
                            <div slot="content" v-html="tips.forms.share.content"></div>
                            <span>是否可分享<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>是否可分享</span>
                    </span>
					<el-switch v-model="addForm.share" :active-value="1" :inactive-value="0"></el-switch>
				</el-form-item>
                <fieldset class="fieldset"  v-if="addForm.share == 1" >
                <legend class="legend">分享配置&nbsp;&nbsp;<el-button type="text" icon="el-icon-plus" @click="shareModeAdd(addForm)">新增</el-button></legend>
                <el-table
                    size="mini"
                    :data="addForm.shareOptions"
                    style="width: 100%">
                    <el-table-column label="分享模式" min-width="140px">
                        <template slot-scope="scope">
                            <el-select size="mini" v-model="scope.row.share_mode" placeholder="请选择模式">
                                <el-option-group
                                    v-for="group in shareOptions"
                                    :key="group.name" :label="group.name">
                                    <el-option
                                        v-for="item in group.options"
                                        :key="item.pid" :label="item.name" :value="item.pid">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="指定活动接口" min-width="140px">
                        <template slot-scope="scope">
                            <el-select size="mini" v-model="scope.row.share_ifs" placeholder="请选择活动" :disabled="!changeShareShow(scope.row.share_mode, 'share_ifs')">
                                <el-option
                                    v-for="item in shareIfsOptions"
                                    :key="item.pid" :label="item.name" :value="item.en">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="分享有效次数" min-width="140px">
                        <template slot-scope="scope">
                            <el-input-number size="mini" controls-position="right" v-model="scope.row.share_count" :min="-1" :disabled="!changeShareShow(scope.row.share_mode, 'share_count')">
                            </el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="每次增加参与次数" min-width="140px">
                        <template slot-scope="scope">
                            <el-input-number size="mini" controls-position="right" v-model="scope.row.share_num" :min="0" :disabled="!changeShareShow(scope.row.share_mode, 'share_num')">
                            </el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="总增加参与次数限制" min-width="140px">
                        <template slot-scope="scope">
                            <el-input-number size="mini" controls-position="right" v-model="scope.row.share_limit" :min="-1" :disabled="!changeShareShow(scope.row.share_mode, 'share_limit')">
                            </el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80px" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="shareModeDel(addForm, scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </fieldset>
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
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="mini" @click.native="addFormVisible = false">取消</el-button>
				<el-button size="mini" type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--编辑界面-->
		<el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false" width="80%">
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
                <el-form-item prop="en">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.en" :effect="tips.effect" :placement="tips.forms.en.placement">
                            <div slot="content" v-html="tips.forms.en.content"></div>
                            <span>标识<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>标识</span>
                    </span>
					<el-input v-model="editForm.en"></el-input>
                </el-form-item>
				<el-form-item prop="model">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.model" :effect="tips.effect" :placement="tips.forms.model.placement">
                            <div slot="content" v-html="tips.forms.model.content"></div>
                            <span>模版<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>模版</span>
                    </span>
                    <el-select v-model="editForm.model" placeholder="请选择">
                        <el-option 
                            v-for="item in modelOptions" 
                            :key="item.pid" :label="item.name" 
                            :value="item.pid" > 
                        </el-option>
                    </el-select>
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
				<el-form-item prop="frequency">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.frequency" :effect="tips.effect" :placement="tips.forms.frequency.placement">
                            <div slot="content" v-html="tips.forms.frequency.content"></div>
                            <span>频次<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>频次</span>
                    </span>
                    <el-radio-group v-model="editForm.frequency">
                        <el-radio v-for="item in freqOptions" :key="item.pid" :label="item.pid">{{item.name}}</el-radio>
                    </el-radio-group>
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
                    <el-input v-model="editForm.desc" type="textarea" size="mini"></el-input>
				</el-form-item>
				<el-form-item prop="count">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.count" :effect="tips.effect" :placement="tips.forms.count.placement">
                            <div slot="content" v-html="tips.forms.count.content"></div>
                            <span>可参加次数<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>可参加次数</span>
                    </span>
                    <el-input-number v-model="editForm.count" :min="-1"></el-input-number>
				</el-form-item>
				<el-form-item prop="auth">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.auth" :effect="tips.effect" :placement="tips.forms.auth.placement">
                            <div slot="content" v-html="tips.forms.auth.content"></div>
                            <span>是否审核<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>是否审核</span>
                    </span>
                    <el-radio-group v-model="editForm.auth">
                        <el-radio :label="0">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">自动</el-radio>
                    </el-radio-group>
                </el-form-item>
				<!-- <el-form-item prop="sign">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.sign" :effect="tips.effect" :placement="tips.forms.sign.placement">
                            <div slot="content" v-html="tips.forms.sign.content"></div>
                            <span>是否验证<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>是否验证</span>
                    </span>
					<el-switch v-model="editForm.sign" :active-value="1" :inactive-value="0"></el-switch>
				</el-form-item> -->
				<el-form-item prop="login">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.login" :effect="tips.effect" :placement="tips.forms.login.placement">
                            <div slot="content" v-html="tips.forms.login.content"></div>
                            <span>是否需登录<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>是否需登录</span>
                    </span>
					<el-switch v-model="editForm.login" :active-value="1" :inactive-value="0"></el-switch>
				</el-form-item>
                <fieldset class="fieldset"  v-if="editForm.login == 1" >
                <legend class="legend">登录配置&nbsp;&nbsp;<el-button type="text" icon="el-icon-plus" @click="loginModeAdd(editForm)">新增</el-button></legend>
                <el-table
                    size="mini"
                    :data="editForm.loginOptions"
                    style="width: 100%">
                    <el-table-column label="登录模式" min-width="140px">
                        <template slot-scope="scope">
                            <el-select size="mini" v-model="scope.row.login_mode" placeholder="请选择模式">
                                <el-option-group
                                    v-for="group in loginOptions"
                                    :key="group.name" :label="group.name">
                                    <el-option
                                        v-for="item in group.options"
                                        :key="item.pid" :label="item.name" :value="item.pid">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="指定活动接口" min-width="140px">
                        <template slot-scope="scope">
                            <el-select size="mini" v-model="scope.row.login_ifs" placeholder="请选择活动" :disabled="!changeLoginShow(scope.row.login_mode, 'login_ifs')">
                                <el-option
                                    v-for="item in loginIfsOptions"
                                    :key="item.pid" :label="item.name" :value="item.en">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="登录有效次数" min-width="140px">
                        <template slot-scope="scope">
                            <el-input-number size="mini" controls-position="right" v-model="scope.row.login_count" :min="-1" :disabled="!changeLoginShow(scope.row.login_mode, 'login_count')">
                            </el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="每次增加参与次数" min-width="140px">
                        <template slot-scope="scope">
                            <el-input-number size="mini" controls-position="right" v-model="scope.row.login_num" :min="0" :disabled="!changeLoginShow(scope.row.login_mode, 'login_num')">
                            </el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="总增加参与次数限制" min-width="140px">
                        <template slot-scope="scope">
                            <el-input-number size="mini" controls-position="right" v-model="scope.row.login_limit" :min="-1" :disabled="!changeLoginShow(scope.row.login_mode, 'login_limit')">
                            </el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80px" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="loginModeDel(editForm, scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </fieldset>
				<el-form-item prop="share">
                    <span slot="label">
                        <el-tooltip v-if="tips.forms.share" :effect="tips.effect" :placement="tips.forms.share.placement">
                            <div slot="content" v-html="tips.forms.share.content"></div>
                            <span>是否可分享<i class="el-icon-question"></i></span>
                        </el-tooltip>
                        <span v-else>是否可分享</span>
                    </span>
					<el-switch v-model="editForm.share" :active-value="1" :inactive-value="0"></el-switch>
				</el-form-item>
                <fieldset class="fieldset"  v-if="editForm.share == 1" >
                <legend class="legend">分享配置&nbsp;&nbsp;<el-button type="text" icon="el-icon-plus" @click="shareModeAdd(editForm)">新增</el-button></legend>
                <el-table
                    size="mini"
                    :data="editForm.shareOptions"
                    style="width: 100%">
                    <el-table-column label="分享模式" min-width="140px">
                        <template slot-scope="scope">
                            <el-select size="mini" v-model="scope.row.share_mode" placeholder="请选择模式">
                                <el-option-group
                                    v-for="group in shareOptions"
                                    :key="group.name" :label="group.name">
                                    <el-option
                                        v-for="item in group.options"
                                        :key="item.pid" :label="item.name" :value="item.pid">
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="指定活动接口" min-width="140px">
                        <template slot-scope="scope">
                            <el-select size="mini" v-model="scope.row.share_ifs" placeholder="请选择活动" :disabled="!changeShareShow(scope.row.share_mode, 'share_ifs')">
                                <el-option
                                    v-for="item in shareIfsOptions"
                                    :key="item.pid" :label="item.name" :value="item.en">
                                </el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column label="分享有效次数" min-width="140px">
                        <template slot-scope="scope">
                            <el-input-number size="mini" controls-position="right" v-model="scope.row.share_count" :min="-1" :disabled="!changeShareShow(scope.row.share_mode, 'share_count')">
                            </el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="每次增加参与次数" min-width="140px">
                        <template slot-scope="scope">
                            <el-input-number size="mini" controls-position="right" v-model="scope.row.share_num" :min="0" :disabled="!changeShareShow(scope.row.share_mode, 'share_num')">
                            </el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="总增加参与次数限制" min-width="140px">
                        <template slot-scope="scope">
                            <el-input-number size="mini" controls-position="right" v-model="scope.row.share_limit" :min="-1" :disabled="!changeShareShow(scope.row.share_mode, 'share_limit')">
                            </el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="80px" fixed="right">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="shareModeDel(editForm, scope.$index)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                </fieldset>
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
import Tips from '../../tips/act/type';
import {Type, Interface} from "../../api/act";

export default {
    data() {
        return {
            filters: {
                model: ''
            },
            list: [],
            total: 0,
            page: 1,
            rows: 10,
            listLoading: false,
            tips: Tips,
            freqOptions: [{
                    pid: 0,
                    name: '仅可参与一次'
                },{
                    pid: 1,
                    name: '每天可参与'
                }
            ],
            modelOptions: [{
                    pid: 0,
                    name: '一般模版'
                },{
                    pid: 1,
                    name: '抽奖模版'
                },{
                    pid: 2,
                    name: '兑换模版'
                },{
                    pid: 3,
                    name: '积分模版'
                },{
                    pid: 4,
                    name: '投票模版'
                },{
                    pid: 5,
                    name: '玩家活动模版'
                },{
                    pid: 10,
                    name: '自定义模版'
                }
            ],
            shareOptions: [{
                    name: '通用',
                    options: [{
                        pid: 0,
                        name: '仅分享',
                        login: 0,
                        scope: []
                    }]
                },{
                    name: '活动期间',
                    options: [{
                        pid: 1,
                        name: '分享后可获得本活动参与次数',
                        login: 0,
                        scope: ['share_count', 'share_num', 'share_limit']
                    },{
                        pid: 3,
                        name: '分享后他人访问后分享人可获得参与次数',
                        login: 1,
                        scope: ['share_count', 'share_num', 'share_limit']
                    },{
                        pid: 4,
                        name: '分享后他人成功参与指定活动后分享人可获得参与次数',
                        login: 1,
                        scope: ['share_ifs', 'share_count', 'share_num', 'share_limit']
                    }]
                },{
                    name: '活动期间每天',
                    options: [{
                        pid: 2,
                        name: '每天分享后可获得本活动参与次数',
                        login: 0,
                        scope: ['share_count', 'share_num', 'share_limit']
                    }]
                }
            ],
            loginOptions: [{
                    name: '通用',
                    options: [{
                        pid: 0,
                        name: '仅登录',
                        model: 1,
                        scope: []
                    },{
                        pid: 1,
                        name: '需登录才能参与活动',
                        model: 1,
                        scope: []
                    },{
                        pid: 4,
                        name: '参与指定活动后才能参与本活动',
                        model: 1,
                        scope: ['login_ifs']
                    },{
                        pid: 5,
                        name: '需登录并且参与指定活动后才能参与本活动',
                        model: 1,
                        scope: ['login_ifs']
                    }]
                },{
                    name: '活动期间',
                    options: [{
                        pid: 2,
                        name: '登录可获得参与次数',
                        model: 1,
                        scope: ['login_count', 'login_num', 'login_limit']
                    }]
                },{
                    name: '活动期间每天',
                    options: [{
                        pid: 3,
                        name: '每天登录可获得参与次数',
                        model: 1,
                        scope: ['login_count', 'login_num', 'login_limit']
                    }]
                }
            ],
            loginIfsOptions: [],
            shareIfsOptions: [],
            smodeOptions: [],
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
                ]
            },
            addForm: {
                pid: '',
                name: '',
                en: '',
                model: '',
                start: '',
                end: '',
                frequency: 0,
                status: 0,
                desc: '',
                count: 0,
                auth: 0,
                sign: 0,
                login: 0,
                loginOptions: [],
                share: 0,
                shareOptions: [],
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
                ]
            },
            editForm: {
            }

        }
    },
    methods: {
        formatterByStatus: function (row, column) {
            return row.status ? '启用' : '禁用';
        },
        formatterByModel: function (row, column) {
            for (var i = 0; i < this.modelOptions.length; i++) {
                if(row.model == this.modelOptions[i].pid){
                    return this.modelOptions[i].name;
                }
            }
        },
        formatterByModel: function (row, column) {
            for (var i = 0; i < this.modelOptions.length; i++) {
                if(row.model == this.modelOptions[i].pid){
                    return this.modelOptions[i].name;
                }
            }
        },
        formatterByCount: function (row, column) {
            return row.count < 0 ? '无限次' : row.count;
        },
        formatterByAuth: function (row, column) {
            return row.auth ? '是' : column ? '' : '否'; //Table里显示空
        },
        formatterBySign: function (row, column) {
            return row.sign ? '是' : column ? '' : '否'; //Table里显示空
        },
        formatterByShare: function (row, column) {
            return row.share ? '是' : column ? '' : '否'; //Table里显示空
        },
        formatterByShareMode: function (row, column) {
            if(row.share == 0){
                return '';
            }
            for (var i = 0; i < this.shareOptions.length; i++) {
                if(row.share == this.shareOptions[i].pid){
                    return this.shareOptions[i].name;
                }
            }
        },
        formatterByShareCount: function (row, column) {
            if(row.share == 0){
                return '';
            }
            return row.share_count < 0 ? '无限次' : row.share_count;
        },
        formatterByShareLimit: function (row, column) {
            if(row.share == 0){
                return '';
            }
            return row.share_limit < 0 ? '无限制' : row.share_limit;
        },
        formatterBySmode: function(row, column){
            return row.smode;
        },
        formatterBySvalue: function(row, column){
            return row.svalue;
        },
        changeShareShow: function(mode, option){
            let node = {};
            for (let i = 0; i < this.shareOptions.length; i++) {
                for (let j = 0; j < this.shareOptions[i].options.length; j++) {
                    const e = this.shareOptions[i].options[j];
                    if(mode == e.pid){
                        node = e;
                        break;
                    }
                }
            }
            for (let j = 0; j < node.scope.length; j++) {
                const e = node.scope[j];
                if(e == option){
                    return true;
                }
            }
            return false;
        },
        changeLoginShow: function(mode, option){
            let node = {};
            for (let i = 0; i < this.loginOptions.length; i++) {
                for (let j = 0; j < this.loginOptions[i].options.length; j++) {
                    const e = this.loginOptions[i].options[j];
                    if(mode == e.pid){
                        node = e;
                        break;
                    }
                }
            }
            for (let j = 0; j < node.scope.length; j++) {
                const e = node.scope[j];
                if(e == option){
                    return true;
                }
            }
            return false;
        },
        changePage: function (val) {
            this.page = val;
            this.queryByPage();
        },
        changeRows: function (val) {
            this.rows = val;
            this.queryByPage();
        },
        initInterfaces: function(){
            let params = {};
            Interface.findForOptions(this, params, (res, vm, cp) => {
                if(res.code > 0){
                    this.loginIfsOptions = res.data;
                    this.shareIfsOptions = res.data;
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
                if(this.filters[key] || this.filters[key] === 0){
                    params[key] = this.filters[key];
                }
            }
            this.listLoading = true;
            Type.findByPage(this, params, (res, vm, cp) => {
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
        //登录模式新增
        loginModeAdd: function(form){
            form.loginOptions.push({
                login_mode: '',
                login_count: -1,
                login_num: 0,
                login_limit: -1,
            });
        },
        //登录模式删除
        loginModeDel: function(form, index){
            form.loginOptions.splice(index, 1);
        },
        //分享模式新增
        shareModeAdd: function(form){
            form.shareOptions.push({
                share_mode: '',
                share_count: -1,
                share_num: 0,
                share_limit: -1,
            });
        },
        //分享模式删除
        shareModeDel: function(form, index){
            form.shareOptions.splice(index, 1);
        },
        //显示新增界面
        handleAdd: function () {
            this.addForm={
                pid: '',
                name: '',
                en: '',
                model: '',
                start: '',
                end: '',
                frequency: 0,
                status: 0,
                desc: '',
                count: 0,
                auth: 0,
                sign: 0,
                login: 0,
                loginOptions: [],
                share: 0,
                shareOptions: [],
                smode: '',
                svalue: ''
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
            Type.findForPids(this, {}, (res, vm, cp) => {
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
                        params.loginOptions = JSON.stringify(params.loginOptions);
                        params.shareOptions = JSON.stringify(params.shareOptions);
                        Type.add(this, params, (res, vm, cp) => {
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
                        params.loginOptions = JSON.stringify(params.loginOptions);
                        params.shareOptions = JSON.stringify(params.shareOptions);
                        Type.update(this, params, (res, vm, cp) => {
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
                Type.del(this, params, (res, vm, cp) => {
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
        this.initInterfaces();
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
    min-width: 100%;
  }
  .fieldset .legend{
    color: #dcdfe6;
    margin-left: 10px;
  }
  .tipsClass{
    max-width: 1000px;
  }
</style>