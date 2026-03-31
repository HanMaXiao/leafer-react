# leafer-react

用 TSX 编写 Leafer 应用的 React 插件。

## 特性

- ✅ **声明式 JSX 语法** - 用熟悉的 TSX 编写 Leafer 应用
- ✅ **React 组件渲染** - 在 Leafer 画布上渲染 React 组件
- ✅ **Leafer 编辑器支持** - 完全兼容 Leafer 编辑器
- ✅ **TypeScript 支持** - 完整的类型定义
- ✅ **轻量级** - 零运行时开销的 JSX 转换

## 安装

```bash
npm install leafer-react @leafer-ui/core react
```

## 快速开始

### 基础 JSX 语法

```tsx
import { Leafer, Rect, Text, Group } from 'leafer-react';

function App() {
  return (
    <Leafer view={window} editor={true}>
      <Group x={100} y={100}>
        <Rect width={200} height={100} fill="#32cd79" draggable />
        <Text x={20} y={35} text="Hello Leafer!" fontSize={20} fill="#fff" />
      </Group>
    </Leafer>
  );
}
```

### 渲染 React 组件

```tsx
import { Leafer, ReactComponent } from 'leafer-react';

const MyCard = ({ title, count }) => (
  <div style={{ padding: '16px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '8px' }}>
    <h2>{title}</h2>
    <p>Count: {count}</p>
  </div>
);

function App() {
  const [count, setCount] = useState(0);

  return (
    <Leafer view={window}>
      <ReactComponent
        x={100}
        y={100}
        width={200}
        height={100}
        component={MyCard}
        props={{ title: 'Hello', count }}
        draggable
      />
    </Leafer>
  );
}
```

## API 文档

### Leafer

主容器组件。

```tsx
<Leafer
  view={window}           // 容器元素
  width={800}             // 宽度
  height={600}            // 高度
  fill="#f5f5f5"          // 背景色
  editor={true}           // 启用编辑器
>
  {/* 内容 */}
</Leafer>
```

### Rect

矩形元素。

```tsx
<Rect
  x={100}                 // X 坐标
  y={100}                 // Y 坐标
  width={200}             // 宽度
  height={100}            // 高度
  fill="red"              // 填充色
  stroke="blue"           // 边框色
  strokeWidth={2}         // 边框宽度
  cornerRadius={8}        // 圆角
  draggable={true}        // 可拖拽
  editable={true}         // 可编辑
  onClick={handleClick}   // 点击事件
/>
```

### Text

文本元素。

```tsx
<Text
  x={100}
  y={100}
  text="Hello"            // 文本内容
  fontSize={24}           // 字体大小
  fill="black"            // 颜色
  fontFamily="Arial"      // 字体
  fontWeight="bold"       // 字重
/>
```

### Group

容器元素。

```tsx
<Group x={100} y={100} rotation={45}>
  <Rect width={100} height={100} fill="red" />
  <Text x={10} y={10} text="Group" />
</Group>
```

### ReactComponent

React 组件包装器。

```tsx
<ReactComponent
  x={100}
  y={100}
  width={200}
  height={100}
  component={MyComponent}  // React 组件
  props={{ title: 'Hello' }} // 传递给组件的 props
  shouldUpdate={(old, new) => old.count !== new.count}
  draggable={true}
  editable={true}
  onClick={handleClick}
  onInteraction={(action, data) => console.log(action, data)}
/>
```

## Hooks

### useLeafer

获取 Leafer App 实例。

```tsx
import { useLeafer } from 'leafer-react';

function MyComponent() {
  const app = useLeafer();
  // 使用 app.tree, app.editor 等
}
```

### useEditor

获取编辑器控制。

```tsx
import { useEditor } from 'leafer-react';

function MyComponent() {
  const editor = useEditor();
  editor.select(element);
  editor.clear();
}
```

### useReactComponent

管理 React 组件实例。

```tsx
import { useReactComponent } from 'leafer-react';

function MyComponent() {
  const { componentRef, updateProps, getProps } = useReactComponent();

  const handleClick = () => {
    updateProps({ count: getProps().count + 1 });
  };

  return <ReactComponent ref={componentRef} ... />;
}
```

## Playground

实时预览Leafer React插件功能演练场

```bash
pnpm run dev:page
```

打开 <http://localhost:3000> 测试示例(有人聚合下演练场吗)

### Available Examples

- **Basic JSX**: 使用React语法创建图形
- **React Component**: 在Leafer画布上渲染React组件
- **Interactive**: 事件和交互属性
- **Animation**: 状态驱动动画

## Goal

1：使用插件提供的leafer基础元素组件构建leafer应用和基础绘图；<Rect><Rect/>
2：渲染由leafer基础元素组件组合的复合组件； <Rect> <Rect/> <Text/> <Rect/>
3：渲染基础React组件如 <Card>

  <div>...<div/>
<Card/>;
4:渲染复合组件，如
<CardList>
  <Card/>
<CardList>;
5:自定义Leafer元素注册成React组件；
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
return ( <Leafer>
\<Radar x={100} y={100} data={\[1, 2, 3, 4, 5]} /> </Leafer>
);
}

## RoadMap

### leafer-react

1:支持更多leafer元素

2:实现完整的React Reconciler(解析复杂React组件)


3:开发leafer-react调试工具

### leafer-react-playground

- [ ] 添加 Monaco 编辑器支持实时代码编辑
- [ ] 添加主题切换功能
- [ ] 添加性能监控面板
- [ ] 导出示例代码功能
- [ ] 部署到 GitHub Pages

## 许可证

MIT
