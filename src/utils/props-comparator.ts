export interface ShouldUpdateOptions {
  ignoreKeys?: string[];
  deep?: boolean;
}

export function hasPropsChanged(
  oldProps: Record<string, any>,
  newProps: Record<string, any>,
  options: ShouldUpdateOptions = {}
): boolean {
  const { ignoreKeys = [], deep = false } = options;

  const oldKeys = Object.keys(oldProps).filter(k => !ignoreKeys.includes(k));
  const newKeys = Object.keys(newProps).filter(k => !ignoreKeys.includes(k));

  // 键数量不同
  if (oldKeys.length !== newKeys.length) {
    return true;
  }

  // 检查每个键
  for (const key of oldKeys) {
    if (!(key in newProps)) {
      return true;
    }

    const oldValue = oldProps[key];
    const newValue = newProps[key];

    if (deep && typeof oldValue === 'object' && typeof newValue === 'object') {
      if (hasPropsChanged(oldValue, newValue, { deep: true, ignoreKeys })) {
        return true;
      }
    } else if (oldValue !== newValue) {
      return true;
    }
  }

  return false;
}
