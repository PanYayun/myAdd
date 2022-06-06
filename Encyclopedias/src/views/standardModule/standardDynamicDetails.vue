<template>
    <div class="standardDynamicDetails">
        <div class="main-content">
            <div class="left-content">
                <div class="detail-title">陕西中兵物资打造军民融合服务平台</div>
                <div class="detail-user-box">
                    <div class="left-user-box">
                        <span class="title">2018-04-04</span>
                        <span class="title" style="margin-left:15px">张三</span>
                    </div>
                    <div class="right-user-box flex">
                        <div><img class="image" src="@/img/detail_look_num.png"/><span>45</span></div>
                        <div style="padding-left:15px"><img class="image" src="@/img/detail_collection_num.png"/><span>45</span>
                        </div>
                        <div style="padding-left:15px"><img class="image"
                                                            src="@/img/detail_zan_num.png"/><span>45</span></div>
                    </div>
                </div>
                <div class="detail-con">
                    <p>陕西日报讯（记者沈谦）陕西中兵物资有限公司以西安兵器基地为依托，坚持市场导向，全力打造军民融合生产性服务平台，2017年实现集中采购金额同比增长150%。

                        陕西中兵物资有限公司以建设现代兵器工业生产性服务体系为己任，为在陕兵器企业和国防单位提供全供应链整合服务。2017年，该公司在西安兵器基地建设的兵器西北集中采购中心及现代物流项目全面建成并投入运营。兵器西北集中采购中心已形成在陕兵器企事业单位全覆盖，并向河南、湖北等地兵器企业拓展。2017年，陕西中兵物资有限公司发挥资源优势，积极参与西安市全面创新改革，试行军工单位竞争性采购制度改革，在兵器采购“互联网+”供应保障体系的基础上，以互联网和信息化促进国防科技工业传统供应链转型升级。</p>
                </div>
            </div>
            <div class="right-content">
                <!-- 相似标准区 -->
                <div class="standardKnowledge" style="margin-top: 0px;">
                    <ul class="list_nav_ul flex">
                        <li class="active">相似标准区</li>
                    </ul>
                    <div class="list">
                        <div class="item flex">
                            <img :src="require('@/img/lianjie.png')"/>
                            <span class="name">GB/T 4217-1984热塑性塑料管材的公称外径和公称压力(公制系列)</span>
                            <div class="info_details" v-show="false">
                                对于歼击机、强击机，应根据空机重量、乘员、滑油、氧气重量、按战术技术要求携带的基本武器重量以及按战术技术要求确定的机内燃油重量之和确定；
                                对于其他类飞机，应根据带基本任务有效负载和
                            </div>
                        </div>
                        <div class="item flex">
                            <img :src="require('@/img/lianjie.png')"/>
                            <span class="name">GB/T 4217-1984热塑性塑料管材的公称外径和公称压力(公制系列)</span>
                        </div>
                        <div class="item flex">
                            <img :src="require('@/img/lianjie.png')"/>
                            <span class="name">GB/T 4217-1984热塑性塑料管材的公称外径和公称压力(公制系列)</span>
                        </div>
                    </div>
                </div>
                <!-- 相关术语 -->
                <div class="correlation_term md" style="margin-top: 20px;">
                    <tab :tabList="[{text:'相关术语'}]" :tabIndex="0"></tab>
                    <div class="list" style="height: 193px;">
                        <Spin size="large" fix v-if="true"></Spin>
                        <div class="item flex">
                            <span class="name">歼击机</span>
                            <span class="source">释义来源：空军航空工程词典</span>
                        </div>
                        <div class="item flex">
                            <span class="name">歼击机</span>
                            <span class="source">释义来源：空军航空工程词典</span>
                        </div>
                        <div class="item flex">
                            <span class="name">歼击机</span>
                            <span class="source">释义来源：空军航空工程词典</span>
                        </div>
                    </div>
                </div>
                <!-- 相关文件 -->
                <div class="correlation_file md" style="margin-top: 20px;">
                    <tab :tabList="[{text:'相关文件'}]" :tabIndex="0"></tab>
                    <div class="list" style="height: 193px;">
                        <Spin size="large" fix v-if="!corrFiles"></Spin>
                        <not-data v-if="corrFiles && corrFiles.length == 0"></not-data>
                        <div class="item flex" v-for="item in corrFiles" :key="item.id">
                            {{item.projectName}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import tab from "@/components/tab"

    export default {
        name: "standardDynamicDetails",
        components:{
          tab
        },
        data() {
            return {
                systemIndex: 0,
                systemList: [
                    {parentNames: 11111}
                ],
                corrFiles: null
            };
        },
        mounted() {
        },
        methods: {},
    };
</script>

<style scoped lang="less">
    @import "../../styles/unified.css";

    /deep/ .tab_type {
      padding-left: 0px;
    }

    /deep/ .tab_type li {
      margin-right: 30px;
    }
    .standardDynamicDetails {
        width: 1200px;
        margin: auto;

        .main-content {
            min-height: 500px;
            display: flex;

            .left-content {
                flex: 1;
                margin-right: 20px;
                padding: 20px;
                background: white;

                .detail-title {
                    color: #282828;
                    font-size: 22px;
                    width: 100%;
                    text-align: center;
                    padding-bottom: 20px;
                }

                .detail-user-box {
                    display: flex;
                    justify-content: space-between;

                    .left-user-box {
                        .title {
                            font-size: 14px;
                            color: #999999;
                        }
                    }

                    .right-user-box {
                        div {
                            cursor: pointer;
                        }

                        .image {
                            vertical-align: middle;
                        }

                        span {
                            padding-left: 5px;
                        }
                    }
                }

                .detail-con {
                    padding-top: 25px;
                }
            }

            .right-content {
                width: 360px;

                .md {
                    background: white;
                    padding: 0px 16px 19px 16px;
                    margin-bottom: 20px;

                    .list {
                        border-top: 1px solid #efefef;
                        margin-top: -1px;
                        padding-top: 19px;
                        position: relative;
                        overflow: auto;

                        .item {
                            margin-bottom: 17px;
                            font-size: 14px;

                            &:last-of-type {
                                margin-bottom: 0px;
                            }
                        }
                    }
                }

                .correlation_term {
                    .item {
                        .name {
                            flex: 1;
                        }

                        .source {
                            color: #a3a6ad;
                        }
                    }
                }
            }
        }

        .flex {
            display: flex;
        }
    }
</style>
