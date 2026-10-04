import { Link } from "react-router-dom";
import { Download, MessageCircle, Send } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CtaBand({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children?: ReactNode;
}) {
  return (
    <section className="px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-lg bg-navy px-6 py-8 text-on-navy md:flex-row md:items-center md:px-10">
        <div>
          <h2 className="text-xl text-paper md:text-2xl">{title}</h2>
          {note ? <p className="mt-2 max-w-xl text-sm text-on-navy-muted">{note}</p> : null}
        </div>
        <div className="flex flex-wrap gap-3">{children}</div>
      </div>
    </section>
  );
}

export function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const contact = document.getElementById("contact");
      const contactVisible = contact
        ? contact.getBoundingClientRect().top < window.innerHeight - 80
        : false;
      setShow(window.scrollY > 420 && !contactVisible);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-cta border-t border-paper/10 bg-navy/95 pt-3 pb-[calc(12px+env(safe-area-inset-bottom,0px))] backdrop-blur-md transition-[transform,opacity] duration-200 md:hidden",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <div className="mx-auto flex max-w-6xl gap-2 px-4">
        <Button asChild size="sm" className="flex-1">
          <Link to="/kampanye-instalasi-listrik">
            <Send className="size-4" />
            Survey
          </Link>
        </Button>
        <Button asChild size="sm" variant="outline-light" className="flex-1">
          <Link to="/profil-perusahaan">
            <Download className="size-4" />
            Profil
          </Link>
        </Button>
        <Button asChild size="sm" variant="wa" className="flex-1">
          <a href="#contact">
            <MessageCircle className="size-4" />
            Brief
          </a>
        </Button>
      </div>
    </div>
  );
}
