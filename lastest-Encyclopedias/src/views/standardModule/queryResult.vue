<template>
    <div class="contbody">
        <div class="contbody_title">
            基础信息
        </div>
        <div class="FromDataBox" style="overflow:hidden;padding-top:24px;">
            <Form :model="formVal" :label-width="98" ref="formVal" :rules="ruleFormVal">
                <FormItem label="项目名称：" prop="taskName" style="width: 600px;">
                    <Input placeholder="请输入项目名称" v-model="valueName" disabled></Input>
                </FormItem>

                <FormItem label="主要内容：" prop="modelDescribe" style="width: 600px;">
                    <Input type="textarea" :rows="4" placeholder="请输入主要内容" v-model="valueContent" disabled></Input>
                </FormItem>
                <FormItem label="存在问题：" prop="modelDescribe" style="width: 600px;">
                    <Input type="textarea" :rows="4" placeholder="请输入存在问题" v-model="valueProblem" disabled></Input>
                </FormItem>

                <!-- <FormItem style="width:100%;margin-top:30px;margin-bottom:50px;display: flex;justify-content: center;">
                    <Button type="primary" @click="handleSubmit('formVal')">创建任务</Button>
                    <Button style="margin-left: 8px">返回</Button>
                </FormItem> -->
            </Form>
        </div>
        <!-- <div class="contbody_title">
            检索关键词
        </div> -->
        <div class="FromDataBox" style="overflow:hidden;padding-top:24px;">
            <Form :model="formVal" :label-width="98" ref="formVal" :rules="ruleFormVal">
                <FormItem label="关键词：" prop="taskName" style="width: 600px;">
                    <Input type="textarea" :rows="2" v-model="keywords" placeholder="请输入关键词"></Input>
                    <!-- <Button type="primary" style="margin-top: 10px;">生成关键词</Button> -->
                </FormItem>
                <!-- <FormItem label="关键词推荐：" prop="taskName" style="width: 600px;">
                    <label for="">飞机，导弹</label>
                </FormItem> -->

                <FormItem :label-width="120" label="相关性查询范围：" prop="modelDescribe">
                    <CheckboxGroup v-model="biaozhun">
                        <Checkbox label="GB">国家标准GB</Checkbox>
                        <Checkbox label="GJB">国家军用标准GJB</Checkbox>
                        <Checkbox label="JHB">军工行业标准</Checkbox>
                        <Checkbox label="HB">航空行业标准（HB）</Checkbox>
                        <Checkbox label="Q/AVIC">航空工业标准（Q/AVIC）</Checkbox>

                    </CheckboxGroup>
                </FormItem>
                <FormItem :label-width="200" label="是否含列入计划但未发布标准：" prop="modelDescribe" style="width: 600px;">
                    <RadioGroup v-model="naru" @on-change="changeStatus()" style="display: block;">
                        <Radio label="yes">是</Radio>
                        <Radio label="no">否</Radio>
                    </RadioGroup>
                    <Button type="primary" style="margin-top: 20px;" @click="relateQuery">相关性查询</Button>


                </FormItem>


            </Form>
        </div>
        <div class="contbody_title">
            相关性查询结果
        </div>
        <div class="FromDataBox" style="overflow:hidden;padding-top:24px;width: 1453px;">
            <Table border stripe highlight-row :data="tableData" :columns="Columns" style="margin-bottom: 20px;"
                @on-selection-change="selectRow">
            </Table>
            <Button type="primary" style="margin-top: 20px;" @click="refreshGraph">刷新图谱</Button>

            <!-- 图谱 -->
            <div style="width: 90%;height: 600px;">
                <atlasComponents ref="graphDatas"></atlasComponents>
                <!-- <atlas-components></atlas-components> -->

            </div>





        </div>

        <Button type="primary" style="background-color: darkgoldenrod;margin-top: 30px;"
            @click="saveRecord">保存查询信息</Button>
        <div class="contbody_title">
            报告预览
        </div>
        <div class="FromDataBox" style="overflow:hidden;padding-top:24px;">
            <Form :model="formVal" :label-width="120" ref="formVal" :rules="ruleFormVal">
                <FormItem :label-width="200" label="是否将图谱纳入到报告：" prop="modelDescribe" style="width: 600px;">
                    <RadioGroup v-model="valid" @on-change="changeStatus()" style="display: block;">
                        <Radio label="yes">是</Radio>
                        <Radio label="no">否</Radio>
                    </RadioGroup>
                    <Button type="primary" style="margin-top: 20px;" @click="countryReport">国家军用标准相关性查询报告单预览</Button>
                    <Button type="primary" style="margin-top: 20px;" @click="jgReport">军工行业标准相关性查询报告单预览</Button>
                    <Button type="primary" style="margin-top: 20px;display: block;width: 256px;"
                        @click="demandReport">需求相关性查询报告单预览</Button>



                </FormItem>
            </Form>
        </div>

    </div>

</template>

<script>
    import axios from 'axios';
    import atlasComponents from "@/components/atlasComponents.vue";

    export default {
        name: 'queryResult',
        components: {
            atlasComponents
        },
        props: {},
        data() {
            return {
                tableInfo: {}, //上一页选中的表格数据
                valueProblem: '',
                valueName: '',
                valueContent: '',
                keywords: '',
                biaozhun: ['GB', 'GJB', 'HB', 'JHB', 'Q/AVIC'],
                naru: 'no',
                queryTime: '',
                valid: 'no',
                selection: [],
                relaventFlag:false,


                listData: [], //下拉的数据列表
                formVal: {
                    taskName: '', //任务名称
                    modelChoice: '', //模型选择
                    modelDescribe: '', //模型描述
                    formData: '', //数据文件
                    remarks: '', //备注
                },
                file: '', //上传的文件
                // 规则
                ruleFormVal: {
                    //任务名称
                    // taskName: [{
                    //     required: true,
                    //     message: '请输入关键字',
                    //     trigger: 'change',
                    // }, ],
                },
                // 表格数据
                tableData: [],
                data2: [],
                showBox: false, //遮罩层
                // 获取第几页的数据
                pageIndex: '1',
                // 分页的粒度
                pageNum: '10',
                // 总页数
                totalCount: 0,
                // 当前页码
                table_current: 1,
                // 获取第几页的数据
                pageIndex2: '1',
                // 分页的粒度
                pageNum2: '10',
                // 总页数
                totalCount2: 0,
                // 当前页码
                table_current2: 1,
                Columns: [{
                        type: "selection",
                        align: "center",
                        width: 80,
                        key: "select",
                    },
                    {
                        title: '标准号/计划号',
                        width: 200,
                        align: 'center',
                        key: 'BZBH',
                    },
                    {
                        title: '标准名称',
                        width: 300,
                        align: 'center',
                        key: 'BZZWMC',
                    },
                    {
                        title: '主办单位',
                        width: 300,
                        align: 'center',
                        key: 'TCDWMC',
                    },
                    {
                        title: '主编单位',
                        width: 300,
                        align: 'center',
                        key: 'ZBDWMC',
                    },
                    {
                        title: '密级',
                        width: 150,
                        align: 'center',
                        key: 'MJMC',

                    },
                    {
                        title: '相似度',
                        width: 120,
                        align: 'center',
                        key: 'score',
                    },
                ],
            };
        },
        watch: {},
        computed: {


        },
        methods: {

            // 国家查询报告页面打开
            countryReport() {
                // 表格选择数据
                // this.$router.push("/standard/showReport");
                let alldatas = JSON.stringify({
                    data: this.selection,
                    proName: this.valueName,
                    proContent: this.valueContent,
                    type: 'country',
                    username: this.$store.state.user.userInfo.username,
                    queryTime: this.queryTime,
                    keywords: this.keywords,
                    problem: this.valueProblem,


                })
                this.$router.push({
                    path: "/standard/showReport",
                    query: {
                        allDatas: alldatas
                    },
                });

            },
            jgReport() {
                // this.$router.push("/standard/showReport");
                let alldatas = JSON.stringify({
                    data: this.selection,
                    proName: this.valueName,
                    proContent: this.valueContent,
                    type: 'jg',
                    username: this.$store.state.user.userInfo.username,
                    queryTime: this.queryTime,
                    keywords: this.keywords,
                    problem: this.valueProblem

                })
                this.$router.push({
                    path: "/standard/showReport",
                    query: {
                        allDatas: alldatas

                    }
                });

            },
            demandReport() {
                let alldatas = JSON.stringify({
                    data: this.selection,
                    proName: this.valueName,
                    proContent: this.valueContent,
                    type: 'demand',
                    username: this.$store.state.user.userInfo.username,
                    queryTime: this.queryTime,
                    problem: this.valueProblem,
                    keywords: this.keywords
                })
                // this.$router.push("/standard/showReport");
                this.$router.push({
                    path: "/standard/showReport",
                    query: {
                        allDatas: alldatas

                    },
                });

            },
            // 时间处理
            handleTime() {

                const date = new Date();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const strDate = date.getDate().toString().padStart(2, '0');
                const starHours = date.getHours().toString().padStart(2, '0');
                const starMinutes = date.getMinutes().toString().padStart(2, '0');
                const starSeconds = date.getSeconds().toString().padStart(2, '0');
                this.queryTime = `${date.getFullYear()}-${month}-${strDate} ${starHours}:${starMinutes}:${starSeconds}`.split(' ')[0];

            },
            // 表格选择
            selectRow(selection) {
                this.selection = selection;
            },
            // 生成新词接口
            showKeyWords() {
                let param = {};
                param['name'] = this.valueName;
                param['scope'] = this.valueContent;



                let config = {
                    headers: {
                        'Content-Type': "application/json",
                        Accept: '*/*'
                    },
                };
                // 添加请求头
                axios.post('/api/baike/search/get_keywords', param, config).then(res => {
                    console.log(res)
                    if (res.status == 200) {
                        let keys = res.data.data.keys;
                        let keywords = [];
                        keys.forEach(item => {
                            if (item != '') {
                                keywords.push(item);
                            }
                        });

                        this.keywords = keywords.join();
                        this.relateQuery();
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                });

            },
            // 相关性查询
            relateQuery() {
                let param = new FormData(); // 创建form对象
                param.append('key_words', this.keywords); //表单数据 文件流
                param.append('scope', this.biaozhun.join()); //表单数据 文件流

                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Accept: '*/*'
                    },
                };

                // let config = {
                //     headers: {
                //         'Content-Type': "application/json",
                //         Accept: '*/*'
                //     },
                // };
                // 添加请求头
                axios.post('/api/baike/search/relevant_research', param, config).then(res => {
                    console.log(res)
                    if (res.status == 200) {
                        // 表格
                        this.tableData = res.data.data;
                        this.handleTime()
                        this.refreshGraph()
                        // 图谱
                        // let {
                        //     typelist,
                        //     graph
                        // } = res.data.atlas.data;
                        // typelist.unshift('全部');
                        // this.$store.commit('updated_atlasTypeList', typelist);
                        // this.$store.commit('updated_atlasImg', graph);

                    } else {
                        this.$Message.error(res.data.msg);
                    }
                });

            },
            // 刷新图谱
            refreshGraph() {
                console.info(this.selection, '====');
                let selArr = [];
                let selDatas=[];
                if (this.selection.length == 0) {
                    selDatas = this.tableData;
                } else {
                   selDatas = this.selection;
                }
                for (let i = 0; i < selDatas.length; i++) {
                    const item = selDatas[i];
                    selArr.push(item['BZBH'])
                }
                let param = {
                    'id': selArr
                } // 创建form对象

                let config = {
                    headers: {
                        'Content-Type': "application/json",
                        Accept: '*/*'
                    },
                };
                // 添加请求头
                axios.post('/api/baike/create/create_atlas', param, config).then(res => {
                    console.log(res)
                    if (res.status == 200) {

                        // 图谱
                        let {
                            typelist,
                            graph
                        } = res.data.atlas.data;
                        typelist.unshift('全部');

                        this.$store.commit('updated_atlasTypeList', typelist);
                        if(graph.nodes.length>0){
                            this.$store.commit('updated_atlasImg', graph);
                            if(!this.relaventFlag){
                                this.$Message.success('刷新成功');
                            }else{

                                this.relaventFlag=false;
                            }

                        }else{
                        this.$Message.error('无关系，无法刷新');

                        }

                    } else {
                        this.$Message.error(res.data.msg);
                    }
                });


            },
            // 保存查询记录

            saveRecord() {
                // let param = new FormData(); // 创建form对象
                // param.append('key_words', this.keywords); //表单数据 文件流
                // param.append('scope', this.biaozhun.join()); //表单数据 文件流

                // let config = {
                //     headers: {
                //         'Content-Type': 'multipart/form-data',
                //         Accept: '*/*'
                //     },
                // };

                let param = {};
                param['user_id'] = this.$store.state.user.userInfo.username;
                param['demand_id'] = this.tableInfo.demandId;
                param['query_by'] = this.$store.state.user.userInfo.username;
                param['keys'] = this.keywords;
                param['query_time'] = this.queryTime;




                let config = {
                    headers: {
                        'Content-Type': "application/json",
                        Accept: '*/*'
                    },
                };
                // 添加请求头
                axios.post('/api/baike/save/save_users_info', param, config).then(res => {
                    console.log(res)
                    if (res.status == 200) {
                        this.$Message.success(res.data.msg);
                    } else {
                        this.$Message.error(res.data.msg);
                    }
                });

            },


            // 选择模型下拉
            getListDown() {
                this.$axios(
                    '/baike/tyzx/get_task_type',
                    'post',
                    this.$qs.stringify({
                        type: '文本分类',
                    })
                ).then(res => {
                    this.listData = res.data.data;
                });
            },
            descriptionBtn(item) {
                this.formVal.modelDescribe = item;
            },
            // 上传获取数据
            handleBeforeUpload(file) {
                this.file = file;
            },
            // 上传成功
            handleSuccess(res, file) {
                this.formVal.formData = file.name;
                console.log('上传成功');
            },
            // 上传失败
            upload_error(error, file, fileList) {
                setTimeout(() => {
                    this.$Notice.error({
                        title: '文件上传失败！',
                        desc: `当前上传文件为${file.name}，请上传正确的文件！`,
                        duration: 6,
                    });
                }, 200);
            },
            // 点击创建任务
            handleSubmit(name) {
                const _this = this;
                this.$refs[name].validate(valid => {
                    if (valid) {
                        let param = new FormData(); // 创建form对象
                        param.append('task_name', _this.formVal.taskName); //任务名称
                        param.append('image_id', _this.formVal.modelChoice); //用户选择的模型的主键ID
                        param.append('user', _this.$store.state.user.userInfo.username); //用户名称
                        param.append('remark', _this.formVal.remarks); //备注
                        param.append('file', _this.file); // 通过append向form对象添加数据

                        let config = {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                                Accept: '*/*'
                            },
                        };
                        // 添加请求头
                        axios.post('api/baike/tyzx/create_task', param, config).then(res => {
                            if (res.data.code == 200) {
                                this.$Message.success(res.data.msg);
                            } else {
                                this.$Message.error(res.data.msg);
                            }
                        });
                    }
                });
            },
            // 下载
            downBtn() {
                location.href = `/api/baike/tyzx/download_template?type_name=文本分类`;
            },
        },
        created() {
            // 参数处理
            this.tableInfo = JSON.parse(this.$route.query.data)[0];
            this.relaventFlag=this.$route.query.fristFlag;
            this.valueName = this.tableInfo.demandName;
            this.valueContent = this.tableInfo.content;
            this.valueProblem = this.tableInfo.problem;
            this.handleTime();
            this.showKeyWords();
            
        },
        mounted() {

        },
    };
</script>
<style lang="less" scoped>
    // 修改特殊的样式
    .FromDataBox {
        /deep/ textarea.ivu-input {
            resize: none;
        }

        /deep/ .ivu-form-item-label {
            padding: 0px;
            display: flex;
            align-items: center;
            height: 32px;
            justify-content: right;
        }

        .fromClass_1 {
            margin-bottom: 16px;

            /deep/ .ivu-form-item-content {
                display: flex;
                justify-content: space-between;
            }
        }
    }

    .contbody {
        padding: 0px 20px 0px 20px;
        background: white;
        border-radius: 5px;

        .contbody_title {
            height: 46px;
            line-height: 46px;
            font-size: 16px;
            color: #3f424b;
            border-bottom: 1px solid #eeeeee;
        }

        // 模块的模板1
        .modelStyle_one {
            display: flex;
            margin-bottom: 20px;

            .modelStyle_l {
                min-width: 86px;
                line-height: 30px;
                text-align: right;
            }

            .modelStyle_r {
                display: flex;
                flex: 1;
                min-height: 30px;

                /deep/ textarea.ivu-input {
                    resize: none;
                    height: 100% !important;
                }
            }
        }

        // 模块的模板2
        .modelStyle_two {
            display: flex;
            flex-direction: column;
            margin-top: 10px;

            .modelStyle_l {
                min-width: 86px;
                line-height: 30px;
                text-align: right;
            }

            .modelStyle_r {
                flex: 1;
                min-height: 30px;

                /deep/ textarea.ivu-input {
                    resize: none;
                    height: 100% !important;
                }
            }
        }
    }
</style>