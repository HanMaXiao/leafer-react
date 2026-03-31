# Leafer-React 优化与第三级形态实现计划

## 概述

本计划包含两个主要任务：

1. **代码优化**：使用工厂函数消除组件样板代码
2. **第三级形态实现**：提供 `registerComponent` API 支持自定义 Leafer 元素

***

## 第一部分：代码优化

### 当前问题

每个组件文件都包含重复的样板代码：

```tsx
// Rect.tsx - 当前实现
export function Rect(props: RectProps): any {
  return h('Rect', props);
}

// Ellipse.tsx - 当前实现
export function Ellipse(props: EllipseProps): any {
  return h('Ellipse', props);
}
```

### 优化方案

创建 `defineLeaferElement` 工厂函数，统一处理注册和组件创建：

```tsx
// 新的工厂函数
const defineLeaferElement = <P = any>(tag: string, ElementClass: new (props: P) => any) => {
  registerElement(tag, ElementClass);
  return (props: P & { children?: any }) => h(tag, props);
};
```

### 实施步骤

#### 步骤 1：创建工厂函数

* 文件：`src/core/renderer/define-element.ts`

* 导出 `defineLeaferElement` 函数

* 支持泛型类型推导

#### 步骤 2：重构 leafer-elements.ts

* 移除手动 `registerElement` 调用

* 使用工厂函数同时完成注册和组件导出

* 保留类型定义（RectProps 等）

#### 步骤 3：更新组件文件

* 修改 `Rect.tsx`、`Ellipse.tsx`、`Group.tsx` 等组件

* 使用工厂函数替代手动函数定义

* 保持类型安全

#### 步骤 4：更新导出

* 确保 `src/components/index.ts` 导出不变

* 确保 `src/index.ts` 公共 API 不变

***

## 第二部分：第三级形态实现

### 目标

根据 `docs/插件三级形态.md` 文档，第三级形态需要：

> **机制**：registerComponent API + 继承 Leafer 基类
> **场景**：复杂的"雷达图"、高性能的"粒子系统"、特殊的"贝塞尔曲线工具"
> **体验**：用户写一个继承自 Graphic 的类，并在 onDraw 里写 Canvas 代码，然后调用插件的 registerComponent('radar', RadarClass)

### 实施步骤

#### 步骤 1：创建 registerComponent API

* 文件：`src/core/api/registerComponent.ts`

* 功能：

  * 注册自定义 Leafer 元素类

  * 自动生成对应的 TSX 包装组件

  * 返回可用的 React 组件

```tsx
// API 设计
export function registerComponent<P = any>(
  tag: string,
  ElementClass: new (props: P) => any
): React.FC<P & { children?: any }> {
  registerElement(tag, ElementClass);
  return (props) => h(tag, props);
}
```

#### 步骤 2：创建 unregisterComponent API（可选但推荐）

* 允许动态卸载自定义组件

* 清理注册表中的条目

#### 步骤 3：更新 element-registry.ts

* 添加 `unregisterElement` 函数

* 添加 `hasElement` 检查函数

* 添加 `getAllElementTags` 调试函数

#### 步骤 4：更新公共导出

* 在 `src/index.ts` 中导出 `registerComponent`

* 导出 `unregisterComponent`（如果实现）

* 导出类型定义

#### 步骤 5：创建使用示例和文档

* 创建示例：自定义雷达图组件

* 创建示例：自定义粒子系统组件

* 更新 README 或创建使用指南

#### 步骤 6：添加测试

* 测试 `registerComponent` 注册功能

* 测试自定义组件渲染

* 测试动态注册/注销

***

## 文件变更清单

### 新增文件

| 文件路径                                  | 说明        |
| ------------------------------------- | --------- |
| `src/core/renderer/define-element.ts` | 工厂函数实现    |
| `src/core/api/registerComponent.ts`   | 第三级形态 API |
| `src/core/api/index.ts`               | API 统一导出  |

### 修改文件

| 文件路径                                    | 变更内容                               |
| --------------------------------------- | ---------------------------------- |
| `src/core/renderer/element-registry.ts` | 添加 unregisterElement、hasElement 函数 |
| `src/core/renderer/leafer-elements.ts`  | 使用工厂函数重构                           |
| `src/components/Rect.tsx`               | 使用工厂函数重构                           |
| `src/components/Ellipse.tsx`            | 使用工厂函数重构                           |
| `src/components/Group.tsx`              | 使用工厂函数重构                           |
| `src/components/Text.tsx`               | 使用工厂函数重构                           |
| `src/components/Star.tsx`               | 使用工厂函数重构                           |
| `src/components/Polygon.tsx`            | 使用工厂函数重构                           |
| `src/components/Line.tsx`               | 使用工厂函数重构                           |
| `src/components/Image.tsx`              | 使用工厂函数重构                           |
| `src/components/LeaferCanvas.tsx`       | 使用工厂函数重构                           |
| `src/components/Path.tsx`               | 使用工厂函数重构                           |
| `src/components/Pen.tsx`                | 使用工厂函数重构                           |
| `src/components/Box.tsx`                | 使用工厂函数重构                           |
| `src/index.ts`                          | 导出 registerComponent API           |

***

## 执行顺序

1. **Phase 1：基础设施**

   * 创建 `define-element.ts` 工厂函数

   * 扩展 `element-registry.ts`

2. **Phase 2：代码优化**

   * 重构 `leafer-elements.ts`

   * 重构所有组件文件

3. **Phase 3：第三级形态 API**

   * 创建 `registerComponent.ts`

   * 创建 API 导出

4. **Phase 4：测试与验证**

   * 运行现有测试确保无回归

   * 添加新功能测试

***

## 预期成果

### 优化后的组件定义

```tsx
// 之前
export function Rect(props: RectProps): any {
  return h('Rect', props);
}

// 之后
export const Rect = defineLeaferElement<RectProps>('Rect', LeaferRect);
```

### 第三级形态使用示例

```tsx
// 用户代码
import { registerComponent, Leafer } from 'leafer-react';
import { UI } from '@leafer-ui/core';

// 自定义雷达图类
class RadarChart extends UI {
  protected onDraw(canvas: any) {
    // Canvas 绑定逻辑
  }
}

// 注册并获取 React 组件
const Radar = registerComponent('Radar', RadarChart);

// 在 TSX 中使用
function App() {
  return (
    <Leafer>
      <Radar x={100} y={100} data={[1, 2, 3, 4, 5]} />
    </Leafer>
  );
}
```

