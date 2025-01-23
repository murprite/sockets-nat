<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Client from './client';

const peers = ref<string[]>([]);
const messages = ref([]);

const userMessage = defineModel("userMessage");

function updatePeers(newPeers: string[]) {
    peers.value = newPeers;
}

function updateMessages(newMessages) {
    messages.value = newMessages;
}

function sendUserMessage(e: Event) {
    e.preventDefault();
    client.sendMessage(userMessage.value);
    userMessage.value = "";
}


const client = new Client(updatePeers, updateMessages);

onMounted(() => {
    client.requestPeersList(); // Запрашиваем список peers при загрузке
    client.requestMessages(); // Запрашиваем список сообщений при загрузке
});

</script>

<template>
    <header>
        <h1>Connect</h1>
        <h2>List of all peers</h2>
        <div class="Left">
            <div>
                <div v-for="peer in peers" :key="peer">
                    {{ peer }}
                </div>
            </div>

            <form action="">
            Send some message to every client:
            <input type="text" v-model="userMessage">
            <input type="submit" @click="(e) => sendUserMessage(e)">
            </form>
        </div>
        <div class="Right">
            <div class="" v-for="message in messages" :key="message[0]"> 
                <h3>{{ message[0] }}</h3>
                <span>{{ message[1] }}</span>
            </div>
        </div>
    </header>
</template>
