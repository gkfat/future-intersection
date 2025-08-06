---
title: 精通 TypeScript 泛型
date: 2025-08-06T23:43:47.803Z
description: "在現代軟體開發中，泛型已成為一種關鍵技術。尤其在 TypeScript 中，泛型提供了靈活而強大的工具，讓開發者能撰寫可重用且具類型安全的代碼。這篇文章將帶領進階讀者深入了解 TypeScript 泛型的應用，並通過實際範例展示其在開發中的價值。"
---

# 精通 TypeScript 泛型

在現代軟體開發中，泛型已成為一種關鍵技術。尤其在 TypeScript 中，泛型提供了靈活而強大的工具，讓開發者能撰寫可重用且具類型安全的代碼。這篇文章將帶領進階讀者深入了解 TypeScript 泛型的應用，並通過實際範例展示其在開發中的價值。

## 理解 TypeScript 泛型的用途

TypeScript 的泛型允許開發者創建於多種數據類型中使用的組件。這使得代碼更加靈活和可重用。透過泛型，你可以設計一個不單純依賴於特定類型的函數或類別。例如，泛型的使用能夠讓一個函數處理數字和字串型別的數組，而不需要針對每種型別寫不同的函數。

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("hello");
let output2 = identity<number>(100);
```

這段代碼展示了如何使用泛型來寫出類型安全的函數 `identity`，能處理不同的數據類型。

## 泛型在類別和介面中的應用

泛型不僅可以用在函數中，也可以用在類別和介面中。這讓資料結構的設計更加靈活，適合多種用途。假設你正在設計一個資料結構，像是資料庫查詢結果的容器，泛型能夠使其適用於任何資料類型。

```typescript
class DataHolder<T> {
  private data: T[];

  constructor() {
    this.data = [];
  }

  add(item: T): void {
    this.data.push(item);
  }

  getData(): T[] {
    return this.data;
  }
}

const stringHolder = new DataHolder<string>();
stringHolder.add("item1");

const numberHolder = new DataHolder<number>();
numberHolder.add(2);
```

在這個範例中，`DataHolder` 類別使用了泛型 `T`，這樣它能持有任意類型的數據，同時保持類型安全。

## 泛型約束的強大特性

泛型約束允許開發者限制泛型的應用範圍，保證其在特定上下文中正確運作。這對於需要限制泛型類型的情況非常有用。例如，在需要操作屬性時，可以使用 `extends` 關鍵字來限制某個類型必須符合某個特定結構。

```typescript
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello");
logLength([1, 2, 3]);
```

此例中，泛型 `T` 被約束為具有 `length` 屬性。它確保傳入的參數有 `length` 屬性，否則編譯器將報錯。

## 總結

TypeScript 泛型是提升代碼靈活性和可重用性的強大工具。通過深入掌握泛型在函數、類別和介面中的應用，開發者可以撰寫更具適應性和可擴展性的代碼。進一步探討泛型的約束能力，則可以確保泛型應用的安全性與準確性。這不僅提升了代碼的質量，也為開發者提供了更大的自由度與創造力。

參考資料：[TypeScript Handbook - Generics](https://www.typescriptlang.org/docs/handbook/generics.html)