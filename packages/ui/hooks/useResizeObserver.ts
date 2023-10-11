import { ResizeObserver } from '@juggle/resize-observer';
import useResizeObserver from 'use-resize-observer';

if (typeof window !== 'undefined' && !window.ResizeObserver) {
  window.ResizeObserver = ResizeObserver;
}

export default useResizeObserver;
