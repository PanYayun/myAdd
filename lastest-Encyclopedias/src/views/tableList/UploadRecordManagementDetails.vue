<template>
  <div style="padding:15px 20px 0px 20px;background:white; border-radius:5px;">
    <Card :bordered="false" dis-hover :padding="0">
      <Row style="margin-bottom:20px">
        <Col
          span="24"
          style="padding-bottom:15px;border-bottom: 1px solid #eeeeee;"
        >
          <p style="font-size: 18px;font-weight: 800;">条目详情</p>
        </Col>
        <Col span="24" style="padding-top:15px;">
          <Button
            type="text"
            @click="removes_1"
            style="
              padding: 0px;
              box-shadow: 0px 0px 0px 0px;
              margin-right: 10px;
            "
          >
            <img
              src="~@/img/icon/delete.png"
              alt=""
              style="margin-right: 5px"
            />删除</Button
          >
        </Col>
      </Row>
      <!-- 表格 -->
      <!-- border -->
      <Table
        border
        stripe
        ref="UploadRecordManagementDetails_table1"
        height="522"
        highlight-row
        :data="tableData_1"
        :loading="loading_1"
        :columns="tableColumns_1"
        @on-select="handleSelectRow_1"
        @on-select-all="handleSelectAll_1"
        @on-select-cancel="handleCancelRow_1"
        @on-select-all-cancel="handleSelectAll_1"
      ></Table>
      <Row>
        <Col span="24">
          <div
            style="
        margin: 20px 0px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      "
          >
            <div>
              <span style="margin-right: 10px">共{{ totalCount }}条记录</span>
              <span>已选择{{ selectedSum_1 }}条记录</span>
            </div>
            <div>
              <Page
                :total="totalCount"
                :current="table_current_1"
                @on-change="table_Pagechange_1"
                @on-page-size-change="table_PageSizechange_1"
                show-sizer
                show-elevator
              ></Page>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
    <Modal
      v-model="Modal_1"
      width="550"
      :mask-closable="false"
      scrollable
      inline
      :styles="{ paddingBottom: '100px' }"
    >
      <p slot="header" style="fontSize: 16px;fontWeight: 600">
        <span>详情编辑</span>
      </p>
      <div>
        <Row>
          <Col span="24">
            <Spin fix v-if="spin_Modal"></Spin>
            <Form
              inline
              :label-width="150"
              ref="table_form_2"
              :rules="form_rules_2"
              :model="table_form_2"
              label-position="left"
              :hide-required-mark="false"
            >
              <!-- :show-message='false' -->
              <!-- 民航事故 -->
              <div
                v-if="UploadRecordManagementDetails.SCMBLX == 'MHSG'"
                class="Modal_row_box"
              >
                <FormItem label="事故来源文件名称" prop="SGLYWJMC">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入事故来源文件名称"
                    v-model="table_form_2.SGLYWJMC"
                  ></Input>
                </FormItem>
                <FormItem label="事故来源文件期数" prop="SGLYWJQS">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入事故来源文件期数"
                    v-model="table_form_2.SGLYWJQS"
                  ></Input>
                </FormItem>
                <FormItem label="事故名称" prop="SGMC">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入事故名称"
                    v-model="table_form_2.SGMC"
                  ></Input>
                </FormItem>
                <FormItem label="事故纯文本" prop="SGCWB">
                  <Input
                    style=" width: 300px"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 5 }"
                    clearable
                    placeholder="请输入事故纯文本"
                    v-model="table_form_2.SGCWB"
                  ></Input>
                </FormItem>
                <FormItem label="事故过程描述" prop="SGGCMS">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入事故过程描述"
                    v-model="table_form_2.SGGCMS"
                  ></Input>
                </FormItem>
                <FormItem label="事故可能原因" prop="SGKNYY">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入事故可能原因"
                    v-model="table_form_2.SGKNYY"
                  ></Input>
                </FormItem>
                <FormItem label="事故影响因素" prop="SGYXYS">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入事故影响因素"
                    v-model="table_form_2.SGYXYS"
                  ></Input>
                </FormItem>
                <FormItem label="调查报告结论" prop="DCBGJL">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入调查报告结论"
                    v-model="table_form_2.DCBGJL"
                  ></Input>
                </FormItem>
                <FormItem label="事故详细后果" prop="SGXXHG">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入事故详细后果"
                    v-model="table_form_2.SGXXHG"
                  ></Input>
                </FormItem>
                <FormItem label="事故措施建议" prop="SGCSJY">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入事故措施建议"
                    v-model="table_form_2.SGCSJY"
                  ></Input>
                </FormItem>
              </div>
              <!-- 术语百科或军事百科 -->
              <div
                v-else-if="
                  UploadRecordManagementDetails.SCMBLX == 'SYBK' ||
                    UploadRecordManagementDetails.SCMBLX == 'JSBK'
                "
                class="Modal_row_box"
              >
                <FormItem label="术语来源" prop="SYLY">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入术语来源"
                    v-model="table_form_2.SYLY"
                  ></Input>
                </FormItem>
                <FormItem label="术语中文名称" prop="SYZWMC">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入术语中文名称"
                    v-model="table_form_2.SYZWMC"
                  ></Input>
                </FormItem>
                <FormItem label="术语英文名称" prop="SYYWMC">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入术语英文名称"
                    v-model="table_form_2.SYYWMC"
                  ></Input>
                </FormItem>
                <FormItem label="术语缩略语" prop="SYSLY">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入术语缩略语"
                    v-model="table_form_2.SYSLY"
                  ></Input>
                </FormItem>
                <FormItem label="同义词" prop="TYC">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入同义词"
                    v-model="table_form_2.TYC"
                  ></Input>
                </FormItem>
                <!-- Test -->
                <FormItem label="定义或解释" prop="DYHJS">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入定义或解释"
                    v-model="table_form_2.DYHJS"
                  ></Input>
                </FormItem>
                <!-- Test -->
                <FormItem label="所属分类代码" prop="SSFLDM">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入所属分类代码"
                    v-model="table_form_2.SSFLDM"
                  ></Input>
                </FormItem>
              </div>
              <!-- 标准百科 -->
              <div
                v-else-if="UploadRecordManagementDetails.SCMBLX == 'BZBK'"
                class="Modal_row_box"
              >
                <FormItem label="标准编号" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入标准编号"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="标准中文名称" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入标准中文名称"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="标准外文名称" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入标准外文名称"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="标准类型代号" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入标准类型代号"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="标准状态名称" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入标准状态名称"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="标准发布文号" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入标准发布文号"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="正文语种名称" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入正文语种名称"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="国际标准分类号" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入国际标准分类号"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="中国标准分类号" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入中国标准分类号"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="国家军用标准分类号" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入国家军用标准分类号"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="发布日期" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入发布日期"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="实施日期" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入实施日期"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="修订或废止日期" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入修订或废止日期"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="批准单位名称" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入批准单位名称"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="提出单位名称" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入提出单位名称"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="主编单位名称" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入主编单位名称"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="参编单位名称" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入参编单位名称"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="归口单位名称" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入归口单位名称"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="采用标准及程度" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入采用标准及程度"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="引用标准号" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入引用标准号"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="代替老标准号" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入代替老标准号"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="适用范围" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入适用范围"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="载体名称" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入载体名称"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="版次" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入版次"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="关键词" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入关键词"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="相关标准号" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入相关标准号"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="密级名称" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入密级名称"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="备注" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入备注"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
              </div>
              <!-- 元器件百科 -->
              <div
                v-else-if="UploadRecordManagementDetails.SCMBLX == 'YQJBK'"
                class="Modal_row_box"
              >
                <FormItem label="名称" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入名称"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="型号规格" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入型号规格"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="技术指标" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入技术指标"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="工作温度" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入工作温度"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="生产厂商" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入生产厂商"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
                <FormItem label="国产/进口" prop="Test">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入国产/进口"
                    v-model="table_form_2.Test"
                  ></Input>
                </FormItem>
              </div>
              <!-- 质量百科 -->
              <div
                v-else-if="UploadRecordManagementDetails.SCMBLX == 'ZLBK'"
                class="Modal_row_box"
              >
                <FormItem label="故障ID" prop="GZID">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入故障ID"
                    v-model="table_form_2.GZID"
                  ></Input>
                </FormItem>
                <FormItem label="装备型号" prop="ZBXH">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入装备型号"
                    v-model="table_form_2.ZBXH"
                  ></Input>
                </FormItem>
                <FormItem label="装备出厂编号" prop="ZBCCBH">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入装备出厂编号"
                    v-model="table_form_2.ZBCCBH"
                  ></Input>
                </FormItem>
                <FormItem label="所属系统" prop="SSXT">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入所属系统"
                    v-model="table_form_2.SSXT"
                  ></Input>
                </FormItem>
                <FormItem label="系统型号" prop="XTXH">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入系统型号"
                    v-model="table_form_2.XTXH"
                  ></Input>
                </FormItem>
                <FormItem label="产品名称" prop="CPMC">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入产品名称"
                    v-model="table_form_2.CPMC"
                  ></Input>
                </FormItem>
                <FormItem label="产品型号" prop="CPXH">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入产品型号"
                    v-model="table_form_2.CPXH"
                  ></Input>
                </FormItem>
                <FormItem label="批次号" prop="PCH">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入批次号"
                    v-model="table_form_2.PCH"
                  ></Input>
                </FormItem>
                <FormItem label="产品编号" prop="CPBH">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入产品编号"
                    v-model="table_form_2.CPBH"
                  ></Input>
                </FormItem>
                <FormItem label="元器件/零部件名称" prop="YQJ_LBJMC">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入元器件/零部件名称"
                    v-model="table_form_2.YQJ_LBJMC"
                  ></Input>
                </FormItem>
                <FormItem label="元器件/零部件编号" prop="YQJ_LBJBH">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入元器件/零部件编号"
                    v-model="table_form_2.YQJ_LBJBH"
                  ></Input>
                </FormItem>
                <FormItem label="发生日期" prop="FSRQ">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入发生日期"
                    v-model="table_form_2.FSRQ"
                  ></Input>
                </FormItem>
                <FormItem label="现象描述" prop="XXMS">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入现象描述"
                    v-model="table_form_2.XXMS"
                  ></Input>
                </FormItem>
                <FormItem label="现象分类" prop="XXFL">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入现象分类"
                    v-model="table_form_2.XXFL"
                  ></Input>
                </FormItem>
                <FormItem label="发现地点" prop="FXDD">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入发现地点"
                    v-model="table_form_2.FXDD"
                  ></Input>
                </FormItem>
                <FormItem label="发现时机" prop="FXSJ">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入发现时机"
                    v-model="table_form_2.FXSJ"
                  ></Input>
                </FormItem>
                <FormItem label="故障复现情况" prop="GZFXQK">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入故障复现情况"
                    v-model="table_form_2.GZFXQK"
                  ></Input>
                </FormItem>
                <FormItem label="现象二级分类" prop="XXEJFL">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入现象二级分类"
                    v-model="table_form_2.XXEJFL"
                  ></Input>
                </FormItem>
                <FormItem label="故障类型" prop="GZLX">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入故障类型"
                    v-model="table_form_2.GZLX"
                  ></Input>
                </FormItem>
                <FormItem label="故障模式" prop="GZMS">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入故障模式"
                    v-model="table_form_2.GZMS"
                  ></Input>
                </FormItem>
                <FormItem label="故障原因" prop="GZYY">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入故障原因"
                    v-model="table_form_2.GZYY"
                  ></Input>
                </FormItem>
                <FormItem label="故障定位" prop="GZDW">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入故障定位"
                    v-model="table_form_2.GZDW"
                  ></Input>
                </FormItem>
                <FormItem label="原因分类" prop="YYFL">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入原因分类"
                    v-model="table_form_2.YYFL"
                  ></Input>
                </FormItem>
                <FormItem label="相同故障分析" prop="XTGZFX">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入相同故障分析"
                    v-model="table_form_2.XTGZFX"
                  ></Input>
                </FormItem>
                <FormItem label="故障深入分析" prop="GZSRFX">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入故障深入分析"
                    v-model="table_form_2.GZSRFX"
                  ></Input>
                </FormItem>
                <FormItem label="图片" prop="TP">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入图片"
                    v-model="table_form_2.TP"
                  ></Input>
                </FormItem>
                <FormItem label="填报人" prop="TBR">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入填报人"
                    v-model="table_form_2.TBR"
                  ></Input>
                </FormItem>
                <FormItem label="核实人" prop="HSR">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入核实人"
                    v-model="table_form_2.HSR"
                  ></Input>
                </FormItem>
                <FormItem label="原因二级分类" prop="YYEJFL">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入原因二级分类"
                    v-model="table_form_2.YYEJFL"
                  ></Input>
                </FormItem>
                <FormItem label="现象知识抽取_现象主体" prop="XXZSCQ_XXZT">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入现象知识抽取_现象主体"
                    v-model="table_form_2.XXZSCQ_XXZT"
                  ></Input>
                </FormItem>
                <FormItem label="现象知识抽取_试验项目" prop="XXZSCQ_SYXM">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入现象知识抽取_试验项目"
                    v-model="table_form_2.XXZSCQ_SYXM"
                  ></Input>
                </FormItem>
                <FormItem label="现象知识抽取_试验类型" prop="XXZSCQ_SYLX">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入现象知识抽取_试验类型"
                    v-model="table_form_2.XXZSCQ_SYLX"
                  ></Input>
                </FormItem>
                <FormItem label="现象知识抽取_环境指标" prop="XXZSCQ_HJZB">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入现象知识抽取_环境指标"
                    v-model="table_form_2.XXZSCQ_HJZB"
                  ></Input>
                </FormItem>
                <FormItem label="现象知识抽取_故障模式" prop="XXZSCQ_GZMS">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入现象知识抽取_故障模式"
                    v-model="table_form_2.XXZSCQ_GZMS"
                  ></Input>
                </FormItem>
                <FormItem
                  label="现象知识抽取_技术要求指标"
                  prop="XXZSCQ_JSYQZB"
                >
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入现象知识抽取_技术要求指标"
                    v-model="table_form_2.XXZSCQ_JSYQZB"
                  ></Input>
                </FormItem>
                <FormItem
                  label="现象知识抽取_实测不合格指标"
                  prop="XXZSCQ_SCBHGZB"
                >
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入现象知识抽取_实测不合格指标"
                    v-model="table_form_2.XXZSCQ_SCBHGZB"
                  ></Input>
                </FormItem>
                <FormItem label="故障机理分类" prop="YJJJLJGZ_GZJLFL">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入故障机理分类"
                    v-model="table_form_2.YJJJLJGZ_GZJLFL"
                  ></Input>
                </FormItem>
                <FormItem label="故障机理二级分类" prop="YJJJLJGZ_GZJLEJFL">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入故障机理二级分类"
                    v-model="table_form_2.YJJJLJGZ_GZJLEJFL"
                  ></Input>
                </FormItem>
                <FormItem label="元器件故障分类" prop="YJJJLJGZ_YQJGZFL">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入元器件故障分类"
                    v-model="table_form_2.YJJJLJGZ_YQJGZFL"
                  ></Input>
                </FormItem>
                <FormItem label="元器件故障二级分类" prop="YJJJLJGZ_YQJGZEJFL">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入元器件故障二级分类"
                    v-model="table_form_2.YJJJLJGZ_YQJGZEJFL"
                  ></Input>
                </FormItem>
                <FormItem label="零部件故障分类" prop="YJJJLJGZ_LBJGZFL">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入零部件故障分类"
                    v-model="table_form_2.YJJJLJGZ_LBJGZFL"
                  ></Input>
                </FormItem>
                <FormItem label="零部件故障二级分类" prop="YJJJLJGZ_LBJGZEJFL">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入零部件故障二级分类"
                    v-model="table_form_2.YJJJLJGZ_LBJGZEJFL"
                  ></Input>
                </FormItem>
                <FormItem label="问题性质" prop="WTXZ">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入问题性质"
                    v-model="table_form_2.WTXZ"
                  ></Input>
                </FormItem>
                <FormItem label="事件性质" prop="SJXZ">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入事件性质"
                    v-model="table_form_2.SJXZ"
                  ></Input>
                </FormItem>
                <FormItem label="产品处理意见" prop="CZYJJJZCS_CPCLYJ">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入产品处理意见"
                    v-model="table_form_2.CZYJJJZCS_CPCLYJ"
                  ></Input>
                </FormItem>
                <FormItem label="产品处理详细说明" prop="CZYJJJZCS_CPCLXXSM">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入产品处理详细说明"
                    v-model="table_form_2.CZYJJJZCS_CPCLXXSM"
                  ></Input>
                </FormItem>
                <FormItem label="举一反三_批次" prop="CZYJJJZCS_JYFS_PC">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入举一反三_批次"
                    v-model="table_form_2.CZYJJJZCS_JYFS_PC"
                  ></Input>
                </FormItem>
                <FormItem label="举一反三_数量" prop="CZYJJJZCS_JYFS_SL">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入举一反三_数量"
                    v-model="table_form_2.CZYJJJZCS_JYFS_SL"
                  ></Input>
                </FormItem>
                <FormItem label="举一反三_详细说明" prop="CZYJJJZCS_JYFS_XXSM">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入举一反三_详细说明"
                    v-model="table_form_2.CZYJJJZCS_JYFS_XXSM"
                  ></Input>
                </FormItem>
                <FormItem label="故障件处理意见" prop="CZYJJJZCS_GZJCLYJ">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入故障件处理意见"
                    v-model="table_form_2.CZYJJJZCS_GZJCLYJ"
                  ></Input>
                </FormItem>
                <FormItem
                  label="故障件处理详细说明"
                  prop="CZYJJJZCS_GZJCL_XXSM"
                >
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入故障件处理详细说明"
                    v-model="table_form_2.CZYJJJZCS_GZJCL_XXSM"
                  ></Input>
                </FormItem>
                <FormItem label="记录情况" prop="ZJXX_JLQK">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入记录情况"
                    v-model="table_form_2.ZJXX_JLQK"
                  ></Input>
                </FormItem>
                <FormItem label="检验" prop="ZJXX_JY">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入检验"
                    v-model="table_form_2.ZJXX_JY"
                  ></Input>
                </FormItem>
                <FormItem label="日期" prop="ZJXX_RQ">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入日期"
                    v-model="table_form_2.ZJXX_RQ"
                  ></Input>
                </FormItem>
                <FormItem label="归零情况描述" prop="GLXX_GLQKMS">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入归零情况描述"
                    v-model="table_form_2.GLXX_GLQKMS"
                  ></Input>
                </FormItem>
                <FormItem label="故障定位" prop="GLXX_GZDW">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入故障定位"
                    v-model="table_form_2.GLXX_GZDW"
                  ></Input>
                </FormItem>
                <FormItem label="机理分析/失效分析" prop="GLXX_JLFX_SXFX">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入机理分析/失效分析"
                    v-model="table_form_2.GLXX_JLFX_SXFX"
                  ></Input>
                </FormItem>
                <FormItem label="故障复现" prop="GLXX_GZFX">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入故障复现"
                    v-model="table_form_2.GLXX_GZFX"
                  ></Input>
                </FormItem>
                <FormItem label="改进措施" prop="GLXX_GJCS">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入改进措施"
                    v-model="table_form_2.GLXX_GJCS"
                  ></Input>
                </FormItem>
                <FormItem label="验证情况" prop="GLXX_YZQK">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入验证情况"
                    v-model="table_form_2.GLXX_YZQK"
                  ></Input>
                </FormItem>
                <FormItem label="举一反三" prop="GLXX_JYFS">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入举一反三"
                    v-model="table_form_2.GLXX_JYFS"
                  ></Input>
                </FormItem>
                <FormItem label="结论" prop="GLXX_JL">
                  <Input
                    style=" width: 300px"
                    clearable
                    placeholder="请输入结论"
                    v-model="table_form_2.GLXX_JL"
                  ></Input>
                </FormItem>
              </div>
            </Form>
          </Col>
        </Row>
      </div>
      <div slot="footer" style="text-align:center">
        <Button type="primary" @click="ok" :loading="Modal_btn_load"
          >确定</Button
        >
        <Button type="text" @click="cancel">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { _debounce } from "@/libs/Perform_optimization.js";
export default {
  name: "UploadRecordManagementDetails",
  data() {
    return {
      spin_Modal: true,
      Modal_btn_load: false,
      // 筛选框验证
      form_rules_2: {
        SGLYWJMC: [
          {
            required: true,
            trigger: "blur",
            message: "请输入事故来源文件名称!",
          },
        ],
        SGMC: [
          {
            required: true,
            trigger: "blur",
            message: "请输入事故名称!",
          },
        ],
        SGCWB: [
          {
            required: true,
            trigger: "blur",
            message: "请输入事故纯文本!",
          },
        ],
        SYLY: [
          {
            required: true,
            trigger: "blur",
            message: "请输入术语来源!",
          },
        ],
        SYZWMC: [
          {
            required: true,
            trigger: "blur",
            message: "请输入术语中文名称!",
          },
        ],
        // Test
        DYHJS: [
          {
            required: true,
            trigger: "blur",
            message: "请输入定义或解释!",
          },
        ],
        Test: [
          {
            required: true,
            trigger: "blur",
            message: "请输入元器件百科!",
          },
        ],
        Test: [
          {
            required: true,
            trigger: "blur",
            message: "请输入型号规格!",
          },
        ],
        Test: [
          {
            required: true,
            trigger: "blur",
            message: "请输入标准编号!",
          },
        ],
        Test: [
          {
            required: true,
            trigger: "blur",
            message: "请输入标准中文名称!",
          },
        ],
        // 质量百科
        ZBXH: [
          {
            required: true,
            trigger: "blur",
            message: "请输入装备型号!",
          },
        ],
        SSXT: [
          {
            required: true,
            trigger: "blur",
            message: "请输入所属系统!",
          },
        ],
        CPMC: [
          {
            required: true,
            trigger: "blur",
            message: "请输入产品名称!",
          },
        ],
        CPXH: [
          {
            required: true,
            trigger: "blur",
            message: "请输入产品型号!",
          },
        ],
        XXMS: [
          {
            required: true,
            trigger: "blur",
            message: "请输入现象描述!",
          },
        ],
        GZYY: [
          {
            required: true,
            trigger: "blur",
            message: "请输入故障原因!",
          },
        ],
        GLXX_JLFX_SXFX: [
          {
            required: true,
            trigger: "blur",
            message: "请输入机理分析/失效分析!",
          },
        ],
        GLXX_GJCS: [
          {
            required: true,
            trigger: "blur",
            message: "请输入改进措施!",
          },
        ],
      },
      table_form_2: {},
      // 表格的loading
      loading_1: true,
      // 总页数
      totalCount: 0,
      // 当前页码
      table_current_1: 1,
      // 表格表头
      tableColumns_1: [],
      // 表格数据
      tableData_1: [],
      // 表格勾选的数据ID
      selectedData_1: new Set(),
      // 表格勾选的数据
      selectedData_2: new Set(),
      // 选中的总数量
      selectedSum_1: 0,
      // 获取表格数据时用到的参数
      table_form_1: {
        //   数据类型
        dataType: "",
        //   数据ID
        recordID: "",
        // 获取第几页的数据
        pageNum: "1",
        // 分页的粒度
        pageSize: "10",
      },
      Modal_1: false,
      // 表格点击修改时存储当前点击的数据
      update_data: "",
    };
  },
  methods: {
    //  选中某一行
    handleSelectRow_1(selection, row) {
      this.selectedData_1.add(row.num_id);
      this.selectedData_2.add(row);
      this.selectedSum_1 = this.selectedData_1.size;
    },
    //  取消某一行
    handleCancelRow_1(selection, row) {
      this.selectedData_1.delete(row.num_id);
      this.selectedData_2.forEach((item) => {
        if (item.num_id == row.num_id) {
          this.selectedData_2.delete(item);
        }
      });
      this.selectedSum_1 = this.selectedData_1.size;
    },
    handleSelectAll_1(selection) {
      // 取消全选 数组为空
      if (selection.length === 0) {
        let data = this.$refs.UploadRecordManagementDetails_table1.data;
        data.forEach((item) => {
          if (this.selectedData_1.has(item.num_id)) {
            this.selectedData_1.delete(item.num_id);
            this.selectedData_2.forEach((item_) => {
              if (item_.num_id == item.num_id) {
                this.selectedData_2.delete(item_);
              }
            });
          }
        });
      } else {
        selection.forEach((item) => {
          this.selectedData_1.add(item.num_id);
          this.selectedData_2.forEach((item_) => {
            if (item_.num_id == item.num_id) {
              this.selectedData_2.delete(item_);
            }
          });
          this.selectedData_2.add(item);
        });
      }
      // 同步
      this.selectedSum_1 = this.selectedData_1.size;
    },
    setChecked() {
      // 找到绑定的table的ref对应的dom，找到table的objData对象，objData保存的是当前页的数据
      let objData = this.$refs.UploadRecordManagementDetails_table1.objData;
      for (let index in objData) {
        if (this.selectedData_1.has(objData[index].num_id)) {
          objData[index]._isChecked = true;
        }
      }
    },
    // 表数据
    TableData_1: _debounce(function() {
      this.loading_1 = true;
      this.$axios(
        "/baike/caiji/get_redord_detail",
        "get",
        this.table_form_1
      ).then((res) => {
        // 总页数
        this.totalCount = res.data.data.totalCount;
        // 当前页码
        this.table_current_1 = res.data.data.pageNum;
        res.data.data.resultList.map((item, key) => {
          item.num_id =
            this.table_form_1.pageSize * (this.table_current_1 - 1) + key + 1;
        });
        // 表数据
        setTimeout(() => {
          this.tableData_1 = res.data.data.resultList;
          this.loading_1 = false;
        }, 200);
      });
    }, 200),
    // 切换页码
    table_Pagechange_1(index) {
      this.table_form_1.pageNum = index;
      this.loading_1 = true;
      this.TableData_1();
    },
    // 切换每页显示数量
    table_PageSizechange_1(index) {
      this.table_form_1.pageSize = index;
      this.loading_1 = true;
      this.TableData_1();
    },
    // 表格行查看
    update_1(val) {
      let form_data = {};
      if (this.UploadRecordManagementDetails.SCMBLX == "SYBK") {
      } else if (this.UploadRecordManagementDetails.SCMBLX == "JSBK") {
      } else if (this.UploadRecordManagementDetails.SCMBLX == "MHSG") {
        form_data = {
          detailID: val.SGID,
          dataType: this.UploadRecordManagementDetails.SCMBLX,
        };
      } else if (this.UploadRecordManagementDetails.SCMBLX == "BZBK") {
      } else if (this.UploadRecordManagementDetails.SCMBLX == "YQJBK") {
      } else if (this.UploadRecordManagementDetails.SCMBLX == "ZLBK") {
        form_data = {
          detailID: val.GZID,
          dataType: this.UploadRecordManagementDetails.SCMBLX,
        };
      }
      this.Modal_btn_load = false;
      this.update_data = val;
      this.spin_Modal = true;
      this.Modal_1 = true;
      this.$axios("/baike/caiji/get_detail_info", "get", form_data).then(
        (res) => {
          setTimeout(() => {
            this.spin_Modal = false;
          }, 200);
          this.table_form_2 = res.data.data[0];
        }
      );
    },
    removes_1() {
      if (this.selectedSum_1 == 0) {
        this.$Message.warning({
          content: "请先勾选要删除的数据!",
          background: true,
          duration: 3,
        });
        return;
      }
      // 已选择的数据
      let data = JSON.parse(JSON.stringify(Array.from(this.selectedData_2)));
      let data_filter;
      // 删除民航事故所需的ID参数
      if (this.UploadRecordManagementDetails.SCMBLX == "SYBK") {
      } else if (this.UploadRecordManagementDetails.SCMBLX == "JSBK") {
      } else if (this.UploadRecordManagementDetails.SCMBLX == "MHSG") {
        data_filter = data.map((item) => {
          return item.SGID;
        });
      } else if (this.UploadRecordManagementDetails.SCMBLX == "BZBK") {
      } else if (this.UploadRecordManagementDetails.SCMBLX == "YQJBK") {
      } else if (this.UploadRecordManagementDetails.SCMBLX == "ZLBK") {
        data_filter = data.map((item) => {
          return item.GZID;
        });
      }

      data_filter = data_filter.join(",");
      this.$axios("/baike/caiji/delete_baike_info", "GET", {
        dataType: this.UploadRecordManagementDetails.SCMBLX,
        baikeID: data_filter,
      }).then((res) => {
        if (res.data.code == 200) {
          this.$Message.success({
            content: "删除数据成功！",
            background: true,
            duration: 3,
          });
        } else {
          this.$Message.error({
            content: "删除数据失败,请重新选择！",
            background: true,
            duration: 3,
          });
        }
        // // 重置检索
        // this.handleReset("table_form_1");
        // 需先重置参数如分页倒序检索条件
        this.loading_1 = true;
        this.selectedData_1 = new Set();
        this.selectedData_2 = new Set();
        this.selectedSum_1 = this.selectedData_1.size;
        //第几页
        this.table_form_1.pageNum = 1;
        this.TableData_1();
      });
    },
    ok() {
      this.Modal_btn_load = true;
      this.$refs["table_form_2"].validate((valid) => {
        if (valid) {
          // 校验通过
          let data_1 = {};
          if (this.UploadRecordManagementDetails.SCMBLX == "SYBK") {
          } else if (this.UploadRecordManagementDetails.SCMBLX == "JSBK") {
          } else if (this.UploadRecordManagementDetails.SCMBLX == "MHSG") {
            data_1 = {
              detailID: this.update_data.SGID,
              dataType: this.UploadRecordManagementDetails.SCMBLX,
            };
          } else if (this.UploadRecordManagementDetails.SCMBLX == "BZBK") {
          } else if (this.UploadRecordManagementDetails.SCMBLX == "YQJBK") {
          } else if (this.UploadRecordManagementDetails.SCMBLX == "ZLBK") {
            data_1 = {
              detailID: this.update_data.GZID,
              dataType: this.UploadRecordManagementDetails.SCMBLX,
            };
          }
          let default_obj = {};
          let default_obj_from = Object.assign(
            default_obj,
            this.table_form_2,
            data_1
          );
          // Get请求有参数的字节大小限制，故使用Post，只需要后端配置一下不限制大小即可
          this.$axios(
            "/baike/caiji/detail_edit",
            "post",
            this.$qs.stringify(default_obj_from)
          ).then((res) => {
            if (res.data.code == 200) {
              this.$Message.success({
                content: "修改数据成功！",
                background: true,
                duration: 5,
              });
            } else {
              this.$Message.error({
                content: "修改数据失败,请重试！",
                background: true,
                duration: 5,
              });
            }
            // 需先重置参数如分页倒序检索条件
            this.loading_1 = true;
            this.selectedData_1 = new Set();
            this.selectedData_2 = new Set();
            this.selectedSum_1 = this.selectedData_1.size;
            //第几页
            this.table_form_1.pageNum = 1;
            this.Modal_1 = false;
            setTimeout(() => {
              this.Modal_btn_load = false;
              this.loading_1 = true;
              this.TableData_1();
            }, 500);
          });
        } else {
          this.$Message.error({
            duration: 5,
            background: true,
            content: "表单验证失败!",
          });
          this.Modal_btn_load = false;
        }
      });
    },
    cancel() {
      this.Modal_1 = false;
      // this.$Message.warning({
      //   duration: 5,
      //   background: true,
      //   content: "全局提示规范"
      // });
    },
    // 检索搜索框
    search_input_change_1(index) {
      // 需先重置参数如分页倒序检索条件
      this.selectedData_1 = new Set();
      this.selectedData_2 = new Set();
      this.selectedSum_1 = this.selectedData_1.size;
      // this.table_form_1.age = index;
      this.loading_1 = true;
      this.TableData_1();
    },
  },
  watch: {
    tableData_1: function() {
      // 给表格数据赋值后并渲染完成表格后执行
      this.$nextTick(function() {
        // Spin.hide();
        this.setChecked();
        this.loading_1 = false;
      });
    },
  },
  computed: {
    UploadRecordManagementDetails() {
      return this.$store.state.page.UploadRecordManagementDetails;
    },
  },
  created() {
    //   还差标准百科和元器件百科的表头的Key未定义
    //   重置数据类型
    if (
      this.UploadRecordManagementDetails.SCMBLX == "术语百科" ||
      this.UploadRecordManagementDetails.SCMBLX == "军事百科" ||
      this.UploadRecordManagementDetails.SCMBLX == "SYBK" ||
      this.UploadRecordManagementDetails.SCMBLX == "JSBK"
    ) {
      this.UploadRecordManagementDetails.SCMBLX =
        this.UploadRecordManagementDetails.SCMBLX == "术语百科"
          ? "SYBK"
          : this.UploadRecordManagementDetails.SCMBLX == "军事百科"
          ? "JSBK"
          : this.UploadRecordManagementDetails.SCMBLX;
      this.tableColumns_1 = [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "序号",
          key: "num_id",
          align: "center",
          tooltip: true,
          width: 80,
        },
        {
          title: "术语来源",
          key: "SYLY",
          align: "center",
          tooltip: true,
          minWidth: 100,
        },
        {
          title: "术语中文名称",
          key: "SYZWMC",
          align: "center",
          tooltip: true,
          minWidth: 140,
        },
        {
          title: "术语英文名称",
          key: "SYYWMC",
          align: "center",
          tooltip: true,
          minWidth: 130,
        },
        {
          title: "术语缩略语",
          key: "SYSLY",
          align: "center",
          tooltip: true,
          minWidth: 130,
        },
        {
          title: "同义词",
          key: "TYC",
          align: "center",
          tooltip: true,
          minWidth: 125,
        },
        {
          title: "分类",
          key: "SSFLMC",
          align: "center",
          tooltip: true,
          minWidth: 100,
        },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    ghost: true,
                  },
                  style: {
                    marginRight: "5px",
                    color: "#2d8cf0",
                  },
                  on: {
                    click: () => {
                      this.update_1(params.row);
                    },
                  },
                },
                "修改"
              ),
            ]);
          },
        },
      ];
    } else if (
      this.UploadRecordManagementDetails.SCMBLX == "民航事故" ||
      this.UploadRecordManagementDetails.SCMBLX == "MHSG"
    ) {
      this.UploadRecordManagementDetails.SCMBLX = "MHSG";
      this.tableColumns_1 = [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "序号",
          key: "num_id",
          align: "center",
          tooltip: true,
          width: 80,
        },
        {
          title: "事故来源文件名称",
          key: "SGLYWJMC",
          align: "center",
          tooltip: true,
          minWidth: 140,
        },
        {
          title: "事故来源文件期数",
          key: "SGLYWJQS",
          align: "center",
          tooltip: true,
          minWidth: 140,
        },
        {
          title: "事故名称",
          key: "SGMC",
          align: "center",
          tooltip: true,
          minWidth: 140,
        },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    ghost: true,
                  },
                  style: {
                    marginRight: "5px",
                    color: "#2d8cf0",
                  },
                  on: {
                    click: () => {
                      this.update_1(params.row);
                    },
                  },
                },
                "修改"
              ),
            ]);
          },
        },
      ];
    } else if (
      this.UploadRecordManagementDetails.SCMBLX == "标准百科" ||
      this.UploadRecordManagementDetails.SCMBLX == "BZBK"
    ) {
      this.UploadRecordManagementDetails.SCMBLX = "BZBK";
      this.tableColumns_1 = [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "序号",
          key: "num_id",
          align: "center",
          tooltip: true,
          width: 80,
        },
        {
          title: "标准编号",
          key: "Test",
          align: "center",
          tooltip: true,
          minWidth: 140,
        },
        {
          title: "中文名称",
          key: "Test",
          align: "center",
          tooltip: true,
          minWidth: 140,
        },
        {
          title: "外文名称",
          key: "Test",
          align: "center",
          tooltip: true,
          minWidth: 140,
        },
        {
          title: "编制单位",
          key: "Test",
          align: "center",
          tooltip: true,
          minWidth: 140,
        },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    ghost: true,
                  },
                  style: {
                    marginRight: "5px",
                    color: "#2d8cf0",
                  },
                  on: {
                    click: () => {
                      this.update_1(params.row);
                    },
                  },
                },
                "修改"
              ),
            ]);
          },
        },
      ];
    } else if (
      this.UploadRecordManagementDetails.SCMBLX == "元器件百科" ||
      this.UploadRecordManagementDetails.SCMBLX == "YQJBK"
    ) {
      this.UploadRecordManagementDetails.SCMBLX = "YQJBK";
      this.tableColumns_1 = [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "序号",
          key: "num_id",
          align: "center",
          tooltip: true,
          width: 80,
        },
        {
          title: "名称",
          key: "Test",
          align: "center",
          tooltip: true,
          minWidth: 120,
        },
        {
          title: "型号规格",
          key: "Test",
          align: "center",
          tooltip: true,
          minWidth: 140,
        },
        {
          title: "技术指标",
          key: "Test",
          align: "center",
          tooltip: true,
          minWidth: 130,
        },
        {
          title: "工作温度",
          key: "Test",
          align: "center",
          tooltip: true,
          minWidth: 100,
        },
        {
          title: "生产厂商",
          key: "Test",
          align: "center",
          tooltip: true,
          minWidth: 125,
        },
        {
          title: "国产/进口",
          key: "Test",
          align: "center",
          tooltip: true,
          minWidth: 110,
        },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    ghost: true,
                  },
                  style: {
                    marginRight: "5px",
                    color: "#2d8cf0",
                  },
                  on: {
                    click: () => {
                      this.update_1(params.row);
                    },
                  },
                },
                "修改"
              ),
            ]);
          },
        },
      ];
    } else if (
      this.UploadRecordManagementDetails.SCMBLX == "质量百科" ||
      this.UploadRecordManagementDetails.SCMBLX == "ZLBK"
    ) {
      this.UploadRecordManagementDetails.SCMBLX = "ZLBK";
      this.tableColumns_1 = [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "序号",
          key: "num_id",
          align: "center",
          tooltip: true,
          width: 80,
        },
        {
          title: "数据来源",
          key: "SJLY",
          align: "center",
          tooltip: true,
          minWidth: 120,
        },
        {
          title: "装备型号",
          key: "ZBXH",
          align: "center",
          tooltip: true,
          minWidth: 140,
        },
        {
          title: "所属系统",
          key: "SSXT",
          align: "center",
          tooltip: true,
          minWidth: 130,
        },
        {
          title: "产品名称",
          key: "CPMC",
          align: "center",
          tooltip: true,
          minWidth: 100,
        },
        {
          title: "故障类型",
          key: "GZLX",
          align: "center",
          tooltip: true,
          minWidth: 125,
        },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    ghost: true,
                  },
                  style: {
                    marginRight: "5px",
                    color: "#2d8cf0",
                  },
                  on: {
                    click: () => {
                      this.update_1(params.row);
                    },
                  },
                },
                "修改"
              ),
            ]);
          },
        },
      ];
    }
  },
  mounted() {
    // 目前只有民航事故
    //   重置数据类型
    this.table_form_1.dataType = this.UploadRecordManagementDetails.SCMBLX;
    //   重置数据ID
    this.table_form_1.recordID = this.UploadRecordManagementDetails.SCJLID;
    // 获取表格数据
    this.loading_1 = true;
    this.TableData_1();
  },
};
</script>
<style lang="less" scoped>
.Modal_row_box {
  height: 450px;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.ivu-btn-text:hover {
  background: initial;
}
</style>
