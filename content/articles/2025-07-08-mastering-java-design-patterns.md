---
title: 精通 Java 設計模式
date: 2025-07-08T14:43:49.035Z
description: "Java 設計模式是軟體開發中至關重要的工具，特別是對於進階開發者而言。這些模式提供了行之有效的解決方案，以應對常見的設計問題和挑戰。本篇文章將深入探討常用的 Java 設計模式，並提供一些實用的範例來幫助您在日常開發中靈活運用這些模式，進一步提升程式碼的可讀性和維護性。"
---

# 精通 Java 設計模式

Java 設計模式是軟體開發中至關重要的工具，特別是對於進階開發者而言。這些模式提供了行之有效的解決方案，以應對常見的設計問題和挑戰。本篇文章將深入探討常用的 Java 設計模式，並提供一些實用的範例來幫助您在日常開發中靈活運用這些模式，進一步提升程式碼的可讀性和維護性。

## 創建型設計模式

創建型設計模式專注於如何有效地創建對象。這些模式幫助開發者以更靈活和動態的方式來實例化對象。常見的創建型設計模式包括單例模式（Singleton）、工廠模式（Factory）和建造者模式（Builder）。

單例模式確保一個類別只有一個實例存在，適合用於管理全域狀態或資源。例如，日誌管理器通常需要單例模式以避免多個實例造成的資源浪費。工廠模式則通過一個創建方法來返回不同類型的物件，從而提高程式的靈活性。建造者模式可分步創建複雜對象，常見於需要多步設置或多樣化配置的對象創建過程中。

```java
public class Singleton {
    private static Singleton instance;

    private Singleton() {}

    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
```

## 結構型設計模式

結構型設計模式關注於類和對象的組合方式，這些模式確保在不改變現有代碼的前提下，可以輕鬆地新增功能或增強結構。

裝飾者模式（Decorator）允許動態添加行為至單個物件中，而不影響其他物件。適配器模式（Adapter）使得接口不兼容的類可以一起工作，是接口轉換的橋樑。代理模式（Proxy）則為其他物件提供一種代理以控制對該物件的訪問。

```java
public interface Shape {
    void draw();
}

public class Circle implements Shape {
    public void draw() {
        System.out.println("Drawing Circle");
    }
}

public class RedShapeDecorator implements Shape {
    protected Shape decoratedShape;

    public RedShapeDecorator(Shape decoratedShape) {
        this.decoratedShape = decoratedShape;
    }

    public void draw() {
        decoratedShape.draw();
        setRedBorder(decoratedShape);
    }

    private void setRedBorder(Shape decoratedShape) {
        System.out.println("Border Color: Red");
    }
}
```

## 行為型設計模式

行為型設計模式專注於對象之間的通信，這些模式幫助解決了複雜對象和任務之間的交互問題。

策略模式（Strategy）定義了一系列算法，並使其可互相替換，讓算法的變化不會影響到使用算法的用戶。觀察者模式（Observer）定義了一種一對多的依賴關係，當一個對象改變狀態時，所有依賴它的對象都會獲得通知並自動更新。狀態模式（State）允許對象在其內部狀態改變時改變其行為，對象看起來像是改變了它的類別。

```java
public interface Strategy {
    int doOperation(int num1, int num2);
}

public class OperationAdd implements Strategy {
    public int doOperation(int num1, int num2) {
        return num1 + num2;
    }
}

public class Context {
    private Strategy strategy;

    public Context(Strategy strategy) {
        this.strategy = strategy;
    }

    public int executeStrategy(int num1, int num2) {
        return strategy.doOperation(num1, num2);
    }
}
```

## 總結

Java 設計模式為開發者提供了一套高效解決常見設計問題的工具。通過理解和掌握這些模式，您可以在複雜系統中增強程式碼的靈活性、可維護性和可擴展性。設計模式不僅提高了開發效率，還幫助開發者更好地協作與溝通。未來，深入探索和利用這些設計模式，將對開發者的專業成長產生重要影響。

參考資料：  
- [Refactoring Guru: Design Patterns](https://refactoring.guru/design-patterns)  
- [Java Design Patterns](https://www.journaldev.com/1827/java-design-patterns-example-tutorial)