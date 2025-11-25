export function transformTags(
  tags: { label: string; value: string }[],
): string[] {
  return tags.map((tag) => tag.value.toLowerCase());
}

export function reverseTransformTags(
  tags: string[],
): { label: string; value: string }[] {
  return tags?.map((tag) => ({
    label: tag?.charAt(0).toUpperCase() + tag.slice(1),
    value: tag,
  }));
}
