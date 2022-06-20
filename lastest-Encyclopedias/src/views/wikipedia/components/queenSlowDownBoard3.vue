<template>
    <div class="flex">
        <div class="left_module">
            <div class="main_info unique_wrap" v-if="subDetailData.middleContent != null">
                <div class="lemmaWgt_lemmaTitle flex vertical_center">
                    <span>{{ subDetailData.topContent.Text_title }}</span>
                    <ul class="handle_lemma flex">
                        <li class="disable-color">
                            <i class="iconfont icon-erji"></i>
                            <span>语音</span>
                        </li>
                        <li class="disable-color">
                            <i class="iconfont icon-bianji"></i>
                            <span>编辑</span>
                        </li>
                        <li class="disable-color">
                            <i class="iconfont icon-xinxi"></i>
                            <span>讨论</span>
                        </li>
                        <li class="disable-color">
                            <i class="iconfont icon-zengjia-cuxiantiao"></i>
                            <span>上传视频</span>
                        </li>
                    </ul>
                    <div @click="isTrue">
                        <collection :coliectionData="coliectionData"></collection>
                    </div>
                </div>
                <div class="text" style="text-indent: 0px;" v-html="changeHtml(subDetailData.topContent.Text_Content)"></div>
                <!-- <div class="btm_wrap">
          <Button type="primary" style="margin-right: 15px;">质量报告</Button>
          <Button>查看图谱</Button>
        </div> -->
            </div>
            <div style="margin-top: 16px;" v-for="(item, index) in subDetailData.middleContent" :key="index">
                <div v-for="(item2, index2) in item.middleBox" :key="index + index2" style="padding-top:20px;background: white;">
                    <div class="ifififi" v-if="item2.Text_Type == 'Text&Picture'">
                        <div class="unique_wrap fun_diagram padding_0">
                            <div class="unique_title_text flex">
                                <span>{{ item2.Text_title }}</span>
                                <div class="show_type vertical_center flex">
                                    <span @click="clickzhankai(item2)">{{
                    item2.isOpen ? "收起" : "展开"
                  }}</span>
                                    <i class="iconfont icon-shouqi" :class="{ 'down-rotate': item2.isOpen }"></i>
                                </div>
                            </div>
                            <collapse>
                                <!-- :class="[
                    item2.isOpen == true
                      ? 'div-height-open'
                      : 'div-height-close',
                  ]" -->
                                <div style="overflow: hidden;" v-show="item2.isOpen">
                                    <!-- <div class="text">
                    <div
                      class="img_wrap"
                      style="margin-left: 20px;"
                    >
                      <img src="http://n.sinaimg.cn/sinakd2021626s/581/w850h531/20210626/3a11-krwipar6835151.jpg" />
                    </div>
                    {{ item2.Text_Content }}
                  </div> -->
                                    <div class="text" style="text-indent: 0px;" v-html="changeHtml(item2.Text_Content)"></div>
                                    <!-- <div class="text" style="margin-bottom: 0px;">
                    减速板通常对称地布置在机身或机翼上，同时为了不破坏飞机的飞行姿态，阻力作用点的位置必须进行验算和实验。因此，当选择减速板在飞机上的具体安装位置时，需要同时考虑飞机的外形结构、重心位置、重量分布、整体结构强度、飞行姿态等多种因素，而不同飞机上减速板的安装位置也变的五花八门。
                  </div> -->
                                </div>
                            </collapse>
                        </div>
                    </div>
                    <div v-if="item2.Text_Type == 'table'">
                        <div class="unique_wrap padding_0">
                            <div class="unique_title_text flex" style="margin-bottom: 17px;">
                                <span>{{ item2.Text_title }}</span>
                                <div class="show_type vertical_center flex">
                                    <span @click="clickzhankai(item2)">{{
                    item2.isOpen ? "收起" : "展开"
                  }}</span>
                                    <i class="iconfont icon-shouqi" :class="{ 'down-rotate': item2.isOpen }"></i>
                                </div>
                            </div>
                            <collapse>
                                <div class="table scope_table" style="overflow: hidden;" v-show="item2.isOpen">
                                    <table>
                                        <tr v-for="(table_item, index3) in item2.Text_Content" :key="index + index2 + index3">
                                            <td style="width:150px;">
                                                <div style="width:150px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;word-break: break-all;text-align: left;padding-left: 25px;">
                                                    {{ getMapKeyAndValueWithString(table_item, "k") }}
                                                </div>
                                            </td>
                                            <td>
                                                <div style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;word-break: break-all;text-align: left;padding-left: 25px;">
                                                    {{ getMapKeyAndValueWithString(table_item, "v") }}
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </collapse>
                        </div>
                    </div>
                    <div class="ifififi" v-if="item2.Text_Type == 'text'">
                        <div class="unique_wrap padding_0">
                            <div class="unique_title_text flex" style="margin-bottom: 17px;">
                                <span>{{ item2.Text_title }}</span>
                                <div class="show_type vertical_center flex">
                                    <span @click="clickzhankai(item2)">{{
                    item2.isOpen ? "收起" : "展开"
                  }}</span>
                                    <i class="iconfont icon-shouqi" :class="{ 'down-rotate': item2.isOpen }"></i>
                                </div>
                            </div>
                            <collapse>
                                <div style="overflow: hidden;" v-show="item2.isOpen">
                                    <!-- <div class="text">{{ item2.Text_Content }}</div> -->
                                    <div class="text" style="text-indent: 0px;" v-html="changeHtml(item2.Text_Content)"></div>
                                </div>
                            </collapse>
                        </div>
                    </div>

                    <div class="ifififi" v-if="item2.Text_Type == 'MapInList'">
                        <div class="unique_wrap padding_0">
                            <div class="solid_title">
                                {{ item2.Text_title }}
                            </div>
                            <div>
                                <Form inline ref="table_form_1" :rules="faultList.form_rules_1" :model="faultList.table_form_1" label-position="left">
                                    <FormItem label="起至时间" prop="selectTime" :label-width="80">
                                        <DatePicker v-model="faultList.table_form_1.selectTime" type="daterange" placement="bottom-end" placeholder="请选择时间" style="width: 100%"></DatePicker>
                                    </FormItem>
                                    <FormItem label="是否有归零" prop="searchName" :label-width="90">
                                        <Select v-model="faultList.table_form_1.selectType" placeholder="请选择类型" style="width: 100px">
                                            <Option v-for="item in faultList.typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </FormItem>
                                    <!-- <FormItem v-if="privateShow" label="故障类型" prop="searchName" :label-width="80">
                                        <Select v-model="faultList.table_form_1.selectgzType" placeholder="故障类型" style="width: 100px">
                                            <Option v-for="item in faultList.gztypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                        </Select>
                                    </FormItem> -->
                                    <Button type="primary" @click="searchXXGZ">查询</Button>
                                    <Button @click="resetData(faultList.table_form_1)" style="margin-left: 8px">重置</Button>
                                </Form>
                            </div>
                            <div class="table" v-if="privateShow">
                                <Table width="840" border stripe :columns="xhgzcolumns" :data="faultList.data" no-data-text="暂无内容"></Table>
                            </div>
                            <div class="table" v-else>
                                <Table width="840" border stripe :columns="xhgzcolumns_private" :data="faultList.data" no-data-text="暂无内容"></Table>
                            </div>
                            <Row v-if="spin_search_Page_box">
                                <Col span="24">
                                <div style="padding-top: 15px;display: flex;justify-content: center;align-items: center;">
                                    <div>
                                        <span style="margin-right: 10px">共{{ totalCount }}条记录</span>
                                    </div>
                                    <div>
                                        <Page :total="totalCount" :current="table_current_1" :page-size="5" :page-size-opts="[5, 10, 20, 30]" @on-change="table_Pagechange_1" @on-page-size-change="table_PageSizechange_1" show-sizer show-elevator></Page>
                                    </div>
                                </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="unique_wrap margin_tp">
        <div class="solid_title flex">
          <span style="flex: 1;">故障归零情况分析</span>
          <ul class="handle_lemma flex">
            <li>
              <i class="iconfont icon-erji"></i>
              <span>语音</span>
            </li>
            <li>
              <i class="iconfont icon-bianji"></i>
              <span>编辑</span>
            </li>
            <li>
              <i class="iconfont icon-xinxi"></i>
              <span>讨论</span>
            </li>
            <li>
              <i class="iconfont icon-zengjia-cuxiantiao"></i>
              <span>上传视频</span>
            </li>
          </ul>
        </div>
        <div>
          <Radio-group
            v-model="button2"
            type="button"
            class="flex vertical_center"
          >
            <Radio label="故障描述"></Radio>
            <Radio :label="'机理分析\n失效分析'"></Radio>
            <Radio label="深圳"></Radio>
            <Radio label="杭州"></Radio>
          </Radio-group>
          <ul class="malfunctionAnalyseList">
            <li v-for="item in 5" :key="item">
              <img
                src="http://n.sinaimg.cn/sinakd2021626s/581/w850h531/20210626/3a11-krwipar6835151.jpg"
              />
              <div class="info flex">
                <div class="name">环境、载荷分析</div>
                <div class="describe text_hidden_3">
                  对于随机载荷，统计分析方法主要有两类：计数法和功率谱法。由于产生疲劳损伤的主要原因是循环次数和应力幅值，因此在编谱时首先必须遵循某一等效损伤原则，将随机的应力—时间历程简化为一系列不同幅值的全循环和半循环，这一简化的过程叫做计数法。功率谱法是借助富氏变换，将连续变化的.
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div> -->
        </div>
        <div class="right_module">
            <div class="info_picture_wrap" v-if="true">
                <Carousel v-model="carouselValue" loop>
                    <CarouselItem v-for="(item, index) in rotate_Pictures_urls" :key="index">
                        <div>
                            <img style="width:100%;height:187px" :src="item" />
                        </div>
                    </CarouselItem>
                </Carousel>
                <p>图片({{ rotate_Pictures_urls.length }})张</p>
            </div>
            <!-- 相似产品词条 -->
            <div class="termExplain" v-if="search_term.data.length > 0">
                <ul class="list_nav_ul flex">
                    <li class="active">{{ search_term.header }}</li>
                </ul>
                <div class="list">
                    <div class="item flex" v-for="(item, index) in search_term.data" :key="index">
                        <Tooltip style="width: 100%;" max-width="350" theme="light" :content="
                item.title +
                  '\n' +
                  '释义来源：' +
                  (item.source ? item.source : '暂无数据')
              ">
                            <div class="item flex item_hover" @click="didClickTerm(item)">
                                <span style="width: 50%;" class="name">{{ item.title }}</span>
                                <span style="width: 50%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">释义来源：{{ item.source || "暂无数据" }}</span>
                            </div>
                        </Tooltip>
                        <!-- <div class="info_details" v-show="false">
              对于歼击机、强击机，应根据空机重量、乘员、滑油、氧气重量、按战术技术要求携带的基本武器重量以及按战术技术要求确定的机内燃油重量之和确定；
              对于其他类飞机，应根据带基本任务有效负载和
            </div> -->
                    </div>
                </div>
            </div>
            <!-- 标准中的知识-->
            <div class="standardKnowledge" v-if="search_standard.data.length > 0">
                <ul class="list_nav_ul flex">
                    <li class="active">{{ search_standard.header }}</li>
                </ul>
                <div class="list">
                    <div class="item flex" v-for="(item, index) in search_standard.data" :key="index" @click="didClickstandardKnowledge(item)">
                        <img :src="require('@/img/lianjie.png')" />
                        <Tooltip max-width="350" theme="light" :content="item.title">
                            <span class="name item_hover">{{ item.title }}</span>
                        </Tooltip>
                        <!-- <div class="info_details" v-show="false">
              对于歼击机、强击机，应根据空机重量、乘员、滑油、氧气重量、按战术技术要求携带的基本武器重量以及按战术技术要求确定的机内燃油重量之和确定；
              对于其他类飞机，应根据带基本任务有效负载和
            </div> -->
                    </div>
                </div>
            </div>
            <!--  其他推荐 -->
            <div class="restsRecommend" v-if="search_other.data.length > 0">
                <ul class="list_nav_ul flex">
                    <li class="active">{{ search_other.header }}</li>
                </ul>
                <div class="list">
                    <div class="item" v-for="(item, index) in search_other.data" :key="index" @click="didClickrestsRecommend(item)">
                        <Tooltip max-width="350" theme="light" :content="item.title">
                            <div class="title text_hidden_1">
                                {{ item.title }}
                            </div>
                        </Tooltip>
                        <div class="info flex">
                            <img :src="$store.state.app.img_url + item.image" />
                            <div class="flex text_info">
                                <Tooltip max-width="350" theme="light" :content="item.description">
                                    <span class="name text_hidden_2">{{ item.description }}</span>
                                </Tooltip>
                                <span style="flex: 1;"></span>
                                <span class="reason">推荐理由:{{ item.data_type }}</span>
                            </div>
                        </div>
                        <!-- <div class="info_details" v-show="false">
              对于歼击机、强击机，应根据空机重量、乘员、滑油、氧气重量、按战术技术要求携带的基本武器重量以及按战术技术要求确定的机内燃油重量之和确定；
              对于其他类飞机，应根据带基本任务有效负载和
            </div> -->
                    </div>
                </div>
            </div>
        </div>
        <failure-record-model v-if="privateShow" :failureRecord="table_current_item" ref="failureRecord"></failure-record-model>
        <failure-record-model-private v-else :failureRecord="table_current_item" ref="failureRecord"></failure-record-model-private>
    </div>
</template>

<script>
import collapse from '@/libs/collapse';
import failureRecordModel from './failureRecordModel';
import failureRecordModelPrivate from './failureRecordModel_private';
import { time_format } from '@/libs/tools';
import collection from '@/components/collection.vue';
import FailureRecordModel_private from './failureRecordModel_private.vue';
export default {
  name: 'queenSlowDownBoard',
  props: ['detailData'],
  components: {
    collapse,
    failureRecordModel,
    failureRecordModelPrivate,
    collection
  },
  data() {
    return {
      coliectionType: '质量知识百科', //["术语知识百科","标准指标", "标准知识百科", "质量知识百科", "元器件知识百科", "民航事故百科" ]
      coliectionData: {
        username: '',
        content: { type: '', name: '', param: { query: '' } },
      },
      subDetailData: { middleContent: null },
      privateShow: false, // XX院的判断  型号故障记录--true  内场质量问题---false
      search_term: { data: [] },
      search_standard: { data: [] },
      //   search_newword: {},
      search_other: { data: [] },
      search_keyword: '飞机结构',
      faultList: {
        table_form_1: {
          selectType: '0', //页面筛序是否有归零
          selectgzType: '0', //页面筛序故障类型
          selectTime: [], //页面筛序时间
          startTime: '', //上传处理时间
          endTime: '', //上传处理时间
          // faultZeroingAnalysis: false, //上传处理是否有归零
          // faultType: '', //上传处理故障类型
        },
        form_rules_1: {},
        data: [],
        typeList: [
          {
            value: '0',
            label: '全部',
          },
          {
            value: '1',
            label: '是',
          },
          {
            value: '2',
            label: '否',
          },
        ],
        gztypeList: [
          {
            value: '0',
            label: '全部',
          },
          {
            value: 'inner',
            label: '内场故障',
          },
          {
            value: 'outer',
            label: '外场故障',
          },
        ],
      },
      spin_search_Page_box: true,
      // privateShow: false, //判断是不是XX院的
      table_current_1: 1,
      totalCount: 1,
      // 当前页
      pageNum: '1',
      // 分页粒度
      pageSize: '5',
      table_current_item: {},
      rotate_Pictures_urls: [
        'http://n.sinaimg.cn/sinakd2021626s/581/w850h531/20210626/3a11-krwipar6835151.jpg',
      ],
      carouselValue: 0,
      xhgzcolumns: [
        {
          title: '序号',
          key: 'name',
          align: 'center',
          width: 70,
          render: (h, params) => {
            return h('span', {}, params.index + 1);
          },
        },
        // {
        //   title: '故障类型',
        //   key: 'faultType',
        //   align: 'center',
        //   width: 100,
        //   render: (h, params) => {
        //     if (params.row.DateOfOccurrence) {
        //       return h(
        //         'div',
        //         time_format(
        //           new Date(new Date(params.row.DateOfOccurrence).getTime())
        //         )
        //       );
        //     } else {
        //       return '';
        //     }
        //   },
        // },
        {
          title: '飞机型号',
          key: 'planeType',
          align: 'center',
          width: 100,
        },
        {
          title: '所属系统',
          key: 'SystemStr',
          align: 'center',
          width: 100,
        },
        {
          title: '产品名称',
          key: 'productName',
          align: 'center',
          width: 100,
        },
        {
          title: '现象分类',
          key: 'PhenomenonClassification',
          align: 'center',
          width: 100,
        },
        {
          title: '发生时间',
          key: 'DateOfOccurrence',
          align: 'center',
          width: 100,
          render: (h, params) => {
            if (params.row.DateOfOccurrence) {
              return h(
                'div',
                time_format(
                  new Date(new Date(params.row.DateOfOccurrence).getTime())
                )
              );
            } else {
              return '';
            }
          },
        },
        {
          title: '原因分类',
          key: 'causeClassification',
          align: 'center',
          width: 100,
        },
        {
          title: '是否有归零',
          key: '',
          align: 'center',
          width: 80,
          fixed: 'right',
          render: (h, params) => {
            return h(
              'span',
              {},
              this.checkIsThereAnyZeroingInformation(params.row)
            );
          },
        },
        {
          title: '操作',
          key: 'action',
          width: 80,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h(
              'div',
              {
                style: {
                  cursor: 'pointer',
                  // color: "#3388ff"
                },
                class: { 'operation-buttons': true },
              },
              [
                h(
                  'span',
                  {
                    on: {
                      click: () => {
                        this.lookfaultZeroingAnalysisDetail(params.row);
                      },
                    },
                  },
                  '查看'
                ),
              ]
            );
          },
        },
      ],
      xhgzcolumns_private: [
        {
          title: '序号',
          key: 'name',
          align: 'center',
          width: 70,
          render: (h, params) => {
            return h('span', {}, params.index + 1);
          },
        },
        {
          title: '产品型号',
          key: 'productId ',
          align: 'center',
          width: 100,
        },
        {
          title: '产品名称',
          key: 'productName',
          align: 'center',
          width: 100,
        },
        {
          title: '产品编号',
          key: 'productCode',
          align: 'center',
          width: 100,
        },
        {
          title: '现象分类',
          key: 'xxflname',
          align: 'center',
          width: 100,
        },
        {
          title: '原因分类',
          key: 'yyflname',
          align: 'center',
          width: 100,
        },
        {
          title: '产品处理意见',
          key: 'czyjjjzcs_cpclyj',
          align: 'center',
          width: 100,
        },
        {
          title: '故障件处理意见',
          key: 'czyjjjzcs_gzjclyj',
          align: 'center',
          width: 100,
        },
        {
          title: '是否有归零',
          key: '',
          align: 'center',
          width: 80,
          fixed: 'right',
          render: (h, params) => {
            return h(
              'span',
              {},
              this.checkIsThereAnyZeroingInformation(params.row)
            );
          },
        },
        {
          title: '操作',
          key: 'action',
          width: 80,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h(
              'div',
              {
                style: {
                  cursor: 'pointer',
                  // color: "#3388ff"
                },
                class: { 'operation-buttons': true },
              },
              [
                h(
                  'span',
                  {
                    on: {
                      click: () => {
                        this.lookfaultZeroingAnalysisDetail(params.row);
                      },
                    },
                  },
                  '查看'
                ),
              ]
            );
          },
        },
      ],
    };
  },
  mounted() {},
  computed: {
    WikipediaDetails() {
      return this.$store.state.page.WikipediaDetails;
    },
    detailId() {
      return this.$route.query.id;
    },
  },
  methods: {
    // 点击收藏
    isTrue() {
      this.coliectionData.username = this.$store.state.user.userInfo.username;
      this.coliectionData.content.type = this.coliectionType;
      this.coliectionData.content.name = this.subDetailData.topContent.Text_title;
      this.coliectionData.content.param = {
        query: this.$route.query.id,
      };
    },
    changeHtml(html) {
      html = html.replace(/src=\"/g, `src="` + this.$store.state.app.img_url);
      return html;
    },
    clickzhankai(item2) {
      item2.isOpen = !item2.isOpen;
    },
    getMapKeyAndValueWithString(content, type) {
      if (content == undefined || content == '') {
        return '';
      }
      if (content.indexOf('@') != -1) {
        let arr = content.split('@');
        if (arr.length > 1) {
          if (type == 'k') {
            return arr[0];
          }
          if (type == 'v') {
            return arr[1];
          }
        }
      }
      return '';
    },
    loadAllData() {
      // this.search_keyword = "1111111111"
      //搜索结果页-相关术语
      this.loadSearch_term();
      //搜索结果页-标准中的知识
      this.loadSearch_standard();
      //搜索结果页-其他领域知识推荐
      this.loadSearch_other();
    },
    //搜索结果页-相关术语
    loadSearch_term() {
      //，如果index不输入默认是只有术语，加上质量的baike_text_search_quality_data，结果会返回质量的数据
      this.$axios(
        '/baike/sousuo/search_term',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
          index: 'baike_text_search_hk_word,baike_text_search_quality_data',
        })
      ).then(res => {
        this.search_term = res.data;
      });
    },
    //搜索结果页-标准中的知识
    loadSearch_standard() {
      this.$axios(
        '/baike/sousuo/search_standard',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
        })
      ).then(res => {
        this.search_standard = res.data;
      });
    },
    //搜索结果页-其他领域知识推荐
    loadSearch_other() {
      this.$axios(
        '/baike/sousuo/search_other',
        'post',
        this.$qs.stringify({
          query: this.search_keyword,
          uid: this.$store.state.user.userInfo.username,
        })
      ).then(res => {
        this.search_other = res.data;
      });
    },
    // 切换页码
    table_Pagechange_1(index) {
      this.pageNum = index;
      this.requestGuzhangDetailData();
    },
    // 切换每页显示数量
    table_PageSizechange_1(index) {
      this.pageSize = index;
      this.requestGuzhangDetailData();
    },
    //故障详情
    requestGuzhangDetailData() {
      this.$axios('/baike/appServer/requestGetData', 'get', {
        uToken: this.$store.state.user.token,
        uid: this.$store.state.user.userInfo.username,
        requestSource: 'ZL',
        requestCode: '92612',
        requestFuncId: '102',
        requestTime: Date.parse(new Date()) / 1000,
        requestParams: {
          Fault_Id: this.detailId,
          Page_Size: this.pageSize,
          Page_NUM: this.pageNum,
          Only_Records: true,
          startTime: this.faultList.table_form_1.startTime,
          endTime: this.faultList.table_form_1.endTime,
          faultZeroingAnalysis: this.faultList.table_form_1
            .faultZeroingAnalysis,
          faultType: this.faultList.table_form_1.faultType,
        },
      }).then(res => {
        // let middleBox = res.data.data.middleContent[0].middleBox[0];
        let middleBox = res.data.data;
        this.faultList.data = middleBox.Text_Content;
        this.table_current_1 = middleBox.Current_Page;
        this.totalCount = middleBox.Count_Intems;
        if (this.totalCount > 0) {
          this.spin_search_Page_box = true;
        }
      });
    },
    //处理故障数据  分页
    guzhangProcessingData() {
      if (this.detailData.middleContent == undefined) {
        return;
      }
      this.detailData.middleContent.forEach(middleContent => {
        middleContent.middleBox.forEach((middleBox, index) => {
          if (middleBox.Text_Type == 'MapInList') {
            this.faultList.data = middleBox.Text_Content;
            this.totalCount = middleBox.Count_Intems;
            this.pageNum = middleBox.Current_Page;
            this.pageSize = middleBox.Page_Size;
            if (middleBox.Text_title == '型号故障记录') {
              this.privateShow = true;
              this.$emit('privateShow', true);
            } else {
              this.privateShow = false;
              this.$emit('privateShow', false);
            }
          }
        });
      });
    },
    lookfaultZeroingAnalysisDetail(table_item) {
      this.table_current_item = table_item;
      this.$refs.failureRecord.subShowTree();
      // console.log(table_item);
      // this.$router.push({
      //   path: "/CivilAviationDetail",
      //   query: {
      //     id: table_item.sgid,
      //   },
      // });
    },
    //重置
    resetData(table_form_1) {
      table_form_1.selectType = '0';
      table_form_1.selectgzType = '0';
      table_form_1.selectTime = [];
      table_form_1.startTime = '';
      table_form_1.endTime = '';
      table_form_1.faultZeroingAnalysis = false;
      table_form_1.faultType = '';
    },
    //筛选故障记录
    searchXXGZ() {
      //搜索型号故障记录  筛选
      this.pageNum = 1;
      var startTime = '';
      var endTime = '';
      var selectTime = this.faultList.table_form_1.selectTime;

      if (selectTime.length > 0) {
        let time = selectTime[0];
        if (time) {
          startTime = time_format(new Date(new Date(selectTime[0]).getTime()));
          startTime = startTime.slice(0, 11) + '00:00:00';
        }

        if (selectTime.length > 1) {
          let time = selectTime[1];
          if (time) {
            endTime = time_format(new Date(new Date(selectTime[1]).getTime()));
            endTime = endTime.slice(0, 11) + '23:59:59';
          }
        }
      }
      //处理时间
      this.faultList.table_form_1.startTime = startTime;
      this.faultList.table_form_1.endTime = endTime;
      //是否有归零
      if (this.faultList.table_form_1.selectType == '1') {
        this.faultList.table_form_1.faultZeroingAnalysis = true;
      } else {
        this.faultList.table_form_1.faultZeroingAnalysis = false;
      }
      //处理故障类型
      if (this.faultList.table_form_1.selectgzType == '0') {
        this.faultList.table_form_1.faultType = '';
      } else {
        this.faultList.table_form_1.faultType = this.faultList.table_form_1.selectgzType;
      }
      this.requestGuzhangDetailData();
    },
    didClickTerm(item) {
      //数据结构新增了data_type，search_id就是质量那边的详情页的id，但是现在没有数据，所以搜到的还是术语，质量那边的data_type具体叫什么也还没确定。还是用search_term的接口，需要新增一个index的key，在里面输入
      if (item.data_type == 'hk_word') {
        //术语
        // this.$router.push({
        //   name: "TermDetail",
        //   query: { id: item.search_id },
        // });
        this.didClickRecommendDetail(item);
      } else if (item.data_type == 'quality_all') {
        console.log('item11', item);
        //质量
        //路由跳转详情
        this.$router.push({
          name: 'qualityWikipediaDetails',
          query: { id: item.search_id.Fault_Id },
        });
      }
    },
    checkIsThereAnyZeroingInformation(item) {
      if (
        item.faultZeroingAnalysis &&
        item.faultZeroingAnalysis != null &&
        item.faultZeroingAnalysis != undefined &&
        item.faultZeroingAnalysis.length > 0
      ) {
        return '是';
      } else {
        return '否';
      }
    },
    didClickrestsRecommend(item) {
      this.didClickRecommendDetail(item);
    },
    didClickstandardKnowledge(item) {
      this.didClickRecommendDetail(item);
    },
    didClickRecommendDetail(item) {
      console.log(item, 'aaaaaaaaaaaaaaaaaaaa+++++++++++++++++');
      if (item.data_jump == '/baike/biaozhun/details_page') {
        this.$router.push({
          path: '/BasicDetail',
          query: { id: item.search_id.BZBH },
        });
      } else if (item.data_jump == '/baike/hangkongshuyu/details_page') {
        this.$router.push({
          path: '/semanticSearch',
          query: {
            val: item.search_id.SYZWMC,
          },
        });
      } else if (item.data_jump == '/baike/appServer/requestGetData') {
        //质量
        //路由跳转详情
        this.$router.push({
          name: 'qualityWikipediaDetails',
          query: { id: values },
        });
      }
    },
  },
  watch: {
    WikipediaDetails: {
      handler(newVal, oldVal) {
        if (
          this.WikipediaDetails != null &&
          this.WikipediaDetails != undefined
        ) {
          this.subDetailData = JSON.parse(
            JSON.stringify(this.WikipediaDetails)
          );
          this.search_keyword = this.subDetailData.topContent.Text_title;
          this.guzhangProcessingData();
          this.loadAllData();
          this.isTrue();
        }
      },
      // 加上之后第一次定义时就会执行
      immediate: true,
      // 深度监听即当要监听对象或数组的时候需要添加deep:true属性
      deep: true,
    },
    $route: function(to, from) {
      this.isTrue();
    },
  },
};
</script>

<style scoped lang="less">
.margin_tp {
  margin-top: 15px;
}

.padding_0 {
  padding-top: 0px;
}

.scope_table table tr:nth-child(odd) {
  background: #f5f5f5;
}

.scope_table table td {
  padding: 6px;
}

.fun_diagram {
  margin-top: 16px;

  .text {
    word-wrap: break-word;
  }

  .img_wrap {
    width: 220px;
    float: right;

    img {
      display: block;
      width: 100%;
    }
  }
}

/deep/ .ivu-radio-group-button .ivu-radio-wrapper {
  border-radius: 0px;
  white-space: pre-line;
  height: 40px;
  line-height: 1;
  display: flex;
  align-items: center;
}

/deep/ .ivu-radio-group-button .ivu-radio-wrapper-checked {
  background: #2d8cf0;
  color: white;
}
.malfunctionAnalyseList {
  margin-top: 10px;
}
.malfunctionAnalyseList li {
  display: flex;
  padding: 20px 0px;
  border-bottom: 1px solid #eeeeee;
  img {
    width: auto;
    height: 100px;
  }
  .info {
    flex-direction: column;
    flex: 1;
    margin-left: 15px;
  }
  .name {
    font-size: 15px;
    font-weight: bold;
    flex: 1;
  }
  .describe {
    font-size: 14px;
    color: #666666;
  }
  &:last-of-type {
    padding-bottom: 0px;
    border-bottom: none;
  }
}
.div-height-open {
  height: auto;
}
.div-height-close {
  height: 0px;
}
.termExplain {
  .list {
    .item {
      padding-top: 5px;
      padding-bottom: 5px;
      padding-left: 5px;
      .name {
        display: inline-block;
        white-space: nowrap;
        width: 110px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
.table {
  /deep/ .operation-buttons {
    cursor: pointer;
  }
  /deep/ .operation-buttons:hover {
    color: #3388ff;
  }
  /deep/ .ivu-table-cell {
    padding-left: 0px;
    padding-right: 0px;
  }
}

.down-rotate {
  transform: rotate(180deg);
}
.termExplain .item .name {
  color: unset;
}
.termExplain .item .name:hover {
  color: unset;
}
.margin_tp {
  margin-top: 15px;
}
.item_hover:hover,
.text_hidden_2:hover {
  color: #3388ff !important;
}
.disable-color{
  background-color: rgb(239, 239, 239)
}
</style>
