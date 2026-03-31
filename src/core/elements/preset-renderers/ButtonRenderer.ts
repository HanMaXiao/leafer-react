// src/core/elements/preset-renderers/ButtonRenderer.ts

import { IPresetRenderer } from './types';

/**
 * Renders a button-like component directly to canvas:
 * - Rounded rectangle background
 * - Centered label text
 * - Optional border
 */
export class ButtonRenderer implements IPresetRenderer {
  canRender(component: any, props: Record<string, any>): boolean {
    return (
      component?.__leaferRenderer === 'button' ||
      component?.displayName === 'Button' ||
      component?.name === 'Button'
    );
  }

  render(ctx: CanvasRenderingContext2D, props: Record<string, any>, width: number, height: number): void {
    const {
      label,
      backgroundColor = '#1677ff',
      color = '#ffffff',
      fontSize = 14,
      borderRadius = 6,
      borderColor,
      borderWidth = 0,
      disabled = false,
    } = props;

    // Adjust colors for disabled state
    const bg = disabled ? '#a0a0a0' : backgroundColor;
    const fg = disabled ? '#d0d0d0' : color;

    // Draw rounded rect
    this.drawRoundedRect(ctx, 0, 0, width, height, borderRadius);
    ctx.fillStyle = bg;
    ctx.fill();

    if (borderWidth > 0 && borderColor) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.stroke();
    }

    // Draw centered text
    if (label) {
      ctx.fillStyle = fg;
      ctx.font = `${fontSize}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(label), width / 2, height / 2);
    }
  }

  private drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    w: number, h: number,
    r: number
  ): void {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }
}
