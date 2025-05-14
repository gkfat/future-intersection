<template>
    <v-container
        :width="getWidth"
        class="py-10"
    >
        <v-row
            v-if="articles?.length"
        >
            <v-col
                cols="12"
                :style="{ minHeight: '350px' }"
            >
                <FeatureArticleCard :article="articles[0]" />
            </v-col>

            <v-col
                v-for="article in articles?.slice(1)"
                :key="article._path"
                cols="12"
                sm="6"
                md="4"
                variant="outlined"
            >
                <ArticleCard :article="article" />
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts" setup>
import type { ArticleSnapshot } from '~/types/article';

import ArticleCard from './components/articleCard.vue';
import { useDisplay } from 'vuetify';
import FeatureArticleCard from './components/featureArticleCard.vue';

const { xs } = useDisplay();

const getWidth = computed(() => {
    return xs ? '100%' : '60%';
});

const { data: articles } = await useAsyncData<ArticleSnapshot[]>('articles', () =>
    queryContent<ArticleSnapshot>('/articles') // 查詢 /src/content/articles/ 下的所有文章
        .where({ _extension: 'md' }) // 限定為 markdown 檔
        .sort({ date: -1 }) // 依照日期新到舊排序
        .only([
            '_path',
            'title',
            'date',
            'description',
        ])
        .find(),
);
</script>
