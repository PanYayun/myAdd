<template>
    <div class="task_page_wrap">
        <div class="page_title">{{$route.meta.title}}</div>
        <div class="search_form">
            <Form :model="formItem" :label-width="75">
                <div class="row flex">
                    <div class="col" style="width: 300px;">
                        <Form-item label="任务类型">
                            <Select v-model="formItem.select" placeholder="请选择任务类型">
                                <Option value="beijing">北京市</Option>
                                <Option value="shanghai">上海市</Option>
                                <Option value="shenzhen">深圳市</Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="col" style="margin-left: 50px;width: 450px;">
                        <Form-item label="创建时间">
                            <Row>
                                <Col span="11">
                                    <Date-picker type="date" placeholder="选择日期" v-model="formItem.date"></Date-picker>
                                </Col>
                                <Col span="2" style="text-align: center">-</Col>
                                <Col span="11">
                                    <Date-picker type="date" placeholder="选择日期" v-model="formItem.date"></Date-picker>
                                </Col>
                            </Row>
                        </Form-item>
                    </div>
                </div>
                <div class="row flex">
                    <div class="col" style="width: 300px;">
                        <Form-item label="任务名称">
                            <Input v-model="formItem.input" placeholder="请输入任务名称"></Input>
                        </Form-item>
                    </div>
                    <div class="col" style="margin-left: 50px;width: 300px;">
                        <Form-item label="任务状态">
                            <Select v-model="formItem.select" placeholder="请选择任务状态">
                                <Option value="beijing">北京市</Option>
                                <Option value="shanghai">上海市</Option>
                                <Option value="shenzhen">深圳市</Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="row" style="width:150px;">
                        <Form-item :label-width="15">
                            <Button type="primary">查询</Button>
                            <Button style="margin-left: 15px">重置</Button>
                        </Form-item>
                    </div>
                </div>
            </Form>
        </div>
        <div class="addTask flex vertical_center">
            <img src="../../img/add_task.png"/>
            <span>新增</span>
        </div>
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
                        <td>1</td>
                        <td>民航事故知识抽取</td>
                        <td>20210708抽取</td>
                        <td>王彬彬</td>
                        <td>2021-06-08</td>
                        <td>通用知识加工中</td>
                        <td>编辑</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>民航事故知识抽取</td>
                        <td>20210708抽取</td>
                        <td>王彬彬</td>
                        <td>2021-06-08</td>
                        <td>通用知识加工中</td>
                        <td>编辑</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>民航事故知识抽取</td>
                        <td>20210708抽取</td>
                        <td>王彬彬</td>
                        <td>2021-06-08</td>
                        <td>通用知识加工中</td>
                        <td>编辑</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>民航事故知识抽取</td>
                        <td>20210708抽取</td>
                        <td>王彬彬</td>
                        <td>2021-06-08</td>
                        <td>通用知识加工中</td>
                        <td>编辑</td>
                    </tr>
                </tbody>
            </table>
            <div class="flex" style="justify-content: flex-end;margin-top: 20px;">
                <Page :total="100" show-sizer></Page>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "taskAdmin",
        data() {
            return {
                formItem: {}
            }
        }
    }
</script>

<style scoped lang="less">
    @import "../../styles/unified.css";

    .search_form {
        padding: 15px 0px;
        border-bottom: 1px solid #eeeeee;
    }
    .table{
        padding-bottom: 20px;
    }
    .addTask{
        cursor: pointer;
        color: #60636f;
        height: 50px;
        img{
            width: 16px;
            height: 16px;
            margin-right: 3px;
        }
    }
</style>