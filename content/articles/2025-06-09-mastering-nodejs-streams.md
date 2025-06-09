---
title: 精通 Node.js Streams
date: 2025-06-09T23:41:24.617Z
description: "簡介段：Node.js 提供了強大的 Streams 機制，用於處理大規模資料的輸入輸出操作。對於需要高效能和低記憶體使用的應用程式，掌握 Streams 是必不可少的。這篇文章針對進階開發者，深入探討如何有效地運用 Node.js Streams，提升應用效能。"
---

# 精通 Node.js Streams

簡介段：Node.js 提供了強大的 Streams 機制，用於處理大規模資料的輸入輸出操作。對於需要高效能和低記憶體使用的應用程式，掌握 Streams 是必不可少的。這篇文章針對進階開發者，深入探討如何有效地運用 Node.js Streams，提升應用效能。

## Streams 的基本概念

Streams 是 Node.js 中處理資料流的一種抽象接口，主要用於逐片輸出和輸入資料。與一次性讀取整個資料不同，Streams 按需處理資料塊，從而降低記憶體需求。Streams 分為四種：可讀（Readable）、可寫（Writable）、雙工（Duplex）、轉換（Transform）。了解這些類型是掌握 Streams 的第一步。

在實際應用中，使用 Streams 可以顯著提升效能。例如，處理大型檔案時，使用可讀和可寫 Streams，可以邊讀邊寫，避免因檔案過大而導致的記憶體溢位問題。

Node.js 提供了豐富的 Streams API，讓開發者可以自行擴展和定制化數據流處理。理解這些 API 的運作方式，對於需要進行自製 Streams 的場景尤為重要。

## 使用 Streams 進行高效數據處理

以可讀 Streams 為例，開發者可以通過 `fs.createReadStream()` 方法，從檔案中分塊讀取資料，而不是一次性加載到記憶體中。這種方法在處理大檔案時尤為有效，如下範例：

```javascript
const fs = require('fs');
const readStream = fs.createReadStream('large-file.txt');

readStream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
});

readStream.on('end', () => {
  console.log('No more data.');
});
```

寫入資料的時候，也可以使用可寫 Streams，這樣可以逐塊寫入，而不是一次性寫入。例如，通過 `fs.createWriteStream()` 實現：

```javascript
const writeStream = fs.createWriteStream('output.txt');
writeStream.write('Hello, world!');
writeStream.end();
```

這種方法不僅有效減少記憶體使用，還能夠加快 I/O 操作的速度，因為邊讀邊寫的方式能夠更好地利用系統資源。

## 擴展 Streams 的應用

除了基本的可讀和可寫 Streams，Node.js 還支持雙工和轉換 Streams。雙工 Streams 可以同時讀取和寫入，例如，網路連接通常就是雙工的。轉換 Streams 則允許在資料進行流動過程中對其進行修改。

開發者可以創建自定義的轉換 Streams 來實現即時資料處理。例如，加密和解密資料、壓縮和解壓縮資料等操作，都可以通過轉換 Streams 來實現：

```javascript
const { Transform } = require('stream');

class UpperCaseTransform extends Transform {
  _transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase());
    callback();
  }
}

const transformStream = new UpperCaseTransform();
process.stdin.pipe(transformStream).pipe(process.stdout);
```

這段代碼創建了一個轉換 Streams，將輸入的資料轉換為大寫並輸出。這樣的設計模式使得 Streams 可以靈活地適應各種應用場景。

## 總結

掌握 Node.js 的 Streams 能夠顯著提高應用程序的效能和資源利用率，尤其是在處理大型資料時。通過使用可讀、可寫、雙工和轉換 Streams，開發者能夠有效地管理 I/O 操作，減少記憶體負擔。面對不斷增長的資料需求，深入理解和運用 Streams 技術，將成為開發者必備的技能之一。[參考資料](https://nodejs.org/dist/latest-v18.x/docs/api/stream.html)