---
title: 精通 TypeScript 泛型
date: 2025-07-20T07:37:38.007Z
description: "簡介： 泛型是 TypeScript 提供的一種強大特性，能夠讓程式碼更加靈活和安全。本文將深入探討泛型在 TypeScript 中的應用，並通過實例來演示如何利用泛型構建強類型的應用程式。適合進階開發者，這篇文章將幫助你更好地理解和運用泛型概念，提高程式碼的重用性和可讀性。"
---

# 精通 TypeScript 泛型

簡介： 泛型是 TypeScript 提供的一種強大特性，能夠讓程式碼更加靈活和安全。本文將深入探討泛型在 TypeScript 中的應用，並通過實例來演示如何利用泛型構建強類型的應用程式。適合進階開發者，這篇文章將幫助你更好地理解和運用泛型概念，提高程式碼的重用性和可讀性。

## 泛型的基本概念

在程式設計中，泛型是一種允許類別、函數和介面在使用時指定具體型別的特性。在 TypeScript 中，泛型能夠讓開發者創建靈活且強類型的組件。透過使用泛型，我們可以避免許多常見的型別錯誤，並提高程式的可維護性。例如，當我們需要創建一個可以處理不同型別陣列的函數時，泛型就能派上用場。以下是一個簡單的例子：

```typescript
function identity<T>(arg: T): T {
  return arg;
}
```

在這段程式碼中，`identity` 函數接受一個泛型參數 `T`，並返回相同型別的值。這樣的設計讓函數可以用於任何型別，而不會喪失型別安全性。

## 泛型類別與介面

泛型不僅可以用於函數，也可以應用於類別和介面。這使得資料結構和演算法的設計更加靈活。例如，我們可以使用泛型來創建一個通用的資料儲存類別：

```typescript
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;

  constructor(zeroValue: T, addFunction: (x: T, y: T) => T) {
    this.zeroValue = zeroValue;
    this.add = addFunction;
  }
}

const numberInstance = new GenericNumber<number>(0, (x, y) => x + y);
console.log(numberInstance.add(5, 10));
```

在這個例子中，`GenericNumber` 類別使用泛型 `T` 來允許不同型別的數字運算。同樣的結構可以應用在其他型別上，比如字串拼接。

## 使用泛型約束

有時，我們需要在泛型中限制某些型別的使用，這就是泛型約束的用途。例如，我們可能希望一個函數只能接受擁有 `length` 屬性的物件。這樣的約束可以確保函數在運行時不會因為型別不匹配而出錯：

```typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

loggingIdentity({ length: 10, value: 3 });
```

在這裡，我們使用介面 `Lengthwise` 定義了一個擁有 `length` 屬性的型別約束，確保 `loggingIdentity` 函數僅接受符合該介面的參數。

## 總結

泛型在 TypeScript 中提供了一種強大且靈活的方式來撰寫可重用的程式碼。透過泛型，我們可以避免許多型別問題，並創建更具適應性的程式模組。掌握泛型，能夠讓你的 TypeScript 開發更上一層樓，提升程式的效率與可維護性。希望本文能幫助你更好地理解泛型的應用，並激發你在實際項目中活用這一強大工具。

參考資料：[TypeScript Handbook](https://www.typescriptlang.org/docs/)