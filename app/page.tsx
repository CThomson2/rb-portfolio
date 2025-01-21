"use client";

import { navItems } from "@/content/main";

import Hero from "@/components/home/Hero";
import Grid from "@/components/home/Grid";
import Footer from "@/components/home/Footer";
import Clients from "@/components/home/Clients";
import ApproachGrid from "@/components/home/Approach";
import Experience from "@/components/home/Experience";
import QueryForms from "@/components/home/RecentProjects";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import UserDashboard from "@/components/home/UserDashboard";

const Home = () => {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Experience />
        <QueryForms />
        {/* <Grid /> */}
        <Clients />
        {/* <UserDashboard /> */}
        <ApproachGrid />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
