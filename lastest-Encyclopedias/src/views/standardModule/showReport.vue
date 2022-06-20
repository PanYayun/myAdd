<template>
    <div class="contbody">
        <!-- <div class="contbody_title">
            基础信息
        </div> -->
        <div class="FromDataBox" style="overflow:hidden;padding-top:24px;">
            <Form :model="formVal" :label-width="98" ref="formVal" :rules="ruleFormVal">
                <FormItem label="" prop="modelDescribe" style="width: 100%;">

                    <Button type="primary" style="margin-right: 20px;" @click="gjReport">国家军用标准相关性查询报告单预览</Button>
                    <Button type="primary" style="margin-right: 20px;" @click="jgReport">军工行业标准相关性查询报告单预览</Button>
                    <Button type="primary" style="margin-right: 20px;width: 256px"
                        @click="demandReport">需求相关性查询报告单预览</Button>
                    <Button type="primary" style="margin-left: 200px;background-color: darkgoldenrod;"
                        @click="downloadExcel">导出</Button>

                </FormItem>
            </Form>
        </div>
        <h3 style="text-align: center;font-weight: 900;font-size: 20px;margin-top: 30px;" v-model="title">{{title}}</h3>
        <div v-show="countryFlag" class="FromDataBox"
            style="overflow:hidden;padding-top:24px;width: 1352px !important;margin-left: 72px;">
            <Table v-show="countryFlag" border :show-header="false" :data="tableData" :columns="Columns"
                style="margin-bottom: 20px;" :span-method="handleSpan">
            </Table>


        </div>
        <div v-show="jgFlag" class="FromDataBox"
            style="overflow:hidden;padding-top:24px;width: 1352px !important;margin-left: 62px;">

            <Table v-show="jgFlag" border :show-header="false" :data="tableData1" :columns="Columns"
                style="margin-bottom: 20px;" :span-method="handleSpan1">
            </Table>


        </div>
        <div v-show="demandFlag" class="FromDataBox"
            style="overflow:hidden;padding-top:24px;width: 722px !important;margin-left: 380px;">

            <Table v-show="demandFlag" border :show-header="false" :data="tableData2" :columns="Columns2"
                style="margin-bottom: 20px;" :span-method="handleSpan2">
            </Table>

        </div>

    </div>

</template>

<script>
    import axios from 'axios';
    export default {
        name: 'showReport',
        components: {},
        props: {},
        data() {
            return {
                title: '',
                allDatas: {},

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
                    taskName: [{
                        required: true,
                        message: '请输入关键字',
                        trigger: 'change',
                    }, ],
                },
                // 表格数据
                tableData: [{
                        name: '提出单位填写',
                        proName: '项目名称',
                        value: 'mmm',

                    },
                    {
                        name: '主要内容',
                        proName: '主要内容222',

                    },
                    {
                        name: '查询机构填写',
                        proName: '相关标准清单：（根据申请立项单位提出的项目名称和主要内容对现有国家标准、国家军用标准和行业标准进行相关性查询，列出有关标准代号、名称和主编单位）',
                    },
                    {
                        name: '标准/计划号',
                        proName: '标准名称',

                        value: '主办单位',
                        company: '主编单位',
                        secret: '相似度',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    // 展示图谱
                    {
                        // name: '展示图谱（以查询的需求为中心，以相似度大小为依据展示相关标准/需求，并显示相似度数值）',
                        name: '',


                    },
                    {
                        name: '查询人',
                        proName: 'sss',

                        value: '职务职称',
                        company: 'xxx'

                    },
                    {
                        name: '联系电话',
                        proName: '173444444444',
                        value: '通信地址',
                        company: '天安门'
                    },
                    {
                        name: '审核人',
                        proName: 'sss',

                        value: '职务职务',
                        company: 'bbb'
                    },
                    {
                        name: '查询机构',

                    },



                ],
                tableData1: [{
                        name: '标准名称',
                        proName: '',
                        value: '',

                    },
                    {
                        name: '提出单位',
                        proName: '',
                        value: '分管单位',

                    },
                    {
                        name: '查询内容',
                        proName: '（请查询关键词及重点领域）关键词：查询范围：国家标准GB、国家军用标准GJB、军工行业标准（核EJ、航天QJ、航空HB、船舶CB、兵器WJ、电子SJ）、其他相关行业标准',
                    },
                    {
                        name: '相关标准清单',
                        proName: '标准/计划号',
                        value: '标准名称',
                        company: '主办单位',
                        secret: '主编单位',
                        as: '相似度'

                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        company: 'bbb',
                        secret: 'xxx',
                    },
                    {
                        name: '备注',

                    },
                    {
                        name: '查询人',
                        proName: 'sss',
                        value: '职称',
                        company: 'xxx',
                        secret: '日期',
                        as: 'eee',
                    },
                    {
                        name: '审核人',
                        proName: '173444444444',
                        value: '职称',
                        company: '天安门',
                        secret: '日期',
                        as: 'eee',
                    },

                    {
                        name: '查询机构',

                    },



                ],
                tableData2: [{
                        name: '需求名称',
                        proName: '多到的',

                    },
                    {
                        name: '用途或场景',
                        proName: '多到的',

                    },
                    {
                        name: '存在问题',
                        proName: '请查询相关关键词',
                    },
                    {
                        name: '主要内容',
                        proName: '标准/计划号',



                    },
                    {
                        name: '提出单位',
                        value: '提出人',
                        company: 'dd',
                        proName: 'xxx',
                    },
                    {
                        name: '查询日期',
                        value: '初步建议',
                        company: 'bbb',
                        proName: 'xxx',
                    },
                    {
                        name: '查询内容',
                        value: 'mmm',
                        company: 'bbb',
                        proName: '关键词：查询范围：国家标准GB、国家军用标准GJB、军工行业标准（核EJ、航天QJ、航空HB、船舶CB、兵器WJ、电子SJ）、其他相关行业标准',
                    },
                    {
                        name: '相关标准/需求清单',
                        value: '标准名称、需求名称',
                        proName: '编号/计划编号',
                        company: '相似度',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        proName: '标准/计划号',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        proName: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        proName: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        proName: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        proName: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        proName: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        proName: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        proName: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        proName: 'xxx',
                    },
                    {
                        name: 'ddd3',
                        value: 'mmm',
                        proName: 'xxx',
                    },
                    {
                        name: '图谱',

                    },
                    {
                        name: '备注',

                    },




                ],
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
                        title: '序号',
                        key: 'name',
                        align: 'center',
                        width: 100,
                    },
                    {
                        title: '标准号/计划号',
                        width: 150,
                        align: 'center',
                        key: 'proName',
                    },
                    {
                        title: '标准名称',
                        width: 350,
                        align: 'center',
                        key: 'value',
                    },
                    {
                        title: '主办单位',
                        width: 310,
                        align: 'center',
                        key: 'company',
                    },
                    // {
                    //     title: '主编单位',
                    //     width: 150,
                    //     align: 'center',
                    //     key: 'company',
                    // },
                    {
                        title: '密级',
                        width: 325,
                        align: 'center',
                        key: 'secret'
                    },
                    {
                        title: '相似度',
                        width: 120,
                        align: 'center',
                        key: 'as',
                    },
                ],
                Columns2: [{
                        title: '序号',
                        key: 'name',
                        align: 'center',
                        width: 100,
                    },
                    {
                        title: '标准号/计划号',
                        width: 200,
                        align: 'center',
                        key: 'proName',
                    },
                    {
                        title: '标准名称',
                        width: 300,
                        align: 'center',
                        key: 'value',
                    },
                    {
                        title: '主办单位',
                        width: 120,
                        align: 'center',
                        key: 'company',
                    },
                ],

                countryFlag: false,
                jgFlag: false,
                demandFlag: false,

            };
        },
        watch: {},
        computed: {},
        methods: {
            //表格大概
            handleSpan({
                row,
                column,
                rowIndex,
                columnIndex
            }) {

                if (rowIndex === 0 && columnIndex === 2) {
                    return [1, 6];
                } else if (rowIndex === 0 && columnIndex === 6) {
                    return [0, 0];
                }
                if (rowIndex === 1 && columnIndex === 1) {
                    return [1, 6];
                } else if (rowIndex === 1 && columnIndex === 6) {
                    return [0, 0];
                }

                if (rowIndex === 2 && columnIndex === 1) {
                    return [1, 6];
                } else if (rowIndex === 2 && columnIndex === 6) {
                    return [0, 0];
                }
                if (rowIndex === 14 && columnIndex === 0) {
                    return [1, 6];
                } else if (rowIndex === 14 && columnIndex === 6) {
                    return [0, 0];
                }

                if ((rowIndex === 15 || rowIndex === 16 || rowIndex === 17) && columnIndex === 0) {
                    return [1, 2];
                } else if ((rowIndex === 15 || rowIndex === 16 || rowIndex === 17) && columnIndex === 6) {
                    return [0, 0];
                }
                if (rowIndex === 18 && columnIndex === 0) {
                    return [1, 6];
                } else if (rowIndex === 18 && columnIndex === 6) {
                    return [0, 0];
                }




                if (rowIndex === 0 && columnIndex === 0) {
                    return {
                        rowspan: 2,
                        colspan: 1
                    };
                } else if (rowIndex === 2 && columnIndex === 0) {
                    return {
                        rowspan: 17,
                        colspan: 1
                    };
                }

            },
            handleSpan1({
                row,
                column,
                rowIndex,
                columnIndex
            }) {

                if ((rowIndex === 0 || rowIndex === 14) && columnIndex === 1) {
                    return [1, 6];
                } else if ((rowIndex === 0 || rowIndex === 14) && columnIndex === 6) {
                    return [0, 0];
                }
                if (rowIndex === 1 && columnIndex === 1) {
                    return [1, 2];
                } else if (rowIndex === 1 && columnIndex === 6) {
                    return [0, 0];
                }

                if (rowIndex === 2 && columnIndex === 1) {
                    return [1, 6];
                } else if (rowIndex === 2 && columnIndex === 6) {
                    return [0, 0];
                }

                if (rowIndex === 17 && columnIndex === 0) {
                    return [1, 6];
                } else if (rowIndex === 17 && columnIndex === 6) {
                    return [0, 0];
                }




                if (rowIndex === 3 && columnIndex === 0) {
                    return {
                        rowspan: 11,
                        colspan: 1
                    }
                };
            },
            handleSpan2({
                row,
                column,
                rowIndex,
                columnIndex
            }) {

                if ((rowIndex === 0 || rowIndex === 1 || rowIndex === 2 || rowIndex === 3 || rowIndex === 6 ||
                        rowIndex === 18 ||
                        rowIndex === 19) && columnIndex === 1) {
                    return [1, 4];
                } else if (rowIndex === 0 && columnIndex === 4) {
                    return [0, 0];
                }

                if (rowIndex === 7 && columnIndex === 0) {
                    return {
                        rowspan: 11,
                        colspan: 1
                    }
                };
            },
            // 拼装表格数据 国标
            tableDataHandle(infoData) {
                let tableHeader = [{
                        name: '提出单位填写',
                        proName: '项目名称',
                        value: infoData.proName,

                    },
                    {
                        name: '主要内容',
                        proName: infoData.proContent,

                    },
                    {
                        name: '查询机构填写',
                        proName: '相关标准清单：（根据申请立项单位提出的项目名称和主要内容对现有国家标准、国家军用标准和行业标准进行相关性查询，列出有关标准代号、名称和主编单位）',
                    },
                    {
                        name: '标准/计划号',
                        proName: '标准名称',

                        value: '主办单位',
                        company: '主编单位',
                        secret: '相似度',
                    }
                ]
                let infoArr = infoData.data;
                if (infoArr.length > 10) {
                    infoArr.splice(0, 10);
                }
                let tableContent = []

                for (let index = 0; index < 10; index++) {
                    if (infoArr[index]) {
                        let obj = {};
                        let item = infoArr[index];
                        obj['name'] = item['BZBH']
                        obj['value'] = item['TCDWMC']
                        obj['proName'] = item['BZZWMC']
                        obj['company'] = item['ZBDWMC']
                        obj['secret'] = item['score']
                        tableContent.push(obj);
                    } else {
                        let obj = {};
                        obj['name'] = ''
                        obj['value'] = ''
                        obj['proName'] = ''
                        obj['company'] = ''
                        obj['secret'] = ''
                        tableContent.push(obj);
                    }

                }

                // infoArr.forEach(item => {
                //     let obj = {};
                //     obj['name'] = item['BZBH']
                //     obj['value'] = item['TCDWMC']
                //     obj['company'] = item['TCDWMC']
                //     obj['secret'] = item['MJMC']
                //     tableContent.push(obj);
                // });

                let tablefooter = [{
                        // name: '展示图谱（以查询的需求为中心，以相似度大小为依据展示相关标准/需求，并显示相似度数值）',
                        name: '',


                    },
                    {
                        name: '查询人',
                        proName: '张三',

                        value: '职务职称',
                        company: '高级工程师'

                    },
                    {
                        name: '联系电话',
                        proName: '010-84380000',
                        value: '通信地址',
                        company: '北京市朝阳区京顺路7号'
                    },
                    {
                        name: '审核人',
                        proName: '李四',

                        value: '职务职务',
                        company: '高级工程师'
                    },
                    {
                        name: '查询机构：中国航空综合技术研究所                                    查询日期：' + infoData.queryTime,

                    }
                ]

                let tableData = [...tableHeader, ...tableContent, ...tablefooter];
                this.tableData = tableData;

            },
            tableDataHandle1(infoData) {

                let tableHeader = [{
                        name: '标准名称',
                        proName: infoData.proName,
                        value: '',

                    },
                    {
                        name: '提出单位',
                        proName: '航空综合所',
                        value: '分管单位',
                        company: '航空综合所'

                    },
                    {
                        name: '查询内容',
                        proName: '（请查询关键词及重点领域）关键词：查询范围：国家标准GB、国家军用标准GJB、军工行业标准（核EJ、航天QJ、航空HB、船舶CB、兵器WJ、电子SJ）、其他相关行业标准',
                    },
                    {
                        name: '相关标准清单',
                        proName: '标准/计划号',
                        value: '标准名称',
                        company: '主办单位',
                        secret: '主编单位',
                        as: '相似度'

                    }
                ]
                let infoArr = infoData.data;
                if (infoArr.length > 10) {
                    infoArr.splice(0, 10);
                }
                let tableContent = []

                for (let index = 0; index < 10; index++) {
                    if (infoArr[index]) {
                        let obj = {};
                        let item = infoArr[index];
                        obj['name'] = item['BZBH']
                        obj['value'] = item['TCDWMC']
                        obj['proName'] = item['BZZWMC']
                        obj['company'] = item['ZBDWMC']
                        obj['secret'] = item['score']
                        tableContent.push(obj);
                    } else {
                        let obj = {};
                        // let item=infoArr[index];
                        obj['name'] = ''
                        obj['value'] = ''
                        obj['proName'] = ''
                        obj['company'] = ''
                        obj['secret'] = ''
                        tableContent.push(obj);
                    }

                }

                let tablefooter = [{
                        name: '备注',

                    },
                    {
                        name: '查询人',
                        proName: '张三',
                        value: '职称',
                        company: '高级工程师',
                        secret: '日期',
                        as: infoData.queryTime,
                    },
                    {
                        name: '审核人',
                        proName: '李四',
                        value: '职称',
                        company: '高级工程师',
                        secret: '日期',
                        as: infoData.queryTime,
                    },

                    {
                        name: '查询机构:中国航空综合技术研究所',

                    },

                ]

                let tableData = [...tableHeader, ...tableContent, ...tablefooter];
                this.tableData1 = tableData;



            },

            tableDataHandle2(infoData) {

                let tableHeader = [{
                        name: '需求名称',
                        proName: infoData.proName,

                    },
                    {
                        name: '用途或场景',
                        proName: '多到的',

                    },
                    {
                        name: '存在问题',
                        proName: infoData.problem,
                    },
                    {
                        name: '主要内容',
                        proName: infoData.proContent,



                    },
                    {
                        name: '提出单位',
                        value: '提出人',
                        company: '张三',
                        proName: '中国航空综合技术研究所',
                    },
                    {
                        name: '查询日期',
                        value: '初步建议',
                        company: '建议不立项',
                        proName: infoData.queryTime,
                    },
                    {
                        name: '查询内容',
                        value: 'mmm',
                        company: 'bbb',
                        proName: '关键词：查询范围：国家标准GB、国家军用标准GJB、军工行业标准（核EJ、航天QJ、航空HB、船舶CB、兵器WJ、电子SJ）、其他相关行业标准',
                    },
                    {
                        name: '相关标准/需求清单',
                        value: '标准名称/需求名称',
                        proName: '编号/计划编号',
                        company: '相似度',
                    }
                ]
                let infoArr = infoData.data;
                if (infoArr.length > 10) {
                    infoArr.splice(0, 10);
                }
                let tableContent = []

                for (let index = 0; index < 10; index++) {
                    if (infoArr[index]) {
                        let obj = {};
                        let item = infoArr[index];
                        obj['name'] = item['BZBH']
                        obj['proName'] = item['BZZWMC']
                        obj['company'] = item['score']
                        obj['value'] = item['score']
                        tableContent.push(obj);
                    } else {
                        let obj = {};
                        obj['name'] = ''
                        obj['proName'] = ''
                        obj['company'] = ''
                        obj['value'] = ''
                        tableContent.push(obj);
                    }

                }

                let tablefooter = [{
                        name: '图谱',

                    },
                    {
                        name: '备注',

                    }

                ]

                let tableData = [...tableHeader, ...tableContent, ...tablefooter];
                this.tableData2 = tableData;



            },
            // 查询报告页面打开
            showReport() {
                this.$router.push("/standard/showReport");

            },
            gjReport() {
                this.countryFlag = true;
                this.jgFlag = false;
                this.demandFlag = false;
                this.title = '国家军用标准相关性查询报告单预览'
                this.tableDataHandle(this.allDatas)
            },
            jgReport() {
                this.countryFlag = false;
                this.jgFlag = true;
                this.demandFlag = false;
                this.title = '军工行业标准相关性查询报告单预览'
                this.tableDataHandle1(this.allDatas)


            },
            demandReport() {
                this.countryFlag = false;
                this.jgFlag = false;
                this.demandFlag = true;
                this.title = '需求相关性查询报告单预览'
                this.tableDataHandle2(this.allDatas)



            },
            // 导出excel
            downloadExcel() {
                let infoDatas = this.allDatas;
                let handDatas = infoDatas.data;
                let bzNumArr = [];
                let bzNameArr = [];
                let bzComArr = [];
                let bzComEditArr = [];
                let bzScoreArr = [];
                let bzSecretArr = [];




                for (let index = 0; index < handDatas.length; index++) {
                    const item = handDatas[index];
                    // 标准/计划号数组

                    bzNumArr.push(item.BZBH);
                    // 标准名称
                    bzNameArr.push(item.BZZWMC);
                    // 主办单位
                    bzComArr.push(item.TCDWMC ? item.TCDWMC : '');
                    // 主编单位
                    bzComEditArr.push(item.ZBDWMC ? item.ZBDWMC : '');
                    // 相似度
                    // bzScoreArr.push(item.score);
                    // 密级
                    bzSecretArr.push(item.MJMC);


                }
                let param = {};
                // this.title = '国家军用标准相关性查询报告单';
                // this.title = '军工行业标准相关性查询报告单';
                // this.title = '需求相关性查询报告单';
                if (this.title == '国家军用标准相关性查询报告单预览') {
                    param = {
                        "name": '国家军用标准相关性查询报告单',
                        "提出单位": "航空工业",
                        "编号": "123",
                        "项目名称": infoDatas.proName,
                        "主要内容": infoDatas.proContent,
                        "标准/计划号": bzNumArr,
                        "标准名称": bzNameArr,
                        "主办单位": bzComArr,
                        "主编单位": bzComEditArr,
                        "相似度": bzScoreArr,
                        // "url": "/peiyu_workplace/picture.jpeg",
                        "查询人": '张三',
                        "职务，职称": "高级工程师",
                        "联系电话": "010-84380000",
                        "审核人": '李四',
                        "通信地址": "北京市朝阳区京顺路7号",
                        "职务职称": "高级工程师",
                        "查询机构": "中国航空综合技术研究所",
                        "时间": infoDatas.queryTime.replaceAll('-', '.')
                    };
                } else if (this.title == '军工行业标准相关性查询报告单预览') {
                    param = {
                        "name": '军工行业标准相关性查询报告',
                        "关键词": infoDatas.keywords,
                        "标准名称": infoDatas.proName,
                        "分管单位": "航空工业",
                        "提出单位": "航空工业",
                        "查询内容": infoDatas.proContent,
                        "标准编号/计划号": bzNumArr,
                        "标准名称": bzNameArr,
                        "密级": bzSecretArr,
                        "相似度": bzScoreArr,
                        "查询人": '张三',
                        "审核人": '李四',
                        "备注": "a",
                        "查询人职称": "高级工程师",
                        "审核人职称": "高级工程师",
                        "审核日期": infoDatas.queryTime,
                        "查询日期": infoDatas.queryTime,
                        "查询机构": "中国航空综合技术研究所",
                        "时间": infoDatas.queryTime.replaceAll('-', '.')
                    } 
                    // param={
                    //     "name": "军工行业标准相关性查询报告",
                    //     "关键词": "hhh",
                    //     "标准名称": "航空工业",
                    //     "分管单位": "123",
                    //     "提出单位": "a",
                    //     "查询内容": "aaaaaaaa",
                    //     "标准编号/计划号": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
                    //     "标准名称": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
                    //     "密级": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
                    //     "相似度": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
                    //     "查询人": "tt",
                    //     "审核人": "cc",
                    //     "备注": "a",
                    //     "查询人职称": "b",
                    //     "审核人职称": "184",
                    //     "审核日期": "me",
                    //     "查询日期": "beijing",
                    //     "查询机构": "ddddddd",
                    //     "时间": "2022.4.18"
                    // }
                } else if (this.title == '需求相关性查询报告单预览') {


                    param = {
                        "name": '需求相关性查询报告',
                        "需求名称": infoDatas.proName,
                        "用途或场景": "航空工业",
                        "存在问题": infoDatas.problem,
                        "主要内容": infoDatas.proContent,
                        "提出单位": "航空工业",
                        "提出人": infoDatas.username,
                        "编号/计划编号": bzNumArr,
                        "标准名称/需求名称": bzNameArr,
                        "相似度": bzScoreArr,
                        "查询日期": infoDatas.queryTime,
                        "初步建议": "建议不立项",
                        "关键词": infoDatas.keywords,
                        "查询人职称": "高级工程师",
                        "查询内容": infoDatas.data,
                        "审核日期": infoDatas.queryTime,
                        "查询日期": infoDatas.queryTime,
                        "备注": "ddddddd",
                        "时间": infoDatas.queryTime,
                        "url": '/peiyu_workplace/picture.jpeg'
                    }
                }

                const header = {
                    token: this.$store.state.user.userInfo.token,
                };

                this.axios({
                    url: '/api/baike/save/savefile',
                    method: "post",
                    data: param,
                    responseType: "blob",
                    headers: header,

                }).then((res) => {

                    let blob = new Blob([res.data], {
                        type: 'application/vnd.ms-excel'
                    });
                    let filename = this.title;
                    let downloadElement = document.createElement('a');
                    let href = window.URL.createObjectURL(blob); // 创建下载的链接
                    downloadElement.href = href;
                    downloadElement.download = filename + '.xlsx'; // 下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); // 点击下载
                    document.body.removeChild(downloadElement); // 下载完成移除元素
                    window.URL.revokeObjectURL(href); // 释放blob对象
                });
            }

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

        created() {
            let lastPageData = JSON.parse(this.$route.query.allDatas);
            this.allDatas = lastPageData;
            let reportType = lastPageData.type;
            if (reportType == 'country') {
                this.title = '国家军用标准相关性查询报告单预览';
                this.countryFlag = true;
                this.tableDataHandle(lastPageData);
            } else if (reportType == 'jg') {
                this.title = '军工行业标准相关性查询报告单预览';
                this.jgFlag = true;
                this.tableDataHandle1(lastPageData);

            } else if (reportType == 'demand') {
                this.title = '需求相关性查询报告单预览';

                this.demandFlag = true;

                this.tableDataHandle2(lastPageData);

            }
        },
        mounted() {},
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