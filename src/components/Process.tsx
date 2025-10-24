import { Search, Target, Rocket, TrendingUp, CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Análisis del Negocio",
    description: "Estudiamos tu mercado, competencia y oportunidades de automatización",
    icon: Search,
  },
  {
    number: "02",
    title: "Estrategia Personalizada",
    description: "Diseñamos un plan de IA adaptado a tus objetivos y recursos",
    icon: Target,
  },
  {
    number: "03",
    title: "Implementación IA",
    description: "Desarrollamos y configuramos las soluciones de automatización",
    icon: Rocket,
  },
  {
    number: "04",
    title: "Medición y Optimización",
    description: "Monitoreamos resultados y ajustamos estrategias en tiempo real",
    icon: TrendingUp,
  },
  {
    number: "05",
    title: "Resultados y Crecimiento",
    description: "Escalamos tu negocio con mejoras continuas y soporte dedicado",
    icon: CheckCircle2,
  },
];

const Process = () => {
  return (
    <section id="proceso" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Nuestro <span className="text-primary text-glow">Proceso</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un camino claro y estructurado para transformar tu negocio con IA
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-xl hover:card-glow transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-5xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                    {step.number}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
