<template>
    <view class="favorite-wrap">
        <view class="pbox">
            <view class="collect-avatar" :class="{ fix: i == 0 }" v-for="(u, i) in usersList" :key="i">
                <image :src="u.p" mode="widthFix"></image>
            </view>
        </view>
        <view class="collect-count">{{ text }}</view>
        <view class="iconsbox">
            <u-icon class="icon" v-if="ifStar" :name="isStar ? 'star-fill' : 'star'" @click="clickStar" size="22px"></u-icon>
            <u-icon class="icon" v-if="ifChat" name="chat" @click="clickChat" size="22px"></u-icon>
            <u-icon class="icon" v-if="ifShare" name="share" @click="clickSharing" size="22px"></u-icon>
        </view>
    </view>
</template>

<script>
export default {
    name: "ContentInfo",
    props: {
        text: {
            type: String,
            required: true,
            default: ""
        },
        usersList: {
            type: Array,
            required: true, // 必填属性
            default: () => [], // 设置默认值
            validator: function (value) { // 自定义验证器
                return value.every(item => typeof item === 'object' && 'p' in item);
            }
        },
        ifStar: {
            type: Boolean,
            default: false,
        },
        ifChat: {
            type: Boolean,
            default: false,
        },
        ifShare: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        alt() {
            return this.name + "的头像"
        }
    },
    methods: {

    },
    data() {
        return {
            isStar: false
        };
    }
}
</script>

<style lang="scss">
.content-img {
    display: block;
    width: 750rpx;
}

.favorite-wrap {
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-columns: auto auto 1fr;

    .pbox {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        .collect-avatar {
            position: relative;
            margin-left: -4px;
            border: 2px solid #fff;
            width: 32rpx;
            height: 32r2px;
            border-radius: 999px;
            background: #fff;
            overflow: hidden;

            &.fix {
                margin-left: 0;
            }

            image {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }


    .collect-count {
        margin-left: 4px;
        font-size: 10px;
        color: $uni-text-color-grey;
    }

    .iconsbox {
        display: flex;
        justify-self: end;
        align-self: center;

        .icon{
            margin:0 10px;
        }
    }
}

.item-name {
    padding: 0 4px;
    margin-top: 4px;
    font-size: 14px;
    font-weight: 700;
}
</style>
