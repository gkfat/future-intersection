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
import ArticleCard from './components/ArticleCard.vue';
import { useDisplay } from 'vuetify';
import FeatureArticleCard from './components/FeatureArticleCard.vue';
import { computed } from 'vue';
import { useArticleSnapshots } from '@/composables/useArticleSnapshots';

const { xs } = useDisplay();

const getWidth = computed(() => {
    return xs ? '100%' : '60%';
});

const { articles } = useArticleSnapshots();
</script>
