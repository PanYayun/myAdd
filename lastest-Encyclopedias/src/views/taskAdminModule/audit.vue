<template>
    <div class="task_page_wrap">
        <div class="page_title">{{$route.meta.title}}</div>
        <component :is="currentView"></component>
    </div>
</template>

<script>
    import accidentAttrExtract from './auditComponents/accidentAttrExtract' // 事故属性提取
    import accidentMappingExtract from './auditComponents/accidentMappingExtract' //事故图谱抽取
    import newWordDiscover from "./auditComponents/newWordDiscover"; //新词发现

    export default {
        name: "audit",
        components: {
            accidentMappingExtract,
            accidentAttrExtract,
            newWordDiscover
        },
        computed: {
            currentView() {
                return this.componentArr[this.index];
            }
        },
        data() {
            return {
                componentArr: [
                    'accidentAttrExtract',
                    'accidentMappingExtract',
                    'newWordDiscover'
                ],
                index: 1
            }
        }
    }
</script>

<style scoped>

</style>