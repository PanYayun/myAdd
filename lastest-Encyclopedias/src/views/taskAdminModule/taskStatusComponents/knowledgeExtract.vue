<template>
    <div>
        <Table
                :columns="columns1"
                :data="data1"
                border>
        </Table>
        <div style="display: flex;margin-top: 25px;justify-content: space-between;">
            <Button type="primary">查看事理图谱生成过程</Button>
            <Page
                    :total="10"
                    show-sizer
                    show-elevator
            ></Page>
        </div>
        <div style="display: flex;justify-content: center;margin-top: 40px;">
            <Button type="primary" style="margin-right: 8px;">上一步</Button>
            <Button type="primary" style="margin-left: 8px;">下一步</Button>
        </div>
        <Modal
                v-model="modal1"
                title="查看日志">
            <span>
                adasdasdadas
            </span>
        </Modal>
    </div>
</template>

<script>
    export default {
        name: "knowledgeExtract",
        data() {
            return {
                columns1: [
                    {
                        type: 'index',
                        width: 80,
                        align: 'center',
                        title: '序号'
                    },
                    {
                        title: '子任务名称',
                        key: 'name'
                    },
                    {
                        title: 'API名称',
                        key: 'age'
                    },
                    {
                        title: '启动时间',
                        key: 'address'
                    },
                    {
                        title: '任务状态',
                        key: 'address'
                    }, {
                        title: '花费时间',
                        key: 'address'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h("div", [
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "text",
                                            size: "small",
                                            ghost: true
                                        },
                                        style: {
                                            marginRight: "5px",
                                            color: "#2d8cf0"
                                        },
                                        on: {
                                            click: () => {
                                                this.viewLog(params);
                                            }
                                        }
                                    },
                                    "查看"
                                )
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        name: '王小明',
                        age: 18,
                        address: '北京市朝阳区芍药居'
                    }
                ],
                modal1: false
            }
        },
        methods: {
            viewLog() {
                this.modal1 = true;
            }
        }
    }
</script>

<style scoped>
    /deep/ .ivu-modal-body {
        background: rgb(51, 51, 51);
        color: white;
    }
</style>