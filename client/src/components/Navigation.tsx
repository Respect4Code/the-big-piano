import { Link, useLocation } from "wouter";
import { Music, Home, BookOpen } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();

  const links = [
    { href: "/", label: "Story", icon: BookOpen },
    { href: "/play/toy", label: "Toy", icon: Music },
    { href: "/play/small", label: "Small", icon: Music },
    { href: "/play/big", label: "Big", icon: Music },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/20 px-6 py-2 flex gap-2">
      {links.map((link) => {
        const isActive = location === link.href;
        return (
          <Link 
            key={link.href} 
            href={link.href}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all
              ${isActive 
                ? "bg-primary text-primary-foreground shadow-md scale-105" 
                : "text-muted-foreground hover:bg-black/5 hover:text-foreground"
              }
            `}
          >
            <link.icon className="w-4 h-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
