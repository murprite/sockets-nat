<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Client from './client';
import ClientSelect from './components/ClientSelect.vue';
import ClientHello from './components/ClientHello.vue';

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
    <ClientHello :client/>
    <main class="main">
        <div class="main__clientList">
            <ClientSelect v-for="peer in peers" :key="peer" :clientOptions="peer"/>
        </div>
        <div class="main__column">
            <div class="main__messages">
                <div class="" v-for="message in messages" :key="message[0]">
                    <h3 :style="client.options.color">{{ message[0] }}</h3>
                    <span>{{ message[1] }}</span>
                </div>
            </div>
            <div class="main__form">
                <form action="">
                    <input type="text" v-model="userMessage" placeholder="Напишите сообщение">
                    <input type="submit" @click="(e) => sendUserMessage(e)">
                </form>
            </div>
        </div>
    </main>
</template>

<style scoped>

    .main__form {
        margin-top: auto;
    }
    .main {
        display: flex;
        height: 100%;
    }
    .Right {
        overflow-y: visible;
        overflow-x: hidden; 
    }
    #app {
        height: 100%;
    }
    .main__clientList {
        background: #17212B;
        width: 20vw;
    }
    .main {
        background: #0E1621;
    }
    .main__form input::placeholder {
        color: #26394a;
    }
    .main__form input {
        color: #f5f5f5;
        outline: none;
        margin-top: auto;
        min-width: 150px;
        background: #17212B;
        padding: 5px 15px;
        border: 0;
    }
    .main__form input[type='submit'] {
        margin-left: auto;
    }
    .main__form {
        background: #17212B;
        width: 100%;
    }
    .main__column {
        width: 100%;
    }
    .main__messages {
        color: #f5f5f5;
        padding: 15px;
    }
</style>
