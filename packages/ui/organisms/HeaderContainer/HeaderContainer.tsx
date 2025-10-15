import { Icon } from "@clubmed/trident-icons";
import { PropsWithChildren } from "react";

import { Header } from "../Header/Header";
import type { NavItem } from "../Header/types/NavItem.js";
import { DesktopMenuContainer } from "./DesktopMenuContainer";
import { MobileMenuContainer } from "./MobileMenuContainer.js";

export function HeaderContainer({
  homepageUrl,
  items,
  version,
  children,
  Link = "a"
}: PropsWithChildren<{
  Link: any;
  version?: string;
  homepageUrl: string;
  items?: NavItem[];
}>) {
  return (
    <div className="relative h-[72px]">
      <Header className="isolate z-5 fixed top-0 inset-x-0">
        <Link href={homepageUrl} title="Club Med Homepage relative">
          <div className="w-[30px] md:w-[160px] ">
            <div className={"flex flex-col"}>
              <Icon name="ClubMed" width="100%" aspectRatio className="hidden md:block text-ultramarine" />
              <Icon name="Trident" width="100%" aspectRatio className="ml-8 md:hidden text-ultramarine" />
              <span className="hidden md:block text-b6">{version}</span>
            </div>
          </div>
        </Link>
        {items && <DesktopMenuContainer Link={Link} items={items} />}
        <div className="flex gap-x-8 items-center">
          {children}
          {items && <MobileMenuContainer Link={Link} items={items} />}
        </div>
      </Header>
    </div>
  );
}
