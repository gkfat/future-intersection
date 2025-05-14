<template>
    <v-card
        v-if="article"
        elevation="0"
        color="transparent"
        class="article-card mx-auto mb-5 h-100"
    >
        <v-btn
            class="mb-3"
            color="primary"
            prepend-icon="mdi-chevron-left"
            to="/"
        >
            Back
        </v-btn>

        <v-card-title class="text-h4 font-weight-bold">
            {{ article.title }}
        </v-card-title>
        <v-card-subtitle>
            {{ timeFormat(article.date) }}
        </v-card-subtitle>
        <v-card-text>
            {{ article.description }}
        </v-card-text>
        
        <v-card-text
            class="pb-10 overflow-y-auto bg-transparent markdown-body"
        >
            <div
                v-html="renderHtml"
            />
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import 'github-markdown-css/github-markdown-dark.css';
import {
    computed, watch, 
} from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';
import { useArticle } from '@/composables/useArticle';
import MarkdownIt from 'markdown-it';
import { useArticleSnapshots } from '@/composables/useArticleSnapshots';
import { timeFormat } from '@/utils/time';

const route = useRoute();
const slug = route.params.slug as string;

const { articles } = useArticleSnapshots();
const { article } = useArticle(slug);

const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
});

const renderHtml = computed(() => article.value.content ? md.render(article.value.content) : '');

watch(
    () => articles.value,
    (val) => {
        const findData = val.find((v) => v._path === slug);

        useHead({
            title: findData.title ?? '未命名文章',
            meta: [
                {
                    name: 'description', content: findData.description || '這是一篇精彩的文章。', 
                },
                {
                    property: 'og:title', content: findData.title, 
                },
                {
                    property: 'og:description', content: findData.description || '', 
                },
            ],
        });
    },
);

</script>
<style lang="scss" scoped>
.article-card {
    width: 95%;

    @media (min-width: 768px) {
        width: 70%;
    }
}

:deep(.markdown-body) {
    h1,h2,h3,h4,h5,h6 {
        margin: 50px 0 30px;

        a {
            color: #252525;
        }
    }
}
</style>