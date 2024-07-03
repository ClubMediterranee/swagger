import classnames from "classnames";
import { ImgHTMLAttributes, PropsWithChildren } from "react";

export interface HeroBannerProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export function HeroBanner({ children, className, ...props }: PropsWithChildren<HeroBannerProps>) {
  return (
    <div className={classnames("api-banner sm:grid sm:grid-cols-2 lg:grid-cols-5 wrapper", className)}>
      <div className="sm:col-start-2 lg:col-start-4 sm:row-start-1 lg:col-span-2">
        <img
          draggable="false"
          {...props}
          alt=""
          className="rounded-b-16 sm:rounded-16 aspect-square size-full overflow-hidden object-cover"
          decoding="async"
          loading="eager"
        />
      </div>
      <div className="-mt-24 flex flex-col sm:col-span-2 lg:col-span-3 sm:col-start-1 sm:row-start-1 sm:mt-0 sm:justify-center sm:gap-y-20 lg:gap-y-40">
        <div className="sm:max-w-1/2 lg:max-w-full flex flex-col gap-y-20 px-20 py-40 sm:-order-1 sm:p-0 sm:pe-20 lg:pe-40 xl:pe-80">
          {children}
        </div>
      </div>
    </div>
  );
}
