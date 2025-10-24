import { Zap, TrendingUp, Users, Headphones, BarChart3, Shield } from "lucide-react";

const advantages = [
  {
    icon: Zap,
    title: "Implementación Rápida",
    description: "Puesta en marcha en menos de 2 semanas",
  },
  {
    icon: TrendingUp,
    title: "Resultados Desde el Primer Mes",
    description: "Medibles, verificables y escalables",
  },
  {
    icon: Users,
    title: "Soluciones Personalizadas",
    description: "No vendemos paquetes, creamos estrategias únicas",
  },
  {
    icon: Headphones,
    title: "Atención Cercana y Soporte",
    description: "Equipo dedicado disponible cuando lo necesites",
  },
  {
    icon: BarChart3,
    title: "Resultados Medibles",
    description: "Dashboards y reportes en tiempo real",
  },
  {
    icon: Shield,
    title: "Seguridad y Privacidad",
    description: "Protección total de tus datos y los de tus clientes",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Por Qué <span className="text-primary text-glow">Elegirnos</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La combinación perfecta de tecnología avanzada y atención humana
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl hover:card-glow transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold mb-3">{advantage.title}</h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
