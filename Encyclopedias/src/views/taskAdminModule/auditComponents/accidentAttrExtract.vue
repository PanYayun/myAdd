<template>
    <div>
        <div class="module_title">事故属性抽取</div>
        <div class="text-wrap" style="margin-bottom: 15px;">
            <text-area :inputVal="desc" :textNum="50" ></text-area>
            <div class="totalData">当前审核第1条数据，共 <span style="color: #3388ff;">4</span> 条</div>
            <div class="flex">
                <Button type="primary" style="margin-right: 20px;">查看下一条</Button>
                <Button>刷新结果</Button>
            </div>
        </div>
        <div class="module_title">分析结果</div>
        <div class="table">
            <table>
                <thead>
                <tr>
                    <th>序号</th>
                    <th>任务类型</th>
                    <th>任务名称</th>
                    <th>创建人</th>
                    <th>创建时间</th>
                    <th>任务状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <Checkbox v-model="single">1</Checkbox>
                    </td>
                    <td>民航事故知识抽取</td>
                    <td>20210708抽取</td>
                    <td>王彬彬</td>
                    <td>2021-06-08</td>
                    <td>通用知识加工中</td>
                    <td>编辑</td>
                </tr>
                <tr>
                    <td><Checkbox v-model="single">2</Checkbox></td>
                    <td>民航事故知识抽取</td>
                    <td>20210708抽取</td>
                    <td>王彬彬</td>
                    <td>2021-06-08</td>
                    <td>通用知识加工中</td>
                    <td>编辑</td>
                </tr>
                <tr>
                    <td><Checkbox v-model="single">3</Checkbox></td>
                    <td>民航事故知识抽取</td>
                    <td>20210708抽取</td>
                    <td>王彬彬</td>
                    <td>2021-06-08</td>
                    <td>通用知识加工中</td>
                    <td>编辑</td>
                </tr>
                <tr>
                    <td><Checkbox v-model="single">4</Checkbox></td>
                    <td>民航事故知识抽取</td>
                    <td>20210708抽取</td>
                    <td>王彬彬</td>
                    <td>2021-06-08</td>
                    <td>通用知识加工中</td>
                    <td>编辑</td>
                </tr>
                </tbody>
            </table>
            <div class="flex" style="justify-content: center;margin-top: 20px;">
                <Button type="primary" style="margin-right: 20px;">保存结果</Button>
                <Button>返回</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import textArea from "@/components/textArea";

    export default {
        name: "accidentAttrExtract",
        components:{
            textArea
        },
        data(){
            return{
                desc:1111
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../../styles/unified.css";
    /deep/ button{
        padding: 0px;
        width: 90px;
    }
    .table{
        padding-bottom: 20px;
    }
</style>