import HomePage from "@/components/Home";
import { NavbarStudents } from "@/components/shared/navbar/NavbarStudents";
import StudentLanding from "@/components/StuLand";
import Testimonials from "@/components/Testimonials";
import TopCompanies from "@/components/TopCompanies";
import React from "react";


export default function StudentDashboard() {
  return (
    <div>
      <NavbarStudents/>
      <HomePage/>
      <StudentLanding/>
      <Testimonials/>

    </div>
  );
}
