import cx from "classnames";
import saveAs from "js-file-download";
import React, { useEffect, useRef } from "react";
// @ts-expect-error
import { CopyToClipboard } from "react-copy-to-clipboard";

export function NoHighlight({ value, fileName = "response.txt", className, downloadable, canCopy, language }: any) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const childNodes: ChildNode[] = Array.from(rootRef.current!.childNodes).filter(
      (node: ChildNode) => !!node.nodeType && (node as HTMLDivElement).classList.contains("microlight")
    );

    // eslint-disable-next-line no-use-before-define
    childNodes.forEach((node) => node.addEventListener("mousewheel", handlePreventYScrollingBeyondElement, { passive: false }));
    return () => {
      // eslint-disable-next-line no-use-before-define
      childNodes.forEach((node) => node.removeEventListener("mousewheel", handlePreventYScrollingBeyondElement));
    };
  }, [value, className, language]);

  const handleDownload = () => {
    saveAs(value, fileName);
  };

  const handlePreventYScrollingBeyondElement = (e: any) => {
    const { target, deltaY } = e;
    const { scrollHeight: contentHeight, offsetHeight: visibleHeight, scrollTop } = target;
    const scrollOffset = visibleHeight + scrollTop;
    const isElementScrollable = contentHeight > visibleHeight;
    const isScrollingPastTop = scrollTop === 0 && deltaY < 0;
    const isScrollingPastBottom = scrollOffset >= contentHeight && deltaY > 0;

    if (isElementScrollable && (isScrollingPastTop || isScrollingPastBottom)) {
      e.preventDefault();
    }
  };

  return (
    <div className="highlight-code relative" ref={rootRef}>
      <div className={"absolute right-12 top-8 bg-middleGrey text-white text-b6 py-4 px-8 rounded-16"}>
        Payload to long to be highlighted
      </div>
      {canCopy && (
        <div className="copy-to-clipboard">
          <CopyToClipboard text={value}>
            <button />
          </CopyToClipboard>
        </div>
      )}

      {!downloadable ? null : (
        <button className="download-contents" onClick={handleDownload}>
          Download
        </button>
      )}
      <pre className={cx(className, "microlight")}>
        <code>{value}</code>
      </pre>
    </div>
  );
}
