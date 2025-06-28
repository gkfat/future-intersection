---
title: 理解 TypeScript 介面
date: 2025-06-28T07:36:08.430Z
description: "TypeScript 是 JavaScript 的超集，提供了靜態類型檢查，讓代碼更具可維護性。其中，介面是一個強大的工具，可以用來定義物件的形狀。本文旨在為入門者深入淺出地介紹 TypeScript 介面的基本概念，並透過範例來展示如何在實際開發中運用介面來提升代碼質量。"
---

# 理解 TypeScript 介面

TypeScript 是 JavaScript 的超集，提供了靜態類型檢查，讓代碼更具可維護性。其中，介面是一個強大的工具，可以用來定義物件的形狀。本文旨在為入門者深入淺出地介紹 TypeScript 介面的基本概念，並透過範例來展示如何在實際開發中運用介面來提升代碼質量。

## 介面基本概念

介面是 TypeScript 中用來定義物件結構的藍圖。它能夠指定物件應該擁有的屬性和方法，從而提供編譯時期的類型檢查。使用介面可以提高代碼的可讀性和可靠性，讓開發團隊更容易維護和擴展代碼。

在 TypeScript 中，可以通過 `interface` 關鍵字來定義介面。例如，定義一個用戶介面：

```typescript
interface User {
  name: string;
  age: number;
  email?: string; // 可選屬性
}
```

當我們使用這個介面來定義物件時，TypeScript 會檢查該物件是否符合介面的結構。

## 在類別中實現介面

介面不僅限於物件，它還可以被類別實現。當一個類別實現某介面時，該類別必須擁有介面中定義的所有屬性和方法。這樣的實現可以確保類別符合特定的結構要求，增強類別設計的一致性。

舉例來說，創建一個實現 `User` 介面的類別：

```typescript
class Person implements User {
  name: string;
  age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

在這個例子中，`Person` 類別實現了 `User` 介面，確保所有需要的屬性都得到了適當的定義。

## 擴展介面

TypeScript 允許介面之間相互擴展，這讓開發者可以複雜且靈活地定義多層次的物件結構。透過擴展，可以將共用屬性抽取到基礎介面中，從而實現代碼的重用和組織。

例如，擴展 `User` 介面以包含地址信息：

```typescript
interface Address {
  street: string;
  city: string;
}

interface ExtendedUser extends User {
  address: Address;
}
```

這樣，任何實現 `ExtendedUser` 介面的物件都必須同時包含 `User` 和 `Address` 的屬性。

## 總結

理解和運用 TypeScript 的介面可以顯著提高程式碼的可維護性和可讀性。介面不僅僅是一個類型檢查的工具，更是一個強大的設計模式，能夠幫助開發者構建出更清晰、結構更嚴謹的應用程式。希望本文能夠幫助入門者掌握介面的基本概念，並在實際開發中靈活運用。若需更深入的學習，歡迎參考 [TypeScript 官方文件](https://www.typescriptlang.org/docs/)。