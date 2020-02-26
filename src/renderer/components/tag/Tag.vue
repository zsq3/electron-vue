<template>
    <div class="tag">
        <el-checkbox-group v-model="checkboxGroup">
            <el-checkbox-button
                    v-for="(name, value) in tagName"
                    :label="value"
                    :key="value"
                    @change="handleChange" >
                {{name}}
            </el-checkbox-button>
        </el-checkbox-group>
    </div>
</template>

<script>
    import fs from 'fs';
    import path from 'path'

    export default {
        name: "Tag",
        data() {
            return {
                tagName: {},
                checkboxGroup: []
            }
        },
        methods: {
            handleChange() {
                console.log(this.checkboxGroup);
            }
        },
        created(){
            //this.tagName = JSON.parse(fs.readFileSync(path.join(__static,'../config/tag.json'), 'utf-8'))
            this.tagName = JSON.parse(fs.readFileSync('D:/Tool2020/resources/app/config/tag.json', 'utf-8'))
        }
    }
</script>

<style scoped>
    .tag{
        float: left;
       /* width: 200px;*/
    }
    >>>.el-checkbox-button, >>>.el-checkbox-button__inner{
        display: block;
        width: 200px;
    }
    >>>.el-checkbox-button__inner{
        margin: 10px 0;
        border: 1px solid #666 !important;
        border-radius: 4px !important;
    }
    >>>.el-checkbox-button.is-checked .el-checkbox-button__inner{
        border: none !important;  /*标签选中时样式*/
    }
</style>