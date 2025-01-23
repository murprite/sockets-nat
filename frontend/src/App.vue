<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Client from './client';

const peers = ref<string[]>([]);

function updatePeers(newPeers: string[]) {
    peers.value = newPeers;
    console.log("asdasd", peers.value);
}


const client = new Client(updatePeers);

onMounted(() => {
    client.requestPeersList(); // Запрашиваем список peers при загрузке
});

</script>

<template>
    <header>
        <h1>Connect</h1>
        <h2>List of all peers</h2>
        <div>
            <div v-for="peer in peers" :key="peer">
                {{ peer }}
            </div>
        </div>
    </header>
</template>
