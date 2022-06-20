<template>
    <div>
        <Input v-model="inputVal" type="textarea" placeholder="请输入..." disabled></Input>
        <div class="showTextNum">
            {{textNum}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "textArea",
        props:['inputVal','textNum'],
        data(){
            return{

            }
        }
    }
</script>

<style scoped lang="less">
    /deep/ textarea{
        resize: none;
        border-bottom: none;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
    }
    .showTextNum{
        border: 1px solid #e3e5e8;
        background: #f3f3f3;
        border-top: none;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        display: flex;
        justify-content: flex-end;
        padding-right: 10px;
        color: #ccc;
    }
</style>