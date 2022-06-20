<template>
    <div>
        <div class="search_md">
            <div class="center_md">
                <Form :model="searchForm" :label-width="100">
                    <FormItem label="关键词：" class="form-item" style="border: none;">
                        <div class="flex">
                            <Input v-model="searchForm.searchText" placeholder="请输入关键词" style="flex: 1;margin-right: 10px;"></Input>
                            <Button type="primary" style="width: 100px;" v-show="!toggle" @click="handleSubmit('searchForm')">检索
                            </Button>
                        </div>
                    </FormItem>
                    <collapse>
                        <div v-show="toggle">
                            <FormItem label="标准来源库：" class="form-item" style="border-top: 1px dashed #999;">
                                <CheckboxGroup v-model="searchForm.checkbox">
                                    <Checkbox label="Eat"></Checkbox>
                                    <Checkbox label="Sleep"></Checkbox>
                                    <Checkbox label="Run"></Checkbox>
                                    <Checkbox label="Movie"></Checkbox>
                                    <Checkbox label="Eat"></Checkbox>
                                    <Checkbox label="Sleep"></Checkbox>
                                    <Checkbox label="Run"></Checkbox>
                                    <Checkbox label="Movie"></Checkbox>
                                    <Checkbox label="Eat"></Checkbox>
                                    <Checkbox label="Sleep"></Checkbox>
                                    <Checkbox label="Run"></Checkbox>
                                    <Checkbox label="Movie"></Checkbox>
                                </CheckboxGroup>
                            </FormItem>
                            <FormItem label="搜索词：" class="form-item">
                                <div class="flex selected" v-for="(item,index) in searchForm.searchWord" :key="index">
                                    <div class="logic flex" v-if="index == 0">
                                        <Button type="primary" icon="md-add" class="add" @click="add"></Button>
                                        <Button type="primary" icon="md-remove" class="minus" @click="plus"></Button>
                                    </div>
                                    <div class="logic flex" v-else>
                                        <Select v-model="item.logic">
                                            <Option v-for="(lItem,lIndex) in logics" :key="lIndex" :value="lItem.dictValue">{{lItem.dictLabel}}
                                            </Option>
                                        </Select>
                                    </div>
                                    <div class="name">
                                        <Select v-model="item.fieldName">
                                            <Option v-for="(nItem,nIndex) in fieldNames" :key="nIndex" :value="nItem.dictValue">{{nItem.dictLabel}}
                                            </Option>
                                        </Select>
                                    </div>
                                    <div class="val" v-model="item.fieldValue">
                                        <Input type="text" />
                                    </div>
                                </div>
                            </FormItem>
                            <FormItem label="发布日期：" class="form-item">
                                <DatePicker type="date" placeholder="开始时间" style="width: 200px"></DatePicker>
                                -
                                <DatePicker type="date" placeholder="结束时间" style="width: 200px"></DatePicker>
                            </FormItem>
                            <FormItem label="标准状态：" class="form-item">
                                <CheckboxGroup v-model="searchForm.checkbox">
                                    <Checkbox label="Eat"></Checkbox>
                                    <Checkbox label="Sleep"></Checkbox>
                                    <Checkbox label="Run"></Checkbox>
                                    <Checkbox label="Movie"></Checkbox>
                                    <Checkbox label="Eat"></Checkbox>
                                    <Checkbox label="Sleep"></Checkbox>
                                </CheckboxGroup>
                            </FormItem>
                            <FormItem :label-width="0">
                                <div class="flex" style="padding: 18px 0px;justify-content: center;align-items: center;">
                                    <Button type="text" style="margin-right: 12px;">重置条件</Button>
                                    <Button type="primary" style="width: 110px;height: 35px;margin-left: 12px;" @click="handleSubmit">检索
                                    </Button>
                                </div>
                            </FormItem>
                        </div>
                    </collapse>
                </Form>
                <div class="fold" @click="fold">
                    <i class="iconfont icon-zhankai"></i>
                </div>
            </div>
        </div>
        <div class="response_data_md flex">
            <div class="filter_md">
                <div class="filter_item" v-for="(item,index) in dataSource" :key="index">
                    <div class="title">
                        <div class="flex">
                            <span class="text">{{item.title}}</span>
                            <span class="clear">清除筛选</span>
                            <i class="iconfont icon-shouqi" :class="{open:item.isOpen}" @click="foldFilterMd(index)"></i>
                        </div>
                    </div>
                    <collapse>
                        <div v-show="!item.isOpen">
                            <div class="data_source" :style="{height: item.isActive ? '106px' : 'auto'}">
                                <div class="more_classify" v-show="index == 1 && item.showMore" @mouseleave="leaveMoreClassify(index)">
                                    <div style="padding: 20px;">
                                        <div class="flex handle">
                                            <Button type="primary" style="margin-right: 15px;">确定</Button>
                                            <Button @click="clearSelectedgjb(index)">清空</Button>
                                        </div>
                                        <div v-for="(pItem,pIndex) in item.data" :key="pIndex">
                                            <div class="classify_data" v-for="(cItem,cIndex) in pItem" :key="cItem.id" v-show="cIndex == item.current">
                                                <div class="item flex" v-for="twoItem in cItem.children" :key="twoItem.id">
                                                    <div class="two_level flex">
                                                        <Checkbox v-model="twoItem.selected" @on-change="selectedGjb(index,twoItem, $event)"><span style="font-weight: bold;">{{twoItem.name}}:</span>
                                                        </Checkbox>
                                                    </div>
                                                    <div class="three_level flex">
                                                        <Checkbox class="checkbox" v-for="threeItem in twoItem.children" v-model="threeItem.selected" :key="threeItem.id" @on-change="selectedGjb(index,threeItem,$event)">
                                                            {{threeItem.name}}
                                                        </Checkbox>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="variable" :class="[item.isActive ? 'active_state': ' normal_state']" @mouseenter="enterMd(index)" @mouseleave="leaveMd(index)">
                                    <not-data v-if="item.data.length == 0 && !item.isLoading"></not-data>
                                    <Spin size="large" fix v-show="item.isLoading"></Spin>
                                    <div class="search_list_wrap">
                                        <ul v-for="(pItem,pIndex) in item.data" :key="pIndex">
                                            <li v-for="(cItem,cIndex) in pItem" :key="cItem.id">
                                                <Checkbox v-model="cItem.selected" @on-change="selectedGjb(index,cItem,$event)">
                                                    {{index != 1 ? cItem.name : ''}}
                                                </Checkbox>
                                                <span v-if="index == 1" style="cursor: pointer;" @click="moreClassify(index,cIndex)">{{cItem.name}}</span>
                                            </li>
                                        </ul>
                                        <div class="handle flex">
                                            <span @click="clearSelectCondition(index)" style="cursor: pointer;">清除</span>
                                            <Button type="primary">确认</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </collapse>
                </div>
            </div>
            <div class="list_md">
                <div class="standard_list_wrap">
                    <Spin size="large" fix v-if="!list"></Spin>
                    <div class="sort_module flex">
                        <sort v-for="(item,index) in sortList" :sortType="item.sortType" :text="item.text" :key="item.key" @sort="sort(item.key,index)"></sort>
                    </div>
                    <div class="table_am flex">
                        <div class="selected_num">(<span style="margin: 0px 3px;">已选<span style="color: #3388ff;margin: 0px 3px;">{{selectedNum}}</span>条</span>)
                        </div>
                        <div class="am flex" @click="clearSelected">
                            <i class="iconfont icon-lajitong"></i>
                            <span>清除已选</span>
                        </div>
                        <div class="am flex">
                            <i class="iconfont icon-chakan"></i>
                            <span>查看标准关系图谱</span>
                        </div>
                        <!--                        <div class="am flex" @click="addSystem">-->
                        <!--                            <i class="iconfont icon-shujucaiji-"></i>-->
                        <!--                            <span>纳入自定义体系</span>-->
                        <!--                        </div>-->
                        <div class="flex" style="flex: 1;margin-right: 0px;justify-content: flex-end;">
                            找到<span style="margin: 0px 3px;color: #3388ff;">{{!list ? 0 : list.length}}</span>条结果
                        </div>
                    </div>
                    <div class="data_list">
                        <standard-list :columns="columns" :dataSource="list ? list : []" :total="total" @change="pageChange" @table_change="table_change" ref="table"></standard-list>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import collapse from '@/libs/collapse';
import sort from '@/components/sort';
import standardList from '@/components/standardList';
import systemData from '@/libs/systemData.json';
import notData from '@/components/notData';

export default {
  name: 'advancedSearch',
  components: {
    standardList,
    collapse,
    notData,
    sort,
  },
  data() {
    return {
      searchForm: {
        searchWord: [{ logic: 'AND ', fieldName: '', fieldValue: '' }],
      },
      fieldNames: [
        { dictValue: 'sdNo', dictLabel: '标准号' },
        { dictValue: 'wwName', dictLabel: '标准名称' },
        { dictValue: 'frName', dictLabel: '英文名' },
        { dictValue: 'hType', dictLabel: '分类号' },
        { dictValue: 'sponsor', dictLabel: '提出单位' },
        { dictValue: 'author', dictLabel: '起草人' },
      ],
      logics: [
        { dictValue: 'AND', dictLabel: '与' },
        { dictValue: 'OR', dictLabel: '或' },
        { dictValue: 'NOT', dictLabel: '非' },
      ],
      toggle: false,
      sortList: [
        { text: '标准号', key: 'std_no' },
        { text: '标准名称', key: 'name_cn' },
        { text: '发布日期', key: 'pub_date' },
        { text: '实施日期', key: 'implement_date' },
      ],
      dataSource: [
        {
          title: '标准库',
          isActive: false,
          isOpen: false,
          data: [],
          isLoading: true,
        },
        {
          title: '标准分类',
          showMore: false,
          isOpen: false,
          current: 0,
          data: [],
          isLoading: true,
        },
        {
          title: '年份',
          isActive: false,
          isOpen: false,
          data: [],
          isLoading: true,
        },
      ],
      selectedNum: 0,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: '分类编号',
          key: 'gjbType',
          align: 'center',
        },
        {
          title: '分类名称',
          key: 'className',
          align: 'center',
        },
        {
          title: '标准编号',
          key: 'stdNo',
          align: 'center',
        },
        {
          title: '标准名称',
          key: 'nameCn',
          align: 'center',
        },
        {
          title: '标准级别',
          key: 'hType',
          align: 'center',
        },
        {
          title: '状态',
          key: 'stdState',
          align: 'center',
          // render: function (h, params) {
          //     const {stdState, standName, standState} = params.row;
          //     let str;
          //     if (standName != "" && standState == "1" && standName != null) {
          //         str = '缺项'
          //     } else {
          //         const state = standardStateDict.find(item => item.dictValue == stdState);
          //         str = state.dictText;
          //     };
          //     h('span', str)
          // }
        },
        {
          title: '发布日期',
          key: 'pubDate',
          align: 'center',
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h(
              'div',
              {
                class: 'actionWrap',
              },
              [
                h('i', {
                  class: 'iconfont icon-shoucang',
                  style: {
                    marginRight: '12px',
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    },
                  },
                }),
                h('i', {
                  class: 'iconfont icon-icon_zhishiku',
                  on: {
                    click: () => {
                      this.show(params.index);
                    },
                  },
                }),
              ]
            );
          },
        },
      ],
      list: [],
      total: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      const { gjbList, typeIdList, yearList, rows } = systemData;
      const typeIdListData = this.formatFilter(this.addValue(typeIdList));
      const yearListData = this.formatFilter(this.addValue(yearList));
      const gjbListData = this.formatFilter(this.modifAllVal(gjbList));
      const dataArr = [typeIdListData, gjbListData, yearListData];
      this.list = rows;
      this.dataSource.forEach((item, index) => {
        item.isLoading = false;
        item.data = dataArr[index];
      });
    }, 1000);
  },
  methods: {
    selectedGjb(index, record, target) {
      if (index != 1) return false;
      let data = this.dataSource[index].data[0];
      this.childrenAll(data, record.id, target); // 当前复选框勾选时  子节点全选
      this.parentAll(data, record.pId, target); //  判断当前同级节点是否全选  如果全选的话 默认勾选父节点复选框
    },

    parentAll(data, pId, target) {
      let interiorFun = (list, pid, tar) => {
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          let len = item.children && item.children.length > 0;
          if (item.id == pid) {
            let isAllSelect = item.children.filter(j => j.selected == true);
            item.selected = isAllSelect.length == item.children.length;
            interiorFun(data, item.pId, tar);
          } else {
            if (len) {
              interiorFun(item.children, pid, tar);
            }
          }
        }
      };
      interiorFun(data, pId, target);
    },

    childrenAll(data, id, target) {
      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let len = item.children && item.children.length > 0;
        let [source, wid] = [item.children, id];
        if (item.pId == id) {
          item.selected = target;
          wid = item.id;
        }
        if (len) {
          this.childrenAll(source, wid, target);
        }
      }
    },
    clearSelectedgjb(index) {
      let { current, data } = this.dataSource[index];
      let selectedItem = data[0][current];
      let cancelSelectedItem = this.modifAllVal([selectedItem]);
      this.dataSource[index].data[0][current] = cancelSelectedItem[0];
      this.$forceUpdate();
    },
    modifAllVal(data) {
      for (let i = 0; i < data.length; i++) {
        let len = data[i].children;
        data[i].selected = false;
        if (len && len.length > 0) {
          this.modifAllVal(data[i].children);
        }
      }
      return data;
    },
    addValue(data) {
      return data.map(item => ({ ...item, selected: false }));
    },
    clearSelectCondition(index) {
      let { data } = this.dataSource[index];
      data.forEach(item => {
        item.forEach(i => {
          i.selected = false;
        });
      });
      this.dataSource[index].data = data;
      this.$forceUpdate();
    },

    formatFilter(data) {
      if (data.length == 0) return data;
      let arr = [];
      let len = data && data.length;
      let row = len <= 1 ? 1 : Math.ceil(len / 4 >= 5 ? 5 : len / 4); // row 代表展示多少行  最多展示5行 一行至少展示4个
      let item = len <= 1 ? 1 : Math.ceil(len / row < 4 ? 4 : len / row); // 计算一列展示多少个
      for (let i = 1; i < row + 1; i++) {
        arr.push(data.slice((i - 1) * item, i * item));
      }
      return arr;
    },
    handleSubmit() {
      console.log(this.dataSource[0].data);
    },
    add() {
      this.searchForm.searchWord.push({
        logic: 'AND ',
        fieldName: '',
        fieldValue: '',
      });
    },
    plus() {
      if (this.searchForm.searchWord.length > 1) {
        this.searchForm.searchWord.pop();
      }
    },
    fold() {
      this.toggle = !this.toggle;
    },
    foldFilterMd(index) {
      this.dataSource[index].isOpen = !this.dataSource[index].isOpen;
    },
    enterMd(index) {
      if (index == 1 || this.dataSource[index].data.length == 0) return false;
      let data = this.dataSource[index].data.reduce(function(a, b) {
        return a.concat(b);
      });
      if (data.length <= 3) return false;
      this.dataSource[index].isActive = true;
    },
    leaveMd(index) {
      $('.active_state').scrollTop(0);
      this.dataSource[index].isActive = false;
    },
    moreClassify(index, cIndex) {
      this.dataSource[index].showMore = !this.dataSource[index].showMore;
      this.dataSource[index].current = cIndex;
    },
    clearSelected() {
      this.$refs.table.selectAll(false);
    },
    leaveMoreClassify(index) {
      this.dataSource[index].showMore = false;
    },
    pageChange() {},
    table_change() {},
  },
};
</script>

<style scoped lang="less">
@import '../../styles/less/standardModule';

.flex {
  display: flex;
}

/deep/ .ivu-form .ivu-form-item-label {
  text-align: left;
}

/deep/ .ivu-form-item {
  margin-bottom: 0px;
}

.fold {
  width: 62px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background: rgba(242, 242, 242, 1);
  cursor: pointer;
  color: #888888;

  i {
    font-weight: bold;
  }
}

.search_md {
  background: white;

  .center_md {
    width: 65%;
    max-width: 1000px;
    margin: 0 auto;

    .form-item {
      padding: 16px 0px;
      border-bottom: 1px dashed #999;

      .selected {
        margin-bottom: 8px;
        align-items: center;

        &:last-of-type {
          margin-bottom: 0px;
        }

        .logic {
          width: 80px;

          .minus {
            margin-left: 8px;
          }

          .add {
            margin-right: 8px;
          }
        }

        .name {
          width: 100px;
          margin-left: 6px;
          margin-right: 6px;
        }

        .val {
          flex: 1;
        }
      }
    }
  }
}

.response_data_md {
  margin-top: 20px;

  .filter_md {
    width: 240px;
    max-width: 240px;

    .filter_item {
      margin-bottom: 20px;
    }

    .title {
      > .flex {
        height: 42px;
        padding: 0px 10px;
        background: #e3ecfd;
        align-items: center;
        font-size: 15px;

        .text {
          color: #333333;
          flex: 1;
          font-weight: bold;
        }

        .clear {
          cursor: pointer;
          margin-right: 3px;
        }

        i {
          color: #666666;
          cursor: pointer;
          transition: 0.5s;
        }

        .open {
          transform: rotate(180deg);
        }
      }
    }

    .data_source {
      width: 240px;
      background: white;
      position: relative;

      .more_classify {
        position: absolute;
        width: 930px;
        max-height: 350px;
        left: 241px;
        top: -1px;
        overflow: auto;
        background: white;
        box-shadow: 2px 1px 5px #e6e6e6;
        border: 1px solid #e6e6e6;
        z-index: 99;

        .handle {
          justify-content: flex-end;
          margin-bottom: 20px;
        }

        .classify_data {
          .item {
            margin-bottom: 16px;
          }

          .two_level {
            width: 160px;
            justify-content: flex-end;
          }

          .three_level {
            flex: 1;
            flex-wrap: wrap;
            margin-left: 10px;

            .checkbox {
              margin-bottom: 12px;
            }
          }
        }
      }

      .variable {
        position: relative;

        .search_list_wrap {
          > ul {
            width: 240px;

            li {
              margin: 12px;
            }
          }
        }

        .handle {
          flex-direction: column;
          margin: 12px 12px 12px 0px;
          align-items: flex-end;
          justify-content: space-between;

          span {
            cursor: pointer;
          }
        }
      }

      .normal_state {
        max-height: 106px;
        min-height: 78px;
        overflow: hidden;

        .search_list_wrap {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .handle {
          display: none;
        }
      }

      .active_state {
        max-height: 260px;
        min-height: 141px;
        overflow: auto;
        position: absolute;
        left: -1px;
        top: -1px;
        background: white;
        z-index: 99;
        box-shadow: 2px 1px 5px #e6e6e6;
        border: 1px solid #e6e6e6;

        .search_list_wrap {
          display: flex;
        }
      }
    }
  }

  .list_md {
    width: calc(100% - 260px);
    margin-left: 20px;

    .standard_list_wrap {
      background: white;
      padding: 0px 20px;
      flex: 1;
      position: relative;

      .table_am {
        .am {
          cursor: pointer;
        }
      }

      .sort_module {
        padding: 12px 0px;
        border-bottom: 1px solid #efefef;

        /deep/ .sort {
          padding: 0px 15px;
          position: relative;
        }

        /deep/ .sort:before {
          position: absolute;
          width: 1px;
          height: 18px;
          content: '';
          background: #dddddd;
          right: 0px;
          top: 2px;
        }

        /deep/ .sort:first-of-type {
          padding-left: 0px;
        }
      }
    }
  }
}
</style>