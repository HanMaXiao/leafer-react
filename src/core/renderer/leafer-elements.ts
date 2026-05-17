import { registerElement } from './element-registry';
import {
  Rect,
  Text,
  Group,
  Ellipse,
  Polygon,
  Star,
  Line,
  Image,
  Canvas,
  Path,
  Pen,
  Box,
  Frame,
} from 'leafer-ui';
import { Flow } from '@leafer-in/flow';

registerElement('Rect', Rect as any);
registerElement('Text', Text as any);
registerElement('Group', Group as any);
registerElement('Ellipse', Ellipse as any);
registerElement('Polygon', Polygon as any);
registerElement('Star', Star as any);
registerElement('Line', Line as any);
registerElement('Image', Image as any);
registerElement('Canvas', Canvas as any);
registerElement('Path', Path as any);
registerElement('Pen', Pen as any);
registerElement('Box', Box as any);
registerElement('Frame', Frame as any);
registerElement('Flow', Flow as any);

export function registerLeaferElements(): void {
  // 已在导入时注册
}
