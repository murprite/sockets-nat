<script lang="ts" setup>
    const { clientOptions } = defineProps(['clientOptions']);

    
</script>

<template>
    <div class="ClientSelect">
        <div class="ClientSelect__img">
            <img :src="clientOptions.img ? clientOptions.img : '../src/logo.svg'">
        </div>
        <div class="ClientSelect__main">
            <h3>{{ clientOptions.name }}</h3>
        </div>
    </div>
</template>

<style scoped>
    .ClientSelect {
        display: flex;
        padding: 15px;
        color: #f5f5f5;
    }
    .ClientSelect:hover {
        background: #1c2834;
        transition: all 0.1s;
    }
    .ClientSelect__img {
        border-radius: 50%;
    }

    .ClientSelect__main {
        
    }
</style>