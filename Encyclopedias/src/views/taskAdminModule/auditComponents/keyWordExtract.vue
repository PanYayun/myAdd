<template>
    <div>
        <div class="module_title">关键词提取</div>
        <div class="keyWordText">
            <Form :model="formItem">
                <Form-item :label-width="0">
                    <text-area :inputVal="formItem.desc" :textNum="50" ></text-area>
                    <div class="totalData">当前审核第1条数据，共 <span style="color: #3388ff;">4</span> 条</div>
                </Form-item>
                <Form-item label="关键词个数:" :label-width="90">
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
        <div class="analyseResultData flex">
            <div class="item flex active">
                <div class="name chunk">最大空速</div>
                <div class="operation flex">
                    <div class="chunk">编辑</div>
                    <div class="chunk">删除</div>
                </div>
            </div>
        </div>
        <div class="flex horizontal_center" style="padding: 20px 0px 40px 0px;">
            <Button type="primary" style="margin-right: 20px;">保存结果</Button>
            <Button>返回</Button>
        </div>
    </div>
</template>

<script>
    import TextArea from "@/components/textArea";

    export default {
        name: "keyWordExtract",
        components:{
            TextArea
        },
        data(){
            return{
                formItem:{

                }
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../../styles/unified.css";
    /deep/ .ivu-form-item{
        margin-bottom: 0px;
    }

    /deep/ button{
        padding: 0px;
        width: 90px;
    }
    .analyseResultData{
        flex-wrap: wrap;
        .active{
            .name{
                border: 1px solid #3388ff;
                color: #3388ff;
            }
        }
        .item{
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0px 25px 25px 0px;
            .name{
                padding: 0px 25px;
                height: 37px;
                line-height: 37px;
            }
            .operation{
                margin-top: 5px;
            }
        }
        .item:last-of-type{
            margin-right: 0px;
        }
    }
    .chunk{
        background-color: #f7f9fa;
        border-radius: 4px;
        border: solid 1px #d1d1d1;
        cursor: pointer;
    }

    .operation > div{
        width: 43px;
        height: 23px;
        line-height: 21px;
        text-align: center;
    }
    .operation > div:first-of-type{
        margin-right: 3px;
    }
    .operation > div:last-of-type{
        margin-left: 3px;
    }
</style>