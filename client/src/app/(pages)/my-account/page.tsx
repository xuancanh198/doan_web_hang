import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import React from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "My Account | NextCommerce Nextjs E-commerce template",
  description: "This is My Account page for NextCommerce Template",
  // other metadata
};

const MyAccountPage = () => {
  return (
    <main className="w-full">
     <div className="w-full max-w-[1530px] container-base bg-white">
     <div className="my-[20px]">
        <UserMetaCard />
     </div>
     <div className="my-[20px]">
       <UserAddressCard />
      </div>
     </div>
     
    </main>
  );
};

export default MyAccountPage;
