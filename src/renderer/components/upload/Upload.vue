<template>
    <div class="content">
        <div class="upload">
            <el-upload
                    drag
                    ref="upload"
                    list-type="picture"
                    class="avatar-uploader"
                    :show-file-list="false"
                    action=""
                    :auto-upload="false"
                    :on-change="handleChange"
                    :on-remove="handleRemove">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload><br>
            <el-button type="success" @click="submitUpload" :disabled="disabled" style="width:400px; height: 60px; font-size: 30px;">上传</el-button>
        </div>
        <Tag ref="tag"></Tag>
    </div>
</template>

<script>
    import httpApi from '@/assets/js/httpApi'
    import Tag from '@/components/tag/Tag'
    import { initParams } from "@/assets/js/util";

    export default {
        components: { Tag },
        data() {
            return {
                imageUrl: '',
                base64img: '',
                disabled: false,
            };
        },
        methods: {
            handleChange(file, list){
                let reader = new FileReader();
                reader.readAsDataURL(file.raw); //这一步很关键
                reader.onload = () => {
                    this.base64img = reader.result.split(",")[1];  //转化成base64了
                };
                this.imageUrl = file.raw.path;
            },

            handleRemove(file, fileList){
                console.log(file, fileList);
                this.imageUrl = '';
            },

            async submitUpload(){
                let params = await initParams();
                for(const value of this.$refs.tag.checkboxGroup){
                    params[value] = 1
                }
                console.log('params', params)
                params.img = this.base64img;
                if(!this.base64img) {
                    this.$notify.error({
                        title: '错误',
                        message: '请选择图片'
                    });
                    return;
                }

                this.disabled = true;
                httpApi.post('/api/addLabel', params)
                    .then(() => {
                        //状态已经集中判断了，这里直接写成功的逻辑
                        this.$notify({
                            title: '成功',
                            message: '上传成功',
                            type: 'success'
                        });
                        this.disabled = false;
                        this.imageUrl = '';
                        this.$refs.tag.checkboxGroup = []; //重置选择
                    })
            }
        }
    }
</script>

<style scoped>
    .content{
        width: 700px;
        margin: 20px auto;
        overflow: hidden;
    }
    .upload{
        width: 470px;
        float: left;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 400px;
        height: 600px;
        line-height: 600px;
        text-align: center;
    }
    .avatar {
        width: 400px;
        height: 600px;
        display: block;
    }
    >>>.el-upload-dragger{
        width: 400px;
        height: 600px;
        border: 2px dashed #d9d9d9;
    }

</style>