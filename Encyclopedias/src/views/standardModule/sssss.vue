<template>
    <div class="main">
        <Tree :data="data5" :render="renderContent" class="demo-tree-render"></Tree>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                data5: [
                    {
                        title: 'parent 1',
                        expand: true,
                        render: (h, { root, node, data }) => {
                            return h('span', {
                                style: {
                                    display: 'inline-block',
                                    width: '100%'
                                }
                            }, [
                                h('span', [
                                    h('Icon', {
                                        props: {
                                            type: 'ios-folder-outline'
                                        },
                                        style: {
                                            marginRight: '8px'
                                        }
                                    }),
                                    h('span', data.title)
                                ])
                            ]);
                        },
                        children: [
                            {
                                title: 'child 1-1',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        expand: true
                                    },
                                    {
                                        title: 'leaf 1-1-2',
                                        expand: true
                                    },
                                    {
                                        title: 'leaf 1-1-3',
                                        expand: true
                                    }
                                ]
                            },
                            {
                                title: 'child 1-2',
                                expand: true,
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                        expand: true
                                    },
                                    {
                                        title: 'leaf 1-2-1',
                                        expand: true
                                    }
                                ]
                            }
                        ]
                    }
                ],
                buttonProps: {
                    type: 'default',
                    size: 'small',
                },
                // 输入框要修改的内容
                inputContent:"",
                // 修改前的TreeNode名称
                oldName:""
            }
        },
        methods: {
            renderContent (h, { root, node, data }) {
                return h('span', {
                    class:"hhhaha",
                    style: {
                        display: 'inline-block',
                        lineHeight:'1.6rem',   
                        width: '100%', 
                        cursor: 'pointer'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h(`${ data.isEdit ? '' : 'span'}`, 
                            {
                                on:{
                                    click:(event)=>{ 
                                        event.stopPropagation();
                                        this.oldName=data.title
                                        this.$set(data, 'isEdit', true);
                                    }
                                }
                            },
                            data.title),
                        h(`${ data.isEdit ? 'input' : ''}`, {
                                attrs:{
                                    value:`${ data.isEdit ? data.title : ''}`, 
                                    autofocus :"autofocus"
                                },  
                                style: {     
                                    width: '12rem', 
                                    cursor: 'auto' ,
                                },
                                on:{
                                    change:(event)=>{ 
                                        this.inputContent=event.target.value;
                                    },
                                    blur:()=> {
                                        //this.confirmTheChange(data);
                                    }
                                }
                            }
                        ),
                        h(`${ data.isEdit ? '' : 'Button'}`, {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-add'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { this.append(data) }
                            }
                        }),
                        h(`${ data.isEdit ? '' : 'Button'}`, {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-remove'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        }),
                        h(`${ data.isEdit ? '' : 'Button'}`, {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-arrow-round-up'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { this.toUp(root, node, data) }
                            }
                        }),
                        h(`${ data.isEdit ? '' : 'Button'}`, {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-arrow-round-down'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { this.toDown(root, node, data) }
                            }
                        }),
                        // 确认/取消修改部分
                        h(`${ data.isEdit ? 'span' : ''}`,
                            { 
                                style: { 
                                    marginLeft:'.5rem'
                                }
                            },
                            [  
                                // 确认按钮
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'md-checkmark' 
                                    }),
                                    style: {
                                        border:0,
                                        background:'rgba(0,0,0,0)',
                                        fontSize:'1.3rem',
                                        outline:"none",
                                        lineHeight: 1
                                    },
                                    on: {
                                        click: (event) => {  
                                            this.confirmTheChange(data) 
                                        }
                                    }
                                }),
                                // 取消按钮
                                h('Button', {
                                    props: Object.assign({}, this.buttonProps, {
                                        icon: 'md-close'
                                    }),
                                    style: {
                                        border:'0',
                                        background:'rgba(0,0,0,0)',
                                        fontSize:'1.3rem',
                                        outline:"none",
                                        lineHeight: 1
                                    },
                                    on: {
                                        click: () => { this.CancelChange(data) }
                                    }
                                }) 
                            ]
                        ) 
                    ])
                ]);
            },
            // 确认修改树节点
            confirmTheChange(data){
                if(!this.inputContent){
                    this.inputContent = data.title;
                    this.$set(data, 'isEdit', false);
                }else{ 
                    if(this.oldName!==this.inputContent){  
                        this.$Modal.confirm({
                            title:"提示",
                            content:`您确定将  “${this.oldName}”  重命名为 “ ${this.inputContent} ” 吗？`,
                            onOk: () => {
                                data.title=this.inputContent 
                                this.$Message.info('修改成功');
                                this.$set(data, 'isEdit', false);
                            },
                            onCancel: () => {
                                this.$Message.info('取消');
                                this.$set(data, 'isEdit', false);
                            }
                        });
                    } else{
                        this.$set(data, 'isEdit', false);
                    }
                }
                 
            },
            // 取消修改树节点
            CancelChange(data){ 
                this.$Notice.info({
                    title: '取消修改',
                });
                this.$set(data, 'isEdit', false);
            },
            append (data) {
                const children = data.children || [];
                children.push({
                    title: 'appended node',
                    expand: true
                });
                this.$set(data, 'children', children);
            },
            remove (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                parent.children.splice(index, 1);
            },
            toUp (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                const children = parent.children;
                if(index === 0 ) return;
                children.splice(index-1,1,...children.splice(index,1,children[index-1]));
            },
            toDown (root, node, data) {
                const parentKey = root.find(el => el === node).parent;
                const parent = root.find(el => el.nodeKey === parentKey).node;
                const index = parent.children.indexOf(data);
                const children = parent.children;
                if((index+1) === children.length ) return;
                children.splice(index+1,1,...children.splice(index,1,children[index+1]));
            }            
        }
    }
</script>
<style>
    .demo-tree-render .ivu-tree-title{
        width: 100%;
    }
    .main {
        margin: 0 auto;
        width: 500px;
    }
</style>

<!-- 
// 树的渲染条件
renderContent(h, {
  root,
  node,
  data
}) {
  // 编辑前渲染
  let beforeEdit = h(
    "span", {
      style: {
        display: "inline-block",
        width: "100%",
      },
    },
    [
      h("span", [
        h("Icon", {
          props: {
            type: node.children ?
              "ios-folder-outline" : "ios-document-outline",
          },
          style: {
            marginRight: "8px",
          },
        }),
        h("span", data.title),
      ]),
      h('span', {
        style: {
          display: 'inline-block',
          float: 'right',
          marginLeft: '2px'
        }
      }, [
        h('Button', {
          props: Object.assign({}, this.buttonProps, {
            icon: 'ios-add'
          }),
          style: {
            marginRight: '2px'
          },
          on: {
            click: () => {
              this.append(data)
            }
          }
        }),
        h('Button', {
          props: Object.assign({}, this.buttonProps, {
            icon: 'ios-remove'
          }),
          on: {
            click: () => {
              this.remove(root, node, data)
            }
          }
        })
      ])

    ]
  );
  //编辑后的添加删除的渲染
  // debugger
  // if (this.editBtnShow) {
  //   let beforeEdit = h(
  //     "span", {
  //       style: {
  //         display: "inline-block",
  //         width: "100%",
  //       },
  //     },
  //     [
  //       h("span", [
  //         h("Icon", {
  //           props: {
  //             type: node.children ?
  //               "ios-folder-outline" : "ios-document-outline",
  //           },
  //           style: {
  //             marginRight: "8px",
  //           },
  //         }),
  //         h("span", data.title),
  //       ]),
  //       h('span', {
  //         style: {
  //           display: 'inline-block',
  //           float: 'right',
  //           marginLeft: '2px'
  //         }
  //       }, [
  //         h('Button', {
  //           props: Object.assign({}, this.buttonProps, {
  //             icon: 'ios-add'
  //           }),
  //           style: {
  //             marginRight: '2px'
  //           },
  //           on: {
  //             click: () => {
  //               this.append(data)
  //             }
  //           }
  //         }),
  //         h('Button', {
  //           props: Object.assign({}, this.buttonProps, {
  //             icon: 'ios-remove'
  //           }),
  //           on: {
  //             click: () => {
  //               this.remove(root, node, data)
  //             }
  //           }
  //         })
  //       ])
  //     ]
  //   );

  // }
  return beforeEdit
}, -->