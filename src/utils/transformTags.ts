export function transformTags(
  tags: { label: string; value: string }[],
): string[] {
  return tags.map((tag) => tag.value.toLowerCase());
}
