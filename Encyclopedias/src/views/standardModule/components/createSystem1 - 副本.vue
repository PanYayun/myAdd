<template>
    <!--  创建新的体系 -->
    <Modal v-model="modal" :mask-closable="false" title="创建新的体系" width="800" @on-visible-change="Modal_1_status">
        <div class="wrap" style="width: 500px;">
            <div class="downloadTemplate flex">
                <span>个性知识体系名称：</span>
                <Input style="width:auto;" placeholder="请输入体系名称" v-model="fileName"></Input>
            </div>
            <!-- <div class="downloadTemplate flex">
                <span>模板下载：</span>
                <Button @click="downBtn()" type="primary" style="width: 60px;height:32px;">下载</Button>
            </div> -->

            <!-- <div style="display:flex">
                <div class="box_l">{{ textName }}</div>
                <Upload style="margin-left:10px;" accept=".xlsx" :show-upload-list="false" :data="paramsVal" :on-success="handleSuccess" :on-error="upload_error" action="/personality/baike/standServer/requestDataSenior">
                    <Button>上传</Button>
                </Upload>
                <Button type="primary" style="margin-left: 10px;" @click="editFile()">
                    撤销
                </Button>
            </div> -->
            <div class="system_module">
                <div class="system_module_tabHei">
                    <ul class="system_module_tab">
                        <li @click="activeClick(index,item)" :tabList="tabList" :tabIndex="tabIndex" :key="index"
                            v-for="(item, index) in systemClassify" :class="index == checked_type ? 'active' : ''">
                            {{item.text}}</li>
                    </ul>
                    <Select clearable v-model="treeSearchVal" style="width:66px;" @on-change="tree_change"
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
                            <Tree :data="treeData" :show-checkbox="true" :render="renderContent" checked="true"
                                @on-select-change="treeChange" @on-check-change="checkData" ref="tree" class="scss">
                            </Tree>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer" style="display: flex;justify-content: flex-end;">
            <Button @click="clearSelect">一键清空</Button>
            <Button type="primary" @click="createKnow">创建知识体系</Button>
        </div>
        <Modal v-model="modalNode" title="创建提示" @on-ok="diaOk" @on-cancel="diaCancel">
            <span>
                当前选择节点为空，是否继续创建?
            </span>
        </Modal>
    </Modal>
</template>

<script>
    import tab from '@/components/tab';
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
                oldTreeData: null,
                newSaveTreeData:null,//补充保存新数据，可能有自定义，可能改变层级
                saveTreeData:null,//补充保存原始数据
                treeIds: [], //选择的树的ID
                columns: [], //表头
                dataSource: null, //数据
                total: 0, //表格的页码
                selectedNum: 0, //表格选中的数据的条数
                treeVal: "", // 左侧树的搜索关键字
                searchVal: "", //搜索条件
                tableLoading: true, //loading是否出现
                selectData: {}, //选中的数据
                clearState: false, //清空状态
                modalNode: false, //节点为空对话框
                searchName: '', //查询框数据
                currentId: new Set(), //存在查询id


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
                this.selectData[this.tabIndex] = this.$refs.tree.getCheckedNodes();
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
                            this.oldTreeData = data;
                            let treeList = this.filterTreeData(data, index);

                            let selectSystem = null;
                            this.treeData = treeList;
                            this.treeData.forEach((item, index) => {
                                if (item.pId == "0" || item.pId == "-1") {
                                    item.disabled = true;
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
                let result = construct(data, {
                    id: "id",
                    pid: "pId"
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
                let currentData=this.treeData;
                let selectDataParam=this.saveTreeData;
                
                data.forEach((item) => {
                    //当前页面切换回显
                    if (existList && !clearFlag) {
                        console.info(data, 'eeeeeeeeeeee');
                        console.info(existList, 'eeeeeeeeeeee333');
                        existList.forEach((item1) => {
                            console.info(item1, 'dddd');
                            if (item1.name == item.name) {
                                item.checked = true;
                            }
                        })
                    }

                    // 补充回显
                    if(selectDataParam&&selectDataParam.length!=0){
                        selectDataParam.forEach((item2) => {
                            console.info(item2, 'dddd');
                            if (item2.name == item.name) {
                                item.checked = true;
                            }
                        })

                    }
                    // console.info(this.searchName,'iiiii')

                    //过滤查询 问题未关联父节点
                    if (this.searchName != '' && item.name.indexOf(this.searchName) != -1) {
                        item.expand = true;
                        item.checked = true;
                        // for (var j = 0; j < item.children.length; j++) {
                        //     if (item.children[j].selected || item.children[j].expand) {
                        //         item.expand = true; //如果子节点（末端节点）选中或者子节点（非末端节点）展开，则展开该子节点的父节点
                        //         break;
                        //     }
                        // }
                    } else {
                        item.expand = false;
                        item.checked = false;
                    }


                    let len = item.children && item.children.length > 0;
                    if (item.pId == 0 || item.pId == -1) {
                        item.expand = true;
                    }
                    item.title = item.name;
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
                            h("span", data.title),
                        ]),
                    ]
                );
            },
            // 树的值改变
            treeChange(data) {
                if (data.length != 0) {
                    this.treeIds = this.getTreeIds(data, []);
                    this.resetParameter();
                    this.tableLoading = true;
                    this.listDictData();
                    // this.treeData[0].disabled = true;
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
                    this.selectData[this.tabIndex] = this.$refs.tree.getCheckedNodes();
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
            showModal(data) {
                this.modal = true;
                if(data){
                    this.newSaveTreeData=data.treeData;
                    // this.saveTreeData=data.oldTreeData;
                    this.saveTreeData=data.noRootTreeData;
                      //补充回显数据
                      let currentData=this.treeData;
                      let selectDataParam=this.saveTreeData;
                      this.sysManagetreeData(this.tabIndex);
                }
              

            },
            // 节点为空对话框确认继续创建
            diaOk() {
                this.examName();
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
                    let allSelect = this.selectData;
                    let arrSelect = Object.values(allSelect); //数组
                    // 根节点初始
                    let newRoot1 = {
                        id: rootName,
                        isRecommend: false,
                        name: rootName + "(778)",
                        nameOld: rootName,
                        pId: 0,
                        stdNum: "(778)",
                        sysCode: "JTTX",
                    }
                    //其他选择基础pid改变
                    arrSelect.forEach((item) => {
                        item[0]['pId'] = rootName;
                    });
                    // 将所有节点合在一起
                    let oldTreeList=[];
                    let newTreeList = [];
                    arrSelect.forEach((item) => {
                        newTreeList = [...newTreeList, ...item];
                        oldTreeList = [...newTreeList, ...item];
                    });
                    newTreeList.unshift(newRoot1);
                    //重组树形需要的结构
                    let treeListAll={};
                    

                    let newTreeList1 = this.filterTreeData(newTreeList, 8);
                    treeListAll['newTreeList1']=newTreeList1;
                    treeListAll['oldTreeList']=oldTreeList;
                    this.$emit('sendTreeData', treeListAll)
                    this.modal = false;

                }
            },
            // 创建知识体系
            createKnow() {
                // 已选择节点数据 获取
                this.selectData[this.tabIndex] = this.$refs.tree.getCheckedNodes();

                let selectDatas = Object.values(this.selectData);
                let selectLen = selectDatas.length;
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

                this.sysManagetreeData(this.tabIndex);
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
            this.createSys
            this.editFile();
            // 获取树
            this.sysManagetreeData(this.tabIndex);

        },
    };
</script>

<style scoped lang="less">
    /* tab样式 */
    .system_module {
        width: 100%;
        height: auto;
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
        width: 300px;
        min-height: calc(100vh - 250px);
        background: white;
        overflow: auto;
        /* float: left; */
        position: relative;

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

    .select_module_more {
        /deep/ .ivu-select-selection {
            border: none;
            box-shadow: none;
            height: 40px;
            line-height: 40px;

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