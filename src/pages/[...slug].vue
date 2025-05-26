<template>
    <v-card
        v-if="page"
        elevation="10"
        rounded="xl"
        class="article-card mx-auto py-5 mb-10"
    >
        <v-card-title>
            <v-btn
                class="mb-3"
                color="primary"
                prepend-icon="mdi-chevron-left"
                to="/"
            >
                Back
            </v-btn>
        </v-card-title>

        <v-card-subtitle>
            {{ timeFormat(page.date) }}
        </v-card-subtitle>
        
        <v-card-text
            class="h-100 px-10 pb-10 overflow-y-auto markdown-body"
        >
            <content-renderer :value="page"/>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import 'github-markdown-css/github-markdown.css';
import { useRoute } from 'vue-router';
import { timeFormat } from '@/utils/time';

const route = useRoute();

const { data: page } = await useAsyncData(
    route.path,
    async () => {
        const path = route.path.slice(1);
        const rs = await queryCollection('content').where('id', '=', path).first();

        return rs;
    },
);

useSeoMeta({
    title: page.value?.seo.title,
    description: page.value?.seo.description,
});
</script>
<style lang="scss" scoped>
.article-card {
    width: 95%;

    @media (min-width: 768px) {
        width: 70%;
    }

    @media (min-width: 1024px) {
        width: 50%;
    }
}

:deep(.markdown-body) {
    h1,h2,h3,h4,h5,h6 {
        margin: 50px 0 30px;
    }
}
</style>