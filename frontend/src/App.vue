
<script setup lang="ts">
/* eslint-disable */
// @ts-nocheck

import Client from './client';

let client = null;

function connectServer() {
  client = new Client();
}

</script>

<template>
    <header>
      <h1>You can't be the king if you taste like shit</h1>
      <button @click="() => connectServer()">Connect to the server</button>
    </header>
</template>
