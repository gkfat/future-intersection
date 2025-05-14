//@ts-check
import dotenv from 'dotenv';
import fs from 'fs';
import { OpenAI } from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const prompt = process.env.ARTICLE_PROMPT;

if (!prompt) {
    console.error('❌ 請設定 ARTICLE_PROMPT 環境變數');
    process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const contentDir = path.resolve(__dirname, '../../src/content/articles');

/**
 * 若相同日期則產生流水號
 * @param {string} baseDir
 * @param {string} date
 */
function getUniqueFilename(baseDir, date) {
    let index = 0;
    let filename;
    do {
        const suffix = index === 0 ? '' : `-${index}`;
        filename = path.join(baseDir, `${date}${suffix}.md`);
        index++;
    } while (fs.existsSync(filename));
    return filename;
}

const filename = getUniqueFilename(contentDir, today);

const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
        {
            role: 'user', content: prompt, 
        },
    ],
    temperature: 0.8,
});

const markdown = response.choices[0].message.content ?? '';

const h1Match = markdown.match(/^# (.+)$/m);
const title = h1Match?.[1] || `未命名文章 (${today})`;

// 解析 description：尋找 H1 之後第一個非空段落
let description = '';
if (h1Match) {
    const h1Index = markdown.indexOf(h1Match[0]);
    const afterH1 = markdown.slice(h1Index + h1Match[0].length).trim();
    const paragraphMatch = afterH1.match(/^(?:>?\s*)?(.+?)(?:\n{2,}|$)/s);
    description = paragraphMatch?.[1].replace(/\n/g, ' ').trim() || '';
}

fs.mkdirSync(path.dirname(filename), { recursive: true });
fs.writeFileSync(
    filename,
    `---\ntitle: ${title}\ndate: ${today}\nmeta:\n  description: ${JSON.stringify(description)}\n---\n\n${markdown}`,
);

console.log(`Generated: ${filename}`);
