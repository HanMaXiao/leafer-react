// // playground/examples/CustomElement.tsx
// // 示例6：自定义 Leafer 元素注册成 React 组件
// import React from 'react';
// import { Leafer, Text, Group, registerComponent } from '../../src/index';
// import { UI, registerUI, dataProcessor, UIData } from '@leafer-ui/core';

// // --- 自定义 Leafer 图形类：彩色菱形 ---
// interface IDiamondInputData {
//   width?: number;
//   height?: number;
//   fill?: string;
//   stroke?: string;
//   strokeWidth?: number;
// }

// @registerUI()
// class Diamond extends UI {
//   public get __tag() { return 'Diamond'; }

//   constructor(data: IDiamondInputData) {
//     super(data);
//   }

//   __draw(canvas: any): void {
//     const { context } = canvas;
//     const w = (this.width as number) || 60;
//     const h = (this.height as number) || 60;
//     const sw = (this.strokeWidth as number) || 0;

//     context.beginPath();
//     context.moveTo(w / 2, sw);
//     context.lineTo(w - sw, h / 2);
//     context.lineTo(w / 2, h - sw);
//     context.lineTo(sw, h / 2);
//     context.closePath();

//     if (this.fill) {
//       context.fillStyle = this.fill as string;
//       context.fill();
//     }
//     if (this.stroke) {
//       context.strokeStyle = this.stroke as string;
//       context.lineWidth = sw;
//       context.stroke();
//     }
//   }
// }

// // 注册为 React 可用的 JSX 元素
// registerComponent('Diamond', Diamond as any);

// // 现在 <Diamond /> 可以直接在 JSX 中使用
// export const CustomElement: React.FC<{ debug?: boolean }> = ({ debug }) => {
//   if (debug) console.log('[CustomElement] rendered');

//   return (
//     <Leafer fill="#f5f5f5">
//       <Text x={50} y={20} text="6. 自定义元素注册" fontSize={20} fontWeight="bold" fill="#333" />

//       <Group x={80} y={80}>
//         {/* 使用注册的自定义 Diamond 元素 */}
//         <Diamond width={80} height={80} fill="#667eea" stroke="#5a67d8" strokeWidth={2} />
//         <Text y={95} text="Diamond" fontSize={14} fill="#333" />
//       </Group>

//       <Group x={220} y={80}>
//         <Diamond width={100} height={100} fill="#f5576c" stroke="#e04656" strokeWidth={2} />
//         <Text y={115} text="Big" fontSize={14} fill="#333" />
//       </Group>

//       <Group x={400} y={80}>
//         <Diamond width={60} height={60} fill="#ffd93d" />
//         <Diamond x={70} width={40} height={40} fill="#32cd79" />
//         <Text y={75} text="Multiple" fontSize={14} fill="#333" />
//       </Group>

//       <Text x={50} y={240} text="registerComponent('Diamond', DiamondClass)" fontSize={14} fill="#667" fontFamily="monospace" />
//       <Text x={50} y={265} text="注册后即可像原生元素一样在 JSX 中使用" fontSize={14} fill="#666" />
//     </Leafer>
//   );
// };

// export const CustomElementCode = `import { registerComponent } from 'leafer-react';
// import { UI, registerUI } from '@leafer-ui/core';

// // 1. 定义自定义 Leafer 图形类
// @registerUI()
// class Diamond extends UI {
//   public get __tag() { return 'Diamond'; }

//   __draw(canvas) {
//     const { context } = canvas;
//     const w = this.width || 60;
//     const h = this.height || 60;

//     context.beginPath();
//     context.moveTo(w / 2, 0);
//     context.lineTo(w, h / 2);
//     context.lineTo(w / 2, h);
//     context.lineTo(0, h / 2);
//     context.closePath();

//     if (this.fill) {
//       context.fillStyle = this.fill;
//       context.fill();
//     }
//   }
// }

// // 2. 注册为 React 组件
// registerComponent('Diamond', Diamond);

// // 3. 在 JSX 中使用
// function App() {
//   return (
//     <Leafer fill="#f5f5f5">
//       <Diamond width={80} height={80} fill="#667eea" />
//     </Leafer>
//   );
// }`.trim();
