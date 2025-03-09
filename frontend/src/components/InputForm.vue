<template>
    <form>
        <InputFile />
        <input type="text" v-model="messageModel" placeholder="Напишите сообщение">
        <emoji-picker></emoji-picker>
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

<style>

</style>