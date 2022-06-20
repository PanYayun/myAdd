<template>
    <div>
        <div class="module_title">术语属性抽取</div>
        <div>
            <Form :model="formItem" :label-width="100">
                <Form-item label="标准名称:">
                    <Input v-model="formItem.input" placeholder="请输入" disabled></Input>
                </Form-item>
                <Form-item label="标准适用范围:">
                    <text-area :inputVal="formItem.desc" :textNum="50"></text-area>
                    <div class="totalData">当前审核第1条数据，共 <span style="color: #3388ff;">4</span> 条</div>
                </Form-item>
                <Form-item :label-width="0">
                    <Button type="primary" style="margin-right: 20px;">查看下一条</Button>
                    <Button>刷新结果</Button>
                </Form-item>
            </Form>
        </div>
    </div>
</template>

<script>
    import textArea from "@/components/textArea";


    export default {
        name: "termAttrExtract",
        components:{
            textArea
        },
        data(){
            return{
                formItem:{

                }
            }
        }
    }
</script>

<style scoped>
    @import "../../../styles/unified.css";
    /deep/ .ivu-form-item:nth-child(2n){
        margin-bottom: 0px;
    }
</style>