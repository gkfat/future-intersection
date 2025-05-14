<template>
    <v-card
        class="px-2 py-4 h-100 d-flex flex-column"
        rounded="lg"
        elevation="5"
    >
        <v-card-title
            class="text-center text-h4"
            style="white-space: normal; overflow: visible; text-overflow: unset;"
        >
            {{ article.title }}
        </v-card-title>

        <v-card-subtitle>
            {{ article.date }}
        </v-card-subtitle>

        <v-card-text
            class="flex-grow-1"
            :style="{fontSize: '18px'}"
        >
            {{ article.description }}
        </v-card-text>

        <v-card-actions class="justify-end">
            <v-btn
                variant="outlined"
                color="primary"
                class="text-none"
                @click="toArticle(article._path)"
            >
                Read More

                <v-icon icon="mdi-chevron-right"/>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script lang="ts" setup>
import type { ArticleSnapshot } from '~/types/article';

const router = useRouter();

defineProps<{ article: ArticleSnapshot }>();

function toArticle(path: string) {
    router.push(path);
}
</script>