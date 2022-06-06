import router from "../../router";
export default {
    state: {
        searchingVal: null,
        Selected: '民航事故知识抽取',
        Steps: 1,//事理图谱生成步骤
        TaskName:'',//任务名称
        examineName:'',//审核抽取名称
        TaskFlow2:0,//任务流程
        TaskId:'',//任务id
        TaskData:'',//通用知识请求数据
        //TaskList:'',//通用知识列表
        majorList:'',//专业知识列表
        KnowledgeAuditList:'',//知识审核列表
        subjobid:'',//示例图谱生成Id
        toExamineid:'',//知识审核传的ID,
        stdNos:'', //图谱编号
        IndicatorListID:'',//标准知识加工-知识审核-标准指标抽取-列表详情和审核ID
        IndicatorClauseID:'',//标准知识加工-知识审核-标准指标抽取-指标条款ID
        IndicatorIndex:'',//标准知识加工-知识审核-标准指标抽取-指标条款详情点击
    },
    getters: {
        searchingVal: state => state.searchingVal,
        stdNos: state => state.stdNos
    },
    mutations: {
        ['SEARCHING_INFO'](state, value) {
            state.searchingVal = value;
        },
        ['STD_NOS'](state,value){
            state.stdNos = value;
        },
        StartBut(state, value) {
            state.Selected = value
        },
        //生产任务步骤
        ModifiesSteps(state, value){
            state.Steps = value
        },
        //任务流程
        NestTaskFlow(state, value){
            console.log(value,'查看');
            state.TaskFlow2 = value
        },
        //通用知识以及ID跟name
        ModifiesTaskList(state, {list,id,name,TaskData}){
            state.TaskName = name;
            state.TaskId = id;
            //state.TaskList = list;
            state.TaskData=TaskData
        },
        //专业知识
        changemajorList(state, value){
            state.majorList = value;
        },
        //知识审核
        chaneKnowledgeAuditList(state, value){
            state.KnowledgeAuditList = value;
        },
        //示例图谱传Id
        changeSubjobid(state, value){
            state.subjobid = value;
        },
        //知识审核传的ID
        changetoExamineid(state, value){
            state.toExamineid = value;
        },
        //标准知识加工-知识审核-标准指标抽取-列表详情和审核ID
        changeIndicatorListID(state, value){
            state.IndicatorListID = value;
        },
        //标准知识加工-知识审核-标准指标抽取-指标条款ID
        changeIndicatorClauseID(state, value){
            state.IndicatorClauseID = value;
        },
        //标准知识加工-知识审核-标准指标抽取-指标条款详情点击
        changeIndicatorIndex(state, value){
            state.IndicatorIndex = value;
        },
        //标准、事故知识加工-知识审核
        changeExamineName(state, value){
          state.ExamineName = value;
      },
    },
    actions: {
        setStdNo({commit},val){
          commit('STD_NOS',val)
        },
        setVal({ commit }, val) {
            commit('SEARCHING_INFO', val)
        },
        Jump(context, val) {
            let value = val === 1 ? '民航事故知识抽取' : val === 2 ? '术语百科知识抽取' : val === 3 ? '标准知识加工' : val === 4 ? '装备故障/产品质量问题知识抽取' : ''
            context.commit('StartBut', value);
            router.push("/TableList/NewTask");
        },
        //下一步骤
        NextSteps(context, val) {
            if(val===6){
                val=6
                context.commit('ModifiesSteps',val)
                return;
            }
            val+=1
            context.commit('ModifiesSteps',val)
        },
        //上一步骤
        PreviousStep(context, val) {
            if(val===1)return;
            val-=1
            context.commit('ModifiesSteps',val)
        },
        //下一任务流程
        changeTaskFlow(context, val) {
            console.log(val);
            if(val===4){
                val=4
                context.commit('NestTaskFlow',val)
                return;
            }
            val+=1
            context.commit('NestTaskFlow',val)
        },
        //上一任务流程
        upperTaskFlow(context, val) {
            console.log(val);
            if(val===0)return;            
            val-=1
            context.commit('NestTaskFlow',val)
        },
    }
}
