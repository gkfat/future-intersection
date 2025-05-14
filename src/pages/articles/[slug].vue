<template>
    <v-card
        v-if="doc"
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
            {{ doc.title }}
        </v-card-title>
        <v-card-subtitle>
            {{ doc.date }}
        </v-card-subtitle>
        <v-card-text>
            {{ doc.description }}
        </v-card-text>
        
        <v-card-text
            class="pb-10 overflow-y-auto bg-transparent markdown-body"
        >
            <ContentRenderer
                :value="doc"
            >
                <ContentRendererMarkdown
                    :value="{
                        ...doc.body,
                        children: filteredBody
                    }"
                />
        
                <template #empty>找不到文章。</template>
            </ContentRenderer>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import 'github-markdown-css/github-markdown-dark.css';

import type { Article } from '~/types/article';

const { params } = useRoute();
const { data: doc } = await useAsyncData<Article>('article', () =>
    queryContent<Article>(`/articles/${params.slug}`).findOne(),
);

const filteredBody = computed(() => {
    if (!doc.value?.body?.children) return [];

    return doc.value.body.children.filter((node, index) => {
        return index > 1;
    });
});

useHead({
    title: doc.value?.title ?? '未命名文章',
    meta: [
        {
            name: 'description',
            content: doc.value?.description || '這是一篇精彩的文章。',
        },
        {
            property: 'og:title',
            content: doc.value?.title,
        },
        {
            property: 'og:description',
            content: doc.value?.description || '',
        },
    ],
});
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