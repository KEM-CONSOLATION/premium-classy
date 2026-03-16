 "use client";

 import { useEffect, useState } from "react";

 const STORAGE_KEY = "premium-classy-cookie-consent";

 type ConsentStatus = "accepted" | "rejected" | null;

 export function CookieConsent() {
   const [status, setStatus] = useState<ConsentStatus>(null);
   const [isMounted, setIsMounted] = useState(false);

   useEffect(() => {
     setIsMounted(true);
     try {
       const stored = window.localStorage.getItem(STORAGE_KEY) as ConsentStatus | null;
       if (stored === "accepted" || stored === "rejected") {
         setStatus(stored);
       }
     } catch (error) {
       console.error("Error reading cookie consent:", error);
     }
   }, []);

   const handleChoice = (choice: ConsentStatus) => {
     try {
       if (choice) {
         window.localStorage.setItem(STORAGE_KEY, choice);
       }
       setStatus(choice);
     } catch (error) {
       console.error("Error saving cookie consent:", error);
     }
   };

   // Avoid hydration mismatch and hide when a choice was made
   if (!isMounted || status !== null) {
     return null;
   }

   return (
     <section
       className="fixed inset-x-0 bottom-0 z-40 border-t bg-white/95 shadow-lg backdrop-blur-sm dark:bg-slate-900/95"
       role="dialog"
       aria-modal="true"
       aria-label="Cookie and privacy preferences"
     >
       <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-3">
         <div className="space-y-1 text-sm sm:text-[0.9rem]">
           <p className="font-semibold text-slate-900 dark:text-slate-50">
             We value your privacy
           </p>
           <p className="text-slate-600 dark:text-slate-300">
             We use essential cookies to make this site work and to understand how it is
             used so we can keep improving your Premium&Classy experience.
           </p>
         </div>

         <div className="flex flex-wrap items-center gap-2 sm:justify-end">
           <button
             type="button"
             onClick={() => handleChoice("rejected")}
             className="rounded-full border border-slate-300 px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
           >
             Only essential
           </button>
           <button
             type="button"
             onClick={() => handleChoice("accepted")}
             className="rounded-full bg-amber-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
           >
             Accept all cookies
           </button>
         </div>
       </div>
     </section>
   );
 }

