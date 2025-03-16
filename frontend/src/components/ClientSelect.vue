<script lang="ts" setup>

const { peer } = defineProps(['peer']);

</script>

<template>
    <div class="ClientSelect">
        <div class="ClientSelect__img">
            <img :src="peer.img ? peer.img : '../../userdata/default.jpg'">
        </div>
        <div class="ClientSelect__main">
            <h3 :style="{color: peer.color}">{{ peer.username }}</h3>
        </div>
    </div>
</template>

<style scoped>
    .ClientSelect {
        display: flex;
        padding: 15px;
        color: #f5f5f5;
        align-items: center;
    }
    .ClientSelect__main {
        margin-left: 15px;
    }
    .ClientSelect:hover {
        background: #1c2834;
        transition: all 0.1s;
    }
    .ClientSelect__img {
        border-radius: 50%;
        max-width: 50px;
        max-height: 50px;
    }
    .ClientSelect__img img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
</style>