export function isEqual(value: unknown, other: unknown): boolean {
  // Primitive types and same reference comparison
  if (typeof value !== "object" && typeof other !== "object") {
    return Object.is(value, other);
  }

  // Null check
  if (value === null && other === null) {
    return true;
  }

  // Type mismatch
  if (typeof value !== typeof other) {
    return false;
  }

  // Date comparison
  if (value instanceof Date && other instanceof Date) {
    return value.getTime() === other.getTime();
  }

  // RegExp comparison
  if (value instanceof RegExp && other instanceof RegExp) {
    return value.source === other.source && value.flags === other.flags;
  }

  // Set comparison
  if (value instanceof Set && other instanceof Set) {
    if (value.size !== other.size) {
      return false;
    }
    for (const item of Array.from(value)) {
      if (!other.has(item)) {
        return false;
      }
    }
    return true;
  }

  // Map comparison
  if (value instanceof Map && other instanceof Map) {
    if (value.size !== other.size) {
      return false;
    }
    for (const [key, val] of Array.from(value)) {
      if (!other.has(key)) {
        return false;
      }
      if (!isEqual(val, other.get(key))) {
        return false;
      }
    }
    return true;
  }

  // Same reference for objects
  if (value === other) {
    return true;
  }

  // Array comparison
  if (Array.isArray(value) && Array.isArray(other)) {
    if (value.length !== other.length) {
      return false;
    }

    for (let i = 0; i < value.length; i++) {
      if (!isEqual(value[i], other[i])) {
        return false;
      }
    }

    return true;
  }

  // Ensure both are objects at this point
  if (typeof value !== "object" || typeof other !== "object") {
    return false;
  }

  // Ensure neither is null (typeof null === 'object')
  if (value === null || other === null) {
    return false;
  }

  const valueObj = value as Record<string, unknown>;
  const otherObj = other as Record<string, unknown>;

  // Compare object keys length
  const valueKeys = Object.keys(valueObj);
  const otherKeys = Object.keys(otherObj);

  if (valueKeys.length !== otherKeys.length) {
    return false;
  }

  // Compare each property
  for (const key of valueKeys) {
    if (!(key in otherObj)) {
      return false;
    }

    if (!isEqual(valueObj[key], otherObj[key])) {
      return false;
    }
  }

  return true;
}

export function isObject(value: unknown): value is object {
  return (
    value != null &&
    (typeof value === "object" ||
      typeof value === "function" ||
      Object.prototype.toString.call(value) === "[object Object]")
  );
}
