import HomePage from "@/components/homes/Home";
import { NavbarRecruiters } from "@/components/shared/navbar/NavbarRecruiters";
import CompanyLanding from "@/components/homes/RecLand";
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
