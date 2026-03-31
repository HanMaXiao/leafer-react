// src/core/elements/preset-renderers/CardRenderer.ts

import { IPresetRenderer } from './types';

/**
 * Renders a card-like component directly to canvas:
 * - Rounded rectangle background
 * - Optional title text
 * - Optional subtitle text
 * - Optional border
 */
export class CardRenderer implements IPresetRenderer {
  canRender(component: any, props: Record<string, any>): boolean {
    return (
      component?.__leaferRenderer === 'card' ||
      component?.displayName === 'Card' ||
      component?.name === 'Card'
    );
  }

  render(ctx: CanvasRenderingContext2D, props: Record<string, any>, width: number, height: number): void {
    const {
      backgroundColor = '#ffffff',
      borderColor = '#e0e0e0',
      borderWidth = 1,
      borderRadius = 8,
      title,
      titleColor = '#333333',
      titleFontSize = 16,
      subtitle,
      subtitleColor = '#666666',
      subtitleFontSize = 13,
      padding = 16,
    } = props;

    // Draw rounded rectangle background
    this.drawRoundedRect(ctx, 0, 0, width, height, borderRadius);

    // Fill background
    ctx.fillStyle = backgroundColor;
    ctx.fill();

    // Draw border
    if (borderWidth > 0) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.stroke();
    }

    // Draw title
    if (title) {
      ctx.fillStyle = titleColor;
      ctx.font = `bold ${titleFontSize}px sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(String(title), padding, padding);
    }

    // Draw subtitle
    if (subtitle) {
      const yOffset = title ? padding + titleFontSize + 6 : padding;
      ctx.fillStyle = subtitleColor;
      ctx.font = `${subtitleFontSize}px sans-serif`;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(String(subtitle), padding, yOffset);
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
