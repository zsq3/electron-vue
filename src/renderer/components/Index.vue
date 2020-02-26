<template>
    <div>
        <ul>
            <router-link tag="li" v-for="(item, index) in entry" :key="index" :to="item.url">
                <i :class="item.icon"></i><br>
                <p>{{ item.text }}</p>
            </router-link>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                entry: [
                    {
                        icon: 'el-icon-setting',
                        text: '测试数据管理',
                        url: '/test-data-manage'
                    },
                    {
                        icon: 'el-icon-setting',
                        text: '训练数据管理',
                        url: '/training-data-manage'
                    },
                    {
                        icon: 'el-icon-pie-chart',
                        text: '报表',
                        url: '/report'
                    }
                ]
            };
        },
        methods: {

        }
    }
</script>

<style scoped lang="scss">
    ul{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 900px;
        height: 500px;
        list-style-type: none;

        li{
            float: left;
            width: 250px;
            height: 250px;
            padding-top: 75px;
            color: #fff;
            text-align: center;
            border-radius: 50%;
            box-shadow:2px 10px 10px #999;
            margin: 0 20px;
            background-image: linear-gradient(#E2B0FF, #0A62BB);

            i{
                font-size: 50px;
                margin-bottom: 10px;
            }
            p{
                font-size: 24px;
            }

        }
    }

</style>