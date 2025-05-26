<template>
    <v-container
        class="articles-container py-10"
    >
        <v-row
            v-if="articles?.length"
        >
            <v-col
                cols="12"
                :style="{ minHeight: '350px' }"
            >
                <ArticleCard
                    :article="articles[0]"
                    :is-featured="true"
                />
            </v-col>

            <v-col
                v-for="article in articles?.slice(1)"
                :key="article.id"
                cols="12"
                sm="6"
                md="4"
                variant="outlined"
            >
                <ArticleCard
                    :article="article"
                    :is-featured="false"
                />
            </v-col>
        </v-row>
    </v-container>
</template>
<script lang="ts" setup>
import ArticleCard from './components/ArticleCard.vue';

const { data: articles } = await useAsyncData(
    () => queryCollection('content')
        .order('date', 'DESC')
        .all(),
);
</script>
<style lang="scss" setup>
.articles-container {
    width: 95%;

    @media (min-width: 768px) {
        width: 70%;
    }
}
</style>
