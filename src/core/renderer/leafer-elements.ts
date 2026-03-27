import { Rect as LeaferRect, Text as LeaferText, Group as LeaferGroup } from '@leafer-ui/core';
import { registerElement } from './element-registry';
import { ReactComponent } from '../elements/ReactComponent';

// 注册 Leafer 原生元素
registerElement('Rect', LeaferRect as any);
registerElement('Text', LeaferText as any);
registerElement('Group', LeaferGroup as any);
registerElement('ReactComponent', ReactComponent as any);

// 可扩展更多元素
export function registerLeaferElements(): void {
  // 已在导入时注册
}
