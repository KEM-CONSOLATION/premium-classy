 "use client";

 import { useEffect, useState } from "react";
 import { Header } from "@/components/Header";
 import { Footer } from "@/components/Footer";
 import { CookieConsent } from "@/components/CookieConsent";
 import { SiteSettings } from "@/types";
 import { client, queries } from "@/lib/sanity";

 interface LayoutProps {
   children: React.ReactNode;
 }

 export function Layout({ children }: LayoutProps) {
   const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

   useEffect(() => {
     const fetchSiteSettings = async () => {
       try {
         const settings = await client.fetch(queries.siteSettings);
         setSiteSettings(settings);
       } catch (error) {
         console.error("Error fetching site settings:", error);
       }
     };

     fetchSiteSettings();
   }, []);

   return (
     <div className="flex min-h-screen flex-col">
       <Header siteSettings={siteSettings || undefined} />
       <main className="flex-1">{children}</main>
       <Footer siteSettings={siteSettings || undefined} />
       <CookieConsent />
     </div>
   );
 }
