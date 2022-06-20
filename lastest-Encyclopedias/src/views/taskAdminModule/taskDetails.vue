<template>
    <div class="task_wrap">
        <div class="task_title">任务详情</div>
        <div style="margin-top: 30px;">
            <component :is="current"></component>
        </div>
    </div>
</template>

<script>
    import knowledgeProcess from "./taskStatusComponents/knowledgeProcess"; //知识加工
    import knowledgeExtract from "./taskStatusComponents/knowledgeExtract"; //知识抽取
    import knowledgeAudit from "./taskStatusComponents/knowledgeAudit"; //知识审核
    import dataEnterStorage from "./taskStatusComponents/dataEnterStorage"; //数据入库

    export default {
        name: "taskDetails",
        data(){
          return{
              componentList:['knowledgeProcess','knowledgeExtract','knowledgeAudit','dataEnterStorage'],
              index: 2
          }
        },
        components:{
            knowledgeProcess,
            knowledgeExtract,
            knowledgeAudit,
            dataEnterStorage
        },
       computed:{
            current:function () {
                const { componentList, index } = this;
                return componentList[index];
            }
       }
    }
</script>

<style lang="less">
    .task_wrap {
        padding: 20px;
        background: white;
    }

    .task_title {
        font-weight: bold;
        font-size: 18px;
        padding-bottom: 15px;
        border-bottom: 1px solid rgb(238, 238, 238);
    }
</style>