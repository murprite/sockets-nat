<template>
    <form class="InputForm" @submit.prevent="sendUserMessage">
        <InputFile />
        <input type="text" class="InputForm__message" v-model="messageModel" placeholder="Напишите сообщение...">
        <div class="InputForm__emoji">
            <emoji-picker></emoji-picker>
        </div>
        <div class="InputForm__emojiButton">
            <button @click="() => isEmojiShown = !isEmojiShown">
                <Icon icon="hugeicons:smile" width="28" height="28" />
            </button>
        </div>
        <input type="submit">
        <InputMicrophone />
    </form>
</template>

<script lang="ts" setup>
    import { ref } from 'vue';
    import InputFile from './InputFile.vue';
    import InputMicrophone from './InputMicrophone.vue';
    import { Icon } from '@iconify/vue/dist/iconify.js';

    const messageModel = defineModel("messageModel");
    const { client } = defineProps(['client']);

    const isEmojiShown = ref(false);

    function sendUserMessage(e: Event) {
        e.preventDefault();
        client.sendMessage(messageModel.value);
        messageModel.value = "";
    }
    
</script>

<style scoped>
    input {
        outline: 0;
        color: aliceblue;
        background: #17212B;
        border: 0;
    }
    .InputForm {
        width: 80vw;
    }
    .InputForm__message {
        width: 100%;
    }
    .InputForm__emoji {
        position: relative;
    }
    .InputForm__emojiButton button {
        height: 100%;
        background: rgba(0,0,0,0);
        outline: 0;
        border: 0;
        cursor: pointer;
        color: #65717C;
    }
    .InputForm__emojiButton button:hover {
        background: #1c2834;
        transition: all 0.1s;
    }
    emoji-picker {
        display: none;
        position: absolute;
        top: calc(100% + 5px);
    }
</style>