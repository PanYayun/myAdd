<template>
    <div class="main_container" style="position: relative">
        <div class="selectImg flex">
            <div class="demo-upload-list" v-if="fileUrl">
                <template>
                    <img :src="fileUrl" />
                    <div class="demo-upload-list-cover">
                        <!-- <Icon type="ios-eye-outline" @click.native="handleView()"></Icon> -->
                        <Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
                    </div>
                </template>
            </div>
            <Upload ref="upload" :show-upload-list="false" :default-file-list="searchImg" :on-success="handleSuccess" :on-progress="handleProgress" :format="['jpg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" :multiple="false" type="drag" style="display: inline-block; width: 130px" action="" v-else>
                <!-- //10.216.3.17:32881/baike/sousuo/search_multisearch -->
                <div style="width: 130px; height: 130px; line-height: 130px">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
            </Upload>

            <!-- <img src="https://img0.baidu.com/it/u=3024308660,1355431406&fm=26&fmt=auto&gp=0.jpg"> -->
            <div style=" display: flex; flex-direction: column;height: 130px; margin-left: 20px;">
                <Input v-model="imgDes" placeholder="可选择录入描述信息" style="width: 300px" />
                <Button type="primary" style="margin-top: 66px; width: 100px" @click="touchUpload()">跨模态检索</Button>
            </div>
        </div>
        <div class="list_wrap">
            <div class="title">相似图像结果</div>
            <div class="list">
                <ul>
                    <li class="flex list_item" v-for="(item, index) in searchList" :key="index" style="margin-bottom: 20px" @click="gotoPage(item)">
                        <div class="search_result">
                            <div class="wrap flex vertical_center">
                                <img :src="$store.state.app.img_url+item.image_url" />
                                <div class="info">
                                    <p>
                                        <span>相似图像：</span><span>{{ item.image_name }}</span>
                                    </p>
                                    <p>
                                        <span>知识溯源：</span><span>{{ item.knowledge_source }}</span>
                                    </p>
                                    <p>
                                        <span>图片定位：</span><span>{{ item.image_refer }}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="recommend_result">
                            <div class="wrap">
                                <div class="recommend_title">相关知识推荐</div>
                                <div class="recommend_list scrollbar_none">
                                    <ul>
                                        <li class="recommend_list_item" v-for="(sub_item, sub_index) in item.other" :key="index + '_' + sub_index" @click="touchAboutRecommed(sub_item)">
                                            <Tooltip class="name" max-width="350" :content="sub_item.title" theme="light">
                                                {{ sub_item.title }}
                                            </Tooltip>
                                            <div class="flex" style="justify-content: space-between">
                                                <p class="source">
                                                    <span>来源：</span><span>{{ sub_item.data_source }}</span>
                                                </p>
                                                <p class="reason">
                                                    <span>推荐理由：</span><span>{{ sub_item.data_type }}</span>
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'accordingPictureSearch',
  data() {
    return {
      searchImg: [],
      imgName: '',
      visible: false,
      // imgUrl: "10.216.3.17/a/",
      imgDes: '',
      file: '', //handleBeforeUpload 方法拿到file 如果在handleBeforeUpload文件转base64，选择非图片格式文件页面会报错
      fileUrl: '', //图片 base64
      imgFile: '', //图片
      spinShow: false,
      searchList: [],
    };
  },

  methods: {
    handleRemove() {
      this.fileUrl = '';
      this.imgFile = '';
    },
    handleSuccess(res, file) {},
    handleProgress(event, file1, fileList) {
      console.log('文件上传时的钩子', this.file);
      let promise = new Promise(resolve => {
        this.$nextTick(function() {
          let _this = this;
          let reader = new FileReader();
          // תbase64
          reader.onload = function(e) {
            _this.fileUrl = e.target.result; // img里可以显示未上传的图片文件以供预览
            // _this.imgFile = _this.base64ImgtoFile(
            //   _this.fileUrl,
            //   _this.file.name
            // );
          };
          reader.readAsDataURL(_this.file);
          resolve(true);
        });
      });
      return promise;
    },
    handleFormatError(file) {
      this.handleRemove();
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: file.name + ' 文件格式不正确，请选择jpg或png。',
      });
    },
    handleMaxSize(file) {
      this.handleRemove();
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: file.name + ' 文件太大，不超过2M。',
      });
    },
    handleBeforeUpload(file) {
      this.file = file;
    },
    // base64ImgtoFile(dataurl, filename) {
    //   console.log(dataurl, filename, '1111111');
    //   let arr = dataurl.split(',');
    //   let mime = arr[0].match(/:(.*?);/)[1];
    //   let suffix = mime.split('/')[1];
    //   let bstr = atob(arr[1]);
    //   let n = bstr.length;
    //   let u8arr = new Uint8Array(n);
    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }
    //   return new File([u8arr], `${filename}.${suffix}`, {
    //     type: mime,
    //   });
    // },
    upLoadImage(file) {
      let param = new FormData(); // 创建form对象
      if (this.fileUrl) {
        console.log(this.file, '22222');
        param.append('img', this.file); // 通过append向form对象添加数据
        param.append('image_name', this.file.name); // 通过append向form对象添加数据
      }
      if (this.imgDes) {
        param.append('query', this.imgDes); // 添加form表单中其他数据
      }
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };

      // 添加请求头
      axios
        .post('api/baike/sousuo/search_multisearch', param, config)
        .then(res => {
          this.spinShow = false;
          if (res.data.code === 200) {
            this.searchList = res.data.data;
            if (this.searchList.length <= 0) {
              this.$Message.success('搜索无结果');
            }
            this.searchList.forEach(item => {
              var par = {
                uid: this.$store.state.user.userInfo.username,
                query: item.image_name,
              };
              this.loadOtherData(par);
            });
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    touchUpload() {
      if (this.fileUrl || this.imgDes) {
        this.spinShow = true;
        this.upLoadImage(this.imgFile);
      } else {
        this.$Message.error('请先选择图片或录入信息');
      }
    },
    loadOtherData(par) {
      this.$axios(
        '/baike/sousuo/search_other',
        'post',
        this.$qs.stringify(par)
      ).then(res => {
        if (res.data.code === 200) {
          this.searchList.forEach(item => {
            if (item.image_name === par.query) {
              item.other = res.data.data;
              //强制刷新页面
              this.$forceUpdate();
            }
          });
        }
      });
    },
    //相关知识推荐
    touchAboutRecommed(item) {
      this.gotoPage(item);
    },
    // 页面跳转
    gotoPage(val) {
      let pageId = val.search_id;
      let values = Object.values(pageId).toString();
      if (val.data_jump == '/baike/biaozhun/details_page') {
        this.$router.push({
          path: '/BasicDetail',
          query: { id: values },
        });
      } else if (val.data_jump == '/baike/hangkongshuyu/details_page') {
        this.$router.push({
          path: '/TermDetail',
          query: { id: values },
        });
      } else if (val.data_jump == '/baike/minhang/request') {
        this.$router.push({
          path: '/CivilAviationDetail',
          query: { id: values },
        });
      } else if (val.data_jump == '/baike/yuanqijian/get_case') {
        this.$router.push({
          path: '/ElectronDetailInvalid',
          query: { id: values },
        });
      } else if (val.data_jump == '/baike/appServer/requestGetData') {
        //质量
        //路由跳转详情
        this.$router.push({
          name: 'qualityWikipediaDetails',
          query: { id: values },
        });
      } else if (val.data_jump == 'URL') {
        window.open(values, '_blank');
      }
    },
    //没有搜索词默认搜索这个词汇
    loadSearch_worddefault() {
      this.spinShow = true;
      this.$axios('/baike/sousuo/search_default', 'post').then(res => {
        console.log('-', res.data);
        if (res.data.code === 200) {
          this.spinShow = false;
          this.searchList = res.data.multisearch_default.data;
          this.searchList.forEach(item => {
            var par = {
              uid: this.$store.state.user.userInfo.username,
              query: item.image_name,
            };
            this.loadOtherData(par);
          });
        } else {
          this.spinShow = false;
        }
      });
    },
  },
  mounted() {
    this.loadSearch_worddefault();
  },
};
</script>

<style scoped lang="less">
@import '../../styles/unified.css';

.selectImg {
  align-items: flex-end;

  img {
    width: 130px;
    height: 130px;
    margin-right: 25px;
  }
}

.list_wrap {
  margin-top: 36px;

  .title {
    font-size: 15px;
    font-weight: bold;
    color: #333333;
    margin-bottom: 24px;
  }

  .list {
    overflow: hidden;
    .list_item {
      background: white;
      overflow: hidden;
      height: 236px;
      padding: 0 20px;
      box-sizing: border-box;

      .search_result {
        width: 780px;
        display: flex;
        align-items: center;
        border-right: 1px solid #eeeeee;

        .wrap {
          img {
            width: 224px;
            height: 166px;
          }

          .info {
            font-size: 14px;
            color: #3f424b;
            margin-left: 20px;

            p {
              line-height: 22px;
              margin-bottom: 15px;
            }

            p:last-of-type {
              margin-bottom: 0px;
            }
          }
        }
      }
      .recommend_list {
        overflow: hidden;
        & ul {
          overflow: hidden;
          padding-top: 16px;
        }
      }

      .recommend_result {
        width: 380px;
        float: right;
        padding-left: 20px;
        box-sizing: border-box;
        .wrap {
          .recommend_title {
            padding: 14px 0;
            border-bottom: 1px solid #eeeeee;
            font-size: 16px;
            line-height: 16px;
            color: #333333;
          }
          .recommend_list {
            overflow: auto;
            .recommend_list_item {
              margin-top: 19px;
              .name {
                width: 100%;
                font-size: 14px;
                line-height: 15px;
                color: #333;
                margin-bottom: 10px;
              }
              /deep/ .ivu-tooltip-rel {
                width: 100%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
              > div {
                color: #a3a6ad;
              }
              .source,
              .reason {
                font-size: 12px;
                line-height: 13px;
              }
            }
            & .recommend_list_item:nth-child(1) {
              margin-top: 0;
            }
          }
        }
      }
    }
    .list_item :hover {
      cursor: pointer;
    }
  }
}
.demo-upload-list {
  display: inline-block;
  width: 130px;
  height: 130px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}

.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
  display: flex;
  justify-content: center;
  align-items: center;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
