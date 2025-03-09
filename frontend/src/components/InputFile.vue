<template>
    <div class="InputFile" @mouseover="() => isMenuOpen = true" @mouseleave="() => isMenuOpen = false">
        <div :class="'InputFile__menu ' + isMenuOpen ? 'InputFile__menu_open' : 'InputFile__menu_close'">
            qadadad
        </div>
        <Icon icon="ant-design:paper-clip-outlined" width="25px" height="25px" />
    </div>
</template>

<script lang="ts" setup>
    import { Icon } from "@iconify/vue";
    import { ref } from "vue";

    const isMenuOpen = ref(false);

</script>

<style>
    .InputFile {
        padding: 10px;
        height: 100%;
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
    }

    .InputFile:hover {
        background: #1c2834;
        transition: all 0.1s;
        cursor: pointer;
    }

    .InputFile__menu {
        transition: all 0.2s;
        position: absolute;
        bottom: 100%;
        left: 5px;
        background: #1c2834;
        border-radius: 10px;
        width: 150px;
        height: 200px;
    }
    .InputFile__menu_open {

    }
    .InputFile__menu_close {}
    

</style>