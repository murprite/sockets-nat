<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue';
import Client from './client';
import ClientSelect from './components/ClientSelect.vue';
import ClientHello from './components/ClientHello.vue';
import InputForm from './components/InputForm.vue'
import { IMessage } from './constants';

import 'emoji-picker-element';

const peers = ref<string[]>([]);
const messages: Ref<IMessage[]> = ref([]);


function updatePeers(newPeers: string[]) {
    peers.value = newPeers;
}

function updateMessages(newMessages) {
    messages.value = newMessages;
}

// function createUserPopup(str: string) {
//     const div = document.createElement("div");
//     div.className = "Messages__popup";
//     div.textContent = str;

//     const elemMount = document.querySelector(".main__messages");
//     elemMount?.append(div);
// }

const client = new Client(updatePeers, updateMessages);

onMounted(() => {
    client.requestPeersList(); // Запрашиваем список peers при загрузке
    client.requestMessages(); // Запрашиваем список сообщений при загрузке
});

// Listening server to show new/disconected profile locally
// client.socket.on("clientRegisteredProfile", username => createUserPopup(`${username} присоединился к чату`));
// client.socket.on("clientDisconected", username => createUserPopup(`${username} вышел из чата`));


</script>

<template>
    <main class="main">
        <ClientHello :client v-if="!client.registered.value"/>
        <div class="main__clientList">
            <ClientSelect v-for="peer in peers" :key="peer" :peer="peer"/>
        </div>
        <div class="main__column">
            <div class="main__messages">
                <div :class="['main__message', message.class]" v-for="message in messages" :key="message.messageid">
                    <h3 :style="{color: message.color}">{{ message.username }}</h3>
                    <span>{{ message.message }}</span>
                </div>
            </div>
            <div class="main__form">
                <InputForm :client/>
            </div>
        </div>
    </main>
</template>

<style scoped>
    emoji-picker {
        display: none;
        position: absolute;
    }
    .main {
        display: flex;
        height: 100%;
        overflow: hidden;
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
    .main__form form {
        height: 100%;
        display: flex;
    }
    .main__form {
        position: absolute;
        bottom: 0;
        width: 100%;
    }
    .main__form input {
        color: #f5f5f5;
        outline: none;
        margin-top: auto;
        min-width: 150px;
        background: #17212B;
        padding: 5px 15px;
        border: 0;
        height: 100%;
    }
    .main__form input[type='submit'] {
        margin-left: auto;
        cursor: pointer;
    }
    .main__form input[type='submit']:hover {
        background: #1c2834;
        transition: all 0.1s;
    }
    .main__form {
        background: #17212B;
        display: flex;
        flex-direction: column;
        height: 45px;
    }
    .main__column {
        width: 80vw;
    }
    .main__messages {
        color: #f5f5f5;
        padding: 15px;
        height: 90vh;
        gap: 5px;
        display: flex;
        flex-direction: column;
    }
</style>

<style>
    .SystemMessage {
        align-self: center;
        background: #17212B;
        color: aliceblue;
        padding: 2px 10px;
        border-radius: 15px;
        text-align: center;
        display: flex;
    }
</style>
