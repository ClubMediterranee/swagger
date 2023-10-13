import {Button} from "@clubmed/ui/molecules/Buttons";
import React from "react";
import {System} from "../../interfaces/System";

export function ApiBanner(props: System) {
  const {layoutSelectors} = props;
  const filter = layoutSelectors.currentFilter();

  const showBanner = !(typeof filter === "string" && filter.length > 0);

  return (
    showBanner ? (<div className="api-banner sm:grid sm:grid-cols-2 lg:grid-cols-5 -mb-24 wrapper">
        <div className="sm:col-start-2 lg:col-start-4 sm:row-start-1 lg:col-span-2">
          <img draggable="false"
               src="https://ms.clubmed.com/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&amp;format=webp&amp;width=900&amp;height=900&amp;quality=70"
               alt=""
               className="rounded-b-16 sm:rounded-16 aspect-square h-full w-full overflow-hidden object-cover"
               decoding="async" loading="eager"
               srcSet="https://ms.clubmed.com/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&amp;format=webp&amp;width=300&amp;height=300&amp;quality=70 300w, https://ms.clubmed.com/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&amp;format=webp&amp;width=600&amp;height=600&amp;quality=70 600w, https://ms.clubmed.com/?url=https%3A%2F%2Fns.clubmed.com%2Fdream%2FPRODUCT_CENTER%2FDESTINATIONS%2FSUN%2FEurope___Mediterranee%2FEspagne%2FMagna_Marbella%2F348391-9pbn8qy28t-swhr.jpg&amp;format=webp&amp;width=900&amp;height=900&amp;quality=85 900w"
               sizes="(min-width: 1220px) calc(50vw - 160px), (min-width: 1024px) calc(50vw - 120px), (min-width: 640px) calc(50vw - 20px), 100vw"/>
        </div>
        <div
          className="-mt-24 flex flex-col sm:col-span-2 lg:col-span-3 sm:col-start-1 sm:row-start-1 sm:mt-0 sm:justify-center sm:gap-y-20 lg:gap-y-40">
          <div
            className="sm:max-w-1/2 lg:max-w-full flex flex-col gap-y-20 px-20 py-40 sm:-order-1 sm:p-0 sm:pe-20 lg:pe-40 xl:pe-80">

            <h1 className="title">
              Welcome to our API,
            </h1>

            <div className="text-b3">
              Welcome to Club Med, where premium all-inclusive means so much more. It’s about the simplicity of luxury
              and
              peace-of-mind holidays. One booking covers everything: flights, superior accommodation, gourmet
              cuisines,
              unlimited drinks and refreshments and a multitude of endless included activities. Our renowned kids club
              and
              programme caters to all ages to create lifelong memories. Discover the ultimate all-inclusive experience
              with Club Med.
            </div>

            <div>
              <Button href={"https://www.clubmed.com.au/"}>Contact us</Button>
            </div>
          </div>
        </div>
      </div>)
      : <div className="api-banner sm:grid sm:grid-cols-2 lg:grid-cols-5 -mb-24 wrapper pb-20">
        <div
          className="-mt-24 flex flex-col sm:col-span-2 lg:col-span-3 sm:col-start-1 sm:row-start-1 sm:mt-0 sm:justify-center sm:gap-y-20 lg:gap-y-40">
          <div
            className="sm:max-w-1/2 lg:max-w-full flex flex-col gap-y-20 px-20 py-40 sm:-order-1 sm:p-0 sm:pe-20 lg:pe-40 xl:pe-80"
            style={{minHeight: "100px"}}>
            <h1 className="title">Search:  {filter}</h1>
          </div>
        </div>
      </div>
  );
}
