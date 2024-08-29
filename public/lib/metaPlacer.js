/// <reference lib="dom" />

function metaPlacer(title) {
  const displayingTitle = title ? `${title} - さわコミュ` : "さわやかコミュニケーション";
  const head = document.getElementsByTagName("head")[0];

  const mTitle = document.createElement("title");
  mTitle.innerHTML = displayingTitle;
  head.appendChild(mTitle);

  const favicon = document.createElement("link");
  favicon.setAttribute("rel", "icon");
  favicon.setAttribute("href", "/favicon.ico");
  head.appendChild(favicon);

  const utf = document.createElement("link");
  utf.setAttribute("charset", "utf-8");
  head.appendChild(utf);

  const view = document.createElement("meta");
  view.setAttribute("name", "viewport");
  view.setAttribute("content", "width=device-width, initial-scale=1.0");
  head.appendChild(view);

  const manifest = document.createElement("link");
  manifest.setAttribute("rel", "manifest");
  manifest.setAttribute("href", "/manifest.json");
  head.appendChild(manifest);

  const apple = document.createElement("link");
  apple.setAttribute("rel", "apple-touch-icon");
  apple.setAttribute("sizes", "256x256");
  apple.setAttribute("href", "/apple-touch-icon.png");
  head.appendChild(apple);

  const css = document.createElement("link");;
  css.setAttribute("rel", "stylesheet");
  css.setAttribute("type","text/css");
  css.setAttribute("href", "/styles/components.css");
  head.appendChild(css);
}
