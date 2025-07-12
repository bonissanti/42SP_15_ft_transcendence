import { t } from '../i18n';

export function simpleTemplate(html: string, data: object): string {
  const context = { ...t(), ...data };
  return html.replace(/{{(.*?)}}/g, (match, key) => {
    const prop = key.trim();
    const value = prop.split('.').reduce((acc: any, part: string) => acc && acc[part], context);
    return value !== undefined ? String(value) : match;
  });
}

export async function renderView(viewName: string, data: object = {}): Promise<string> {
  try {
    const response = await fetch(`/pages/${viewName}.html`);
    if (!response.ok) throw new Error(`View not found: ${viewName}`);
    const htmlTemplate = await response.text();
    return simpleTemplate(htmlTemplate, data);
  } catch (error) {
    console.error('Failed to render view:', error);
    return `
      <h1>Erro ao carregar a página</h1>
      <p>Não foi possível encontrar o conteúdo solicitado.</p>
      <button class="menu-button" data-navigate="/">Voltar ao Menu</button>
    `;
  }
}