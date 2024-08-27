export function open(url: string, opts: { target?: string; width?: number; height?: number } = {}) {
  const popupWinWidth = opts.width || 500;
  const popupWinHeight = opts.height || 800;
  const left = (window.screen.width - popupWinWidth) / 2;
  const top = (window.screen.height - popupWinHeight) / 4;

  const win = window.open(url, opts.target, `width=${popupWinWidth},height=${popupWinHeight},top=${top},left=${left}`);

  try {
    win?.focus();
  } catch (er) {}

  return win;
}
