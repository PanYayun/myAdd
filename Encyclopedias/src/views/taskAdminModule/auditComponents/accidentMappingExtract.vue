<template>
    <div>
        <div class="module_title">事理图谱抽取</div>
        <div class="text-wrap" style="margin-bottom: 15px;">
            <text-area :inputVal="desc" :textNum="50"></text-area>
            <div class="totalData">当前审核第1条数据，共 <span style="color: #3388ff;">4</span> 条</div>
            <div class="flex">
                <Button type="primary" style="margin-right: 20px;">查看下一条</Button>
                <Button>刷新结果</Button>
            </div>
        </div>
        <div class="module_title">抽取结果展示</div>
        <div class="flex">
            <div class="table" style="width: 500px;">
                <table>
                    <thead>
                    <tr>
                        <th>原因事件</th>
                        <th>结果事件</th>
                        <th>关系词</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            <Input v-model="text" />
                        </td>
                        <td>
                            <Input v-model="text" />
                        </td>
                        <td>
                            <Input v-model="text" />
                        </td>
                        <td>
                            <span style="cursor: pointer;">编辑</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div class="flex" style="justify-content: flex-start;margin-top: 20px;">
                    <Page :total="100" show-sizer size="small"></Page>
                </div>
            </div>
            <div class="mappingWrap" style="flex: 1;">

            </div>
        </div>
        <div class="flex" style="justify-content: center;padding: 35px 0px;">
            <Button type="primary" style="margin-right: 20px;">保存结果</Button>
            <Button>返回</Button>
        </div>
    </div>
</template>

<script>
    import textArea from "@/components/textArea";

    export default {
        name: "accidentMappingExtract",
        components: {
            textArea
        },
        data() {
            return {
                desc: 1111,
                text:'相应的警告没有响起'
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../../styles/unified.css";

    /deep/ button {
        padding: 0px;
        width: 90px;
    }
    .result-text{
        background-color: #f7f9fa;
        border-radius: 4px;
        border: solid 1px #d1d1d1;
        padding: 3px 5px;
    }
    .table {
        padding-bottom: 20px;
    }
</style>