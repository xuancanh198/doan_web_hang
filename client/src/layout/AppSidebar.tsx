"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons/index";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const AppSidebar: React.FC = () => {
   const t = useTranslations("ManageInAdmin");
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  const navItems: NavItem[] = [
    {
      icon: <GridIcon />,
      name: "Dashboard",
      subItems: [{ name: "Ecommerce", path: "/admin", pro: false }],
    },
    {
      name: t('Page.product'),
      icon: <PageIcon />,
      subItems: [
        { name: t('Page.category'), path: "/admin/manage-list?query=category", pro: false },
        { name: t('Page.author'), path: "/admin/manage-list?query=author", pro: false },
        { name: t('Page.publisher'), path: "/admin/manage-list?query=publisher", pro: false },
        { name: t('Page.series'), path: "/admin/manage-list?query=series", pro: false },
        { name: t('Page.product'), path: "/admin/manage-list?query=product", pro: false },
        { name: t('Page.productImportExport'), path: "/admin/manage-list?query=product-import-export", pro: false },
       { name: t('Page.productLog'), path: "/admin/manage-list?query=product-log", pro: false },
      ],
    },
     {
      name: t('Page.system'),
      icon: <PageIcon />,
      subItems: [
        { name: t('Page.setting'), path: "/admin/manage-list?query=setting", pro: false },
          { name: t('Page.banner'), path: "/admin/manage-list?query=banner", pro: false },
          { name: t('Page.logActive'), path: "/admin/manage-list?query=log-active", pro: false },
      ],
    },
    {
      name: t('Page.permisstion'),
      icon: <PageIcon />,
      subItems: [
        { name: t('Page.permisstion'), path: "/admin/manage-list?query=permisstion", pro: false },
        { name: t('Page.action'), path: "/admin/manage-list?query=action", pro: false },
        { name: t('Page.permisstionDetail'), path: "/admin/manage-list?query=permisstion-detail", pro: false },
      ],
    },
    {
      name: t('Page.staff'),
      icon: <PageIcon />,
      subItems: [
        { name: t('Page.staff'), path: "/admin/manage-list?query=staff", pro: false },
        { name: t('Page.role'), path: "/admin/manage-list?query=role", pro: false },
      ],
    },
  ];

  const renderMenuItems = (items: NavItem[], type: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((item, index) => (
        <li key={item.name}>
          {item.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, type)}
              className={`menu-item group ${
                openSubmenu?.type === type && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}
            >
              <span className={`${
                openSubmenu?.type === type && openSubmenu?.index === index
                  ? "menu-item-icon-active"
                  : "menu-item-icon-inactive"
              }`}>
                {item.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <>
                  <span className="menu-item-text">{item.name}</span>
                  <ChevronDownIcon
                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                      openSubmenu?.type === type && openSubmenu?.index === index
                        ? "rotate-180 text-brand-500"
                        : ""
                    }`}
                  />
                </>
              )}
            </button>
          ) : (
            item.path && (
              <Link
                href={item.path}
                className={`menu-item group ${
                  isActive(item.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span className={`${
                  isActive(item.path)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}>
                  {item.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{item.name}</span>
                )}
              </Link>
            )
          )}
          {item.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${type}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === type && openSubmenu?.index === index
                    ? `${subMenuHeight[`${type}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {item.subItems.map((sub) => (
                  <li key={sub.name}>
                    <Link
                      href={sub.path}
                      className={`menu-dropdown-item ${
                        isActive(sub.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {sub.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {sub.new && (
                          <span className={`menu-dropdown-badge ${
                            isActive(sub.path)
                              ? "menu-dropdown-badge-active"
                              : "menu-dropdown-badge-inactive"
                          }`}>
                            new
                          </span>
                        )}
                        {sub.pro && (
                          <span className={`menu-dropdown-badge ${
                            isActive(sub.path)
                              ? "menu-dropdown-badge-active"
                              : "menu-dropdown-badge-inactive"
                          }`}>
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  const handleSubmenuToggle = (index: number, type: "main" | "others") => {
    setOpenSubmenu((prev) =>
      prev && prev.type === type && prev.index === index ? null : { type, index }
    );
  };

  useEffect(() => {
    let matched = false;
    ["main", "others"].forEach((type) => {
      const items =  navItems ;
      items.forEach((item, idx) => {
        if (item.subItems?.some((sub) => isActive(sub.path))) {
          setOpenSubmenu({ type: type as "main" | "others", index: idx });
          matched = true;
        }
      });
    });
    if (!matched) setOpenSubmenu(null);
  }, [pathname, isActive]);

  useEffect(() => {
    if (openSubmenu) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      const ref = subMenuRefs.current[key];
      if (ref) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: ref.scrollHeight,
        }));
      }
    }
  }, [openSubmenu]);

  return (
    <aside
      className={`fixed mt-16 lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
      ${
        isExpanded || isMobileOpen || isHovered ? "w-[290px]" : "w-[90px]"
      } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <Link href="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <Image className="dark:hidden" src="/images/logo/logo.svg" alt="Logo" width={150} height={40} />
              <Image className="hidden dark:block" src="/images/logo/logo-dark.svg" alt="Logo" width={150} height={40} />
            </>
          ) : (
            <Image src="/images/logo/logo-icon.svg" alt="Logo" width={32} height={32} />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2 className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
              }`}>
                {isExpanded || isHovered || isMobileOpen ? "Menu" : <HorizontaLDots />}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;
