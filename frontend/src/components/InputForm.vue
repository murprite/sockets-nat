<template>
    <form class="InputForm">
        <InputFile />
        <input type="text" v-model="messageModel" placeholder="Напишите сообщение">
        <div class="InputForm__"></div>
        <input type="submit" @click="(e) => sendUserMessage(e)">
        <InputMicrophone />
    </form>
</template>

<script lang="ts" setup>
    import InputFile from './InputFile.vue';
    import InputMicrophone from './InputMicrophone.vue';

    const messageModel = defineModel("messageModel");
    const { client } = defineProps(['client']);

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
</style>