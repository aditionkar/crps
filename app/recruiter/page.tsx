import HomePage from "@/components/Home";
import { NavbarRecruiters } from "@/components/shared/navbar/NavbarRecruiters";
import CompanyLanding from "@/components/RecLand";
import React from "react";

export default function RecruiterDashboard() {
  return (
    <div>
        <NavbarRecruiters/>
      <HomePage/>
      <CompanyLanding/>
    </div>
  );
}
