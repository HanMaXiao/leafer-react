# leafer-react

用 TSX 编写 Leafer 应用的 React 插件。

## 特性

- **声明式 JSX 语法** - 用熟悉的 TSX 编写 Leafer 应用
- **React Reconciler 驱动** - 基于 React Reconciler 实现增量更新
- **完整的 React 组件支持** - 基础组件、复合组件、自定义组件
- **HTML 容器兼容** - `<div>` 自动映射为 Leafer Group/Frame
- **插件化扩展** - 通过 `registerComponent` 注册自定义元素
- **TypeScript 支持** - 完整的类型定义

## 安装

```bash
npm install leafer-react @leafer-ui/core react
```

## 快速开始

```tsx
import { Leafer, Rect, Text, Group } from 'leafer-react';

function App() {
  return (
    <Leafer fill="#f5f5f5">
      <Group x={100} y={100}>
        <Rect width={200} height={100} fill="#32cd79" cornerRadius={8} draggable />
        <Text x={20} y={35} text="Hello Leafer!" fontSize={20} fill="#fff" />
      </Group>
    </Leafer>
  );
}
```

## 核心能力

### 1. 基础图元映射

将 Leafer 原生图形元素映射为 JSX 标签，直接在 React 中使用。

```tsx
import { Leafer, Rect, Ellipse, Star, Line, Text } from 'leafer-react';

<Leafer fill="#f5f5f5">
  <Rect width={100} height={80} fill="#32cd79" cornerRadius={8} />
  <Ellipse x={150} width={100} height={80} fill="#ff6b6b" />
  <Star x={280} width={100} height={100} fill="#ffd93d" points={5} />
  <Line points={[0, 40, 80, 10, 160, 40]} stroke="#845ef7" strokeWidth={3} />
</Leafer>
```

支持的元素：`Rect`、`Ellipse`、`Star`、`Polygon`、`Line`、`Path`、`Pen`、`Text`、`Image`、`Group`、`Box`、`Frame`

### 2. 复合元素组合

用 React 函数组件组合基础元素，Reconciler 自动处理层级关系。

```tsx
function Card({ x, y, title, color }) {
  return (
    <Group x={x} y={y}>
      <Rect width={180} height={100} fill={color} cornerRadius={12} />
      <Text x={15} y={15} text={title} fontSize={16} fill="#fff" fontWeight="bold" />
      <Text x={15} y={40} text="复合元素组合" fontSize={12} fill="rgba(255,255,255,0.8)" />
    </Group>
  );
}

<Leafer fill="#f5f5f5">
  <Card x={50} y={70} title="Card A" color="#667eea" />
  <Card x={260} y={70} title="Card B" color="#f5576c" />
</Leafer>
```

### 3. HTML 容器映射

`<div>` 等 HTML 容器标签自动映射为 Leafer 元素：

| HTML 标签 | 无 fill/stroke | 有 fill/stroke |
|-----------|---------------|---------------|
| `<div>` | Group | Frame |
| `<span>` | Group | Frame |
| `<section>` | Group | Frame |

```tsx
// 带 背景颜色 的 div 映射为 Frame（带背景的容器）
<div style=backgroundcolor="#667eea" cornerRadius={12}>
  <Text x={15} y={15} text="I'm in a Frame" fontSize={16} fill="#fff" />
</div>
```

### 4. React 组件渲染

函数组件自动展开，支持无限嵌套组合。

```tsx
function Card({ title, count, color }) {
  return (
    <div fill={color} cornerRadius={12}>
      <Text x={15} y={12} text={title} fontSize={15} fill="#fff" />
      <Text x={15} y={35} text={`Count: ${count}`} fontSize={13} fill="rgba(255,255,255,0.85)" />
    </div>
  );
}

function CardList({ items }) {
  return (
    <div>
      {items.map((item, i) => (
        <Group key={i} x={i * 190}>
          <Card {...item} />
        </Group>
      ))}
    </div>
  );
}
```

### 5. 自定义元素注册

通过 `registerComponent` 将自定义 Leafer 图形类注册为 JSX 元素。

```tsx
import { registerComponent } from 'leafer-react';
import { UI, registerUI } from '@leafer-ui/core';

@registerUI()
class Diamond extends UI {
  public get __tag() { return 'Diamond'; }

  __draw(canvas) {
    const { context } = canvas;
    const w = this.width || 60;
    const h = this.height || 60;

    context.beginPath();
    context.moveTo(w / 2, 0);
    context.lineTo(w, h / 2);
    context.lineTo(w / 2, h);
    context.lineTo(0, h / 2);
    context.closePath();

    if (this.fill) {
      context.fillStyle = this.fill;
      context.fill();
    }
  }
}

// 注册后暂时没有Props无法使用（暂定）
registerComponent('Diamond', Diamond);

<Leafer>
  <Diamond width={80} height={80} fill="#667eea" />
</Leafer>
```

## API 文档

### Leafer

主容器组件，创建 Leafer 画布。

```tsx
<Leafer
  view={window}           // 容器元素或选择器
  width={800}             // 宽度
  height={600}            // 高度
  fill="#f5f5f5"          // 背景色
  editor={true}           // 启用编辑器
  onAppReady={(app) => {}} // 就绪回调
>
  {/* 子元素 */}
</Leafer>
```

### 元素组件

所有 Leafer 原生属性都支持作为 JSX props。

```tsx
<Rect
  x={100} y={100}
  width={200} height={100}
  fill="red" stroke="blue" strokeWidth={2}
  cornerRadius={8}
  draggable={true}
  editable={true}
  onClick={handleClick}
  onMouseEnter={handleEnter}
  onMouseLeave={handleLeave}
/>
```

### registerComponent

注册自定义 Leafer 元素。

```tsx
import { registerComponent } from 'leafer-react';

registerComponent(tag: string, ElementClass: new (props: any) => any);
```

### Hooks

```tsx
import { useLeafer, useEditor } from 'leafer-react';

// 获取 Leafer App 实例
const app = useLeafer();

// 获取编辑器控制
const editor = useEditor();
editor.select(element);
editor.clear();
```

## 事件映射

React 事件自动映射为 Leafer 事件：

| React | Leafer |
|-------|--------|
| `onClick` | `tap` |
| `onDoubleClick` | `double_tap` |
| `onMouseDown` | `pointer.down` |
| `onMouseUp` | `pointer.up` |
| `onMouseMove` | `pointer.move` |
| `onMouseEnter` | `pointer.enter` |
| `onMouseLeave` | `pointer.leave` |

## 开发

```bash
pnpm install
pnpm run dev        # 监听模式构建
pnpm run build      # 构建
pnpm test           # 测试
pnpm run dev:page   # 启动 Playground
```

## BUG&&优化
~~修复自定义元素没有Props无法作为JSX使用的问题~~  未修复

优化Reconciler中解析Backgroundcolor 未修复

修复leafer元素点击后React组件异常BUG 已修复

## 路线图
### Leafer-React
- [ ] 支持更多Leafer基础元素
- [ ] 测试各种组件渲染在leafer上
### PlayGround演练场
- [ ] 添加 Monaco 编辑器支持实时代码编辑
- [ ] 添加主题切换功能
- [ ] 添加性能监控面板
- [ ] 导出示例代码功能
- [ ] 部署到 GitHub Pages

## 许可证

MIT
