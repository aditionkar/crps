import HomePage from "@/components/homes/Home";
import { NavbarStudents } from "@/components/shared/navbar/NavbarStudents";
import StudentLanding from "@/components/homes/StuLand";
import TopCompanies from "@/components/homes/TopCompanies";
import React from "react";


export default function StudentDashboard() {
  return (
    <div>
      <NavbarStudents/>
      <HomePage/>
      <StudentLanding/>
      <TopCompanies/>

    </div>
  );
}
