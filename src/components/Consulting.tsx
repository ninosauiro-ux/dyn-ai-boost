import { Users, Target, Lightbulb, LineChart } from "lucide-react";

const consultingFeatures = [
  {
    icon: Users,
    title: "Análisis de Competencia",
    description: "Identificamos oportunidades en tu mercado local y cómo diferenciarte",
  },
  {
    icon: Target,
    title: "Cliente Ideal",
    description: "Definimos tu buyer persona y cómo atraerlo efectivamente",
  },
  {
    icon: Lightbulb,
    title: "Estrategias Personalizadas",
    description: "Planes de acción específicos adaptados a tu industria y recursos",
  },
  {
    icon: LineChart,
    title: "Seguimiento Continuo",
    description: "Monitoreo constante de métricas y ajustes para maximizar resultados",
  },
];

const Consulting = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Consultoría y <span className="text-primary text-glow">Estrategia</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            No solo implementamos tecnología, te acompañamos en cada paso del camino con análisis profundo, 
            estrategias probadas y soporte continuo para garantizar el éxito de tu transformación digital.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {consultingFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl hover:card-glow transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Consulting;
