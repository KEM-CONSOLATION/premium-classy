import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 text-slate-50">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center space-y-6">
        <p className="text-sm font-semibold tracking-[0.3em] text-amber-400 uppercase">
          Premium&amp;Classy
        </p>
        <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight">
          404 – Page Not Found
        </h1>
        <p className="text-base md:text-lg text-slate-300">
          The page you&apos;re looking for may have been moved, renamed, or is temporarily
          unavailable. Let&apos;s take you back to beautiful events instead.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-amber-600 px-7 py-3 text-base font-semibold text-white shadow-lg transition hover:bg-amber-700 hover:shadow-xl"
          >
            <Link href="/">Back to homepage</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-slate-600 bg-transparent px-7 py-3 text-base font-medium text-slate-100 hover:bg-slate-800/60"
          >
            <Link href="/contact" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Contact our team
            </Link>
          </Button>
        </div>

        <p className="text-xs text-slate-500">
          If you believe this is an error, you can reach us through the contact page.
        </p>
      </div>
    </main>
  );
}

