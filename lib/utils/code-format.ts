export interface FormatResult {
  success: boolean;
  output?: string;
  error?: string;
}

export async function formatHtml(input: string): Promise<FormatResult> {
  if (!input.trim()) return { success: false, error: "Please enter some HTML to format." };
  try {
    const prettier = await import("prettier/standalone");
    const htmlPlugin = (await import("prettier/plugins/html")).default;
    const output = await prettier.format(input, { parser: "html", plugins: [htmlPlugin] });
    return { success: true, output };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Could not format this HTML." };
  }
}

export async function formatCss(input: string): Promise<FormatResult> {
  if (!input.trim()) return { success: false, error: "Please enter some CSS to format." };
  try {
    const prettier = await import("prettier/standalone");
    const postcssPlugin = (await import("prettier/plugins/postcss")).default;
    const output = await prettier.format(input, { parser: "css", plugins: [postcssPlugin] });
    return { success: true, output };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : "Could not format this CSS." };
  }
}

export async function formatJavaScript(input: string): Promise<FormatResult> {
  if (!input.trim()) return { success: false, error: "Please enter some JavaScript to format." };
  try {
    const prettier = await import("prettier/standalone");
    const babelPlugin = (await import("prettier/plugins/babel")).default;
    const estreePlugin = (await import("prettier/plugins/estree")).default;
    const output = await prettier.format(input, {
      parser: "babel",
      plugins: [babelPlugin, estreePlugin],
    });
    return { success: true, output };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Could not format this JavaScript.",
    };
  }
}
