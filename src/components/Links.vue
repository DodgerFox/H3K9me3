<template>
    <div class="block links">
        <a :href=item.link class="link" target="_blank" v-for="(item, index) in data" :key="index">
            <img src="@/assets/images/icon_link.svg">
            <p class="link__name">{{item.name}}</p>
        </a>
    </div>
</template>
<script>
export default {
    name: 'link',
    props: {
        data: {
            type: Array,
            required: true
        }
    },
    mounted() {
        console.log(this.data, 'adadw');
    }
}
</script>