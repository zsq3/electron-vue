<template>
    <main>
        <el-input placeholder="请输入内容" v-model="search_data" class="search">
            <el-button type="primary" slot="append" icon="el-icon-search" @click="searchSome"></el-button>
        </el-input>
        <ul>
            <li v-for="(item, index) in tags" :key="index" @mouseenter="num=index" @mouseleave="num=-1">
                <el-image :src="item.path">
                    <div slot="error" class="image-slot" style="height: 100%;">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
                <transition name="el-zoom-in-center">
                    <div v-show="num===index" class="transition-box">
                        <div class="btn">
                            <el-button type="info" icon="el-icon-edit" circle @click="edit(item)"></el-button>
                            <el-button type="warning" icon="el-icon-delete" circle @click="remove(item, index)"></el-button>
                        </div>
                    </div>
                </transition>
            </li>
        </ul>
        <el-button type="primary" icon="el-icon-download" class="download_btn" @click="exportData">导出</el-button>
        <el-dialog
                title="提示"
                :visible.sync="dialog"
                width="30%">
            <Tag ref="tag" style="float:none;"></Tag>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
          </span>
        </el-dialog>
    </main>
</template>

<script>
    import fs from 'fs'
    import path from 'path'
    import Tag from '@/components/tag/Tag'
    import httpApi from '@/assets/js/httpApi'
    import { initParams } from "@/assets/js/util";

    export default {
        name: "Edit",
        components: { Tag },
        data() {
            return {
                tags: [],
                search_data: '',
                num: -1,
                dialog: false,
                edit_data: {
                    path: ''
                }
            }
        },
        methods: {
            async searchAll(){
                this.tags = (await httpApi.get('/api/findLabel')).list;
            },

            async searchSome(){
                if(this.search_data){
                    let json = JSON.parse(fs.readFileSync('D:/Tool2020/resources/app/config/tag.json', 'utf-8'));
                    let keys = Object.keys(json);
                    let value = Object.values(json);
                    if(value.includes(this.search_data)){
                        this.tags = (await httpApi.get('/api/findLabel', { [keys[value.indexOf(this.search_data)]]: 1 })).list;
                    }else{
                        this.$notify({
                            title: '错误',
                            message: '请输入正确参数',
                            type: 'error'
                        });
                    }
                }else{
                    this.searchAll()
                }
            },

            edit(obj){
                this.dialog = true;
                this.edit_data.path = obj.path;
                let checked = [];
                for(let key in obj){
                    if(obj[key] === 1){
                        checked.push(key);
                    }
                }
                //由于el-dialog不是created生命周期加载完成的，所以要写成下面这样
                this.$nextTick(()=>{
                    this.$refs.tag.checkboxGroup = checked;
                })

            },

            remove(obj, index){
                this.$confirm('确认删除？')
                    .then(()=> {
                        httpApi.deletes('/api/deleteLabel', obj)
                            .then(() => {
                                this.$notify({
                                    title: '成功',
                                    message: '已删除',
                                    type: 'success'
                                });
                                this.tags.splice(index,1)
                            })
                    })

            },

            submit(){
                this.$confirm('确认修改？')
                    .then(()=> {
                        this.dialog = false;
                        initParams()
                            .then(data => {
                                for(const value of this.$refs.tag.checkboxGroup){
                                    data[value] = 1
                                }
                                data.path = this.edit_data.path;
                                console.log("data1", data)
                                return data
                            })
                            .then(data => {
                                console.log('data2',data)
                                httpApi.post('/api/updateLabel', data)
                                    .then(res => {
                                        this.$notify({
                                            title: '成功',
                                            message: '修改完成',
                                            type: 'success'
                                        });

                                        this.tags = res.list;
                                    })
                            })

                    })

            },

            exportData() {
                httpApi.post('/api/exportDB', { list: this.tags })
                    .then(() => {
                        this.$notify({
                            title: '成功',
                            message: '导出完毕',
                            type: 'success'
                        });
                    })
            }
        },
        created(){
            this.searchAll()
        }
    }
</script>

<style scoped lang="scss">
    main{
        overflow: hidden;
    }
    .search{
        padding: 20px 30px 0;
    }
    ul {
        padding: 20px;
        overflow: hidden;
        li {
            position: relative;
            float: left;
            width: 450px;
            height: 250px;
            border: 1px solid #ccc;
            margin: 10px;

            .el-image {
                width: 100%;
                height: 100%;
            }

            .transition-box{
                position: absolute;
                left:0;
                top:0;
                z-index: 100;
                width: 100%;
                height: 100%;
                background: #409EFF;
                /*opacity:0.5;*/
                .btn{
                    margin-top: 100px;
                    text-align: center;

                    .el-button{
                        font-size: 24px;
                    }
                }
            }
        }
    }

</style>
<style scoped>
    >>>.el-input{
        font-size: 28px !important;
    }
    >>> .el-input__inner{
        height: 68px !important;
        font-size: 28px !important;
    }
    >>> .el-input-group__append, .el-input-group__prepend{
        background: #409EFF;
        color: #fff;
    }
    >>>.el-input-group__append button.el-button{
        width:150px;
    }

    >>>.el-input__suffix i{
        padding-top: 10px !important;
        font-size: 24px !important;
    }

    >>>.el-dialog{
        width: 500px !important;
    }
    >>>.el-checkbox-button, >>>.el-checkbox-button__inner {
        display: inline-block;
        margin: 3px 10px;
    }

    .download_btn{
        width: calc(100% - 60px);
        height: 50px;
        font-size: 24px;
        margin: 0 30px;
    }
</style>