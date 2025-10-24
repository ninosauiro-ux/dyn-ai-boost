import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-2xl sm:text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity"
            >
              <span className="text-primary text-glow">DYN</span>
              <span className="text-foreground"> Agency</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("hero")} className="text-foreground hover:text-primary transition-colors">
              Inicio
            </button>
            <button onClick={() => scrollToSection("servicios")} className="text-foreground hover:text-primary transition-colors">
              Servicios
            </button>
            <button onClick={() => scrollToSection("proceso")} className="text-foreground hover:text-primary transition-colors">
              Proceso
            </button>
            <button onClick={() => scrollToSection("casos")} className="text-foreground hover:text-primary transition-colors">
              Casos de Éxito
            </button>
            <button onClick={() => scrollToSection("contacto")} className="text-foreground hover:text-primary transition-colors">
              Contacto
            </button>
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection("contacto")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 shadow-lg hover:shadow-xl transition-all"
            >
              Solicitar Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-card/95 backdrop-blur-lg">
            <div className="px-4 py-6 space-y-4">
              <button
                onClick={() => scrollToSection("hero")}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection("servicios")}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection("proceso")}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
              >
                Proceso
              </button>
              <button
                onClick={() => scrollToSection("casos")}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
              >
                Casos de Éxito
              </button>
              <button
                onClick={() => scrollToSection("contacto")}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors"
              >
                Contacto
              </button>
              <Button
                onClick={() => scrollToSection("contacto")}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              >
                Solicitar Demo
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
