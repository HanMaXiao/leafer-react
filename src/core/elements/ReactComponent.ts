import { UI, registerUI, dataProcessor, UIData } from '@leafer-ui/core';
import { IUIInputData, IUIData } from '@leafer-ui/interface';
import { createRoot, Root } from 'react-dom/client';
import html2canvas from 'html2canvas';
import { hashProps } from '../../utils/hash';
import { hasPropsChanged } from '../../utils/props-comparator';

interface IReactComponentInputData extends IUIInputData {
  component?: any;
  props?: Record<string, any>;
  width?: number;
  height?: number;
  shouldUpdate?: (oldProps: any, newProps: any) => boolean;
}

interface IReactComponentData extends IUIData {
  component?: any;
  props?: Record<string, any>;
  width?: number;
  height?: number;
  shouldUpdate?: (oldProps: any, newProps: any) => boolean;
}

class ReactComponentData extends UIData implements IReactComponentData {
  component?: any;
  props?: Record<string, any> = {};
  width?: number = 200;
  height?: number = 200;
  shouldUpdate?: (oldProps: any, newProps: any) => boolean;
}

@registerUI()
class ReactComponent extends UI {
  private reactRoot: Root | null = null;
  private containerDiv: HTMLDivElement | null = null;
  private cachedCanvas: HTMLCanvasElement | null = null;
  private lastPropsHash: string = '';
  private lastProps: Record<string, any> = {};

  public get __tag() { return 'ReactComponent'; }

  @dataProcessor(ReactComponentData)
  declare public __: IReactComponentData;

  constructor(data: IReactComponentInputData) {
    super(data);
  }

  __updateBoxBounds(): void {
    const box = this.__layout.boxBounds;
    const { width = 200, height = 200 } = this.__;
    box.x = 0;
    box.y = 0;
    box.width = width;
    box.height = height;
  }

  __drawHitPath(hitCanvas: any): void {
    const { context } = hitCanvas;
    const { x, y, width = 200, height = 200 } = this.__layout.boxBounds;
    context.beginPath();
    context.rect(x, y, width, height);
  }

  async __draw(canvas: any): Promise<void> {
    const { context } = canvas;
    const { width = 200, height = 200, component, props = {} } = this.__;
    const { x, y } = this.__layout.boxBounds;

    if (!component) {
      this.renderPlaceholder(context, x, y, width, height, 'No component');
      return;
    }

    // 检查是否需要重渲染
    const currentPropsHash = hashProps(props);
    let needsRender = !this.cachedCanvas ||
      currentPropsHash !== this.lastPropsHash ||
      this.cachedCanvas.width !== width ||
      this.cachedCanvas.height !== height;

    // 使用 shouldUpdate 回调
    if (this.__.shouldUpdate && this.lastPropsHash) {
      const shouldUpdate = this.__.shouldUpdate(this.lastProps, props);
      if (shouldUpdate) {
        needsRender = true;
      }
    }

    if (needsRender) {
      await this.renderComponentToCanvas(component, props, width, height);
      this.lastPropsHash = currentPropsHash;
      this.lastProps = { ...props };
    }

    // 绘制缓存的 Canvas
    if (this.cachedCanvas) {
      context.drawImage(this.cachedCanvas, x, y, width, height);
    }
  }

  private async renderComponentToCanvas(
    component: any,
    props: Record<string, any>,
    width: number,
    height: number
  ): Promise<void> {
    if (!this.containerDiv) {
      this.containerDiv = document.createElement('div');
      this.containerDiv.style.position = 'fixed';
      this.containerDiv.style.top = '-9999px';
      this.containerDiv.style.left = '-9999px';
      this.containerDiv.style.padding = '0';
      this.containerDiv.style.margin = '0';
      this.containerDiv.style.border = 'none';
      document.body.appendChild(this.containerDiv);
    }

    this.containerDiv.style.width = `${width}px`;
    this.containerDiv.style.height = `${height}px`;

    if (!this.reactRoot) {
      this.reactRoot = createRoot(this.containerDiv);
    }

    const Component = component;

    return new Promise((resolve) => {
      this.reactRoot!.render(
        Component({ ...props, width, height })
      );

      requestAnimationFrame(async () => {
        try {
          const tempCanvas = await html2canvas(this.containerDiv!, {
            backgroundColor: 'transparent',
            scale: 1,
            useCORS: true,
            logging: false,
          });
          this.cachedCanvas = tempCanvas;
          resolve();
        } catch (error) {
          console.error('[ReactComponent] Failed to render:', error);
          resolve();
        }
      });
    });
  }

  private renderPlaceholder(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    text: string
  ): void {
    context.fillStyle = '#f0f0f0';
    context.fillRect(x, y, width, height);
    context.strokeStyle = '#ccc';
    context.strokeRect(x, y, width, height);

    context.fillStyle = '#666';
    context.font = '14px sans-serif';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, x + width / 2, y + height / 2);
  }

  destroy(): void {
    if (this.reactRoot) {
      this.reactRoot.unmount();
      this.reactRoot = null;
    }
    if (this.containerDiv && this.containerDiv.parentNode) {
      this.containerDiv.parentNode.removeChild(this.containerDiv);
      this.containerDiv = null;
    }
    this.cachedCanvas = null;
    super.destroy();
  }
}

export { ReactComponent, IReactComponentInputData, IReactComponentData };
