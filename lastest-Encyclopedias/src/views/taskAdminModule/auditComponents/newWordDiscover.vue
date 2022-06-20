<template>
    <div>
        <div class="module_title">新词发现</div>
        <div class="keyWordText">
            <Form :model="formItem">
                <Form-item :label-width="0">
                    <text-area :inputVal="formItem.desc" :textNum="50"></text-area>
                    <div class="totalData">当前审核第1条数据，共 <span style="color: #3388ff;">4</span> 条</div>
                </Form-item>
                <Form-item label="模型选择:" :label-width="75">
                    <Select v-model="formItem.select" placeholder="请选择关键词个数" style="width: 240px;">
                        <Option value="beijing">北京市</Option>
                        <Option value="shanghai">上海市</Option>
                        <Option value="shenzhen">深圳市</Option>
                    </Select>
                </Form-item>
                <Form-item :label-width="0" style="margin-top: 25px;">
                    <Button type="primary" style="margin-right: 20px;">查看下一条</Button>
                    <Button>刷新结果</Button>
                </Form-item>
            </Form>
        </div>
        <div class="module_title" style="height: 75px;line-height: 75px;">分析结果</div>
        <div>
            <Table
                    :columns="columns1"
                    :data="data1"
                    border>
            </Table>
        </div>
        <div style="display: flex;margin-top: 25px;justify-content: flex-end;">
            <Page
                    :total="10"
                    show-sizer
                    show-elevator
            ></Page>
        </div>
        <div class="flex horizontal_center" style="padding: 30px 0px;">
            <Button type="primary" style="margin-right: 20px;" @click="save()">保存结果</Button>
            <Button>返回</Button>
        </div>
        <Modal
                v-model="modal1"
                title="库中同义术语"
                width="800"
        >
            <Table
                    :columns="columns2"
                    :data="data1"
                    border>
            </Table>
            <Checkbox v-model="single" style="margin-top: 10px;">以上均不对</Checkbox>
        </Modal>
    </div>
</template>

<script>
    import TextArea from "@/components/textArea";

    export default {
        name: "newWordDiscover",
        components: {
            TextArea
        },
        data() {
            return {
                modal1: true,
                single: true,
                columns2:[
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        type: 'index',
                        width: 80,
                        align: 'center',
                        title: '序号'
                    },
                    {
                        title: '库中术语',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '库中解释',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '相似度',
                        align: 'center',
                        key: 'name'
                    },
                ],
                columns1: [
                    {
                        type: 'index',
                        width: 80,
                        align: 'center',
                        title: '序号'
                    },
                    {
                        title: '新词名称',
                        key: 'name',
                        render: (h, params) => {
                            const {name, isEdit} = params.row;
                            if (isEdit) {
                                return h("Input")
                            } else {
                                return h("span", name)
                            }
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h("div", [h("span", {
                                style: {
                                    marginRight: "10px",
                                    color: "#2d8cf0",
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.data1[params.index].isEdit = true;
                                    }
                                }
                            }, "编辑"), h("span", {
                                style: {
                                    color: "#2d8cf0",
                                    cursor: 'pointer'
                                }
                            }, "删除")])
                        }
                    },
                    {
                        title: '已选的同义术语',
                        key: 'name'
                    },
                    {
                        title: '查看库中同义术语',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h("div", [h("span", {
                                style: {
                                    color: "#2d8cf0",
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.modal1 = true;
                                    }
                                }
                            }, "查看")])
                        }
                    },
                ],
                data1: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居',
                        isEdit: false
                    }
                ],
                formItem: {}
            }
        },
        methods: {
            save() {
                const data1 = this.data1.map(item => ({...item, isEdit: false}));
                this.data1 = data1;
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../../styles/unified.css";

    /deep/ .ivu-form-item {
        margin-bottom: 0px;
    }

    /deep/ button {
        padding: 0px;
        width: 90px;
    }

    .analyseResultData {
        flex-wrap: wrap;

        .active {
            .name {
                border: 1px solid #3388ff;
                color: #3388ff;
            }
        }

        .item {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0px 25px 25px 0px;

            .name {
                padding: 0px 25px;
                height: 37px;
                line-height: 37px;
            }

            .operation {
                margin-top: 5px;
            }
        }

        .item:last-of-type {
            margin-right: 0px;
        }
    }

    .chunk {
        background-color: #f7f9fa;
        border-radius: 4px;
        border: solid 1px #d1d1d1;
        cursor: pointer;
    }

    .operation > div {
        width: 43px;
        height: 23px;
        line-height: 21px;
        text-align: center;
    }

    .operation > div:first-of-type {
        margin-right: 3px;
    }

    .operation > div:last-of-type {
        margin-left: 3px;
    }
</style>