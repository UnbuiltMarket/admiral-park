// One shared source for imperative apartment actions and the standalone Framer button.
export const FROSTED_BUTTON_CSS = `
:where(.admiral-frosted-button) { min-height: 44px; padding: 10px 22px; font-size: 14px; }
.admiral-frosted-button {
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid #bdcfd3;
  border-color: color-mix(in srgb, var(--frosted-button-tint, #7395a0) 42%, white);
  border-radius: 999px;
  background: linear-gradient(145deg, rgb(255 255 255 / 80%), rgb(255 255 255 / 14%) 55%, rgb(255 255 255 / 42%)), #dce6e8;
  background: linear-gradient(145deg, rgb(255 255 255 / 80%), rgb(255 255 255 / 14%) 55%, rgb(255 255 255 / 42%)), color-mix(in srgb, var(--frosted-button-tint, #7395a0) 25%, rgb(255 255 255 / 68%));
  color: var(--frosted-button-text, #183b43);
  -webkit-backdrop-filter: blur(18px) saturate(115%);
  backdrop-filter: blur(18px) saturate(115%);
  box-shadow: inset 0 1px 1px rgb(255 255 255 / 95%), inset 0 -1px 0 rgb(24 59 67 / 9%), 0 3px 9px rgb(24 59 67 / 9%);
  font-family: 'Montserrat', Arial, sans-serif;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background .18s ease, border-color .18s ease, box-shadow .18s ease, transform .18s ease;
}
.admiral-frosted-button:focus-visible {
  outline: 2px solid var(--frosted-button-text, #183b43);
  outline-offset: 4px;
  border-color: var(--frosted-button-tint, #7395a0);
  box-shadow: inset 0 1px 1px white, 0 0 0 3px rgb(255 255 255 / 75%), 0 4px 12px rgb(24 59 67 / 15%);
}
@media (hover: hover) {
  .admiral-frosted-button:not(:disabled):not([aria-disabled="true"]):hover {
    border-color: color-mix(in srgb, var(--frosted-button-tint, #7395a0) 70%, white);
    background: linear-gradient(145deg, rgb(255 255 255 / 90%), rgb(255 255 255 / 28%) 55%, rgb(255 255 255 / 58%)), color-mix(in srgb, var(--frosted-button-tint, #7395a0) 33%, rgb(255 255 255 / 75%));
    box-shadow: inset 0 1px 1px white, inset 0 -1px 0 rgb(24 59 67 / 10%), 0 5px 14px rgb(24 59 67 / 14%);
  }
}
.admiral-frosted-button:not(:disabled):not([aria-disabled="true"]):active { transform: translateY(1px); box-shadow: inset 0 1px 3px rgb(24 59 67 / 14%), 0 1px 3px rgb(24 59 67 / 7%); }
.admiral-frosted-button:disabled, .admiral-frosted-button[aria-disabled="true"] { opacity: .48; cursor: not-allowed; pointer-events: none; }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .admiral-frosted-button { background: linear-gradient(145deg, rgb(255 255 255 / 60%), transparent 65%), #dce6e8; background: linear-gradient(145deg, rgb(255 255 255 / 60%), transparent 65%), color-mix(in srgb, var(--frosted-button-tint, #7395a0) 22%, white); }
}
@media (prefers-reduced-motion: reduce) {
  .admiral-frosted-button { transition: none; }
  .admiral-frosted-button:not(:disabled):not([aria-disabled="true"]):active { transform: none; }
}
@media (prefers-reduced-transparency: reduce) {
  .admiral-frosted-button, .admiral-frosted-button:not(:disabled):not([aria-disabled="true"]):hover {
    background: #dce6e8;
    background: color-mix(in srgb, var(--frosted-button-tint, #7395a0) 20%, white);
    -webkit-backdrop-filter: none; backdrop-filter: none;
  }
}
@media (forced-colors: active) {
  .admiral-frosted-button, .admiral-frosted-button:not(:disabled):not([aria-disabled="true"]):hover {
    border: 1px solid ButtonText; background: ButtonFace; color: ButtonText;
    -webkit-backdrop-filter: none; backdrop-filter: none; box-shadow: none;
  }
  .admiral-frosted-button:focus-visible { outline-color: Highlight; }
  .admiral-frosted-button:disabled, .admiral-frosted-button[aria-disabled="true"] { border-color: GrayText; color: GrayText; opacity: 1; }
}
`;

const escapeFrostedButton = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[character]));

// href must already have passed the caller's URL policy. Attribute values and
// labels are escaped here; event handlers, inline styles and structural overrides
// are deliberately excluded from the HTML renderer's attribute interface.
export function renderFrostedButton({label = 'Érdeklődöm', href, className = '', attributes = {}, disabled = false} = {}) {
  const link = typeof href === 'string' && !!href.trim();
  const tag = link ? 'a' : 'button';
  const props = {};
  if (attributes && typeof attributes === 'object' && !Array.isArray(attributes)) {
    for (const [name, value] of Object.entries(attributes)) {
      if (!/^[a-zA-Z][a-zA-Z0-9:_.-]*$/.test(name) || /^(?:on|style$|srcdoc$|href$|class$|className$|type$|disabled$)/i.test(name)) continue;
      if (!['string', 'number', 'boolean'].includes(typeof value)) continue;
      if (value === false && !/^(?:aria-|data-)/i.test(name)) continue;
      props[name] = value;
    }
  }
  if (link && !disabled) props.href = href;
  if (!link) props.type = 'button';
  if (disabled) {
    props['aria-disabled'] = 'true';
    if (link) { props.role = 'link'; props.tabindex = '-1'; }
    else props.disabled = true;
  }
  if (link && String(props.target).toLowerCase() === '_blank') {
    const rel = new Set(String(props.rel || '').split(/\s+/).filter(Boolean));
    rel.add('noopener'); rel.add('noreferrer'); props.rel = [...rel].join(' ');
  }
  const serialized = Object.entries(props).map(([name, value]) => value === true && !/^(?:aria-|data-)/i.test(name) ? ' ' + name : ' ' + name + '="' + escapeFrostedButton(value) + '"').join('');
  return '<' + tag + ' class="admiral-frosted-button' + (className ? ' ' + escapeFrostedButton(className) : '') + '"' + serialized + '>' + escapeFrostedButton(label) + '</' + tag + '>';
}
