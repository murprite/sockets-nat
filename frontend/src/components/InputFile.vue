<template>
    <div class="InputFile" @mouseover="() => isMenuOpen = true" @mouseleave="() => isMenuOpen = false">
        <div :class="['InputFile__menu', isMenuOpen ? 'InputFile__menu_open' : 'InputFile__menu_close']">
            <div class="InputFile__file">
                <Icon icon="f7:doc" :width="ICON_W" :height="ICON_H" />
                <span>Прикрепить файл</span>
            </div>
            <div class="InputFile__image">
                <Icon icon="lets-icons:img-box-fill" :width="ICON_W" :height="ICON_H" />
                <span>Прикрепить изображение</span>
            </div>
            <div class="InputFile__video">
                <Icon icon="bxs:video" :width="ICON_W" :height="ICON_H" />
                <span>Прикрепить видео</span> 
            </div>
        </div>
        <Icon icon="ant-design:paper-clip-outlined" :width="ICON_W" :height="ICON_H" />
    </div>
</template>

<script lang="ts" setup>
    import { Icon } from "@iconify/vue";
    import { ref } from "vue";

    const ICON_W = '25px';
    const ICON_H = '25px';

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
        bottom: calc(100% + 5px);
        left: 5px;
        background: #1c2834;
        border-radius: 5px;
        width: 150px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .InputFile__menu > * {
        padding: 10px;
        display: flex;
        color: aliceblue;
        border-radius: 5px;
    }
    .InputFile__menu > *:hover {
        background: #303f4e;
        transition: all 0.1s;
        cursor: pointer;
    }
    .InputFile__menu_open {
        animation: showMenu .3s ease-in-out;
    }
    .InputFile__menu_close {
        animation: hideMenu .3s ease-in-out;
        visibility: hidden;
    }

    @keyframes hideMenu {
        0% { 
            opacity: 100%;
        }
        50% {
            opacity: 0;
        }
        100% {
            height: 0;
            opacity: 0;
            width: 0;
            visibility: hidden;
        }
    }
    @keyframes showMenu {
        0% {
            height: 0;
            opacity: 0;
            width: 0;
        }
        50% {
            height: 200px;
            width: 150px;
            opacity: 50%;
        }
        100% {
            opacity: 100%;
        }
    }

</style>