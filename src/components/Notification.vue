<template>
    <div class="notification">
        <p class="notification-title">{{title}}</p>
    </div>
</template>
<script setup>
defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>