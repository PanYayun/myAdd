<template>
    <!--  创建新的体系 -->
    <Modal v-model="modal" :mask-closable="false" :title="creatName" width="800" @on-visible-change="Modal_1_status">
        <div class="wrap" style="width: 500px;">
            <div class="downloadTemplate flex">
                <span>个性知识体系名称：</span>
                <Input style="width:auto;" placeholder="请输入体系名称" v-model="fileName"></Input>
            </div style="height:500px;">

            <div class="system_module">
                <div class="system_module_tabHei">
                    <ul :class="!formChange?'system_module_tab':'system_module_tab disable'">
                        <li @click="activeClick(index,item)" :tabList="tabList" :tabIndex="tabIndex" :key="index"
                            v-for="(item, index) in systemClassify"
                            :class="index == checked_type&&!formChange ? 'active' : ''">
                            {{item.text}}</li>
                    </ul>
                    <Select clearable v-model="treeSearchVal" style="width:66px;" @on-change="moreTree_change"
                        class="select_module_more" placeholder="更多">
                        <Option v-for="item in treeSearchList" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </div>
                <div class="filterInput" style="margin-top: 10px;width: 80%;">
                    <Input prefix="ios-search" v-model="searchName" clearable placeholder="请输入名称"
                        @on-enter="searchTree" />
                </div>
                <div class="system_node" :style="{ height: maxHeight }">
                    <Spin size="large" fix v-if="!treeData"></Spin>
                    <div class="wrap">
                        <div class="search flex">
                        </div>
                        <div class="tree" v-if="treeData">
                            <Spin size="large" fix v-show="spinShow"></Spin>
                            <Tree :data="treeData" :show-checkbox="true" :render="renderContent" checked="true"
                                @on-select-change="treeChange" @on-check-change="checkData" ref="tree" class="scss"
                                v-show="!formChange">
                            </Tree>
                            <Tree :data="treeData" :show-checkbox="true" :render="renderContent1" checked="true"
                                @on-select-change="treeChange" @on-check-change="checkData" ref="tree" class="scss"
                                v-show="formChange">
                            </Tree>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer" style="display: flex;justify-content: flex-end;" v-show="!formChange">
            <Button @click="clearSelect">一键清空</Button>
            <Button type="primary" @click="createKnow">{{creatName}}</Button>
        </div>
        <Modal v-model="modalNode" title="创建提示" @on-ok="diaOk" @on-cancel="diaCancel" class="small_modal">
            <span>
                {{diaContent}}

            </span>
        </Modal>
    </Modal>
</template>

<script>
    import tab from '@/components/tab';
    import axios from 'axios';
    // 基础体系引用
    import {
        construct
    } from "@aximario/json-tree";
    import {
        gjbSearchCondition, //智慧标准体系页—832A和832搜索条件
        gjbSystemList, // 智慧标准体系页—832A和832体系列表
        mirrorTree, //智慧标准体系页—832和832a标准分类树
        searchCondition, // 智慧标准体系页—集团标准体系和国军标搜索条件
        standardTree, //智慧标准体系页—国军标和国家标准体系查询树
        systemList, // 智慧标准体系页—集团标准体系和国军标体系列表
    } from "@/libs/api"; //获取接口
    export default {
        name: 'createSystem',
        inject: ['reload'],
        components: {
            tab,
        },
        data() {
            return {
                // 顶部列表信息
                tabList: [{
                        text: "集团标准体系",
                        treeApi: "standard",
                        classType: 2
                    },
                    {
                        text: "国军标体系",
                        treeApi: "standard",
                        classType: 1
                    },
                    {
                        text: "832A",
                        treeApi: "mirror",
                        classType: 3
                    },
                    {
                        text: "832",
                        treeApi: "mirror",
                        classType: 4
                    },
                ],
                tabIndex: 0, //默认下标
                // 标准体系
                systemClassify: [{
                        text: '集团标准体系',
                        type: 1
                    },
                    {
                        text: '国军标体系',
                        type: 4
                    },
                    {
                        text: '832A',
                        type: 2
                    },
                    {
                        text: '832',
                        type: 3
                    },
                ],
                isCheck: false,

                mainInfo: {}, //最上面的页面数据
                treeData: null, //tab树对应
                oldTreeData: [], //接口原始数据
                demoData: {},
                newSaveTreeData: null, //补充保存新数据，可能有自定义，可能改变层级
                saveTreeData: null, //补充保存原始数据
                treeIds: [], //选择的树的ID
                columns: [], //表头
                dataSource: null, //数据
                total: 0, //表格的页码
                selectedNum: 0, //表格选中的数据的条数
                treeVal: "", // 左侧树的搜索关键字
                searchVal: "", //搜索条件
                tableLoading: true, //loading是否出现
                selectData: {}, //选中的数据
                PpselectData: {}, //父页面操作后补充页面回显的数据
                pPageInitData: [], //补充父页面所有节点数据
                clearState: false, //清空状态
                modalNode: false, //节点为空对话框
                searchName: '', //查询框数据
                currentId: '', //存在查询id
                formChange: false, //纳入按钮点击样式变化
                pageType: '新建',
                treeSearchVal: "", //更多下拉关键字
                treeSearchList: [], //更多的下拉
                naruData: [], //纳入数据
                diaContent: '当前选择节点为空，是否继续创建?', //弹窗内容
                filterName: [], //查重体系名称
                maxHeight: '300',
                checked_type: '0',
                spinShow: true,
                filter: false, //过滤标识
                creatName:'创建知识体系',//弹窗名字


                //   弹窗原有
                modal: false,
                fileName: '', //文件名字
                textName: '',
                file: null,
                paramsVal: {
                    uid: this.$store.state.user.userInfo.username,
                    uToken: this.$store.state.user.userInfo.token,
                    requestSource: 'BZ',
                    requestCode: '90226',
                    requestFuncId: '105',
                }, //上传参数
            };
        },
        methods: {
            //   tab点击联动
            activeClick(index, item) {

                //  设置每次切换的时候保存选择后的数据
                this.checked_type = index;
                this.selectData[this.tabIndex] = this.$refs.tree.getCheckedAndIndeterminateNodes();
                this.sysManagetreeData(index);
                this.tabIndex = index;

            },
            // 获取体系树
            sysManagetreeData(index) {

                const {
                    treeApi,
                    classType
                } = this.tabList[index];
                const url = treeApi == "mirror" ? mirrorTree : standardTree;
                this.$axios(url, "get", {
                    searchQuery: this.treeVal,
                    classType
                }).then(
                    (res) => {
                        const {
                            data
                        } = res;
                        if (res.status != 500 && data) {
                            this.oldTreeData[index] = data;
                            // let aaa = data.slice(0, 3);
                            // this.demoData = aaa;
                            // console.info(aaa,'ooooooo00000')
                            let treeList = this.filterTreeData(data, index);
                            // let treeList = this.filterTreeData(aaa, index);

                            this.oldTreeList = treeList;


                            let selectSystem = null;
                            this.treeData = treeList;
                            this.treeData.forEach((item, index) => {
                                if (item.pId == "0" || item.pId == "-1") {
                                    // item.disabled = true;
                                }
                            });


                        } else {
                            this.$Message.error("获取体系树异常！");
                        }
                    }
                );
            },
            // 筛选树的数据
            filterTreeData(data, index) {
                let conPid = data[0].hasOwnProperty('parentId') ? "parentId" : "pId";
                let result = construct(data, {
                    id: "id",
                    pid: conPid
                });
                const treeData = this.tree(result, index);
                return treeData;
            },
            tree(result, index) {
                let newData = this.deepClone(result);
                // console.info(this.recursionTree(newData), '===========kkkkkk')
                return this.recursionTree(newData, index);
            },
            // 递归树
            recursionTree(data, index) {
                // 回显数据 checked属性被选中
                let existList = this.selectData[index] && this.selectData[index].length != 0 ? this
                    .selectData[index] : false;
                let clearFlag = this.clearState;
                // 补充回显数据
                let currentData = this.treeData;
                if (this.PpselectData[0] && Object.keys(this.selectData).length == 0) {
                    let parPageWrite = this.PpselectData;
                    for (var key in parPageWrite) {
                        this.selectData[key] = parPageWrite[key];
                    }
                }

                let selectDataParam = Object.values(this.PpselectData);
                let selectDataParamArr = [];
                selectDataParam.forEach((item) => {
                    selectDataParamArr = [...selectDataParamArr, ...item];
                })

                data.forEach((item) => {
                    //当前页面切换回显
                    if (existList && !clearFlag) {
                        console.info(data, 'eeeeeeeeeeee');
                        console.info(existList, 'eeeeeeeeeeee333');
                        existList.forEach((item1) => {
                            console.info(item1, 'dddd');
                            if (item1.id == item.id && (!item1.indeterminate)) {
                                item.checked = true;
                            }
                        })
                    } else {
                        item.checked = false;
                    }

                    // 补充回显
                    // if (selectDataParamArr && selectDataParamArr.length != 0) {
                    //     selectDataParamArr.forEach((item2) => {
                    //         console.info(item2, 'dddd');
                    //         if (item2.id == item.id && (!item2.indeterminate)) {
                    //             item.checked = true;
                    //         }
                    //     })
                    // } else {
                    //     // item.checked=false;
                    // }

                    //过滤查询 问题未关联父节点
                    // if (this.searchName != '' && item.name.indexOf(this.searchName) != -1) {
                    //     item.expand = true;
                    //     item.checked = true;
                    //     this.recursionTree(item.children, index);


                    // }


                    let len = item.children && item.children.length > 0;
                    let parId = item.hasOwnProperty('pId') ? item.pId : item.parentId;
                    if (parId == 0 || parId == -1 || parId == null) {
                        item.expand = true;
                    } else {
                        if (!this.filter) {
                            item.expand = false;
                        }

                    }
                    // item.title = item.title ? item.title : (item.name || item.className);
                    item.name = item.name;
                    item.className = item.className;
                    item.classNameNew = item.classNameNew ? item.classNameNew : item.className;
                    //保存原始id pid
                    item.originId = item.id;
                    item.originPid = parId;


                    if (len) {
                        this.recursionTree(item.children, index);
                    }
                });
                return data;
            },
            // 定义一个深拷贝函数  接收目标target参数
            deepClone(target) {
                // 定义一个变量
                let result;
                // 如果当前需要深拷贝的是一个对象的话
                if (typeof target === "object") {
                    // 如果是一个数组的话
                    if (Array.isArray(target)) {
                        result = []; // 将result赋值为一个数组，并且执行遍历
                        for (let i in target) {
                            // 递归克隆数组中的每一项
                            result.push(this.deepClone(target[i]));
                        }
                        // 判断如果当前的值是null的话；直接赋值为null
                    } else if (target === null) {
                        result = null;
                        // 判断如果当前的值是一个RegExp对象的话，直接赋值
                    } else if (target.constructor === RegExp) {
                        result = target;
                    } else {
                        // 否则是普通对象，直接for in循环，递归赋值对象的所有值
                        result = {};
                        for (let i in target) {
                            result[i] = this.deepClone(target[i]);
                        }
                    }
                    // 如果不是对象的话，就是基本数据类型，那么直接赋值
                } else {
                    result = target;
                }
                // 返回最终结果
                return result;
            },
            // 点击数获取父节点
            findParentNode(list, id) {
                const mofifNode = (data, cid) => {
                    for (let i = 0; i < data.length; i++) {
                        let item = data[i];
                        if (item.id == id) {
                            item.selected = true;
                        }
                        if (item.id === cid) {
                            item.expand = true;
                            mofifNode(list, item.pId);
                        } else {
                            if (item.children) {
                                mofifNode(item.children, cid);
                            }
                        }
                    }
                };
                mofifNode(list, id);
            },

            //查找所有的子节点
            findChildIds(data, id, Arr) {
                for (let i = 0; i < data.length; i++) {
                    let len = data[i].children && data[i].children.length > 0;
                    let wid = id;
                    if (data[i].pId == id) {
                        Arr.push(data[i].id);
                        wid = data[i].id;
                    }
                    if (len) {
                        this.findChildIds(data[i].children, wid, Arr);
                    }
                }
                return Arr;
            },
            // 获取树ID
            getTreeIds(data, idArr) {
                data.forEach((item) => {
                    idArr.push(item.id);
                    if (item.children && item.children.length != 0) {
                        this.getTreeIds(item.children, idArr);
                    }
                });
                return idArr;
            },
            // 树的渲染条件
            renderContent(h, {
                root,
                node,
                data
            }) {
                let parId = data.hasOwnProperty('pId') ? data.pId : data.parentId;

                return h(
                    "span", {
                        style: {
                            display: "inline-block",
                            width: "100%",
                        },
                    },
                    [
                        h("span", [
                            h("Icon", {
                                props: {
                                    type: node.children ?
                                        "ios-folder-outline" : "ios-document-outline",
                                },
                                style: {
                                    marginRight: "8px",
                                },
                            }),
                            h("span", (parId == -1 || parId == 0 || parId == null) ? data.classNameNew : data
                                .classNameNew + '(' + data.count + ')'),
                        ]),
                    ]
                );
            },
            // 编辑树的渲染条件
            renderContent1(h, {
                root,
                node,
                data
            }) {
                let parId = data.hasOwnProperty('pId') ? data.pId : data.parentId;

                // 编辑前渲染
                let beforeEdit = h(
                    "span", {
                        style: {
                            display: "inline-block",
                            width: "100%",
                        },
                    },
                    [
                        h("span", [
                            h("Icon", {
                                props: {
                                    type: node.children ?
                                        "ios-folder-outline" : "ios-document-outline",
                                },
                                style: {
                                    marginRight: "8px",
                                },
                            }),
                            h(`${ data.isEdit ? '' : 'span'}`, {
                                    on: {
                                        click: (event) => {
                                            // event.stopPropagation();
                                            // this.oldName = data.className
                                            // this.$set(data, 'isEdit', true);
                                        }
                                    }
                                }, (parId == -1 || parId == 0 || parId == null) ? data.classNameNew : data
                                .classNameNew + '(' + data.count + ')'),
                            // h(`${ data.isEdit ? 'input' : ''}`, {
                            //     attrs: {
                            //         value: `${ data.isEdit ? data.classNameNew : ''}`,
                            //         autofocus: "autofocus"
                            //     },
                            //     style: {
                            //         width: '160px',
                            //         cursor: 'auto',
                            //     },
                            //     on: {
                            //         change: (event) => {
                            //             this.inputContent = event.target.value;
                            //         },
                            //         blur: () => {
                            //             //this.confirmTheChange(data);
                            //         }
                            //     }
                            // }),
                            h('span', [
                                h(`${ data.isEdit ? '' : 'Button'}`, {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'md-checkmark'
                                    }),
                                    style: {
                                        marginRight: '2px',
                                        marginLeft: '10px'
                                    },
                                    on: {
                                        click: () => {
                                            this.append(data)
                                        }
                                    }
                                }),
                                // 确认/取消修改部分
                                // h(`${ data.isEdit ? 'span' : ''}`, {
                                //         style: {
                                //             marginLeft: '5px'
                                //         }
                                //     },
                                //     [
                                //         // 确认按钮
                                //         h('Button', {
                                //             props: Object.assign({}, this.buttonProps, {
                                //                 icon: 'md-checkmark'
                                //             }),
                                //             style: {
                                //                 border: 0,
                                //                 background: 'rgba(0,0,0,0)',
                                //                 fontSize: '5px',
                                //                 outline: "none",
                                //                 lineHeight: 1
                                //             },
                                //             on: {
                                //                 click: (event) => {
                                //                     // this.confirmTheChange(data)
                                //                 }
                                //             }
                                //         }),
                                //         // 取消按钮
                                //         h('Button', {
                                //             props: Object.assign({}, this.buttonProps, {
                                //                 icon: 'md-close'
                                //             }),
                                //             style: {
                                //                 border: '0',
                                //                 background: 'rgba(0,0,0,0)',
                                //                 fontSize: '5px',
                                //                 outline: "none",
                                //                 lineHeight: 1
                                //             },
                                //             on: {
                                //                 click: () => {
                                //                     this.CancelChange(data)
                                //                 }
                                //             }
                                //         })
                                //     ]
                                // )
                            ]),

                        ]),
                    ]);
                return beforeEdit
            },
            append(data) {
                const children = data.children || [];
                //更换整个体系节点 纳入与新建
                if (this.formChange) {
                    this.modalNode = true;
                    this.diaContent = '是否确认纳入保存,保存之后关闭弹窗？'
                    let nodeArr = this.naruData;
                    nodeArr.forEach((item) => {
                        item.pId = data.id;
                        item.parentId = data.id;
                        item.expand = true;
                        item.classNameNew = item.className;
                        item.classNoNew = item.classNo;
                        item.count = 0;
                        children.push(item);
                        this.firstPageInitData.push(item);
                    });
                    //父节点展开
                    data.expand = true;
                    this.$set(data, 'children', children);

                } else {
                    let childObj = {
                        title: 'appended node',
                        expand: true,
                        id: 'append' + (this.appendIndex++),
                        isRecommend: false,
                        name: "appended node(0)",
                        nameOld: 'appended node',
                        pId: data.id,
                        stdNum: "(0)",
                        sysCode: "JTTX",
                    };
                    children.push(childObj);
                    // 树节点结构添加
                    // 树节点数组添加
                    this.csSelectTreeData['append'].push(childObj);
                    //父节点展开
                    data.expand = true;
                    this.$set(data, 'children', children);
                }


            },
            nodeSave() {
                //数据下发
                let submitDatas = this.treeData;

                let handleData = this.firstPageInitData;
                let handleDataArr = [];
                let username = this.$store.state.user.userInfo.username;
                let txname = this.fileName;
                handleData.forEach((item) => {
                    item.stdUserPin = username;
                    item.stdTxName = txname;
                    let {
                        children,
                        ...params
                    } = item
                    handleDataArr.push(params);
                });

                handleDataArr = JSON.stringify(handleDataArr);
                console.log(handleDataArr, '-------------oooo')

                // 添加请求头
                let param = new FormData(); // 创建form对象
                param.append('stdTxEntities', handleDataArr); // 通过append向form对象添加数据
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                };
                axios
                    .post('/personality/baike/standServer/save', param, config)
                    .then(res => {
                        if (res.data.msg == "SUCCESS") {
                            this.$Message.success('保存成功');
                            this.modal = false;
                            let nodeSaveFlag = {};
                            nodeSaveFlag['nodeSaveName'] = txname;
                            this.$emit('sendTreeData', nodeSaveFlag)

                        } else {
                            this.$Message.error(res.data.msg);
                        }
                    });
            },
            // 树的值改变
            treeChange(data) {
                if (data.length != 0) {
                    this.treeIds = this.getTreeIds(data, []);
                    this.tableLoading = true;
                    this.treeData.forEach((item, index) => {
                        if (item.pId == "0" || item.pId == "-1") {
                            item.disabled = true;
                        }
                    });
                }
            },
            // 选中复选框
            checkData(arr, node) {
                console.info(this.clearState, '-----')

                console.info(this, '-----')
                if (arr.length != 0) {
                    //  设置每次切换的时候保存选择后的数据
                    this.selectData[this.tabIndex] = this.$refs.tree.getCheckedAndIndeterminateNodes();
                }
                let selectDatas = Object.values(this.selectData);
                if (arr.length != 0 && selectDatas.length != 0) {
                    this.clearState = false;
                }

            },
            handleSuccess(res, file) {
                this.textName = file.name;
                this.$Message.destroy();
                this.$Message.success({
                    content: '文件上传成功！',
                    background: true,
                    duration: 3,
                });
            },
            upload_error(error, file, fileList) {
                setTimeout(() => {
                    this.$Notice.error({
                        title: '文件上传失败！',
                        desc: `当前上传文件为${fileList.name}，请上传正确的文件！`,
                        duration: 6,
                    });
                }, 200);
            },
            editFile() {
                this.file = '';
                this.textName = '';
                this.fileName = '';
            },
            // 下载
            downBtn() {
                //下载参数
                this.axios({
                    url: '/personality/baike/standServer/requestData',
                    method: 'get',
                    params: {
                        uid: this.$store.state.user.userInfo.username,
                        uToken: this.$store.state.user.userInfo.token,
                        requestSource: 'BZ',
                        requestCode: '90226',
                        requestFuncId: '104',
                    },
                    responseType: 'blob',
                }).then(res => {
                    // application/x-xlsx
                    // application/vnd.ms-excel
                    let blob = new Blob([res.data], {
                        type: 'application/vnd.ms-excel'
                    });
                    let downloadElement = document.createElement('a');
                    let href = window.URL.createObjectURL(blob); // 创建下载的链接
                    downloadElement.href = href;
                    let fileName = res.headers['content-disposition'].substring(
                        res.headers['content-disposition'].indexOf('fileName=') + 9,
                        res.headers['content-disposition'].length
                    );
                    downloadElement.download = decodeURIComponent(fileName); // 下载后文件名
                    document.body.appendChild(downloadElement);
                    downloadElement.click(); // 点击下载
                    document.body.removeChild(downloadElement); // 下载完成移除元素
                    window.URL.revokeObjectURL(href); // 释放blob对象
                });
            },
            navChange(index) {
                this.tabIndex = index;
            },
            showModal(type, data) {

                this.modal = true;
                this.pageType = type;
                this.filterName = data.treeNameArr;
                if (data && type == "补充") {
                    this.creatName='补充知识体系';
                    this.formChange = false;

                    this.spinShow = false;
                    // 父页面操作节点后所有树节点的结构
                    this.newSaveTreeData = data.treeData;
                    //子页面关闭时传的无根节点的所有选中节点数组，以备复选使用
                    this.saveTreeData = data.noRootTreeData;
                    //回显体系名称 应该禁用
                    this.fileName = this.newSaveTreeData[0].classNameNew ? this.newSaveTreeData[0].className : data
                        .classNameNew;
                    // 父页面操作节点后所有树节点的数组

                    this.PpselectData = data.csSelectTreeData;
                    this.pPageInitData = data.firstPageInitData;

                    this.saveTreeData = [];
                    this.selectData = {};
                    //补充回显数据
                    // let currentData = this.treeData;
                    // let selectDataParam = this.saveTreeData;
                    this.sysManagetreeData(this.tabIndex);
                    this.$axios("/baike/standServer/treeName", "post", {
                        uid: this.$store.state.user.userInfo.username
                    }).then((res) => {
                        this.treeSearchList = res.data.data.map((item) => {
                            return {
                                value: item.txName,
                                label: item.txName,
                                id: item.id
                            };
                        });
                        console.info(this.treeSearchList, 'jjjjj')


                    });
                }
                if (type == '新建') {
                    this.creatName='创建知识体系';

                    this.formChange = false;

                    this.saveTreeData = [];
                    this.selectData = {};
                    this.searchName = '';
                    this.spinShow = false;
                    this.sysManagetreeData(this.tabIndex);
                    this.$axios("/baike/standServer/treeName", "post", {
                        uid: this.$store.state.user.userInfo.username
                    }).then((res) => {
                        this.treeSearchList = res.data.data.map((item) => {
                            return {
                                value: item.txName,
                                label: item.txName,
                                id: item.id
                            };
                        });
                        let chooseData = this.treeSearchList[0].label;
                        this.treeSearchVal = chooseData;

                    });

                }
                if (type == '纳入') {
                    this.creatName='纳入知识体系';

                    this.formChange = true;
                    this.naruData = data.naruData;
                    this.treeData = [];
                    //纳入 页面更多下拉请求
                    // 获取已存在知识体系名称
                    this.$axios("/baike/standServer/treeName", "post", {
                        uid: this.$store.state.user.userInfo.username
                    }).then((res) => {
                        this.treeSearchList = res.data.data.map((item) => {
                            return {
                                value: item.txName,
                                label: item.txName,
                                id: item.id
                            };
                        });
                        console.info(this.treeSearchList, 'jjjjj')
                        let chooseData = this.treeSearchList[0].label;
                        this.treeSearchVal = chooseData;

                        // 更多展示树
                        this.moreTree_change(chooseData)

                    });
                }


            },
            // 初始化体系树选择
            moreTree_change(chooseData) {
                this.tabIndex = 5;
                this.spinShow = true;
                // 是否选择已存在的知识体系树
                this.$axios("/baike/standServer/tree1", "post", {
                        uid: this.$store.state.user.userInfo.username,
                        txName: this.treeSearchVal
                    })
                    .then((res) => {
                        let Tree_data = res.data.data;
                        this.firstPageInitData = Tree_data;

                        let Tree_list = this.filterTreeData(Tree_data);
                        console.info(this.firstPageInitData, 'lllll')
                        //根节点不选
                        this.treeData = Tree_list;
                        if (this.formChange) {
                            this.fileName = this.treeSearchVal;
                        }
                        this.spinShow = false;
                    })
                    .catch((err) => {

                        this.treeData = [];
                    });
            },
            // 节点为空对话框确认继续创建
            diaOk() {
                if (this.formChange) {
                    this.nodeSave()
                } else {
                    this.examName();

                }
            },
            diaCancel() {
                this.modalNode = false;

            },
            // 检测体系名称与传递数据
            examName() {

                if (!this.fileName) {
                    this.$Message.destroy();
                    this.$Message.warning({
                        content: '请输入体系名称！',
                        background: true,
                        duration: 3,
                    });
                    return;
                } else {
                    let rootName = this.fileName;
                    if (this.filterName.indexOf(rootName) != -1 && this.pageType == "新建") {
                        this.$Message.warning({
                            content: '体系名称重复，请修改！',
                            background: true,
                            duration: 3,
                        });
                        return;
                    }
                    let allSelect = this.selectData;
                    let arrSelect = Object.values(allSelect); //选中数组

                    let PpselectData = this.PpselectData['append']; //父页面操作后所有节点
                    let pageType = this.pageType;





                    // 将所有节点合在一起
                    let oldTreeList = [];
                    let newTreeList = [];
                    let newSelInterDataArr = [];


                    if (pageType == '补充') { //已选择知识体系，弹出页面无回显的补充
                        let existRootNode;
                        let parIdExist = [];

                        // 原始id与父id
                        let oldIdExist = [];
                        let oldParIdExist = [];
                        let oldParIdNameExist = [];





                        console.info(this.pPageInitData, '==========iiii')
                        //父页面选中
                        this.pPageInitData.forEach((item) => {
                            newTreeList.push(item);
                            let parId = item.hasOwnProperty('pId') ? item.pId : item.parentId;
                            if (parId == 0 || parId == null) {
                                existRootNode = item.id
                            }
                            parIdExist.push(item.id);
                            // 原始id与父id
                            oldIdExist.push(item.originId);
                            oldParIdExist.push(Number(item.originPid));
                            oldParIdNameExist.push(item.className);
                        });
                        for (let index = 0; index < arrSelect.length; index++) {
                            const arrSelect1 = arrSelect[index];
                            arrSelect1.forEach((item) => {
                                let parId = item.hasOwnProperty('pId') ? item.pId : item.parentId;
                                if (pageType == '补充' && (parId == 0 || parId == -1 || parId == null)) { //父页面id
                                    item.pId = existRootNode;
                                    item.parentId = existRootNode;
                                    item.select = false;

                                }
                                if (pageType == '补充' && !(parId == 0 || parId == -1 || parId == null)) { //父页面id
                                    item.parentId = item.pId;
                                }
                                newTreeList.forEach((item1) => {
                                    if (item1.id == item.id && item.hasOwnProperty("children") && item
                                        .children.length > 0) {
                                        item1.children = item.children;
                                    }

                                });
                                //是否已存在id 重复的不要 
                                // if (parIdExist.indexOf(item.id) == -1) {//未保存补充  id未变的情况
                                //     newTreeList.push(item);
                                // }
                                if (oldIdExist.indexOf(item.id) == -1) { //id与父页面原始id没有重复的  
                                    let parId1 = item.originPid;
                                    let parIdname = item.className;

                                    if (oldParIdExist.indexOf(parId1) == -1 || oldParIdNameExist.indexOf(
                                            parIdname) == -1) { //父id与原始id没有重复的
                                        this.pPageInitData.forEach((item3) => {
                                            let itemPid3 = item3.hasOwnProperty('pId') ? item3.pId :
                                                item3
                                                .parentId;

                                            let itemId3 = item3.id;
                                            if (Number(item3.originId) == parId1) {
                                                item.pId = itemId3;
                                                item.parentId = itemId3;
                                            }
                                        });
                                        newTreeList.push(item);
                                    } else { //父id与原始id有重复的
                                        item.hasOwnProperty('pId') ? item.pId = item.originPid : item.parentId =
                                            item.originId;
                                    }
                                } else { //id与父页面原始id有重复的 
                                }


                            });

                        }
                        // 合并id
                        // newTreeList.forEach((itemId) => {
                        //     newTreeListId.push(itemId.id);
                        // });
                        // newTreeList.forEach((item, index) => {
                        //     let parId = item.hasOwnProperty('pId') ? item.pId : item.parentId;
                        //     // 节点数处理
                        //     let childs = item.children;
                        //     let childLen = 0;
                        //     if (childs && childs.length != 0) {
                        //         childs.forEach((item1, index) => {
                        //             let parId1 = item1.hasOwnProperty('pId') ? item1.pId : item1
                        //                 .parentId;
                        //             if (parId1 == item.id && newTreeListId.indexOf(item1.id) != -1) {
                        //                 item.count = 0;
                        //                 item = this.recursionCount(item, childLen, item, newTreeListId);


                        //             }
                        //         });
                        //     } else {
                        //         item.count = childLen;
                        //         if (parId == 0 || parId == -1 || parId == null) {
                        //             item.title = item.className + "(" + item.count + ")";
                        //         } else {
                        //             item.title = item.classNo + " " + item.className + "(" + item.count + ")";
                        //         }
                        //         item.name = item.title;
                        //     }
                        // });
                        // 本页面选择
                        // arrSelect[0].forEach((item) => {
                        //     let parId = item.hasOwnProperty('pId') ? item.pId : item.parentId;
                        //     if (pageType == '补充' && (parId == 0 || parId == -1 || parId == null)) { //父页面id
                        //         item.pId = existRootNode;
                        //         item.parentId = existRootNode;
                        //         item.select = false;
                        //     }
                        //     if (pageType == '补充' && !(parId == 0 || parId == -1 || parId == null)) { //父页面id
                        //         item.parentId = item.pId;
                        //     }
                        //     newTreeList.forEach((item1) => {
                        //         if(item1.id==item.id&&item.hasOwnProperty("children")&&item.children.length>0){
                        //             item1.children=item.children;
                        //         }

                        //     });
                        //     if (parIdExist.indexOf(item.id) == -1) {
                        //         newTreeList.push(item);
                        //     }

                        // });
                        // let newTreeListId = [];
                        // newTreeList.forEach((itemId) => {
                        //     newTreeListId.push(itemId.id);
                        // });
                        // newTreeList.forEach((item, index) => {
                        //     let parId = item.hasOwnProperty('pId') ? item.pId : item.parentId;
                        //     // 节点数处理
                        //     let childs = item.children;
                        //     let childLen = 0;
                        //     if (childs && childs.length != 0) {
                        //         childs.forEach((item1, index) => {
                        //             let parId1 = item1.hasOwnProperty('pId') ? item1.pId : item1
                        //                 .parentId;
                        //             if (parId1 == item.id && newTreeListId.indexOf(item1.id) != -1) {
                        //                 item.count = 0;
                        //                 item = this.recursionCount(item, childLen, item, newTreeListId);


                        //             }
                        //         });
                        //     } else {
                        //         item.count = childLen;
                        //         if (parId == 0 || parId == -1 || parId == null) {
                        //             item.title = item.className + "(" + item.count + ")";
                        //         } else {
                        //             item.title = item.classNo + " " + item.className + "(" + item.count + ")";
                        //         }
                        //         item.name = item.title;
                        //     }
                        // });

                        // 点击补充 两页面合在一起处理
                        newTreeList.forEach((item, index) => {
                            let {
                                children,
                                ...params
                            } = item
                            console.log(params, '-------------oooo')
                            newSelInterDataArr.push(params);

                        });
                    } else if (pageType == '新建') {

                        arrSelect.forEach((item) => {
                            newTreeList = [...newTreeList, ...item];
                        });
                        // 所有当前选择节点合并
                        let newSelInterData = [];
                        let interData = this.oldTreeData;
                        let interDataArr = [];
                        let newTreeListId = [];


                        interData.forEach((item) => {

                            interDataArr = [...interDataArr, ...item];

                        });
                        newTreeList.forEach((itemId) => {
                            newTreeListId.push(itemId.id);
                        });
                        // 新旧对比
                        newTreeList.forEach((item, index) => {
                            let parId = item.hasOwnProperty('pId') ? item.pId : item.parentId;
                            if (parId == 0 || parId == -1 || parId == null) {
                                item['pId'] = rootName;
                                item['parentId'] = rootName;
                            } else {
                                item['pId'] = item['pId'] ? item['pId'] : item['parentId'];
                                item['parentId'] = item['pId'] ? item['pId'] : item['parentId'];
                            }
                            // // 节点数处理
                            // let childs = item.children;
                            // let childLen = 0;
                            // if (childs && childs.length != 0) {
                            //     childs.forEach((item1, index) => {
                            //         let parId1 = item1.hasOwnProperty('pId') ? item1.pId : item1
                            //             .parentId;
                            //         if (parId1 == item.id && newTreeListId.indexOf(item1.id) != -1) {
                            //             item.count = 0;
                            //             item = this.recursionCount(item, childLen, item, newTreeListId);


                            //         }
                            //     });
                            // } else {
                            //     item.count = childLen;
                            //     item.title = item.classNo + " " + item.className + "(" + item.count + ")";
                            //     item.name = item.title;
                            // }


                            item.children = [];

                            newSelInterData.push(item);
                        });

                        // 改变源对象的值，元素增多，循环删除
                        newSelInterData.forEach((item, index) => {
                            let {
                                children,
                                ...params
                            } = item
                            console.log(params, '-------------oooo')
                            newSelInterDataArr.push(params);

                        });
                        //新建根节点
                        let allNodeLen = newSelInterDataArr.length;
                        // let newRoot1 = {
                        //     id: rootName,
                        //     isRecommend: false,
                        //     name: rootName + "(" + allNodeLen + ")",
                        //     nameOld: rootName,
                        //     pId: 0,
                        //     stdNum: "(" + allNodeLen + ")",
                        //     sysCode: "JTTX",
                        //     title: rootName + "(" + allNodeLen + ")",
                        //     className: rootName,
                        //     count: allNodeLen
                        // };
                        let newRoot1 = {
                            id: rootName,
                            isRecommend: false,
                            name: rootName,
                            nameOld: rootName,
                            pId: 0,
                            stdNum: "",
                            sysCode: "JTTX",
                            title: rootName,
                            className: rootName,
                            count: allNodeLen,
                        };
                        newSelInterDataArr.unshift(newRoot1);

                    }

                    // 两页面合在一起




                    let treeListAll = {};
                    treeListAll['newTreeList'] = newTreeList;
                    treeListAll['oldTreeList'] = oldTreeList; //list是递归后未filter的数据
                    treeListAll['oldTreeData'] = this.oldTreeData; //data是接口请求回来的数据
                    treeListAll['selectTreeData'] = this.selectData; //data是被选中的数据
                    treeListAll['newSelInterData'] = newSelInterDataArr; //data是被选中的数据



                    this.$emit('sendTreeData', treeListAll)
                    this.modal = false;
                }
            },
            // 递归处理节点数
            recursionCount(par, childLen, rootIt, newTreeListId) {
                let childs = par.children;
                let parId = par.id; //父id

                childs.forEach((item) => {
                    let childPid = item.hasOwnProperty('pId') ? item.pId : item.parentId;
                    let childId = item.id;

                    if (parId == childPid && newTreeListId.indexOf(childId) != -1) {
                        rootIt.count++;

                        if (item.children && item.children.length > 0) {
                            this.recursionCount(item, childLen, rootIt, newTreeListId);
                        }
                        // if (!item.children && item.children.length == 0) {
                        //     stopCir=true;
                        // }
                    }
                });
                // if(stopCir){
                // rootIt.count = childLen;
                let rootItPid = rootIt.hasOwnProperty('pId') ? rootIt.pId : rootIt.parentId;
                if (rootItPid == 0 || rootItPid == -1 || rootItPid == null) {
                    rootIt.title = rootIt.className + "(" + rootIt.count + ")";
                } else {
                    rootIt.title = rootIt.classNo + " " + rootIt.className + "(" + rootIt.count + ")";
                }
                rootIt.name = rootIt.title;
                // }

                return rootIt;

            },

            // 创建知识体系
            createKnow() {
                // 已选择节点数据 获取
                this.selectData[this.tabIndex] = this.$refs.tree.getCheckedAndIndeterminateNodes();

                let selectDatas = Object.values(this.selectData);
                let selectLen = [];
                selectDatas.forEach((item) => {
                    selectLen = [...selectLen, ...item]
                });
                //节点为空提示
                if (selectLen == 0) {
                    this.modalNode = true;
                } else {
                    this.examName();
                }
                // 继续数据重组
                // 体系名称


                // this.$axios('/baike/standServer/requestData', 'get', {
                //     uid: this.$store.state.user.userInfo.username,
                //     uToken: this.$store.state.user.userInfo.token,
                //     requestSource: 'BZ',
                //     requestCode: '90226',
                //     requestFuncId: '101',
                //     requestParams: {
                //         // 文件名
                //         fileName: this.textName,
                //         // 体系名
                //         txName: this.fileName,
                //         Timestamp: Date.parse(new Date()) / 1000,
                //     },
                //     requestTime: Date.parse(new Date()) / 1000,
                // }).then(res => {
                //     setTimeout(() => {
                //         this.$Message.destroy();
                //         this.$Message.success({
                //             content: '体系树新增成功！',
                //             background: true,
                //             duration: 3,
                //         });
                //         this.editFile();
                //         this.modal = false;
                //         this.reload();
                //     }, 200);
                // });

            },
            // 一键清空
            clearSelect() {
                // 当前在第几个页面
                // 页面清空
                let index = this.tabIndex;
                this.clearState = true;
                this.sysManagetreeData(index);
                // 数据清空
                this.selectData = {};

            },
            // 过滤查询数据
            searchTree() {
                // this.sysManagetreeData(this.tabIndex);
                let exist = false;
                let treeDataRaw = this.oldTreeData[this.tabIndex];
                // 重置选中
                treeDataRaw.forEach((item) => {
                    item.selected = false;
                });
                let handTreeData = [];
                this.filter = true;
                for (var i = 0; i < treeDataRaw.length; i++) {
                    if (treeDataRaw[i].className.indexOf(this.searchName) != -1) {
                        //在树中存在
                        exist = true;
                        this.currentId = treeDataRaw[i].id;


                        let treeDataArr = this.fineCurrentIdRecursive(treeDataRaw);
                        treeDataArr.forEach((item) => {
                            let {
                                children,
                                ...params
                            } = item
                            handTreeData.push(params);
                        });
                        this.treeData = this.filterTreeData(handTreeData, this.tabIndex);
                        break;
                    } else if (!exist && i === treeDataRaw.length - 1) {
                        //在树中不存在
                        this.$Message.error("无搜索结果");
                    }
                }

                this.filter = false;


            },
            //通过节点id选中树中节点并展开它的父节点-递归方式
            fineCurrentIdRecursive(list) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].id === this.currentId) {
                        list[i].selected = true; //如果节点id等于currentId，则选中该节点
                        // break;
                    } else {
                        if (list[i].children && list[i].children.length > 0) {
                            list[i].children = this.fineCurrentIdRecursive(list[i].children); //找不到想要的节点则继续找孩子的（递归）
                            for (var j = 0; j < list[i].children.length; j++) {
                                if (list[i].children[j].selected || list[i].children[j].expand) {
                                    list[i].expand = true; //如果子节点（末端节点）选中或者子节点（非末端节点）展开，则展开该子节点的父节点
                                    break;
                                } else {
                                    // list[i].expand = false;
                                    // list[i].selected = false;
                                    // break;
                                }
                            }
                        }
                    }
                }
                return list;
            },


            Modal_1_status(status) {
                if (status) {} else {
                    setTimeout(() => {
                        this.editFile();
                    }, 200);
                }
            },
        },
        mounted() {


            // 获取树 新建
            this.sysManagetreeData(this.tabIndex);




        },
    };
</script>

<style scoped lang="less">
    /* .modal{ */
    /deep/ .ivu-modal-content {
        height: 630px;

    }

    /deep/ .ivu-modal-body {
        height: 525px;
    }

    .small_modal {
        /deep/ .ivu-modal-content {
            height: 200px;

        }

        /deep/ .ivu-modal-body {
            height: 96px;
        }

    }

    /* } */
    /* tab样式 */
    .system_module {
        width: 100%;
        /* height: 400px; */
        background: #ffffff;
        margin-bottom: 10px;
        /* padding: 0 20px; */
        padding-bottom: 20px;
        box-sizing: border-box;

        .system_module_tabHei {
            height: 40px;
        }
    }

    .system_node {
        /* width: 300px; */
        /* min-height: calc(100vh - 250px); */
        background: white;
        overflow: auto;
        /* float: left; */
        position: relative;
        height: 364px;
        overflow-y: scroll;

        .wrap {
            padding: 0px 16px;
            margin-bottom: 20px;
        }

        .search {
            margin-top: 20px;

            .system_btn {
                margin-left: 6px;
            }
        }

        .tree {
            overflow: auto;
        }
    }

    .system_module_tab {
        float: left;
        display: flex;
        width: 80%;
        justify-content: space-between;
        line-height: 40px;
        height: 40px;
        border-bottom: 1px solid #e5e5e5;

        .active {
            border-bottom: 2px solid #3388ff;
        }

    }

    .disable {
        background-color: #e5e5e5;
        pointer-events: none;
        opacity: 0.5;
    }

    .select_module_more {
        /deep/ .ivu-select-selection {
            border: none;
            box-shadow: none;
            height: 40px;
            line-height: 40px;

        }

        /deep/ .ivu-select-arrow {
            top: 40%;

        }


        /deep/ .ivu-select-single .ivu-select-selection .ivu-select-placeholder,
        /deep/ .ivu-select-single .ivu-select-selection .ivu-select-selected-value {
            height: 40px;
            line-height: 40px;
            color: #515a6e;
        }

        /deep/ .ivu-select-placeholder {
            height: 40px;
            line-height: 40px;
            color: #515a6e;
        }

        float: right;
    }

    .system_module_tab>li {
        cursor: pointer;
    }

    .system_module_cont {
        overflow: hidden;
        padding-top: 20px;
    }

    .system_module_cont>div {
        margin-top: 10px;
        cursor: pointer;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .system_module_cont>div:nth-child(1) {
        margin-top: 0;
    }

    /* 原有页面样式 */
    .flex {
        display: flex;
    }

    .box_l {
        flex: 1;
        border: 1px solid #ececec;
        padding: 0 10px;
        box-sizing: border-box;
        width: 200px;
        height: 32px;
        line-height: 32px;
    }

    .wrap {
        margin: 0 auto;

        .downloadTemplate {
            margin: 13px 0px;
            align-items: center;

            span {
                float: left;
                width: 126px;
            }
        }
    }
</style>