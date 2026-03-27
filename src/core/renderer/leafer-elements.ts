import {
  Rect as LeaferRect,
  Text as LeaferText,
  Group as LeaferGroup,
  Ellipse as LeaferEllipse,
  Polygon as LeaferPolygon,
  Star as LeaferStar,
  Line as LeaferLine,
  Image as LeaferImage,
  Canvas as LeaferCanvas,
  Path as LeaferPath,
  Pen as LeaferPen,
  Box as LeaferBox,
} from '@leafer-ui/core';
import { registerElement } from './element-registry';
import { ReactComponent } from '../elements/ReactComponent';

// 注册 Leafer 原生元素
registerElement('Rect', LeaferRect as any);
registerElement('Text', LeaferText as any);
registerElement('Group', LeaferGroup as any);
registerElement('Ellipse', LeaferEllipse as any);
registerElement('Polygon', LeaferPolygon as any);
registerElement('Star', LeaferStar as any);
registerElement('Line', LeaferLine as any);
registerElement('Image', LeaferImage as any);
registerElement('Canvas', LeaferCanvas as any);
registerElement('Path', LeaferPath as any);
registerElement('Pen', LeaferPen as any);
registerElement('Box', LeaferBox as any);
registerElement('ReactComponent', ReactComponent as any);

// 可扩展更多元素
export function registerLeaferElements(): void {
  // 已在导入时注册
}
