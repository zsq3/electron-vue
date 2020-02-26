<template>
    <div class="content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="新增" name="add">
                <Upload></Upload>
            </el-tab-pane>
            <el-tab-pane label="编辑" name="edit" :lazy="true">
                <Edit></Edit>
            </el-tab-pane>
        </el-tabs>
        <el-button type="primary" icon="el-icon-arrow-left" class="back" @click="back">返回</el-button>
    </div>
</template>

<script>
    import Upload from '@/components/upload/Upload'
    import Edit from '@/components/Training-Data/Edit'
    export default {
        components:{ Upload, Edit },
        data() {
            return {
                activeName: 'add'
            }
        },
        methods: {
            handleClick(tab) {
                if(tab.name === 'edit'){
                    tab.$children.length && tab.$children[0].searchAll()
                }
            },
            back(){
                this.$router.push('/')
            }
        },
    }
</script>

<style scoped>
    >>>.el-tabs__nav{
        transform: translateX(100px) !important;
    }
    >>>.el-tabs__item{
        height: 70px;
        line-height: 70px;
        font-size: 22px;
        color: #fff;
    }
    >>>.el-tabs__item.is-active {
        color: #409EFF;
    }
    >>>.el-tabs__nav-wrap{
        background: #000;
        opacity: 0.6;
    }
    .back{
        position: absolute;
        top:10px;
        right: 20px;
        font-size: 20px;
        z-index: 100;
    }
</style>
