---
title: 精通 C# 設計模式
date: 2025-05-31T14:38:26.083Z
description: "設計模式是軟體開發中的寶貴資源，能有效提高代碼的可重用性與可維護性。本文將帶領 C# 開發者深入探討常見設計模式的應用，並提供實際範例與原則，讓您在開發過程中更得心應手。無論是新手還是有經驗的開發者，此篇文章將為您提供豐富的學習資源，助您在 C# 的世界中更進一步。"
---

# 精通 C# 設計模式

設計模式是軟體開發中的寶貴資源，能有效提高代碼的可重用性與可維護性。本文將帶領 C# 開發者深入探討常見設計模式的應用，並提供實際範例與原則，讓您在開發過程中更得心應手。無論是新手還是有經驗的開發者，此篇文章將為您提供豐富的學習資源，助您在 C# 的世界中更進一步。

## 單例模式：確保唯一性

單例模式是一種設計模式，確保一個類別只有一個實例存在，並提供全局訪問點。在 C# 中，我們可以透過私有建構函數和靜態方法來實現。

```csharp
public class Singleton
{
    private static Singleton instance = null;
    private static readonly object padlock = new object();

    Singleton() {}

    public static Singleton Instance
    {
        get
        {
            lock (padlock)
            {
                if (instance == null)
                {
                    instance = new Singleton();
                }
                return instance;
            }
        }
    }
}
```

此模式常用於需要集中管理的資源，例如配置設定或日誌記錄。它能確保整個應用程式中只有一個實例存在，但需小心避免引入不必要的全局狀態，影響程式可測試性。

## 工廠模式：簡化物件創建

工廠模式為創建物件提供了一種簡單的方法，特別是在創建過程複雜或需要根據不同條件創建不同實例時。

```csharp
public interface IProduct
{
    void Execute();
}

public class ConcreteProductA : IProduct
{
    public void Execute() => Console.WriteLine("Product A");
}

public class ConcreteProductB : IProduct
{
    public void Execute() => Console.WriteLine("Product B");
}

public class ProductFactory
{
    public static IProduct GetProduct(string type) =>
        type switch
        {
            "A" => new ConcreteProductA(),
            "B" => new ConcreteProductB(),
            _ => throw new ArgumentException("Invalid type")
        };
}
```

工廠模式的靈活性使其成為大型應用程式的理想選擇，允許在不改變現有代碼的情況下引入新產品類型。但也需注意可能帶來的代碼複雜度。

## 觀察者模式：實現事件通知

觀察者模式允許一個物件在狀態改變時通知其他依賴物件，常用於事件驅動系統中。

```csharp
public class Subject
{
    private List<IObserver> observers = new List<IObserver>();

    public void Attach(IObserver observer) => observers.Add(observer);

    public void Detach(IObserver observer) => observers.Remove(observer);

    public void Notify()
    {
        foreach (var observer in observers)
        {
            observer.Update();
        }
    }
}

public interface IObserver
{
    void Update();
}

public class ConcreteObserver : IObserver
{
    public void Update() => Console.WriteLine("Observer notified");
}
```

此模式解耦了觀察者和被觀察者之間的依賴關係，允許系統各部分獨立開發與維護。然而，需防範通知機制中的潛在性能問題，特別是在大量觀察者存留的情形下。

## 總結

設計模式是提升開發效率與代碼質量的重要工具。透過學習並應用這些模式，開發者能有效克服常見的設計挑戰。希望本文提供的實例與分析，能幫助您在 C# 開發中運用自如，並激發您進一步探索其他設計模式的興趣。欲了解更多資料，您可以參考[設計模式書籍](https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)。