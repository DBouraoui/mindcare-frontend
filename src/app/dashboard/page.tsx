"use client"

import Metrics from "@/components/blocks-dashboard/dashboard/Metrics";
import Header from "@/components/blocks-dashboard/dashboard/Header";
import Prevention from "@/components/blocks-dashboard/dashboard/Prevention";
import Stats from "@/components/blocks-dashboard/dashboard/Stats";
import FakeSearch from "@/components/blocks-dashboard/dashboard/Fake-search";

export default function Page() {
    return (
   <>
        <section className="w-full h-full flex flex-col gap-10">
       <Header />
       <FakeSearch />
       <Metrics />
       <Prevention />
       <Stats />
        </section>
   </>
    )
}
