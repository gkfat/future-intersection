<template>
    <v-card
        class="px-2 py-4 h-100 d-flex flex-column"
        rounded="lg"
        elevation="3"
    >
        <v-card-title 
            :class="{
                'text-center text-h4': isFeatured
            }"
            style="white-space: normal; overflow: visible; text-overflow: unset;"
        >
            {{ article.title }}
        </v-card-title>

        <v-card-subtitle>
            {{ timeFormat(article.date) }}
        </v-card-subtitle>

        <v-card-text
            class="flex-grow-1"
            :style="{
                'fontSize': isFeatured ? '18px' : ''
            }"
        >
            {{ article.description }}
        </v-card-text>

        <v-card-actions class="justify-end">
            <v-btn
                variant="outlined"
                color="primary"
                class="text-none"
                @click="toArticle(article.id)"
            >
                Read More

                <v-icon icon="mdi-chevron-right" />
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { timeFormat } from '@/utils/time';
import type { ContentCollectionItem } from '@nuxt/content';

const router = useRouter();

defineProps<{
    article: ContentCollectionItem;
    isFeatured: boolean
}>();

function toArticle(path: string) {
    router.push(path);
}
</script>