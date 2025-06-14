---
title: 掌握 TypeScript 中的非同步
date: 2025-06-14T07:35:14.285Z
description: "在現代的網頁開發中，非同步程式設計已成為不可或缺的一部分。TypeScript 作為一種強型別的超集語言，為開發者提供了良好的工具來處理非同步操作。本文將深入探討 TypeScript 中的非同步模式，並通過範例展示如何將其應用在實際開發中。"
---

# 掌握 TypeScript 中的非同步

在現代的網頁開發中，非同步程式設計已成為不可或缺的一部分。TypeScript 作為一種強型別的超集語言，為開發者提供了良好的工具來處理非同步操作。本文將深入探討 TypeScript 中的非同步模式，並通過範例展示如何將其應用在實際開發中。

## 非同步操作與 Promise

非同步操作是指不會立即返回結果的操作。在 TypeScript 中，我們常用 Promise 來處理這些操作。Promise 提供了一個處理非同步操作的靈活方式，使代碼更具可讀性。

Promise 的基本用法可以用以下範例來展示：

```typescript
function fetchData(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: "Sample data from " + url });
    }, 1000);
  });
}

fetchData("https://api.example.com").then(data => {
  console.log(data);
}).catch(error => {
  console.error(error);
});
```

上述範例展示了如何使用 Promise 處理非同步請求，並在獲得結果後執行相應的操作。

## Async/Await 的應用

除了 Promise，TypeScript 也支持 async/await 語法，這使得非同步代碼看起來更像同步代碼，從而提高了可讀性和維護性。

以下是 async/await 在 TypeScript 中的應用範例：

```typescript
async function fetchDataAsync(url: string): Promise<void> {
  try {
    const data = await fetchData(url);
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchDataAsync("https://api.example.com");
```

相比於直接使用 Promise，async/await 語法更加直觀，尤其在需要進行多個非同步操作時，能夠減少回調地獄的情況。

## 例外處理與錯誤捕捉

在非同步程式設計中，錯誤的處理至關重要。TypeScript 提供了強大的工具來幫助開發者捕捉和處理這些錯誤。

在使用 Promise 時，我們可以通過 `.catch()` 方法來捕捉錯誤；而在 async/await 語法中，我們則可以使用 try/catch 結構：

```typescript
async function fetchDataWithErrorHandling(url: string): Promise<void> {
  try {
    const data = await fetchData(url);
    console.log(data);
  } catch (error) {
    console.error("Fetching data failed:", error);
  }
}

fetchDataWithErrorHandling("https://api.example.com");
```

這樣的處理方式可以確保我們的非同步代碼在出現錯誤時不會崩潰，從而提高了應用的穩定性。

## 總結

透過掌握 TypeScript 中的非同步程式設計技術，我們可以編寫出更高效、可維護的代碼。無論是使用 Promise 還是 async/await，重要的是要理解它們的特性和應用場景。希望本文能為正在進一步學習 TypeScript 的進階開發者提供一些啟發和實用的範例。更多資源可以參考 [TypeScript 官方文件](https://www.typescriptlang.org/docs/)。