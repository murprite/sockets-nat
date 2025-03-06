<script setup lang="ts">
import Client from '../client';
import { Ref, defineProps, defineModel } from 'vue';

interface IClientProps {
    client: Client;
}

const { client } = defineProps(['client']) as IClientProps;

const usernameModel = defineModel("usernameModel") as Ref<string>;

function submitForm(e: Event) {
    e.preventDefault();

    const button = e.target as HTMLButtonElement;

    // Prevent user to submit empty messages and messages with only spaces, tabs, etc
    if(button.value === "" || button.value.replace(/\s+/g, "") === "") return;

    client.username = usernameModel.value;

    client.registerProfile();
}
  
</script>
<template>
    <div class="ClientHello">
        <div class="ClientHello__modal">
            <form action="" class="ClientForm">
                <h3>Настройте профиль</h3>
                <div class="ClientForm__name">
                    <label for="name">Введите своё имя</label>
                    <input type="text" id="name" name="name" v-model="usernameModel">
                </div>
                <input type="submit" value="Войти" class="ClientForm__submit" @click="e => submitForm(e)">
            </form>
        </div>
    </div>
</template>
<style scoped>
    .ClientHello {
        height: 100vh;
        width: 100vw;
        background: #0E1621;
        position: absolute;
    }
    .ClientHello__modal {
        padding: 25px;
        color: #cfcfcf;
        background: #26394a;
        border-radius: 15px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        transition: all;
        animation: appear 0.8s ease;
        min-width: 400px;
        min-height: 200px;
    }
    #profileImg {
        align-self: center;
    }
    #name {
        outline: none;
        border: 0;
        border-radius: 20px;
        padding: 10px;
        background: #17212B;
        color: #cfcfcf;
    }

    .ClientForm {
        display: flex;
        flex-direction: column;
        gap: 15px;
        justify-content: space-between;
    }
    .ClientForm__name, .ClientForm__img {
        display: flex;
        flex-direction: column;
    }
    .ClientForm__submit {
        width: 150px;
        padding: 10px 0;
        border: 0;
        border-radius: 5px;
        background: #266aae;
        color: #17212B;
        color: #cfcfcf;
        font-weight: medium;
        cursor: pointer;
        align-self: center;
    }

    @keyframes appear {
        from {
            opacity: 0%;
            transform: translateX(-50%) translateY(50%);
        }
        to {
            opacity: 100%;
            transform: translateX(-50%) translateY(-50%);
        }
    }
    
</style>