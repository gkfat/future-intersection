import { Article } from '@/types/article';
import {
    ref, onMounted, 
} from 'vue';
import frontMatter from 'front-matter';

interface FrontMatterAttributes {
    title?: string;
    date?: string;
    description?: string;
  }

export function useArticle(path: string) {
    const article = ref<Article | null>(null);
  
    onMounted(async () => {
        const res = await fetch(`/articles/${path}.md`);
        const raw = await res.text();
        const parsed = frontMatter<FrontMatterAttributes>(raw);
  
        article.value = {
            _path: path,
            title: parsed.attributes.title ?? '未命名',
            date: parsed.attributes.date ?? '',
            description: parsed.attributes.description ?? '',
            content: parsed.body,
        };
    });
  
    return { article };
}