// src/core/elements/preset-renderers/types.ts

/**
 * A preset renderer draws a known component pattern directly to canvas,
 * bypassing the html2canvas pipeline for better performance.
 */
export interface IPresetRenderer {
  /**
   * Returns true if this renderer can handle the given component.
   * Match by component reference, display name, or any heuristic.
   */
  canRender(component: any, props: Record<string, any>): boolean;

  /**
   * Draw the component directly onto the canvas context.
   * @param ctx - The Canvas2D context from Leafer's __draw
   * @param props - The component props
   * @param width - Render area width
   * @param height - Render area height
   */
  render(ctx: CanvasRenderingContext2D, props: Record<string, any>, width: number, height: number): void;
}
