export function buildRewritePrompt(target, text) {
    return `
  Rewrite the following message in a clear, respectful, and professional tone suitable for communicating with a ${target}:\n\n"${text}"
    `.trim()
  }
  