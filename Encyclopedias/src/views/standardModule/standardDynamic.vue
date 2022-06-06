<template>
    <div style="width: 1200px;margin: 0 auto;">
        <div class="standardType flex">
            <div class="item" v-for="(item,index) in standardType" :key="index" :class="{active:item.selected}">
                {{item.text}}
            </div>
        </div>
        <div class="content">
            <div class="messageType flex">
                <ul class="flex" style="flex: 1;">
                    <li v-for="(item,index) in messageType" :key="index" :class="{active:item.selected}">{{item.text}}
                    </li>
                </ul>
                <Input search placeholder="请输入动态名称" style="width: 260px"></Input>
            </div>
            <div class="list">
                <ul>
                    <li class="flex" v-for="item in 10" :key="item">
                        <div class="text">
                            国家标准化管理委员会关于批准承担国际标准化组织航空与航天器技术委员会机场基础设施等17个ISO技术机构航天器技术委员会机场基础设施等17个ISO技术机构asdasd
                        </div>
                        <div class="source">
                            来源：术语知识百科
                        </div>
                        <div class="time">
                            2021-08-01
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="page flex">
            <Page :total="100" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "standardDynamic",
        data() {
            return {
                standardType: [
                    {text: '集团标准化', selected: true},
                    {text: '军用军刀', selected: false},
                    {text: '国家标准', selected: false},
                    {text: '国际标准化', selected: false},
                ],
                messageType: [
                    {text: '通知公告', selected: true},
                    {text: '国家标准公告', selected: false},
                    {text: '行业和地方标准备案月', selected: false},
                    {text: '征求意见', selected: false},
                ]
            }
        }
    }
</script>

<style scoped lang="less">
    .flex {
        display: flex;
    }
    .page{
        justify-content: center;
        margin-top: 20px;
    }

    .standardType {
        background: white;
        height: 60px;

        .item {
            width: 180px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            cursor: pointer;
        }

        .active {
            background: #3388ff;
            color: white;
        }
    }

    .content {
        padding: 0px 30px 20px 30px;
        background: white;
        margin-top: 20px;

        .messageType {
            border-bottom: 1px solid #e6e6e6;
            align-items: center;
            height: 55px;

            > ul {
                align-items: center;

                > li {
                    font-size: 16px;
                    margin-right: 50px;
                    cursor: pointer;
                    line-height: 54px;
                    position: relative;
                }

                &:last-of-type {
                    margin-right: 0px;
                }

                .active:after {
                    position: absolute;
                    content: "";
                    left: 0px;
                    bottom: -1px;
                    width: 100%;
                    height: 2px;
                    background: #2d8cf0;
                }
            }
        }

        .list {
            margin-top: 20px;

            > ul {

                > li {
                    align-items: center;
                    margin-bottom: 20px;
                    .text{
                        font-size: 16px;
                        flex: 1;
                        margin-right: 80px;
                        word-break: break-all;
                        display: -webkit-box;
                        -webkit-line-clamp: 1;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                    .source{
                        font-size: 14px;
                        color: #858b9a;
                        margin-right: 45px;
                    }
                    .time{
                        font-size: 14px;
                        color: #858b9a;
                    }
                }
            }
        }
    }
</style>