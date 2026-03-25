export const slugifyFilename = (originalName: string) => {
  const ext = originalName.split(".").pop() || "jpg";
  const nameWithoutExt = originalName.replace(/\.[^/.]+$/, "");

  const slug = nameWithoutExt
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // replace special chars
    .replace(/^-+|-+$/g, ""); // trim dashes

  const uniqueSuffix = Date.now(); // prevents collisions

  return `${slug}-${uniqueSuffix}.${ext}`;
};
