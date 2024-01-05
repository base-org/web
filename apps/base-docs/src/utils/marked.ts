import { marked } from 'marked';

// Add target="_blank" to anchor tags
const renderer = new marked.Renderer();
renderer.link = (href, title, text) =>
  `<a target="_blank" href="${href}" title="${title}">${text}</a>`;

marked.use({ renderer });

export default marked;
