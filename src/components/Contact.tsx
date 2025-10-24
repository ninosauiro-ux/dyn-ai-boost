<<<<<<< HEAD
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Instagram, Send } from "lucide-react";
=======
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Instagram, Send, Star, Bot, X } from "lucide-react";
>>>>>>> 560454f (feat: testimonios, webhook en contacto y reseñas, chatbot IA n8n + UI/UX chat)
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
<<<<<<< HEAD
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
=======
    phone: "+34 ",
    message: "",
  });

  const [reviewData, setReviewData] = useState({
    rating: 0,
    service: "",
    description: "",
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showReviewThanks, setShowReviewThanks] = useState(false);

  const [showAssistant, setShowAssistant] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatSessionId] = useState(() => `web-user-${Date.now()}`);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping, showAssistant]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

>>>>>>> 560454f (feat: testimonios, webhook en contacto y reseñas, chatbot IA n8n + UI/UX chat)
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

<<<<<<< HEAD
    // Create WhatsApp message
    const whatsappMessage = `Hola! Me gustaría solicitar información sobre sus servicios.%0A%0ANombre: ${formData.name}%0AEmail: ${formData.email}%0ATeléfono: ${formData.phone}%0A%0AMensaje: ${formData.message}`;
    const whatsappUrl = `https://wa.me/5491234567890?text=${whatsappMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "¡Perfecto!",
      description: "Te redirigimos a WhatsApp para completar tu solicitud",
    });

    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" });
=======
    try {
      const res = await fetch("https://n8n-n8n.s9u5gg.easypanel.host/webhook-test/f42509e5-c86f-4726-9cd7-74f2a1977e2d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });

      if (!res.ok) throw new Error("request_failed");

      toast({
        description: "Formulario enviado. Nos pondremos en contacto contigo. Gracias",
      });

      setFormData({ name: "", email: "", phone: "+34 ", message: "" });
    } catch (err) {
      toast({
        title: "Error",
        description: "No se pudo enviar el formulario. Inténtalo de nuevo",
        variant: "destructive",
      });
    }
>>>>>>> 560454f (feat: testimonios, webhook en contacto y reseñas, chatbot IA n8n + UI/UX chat)
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

<<<<<<< HEAD
=======
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (reviewData.rating < 0 || reviewData.rating > 5 || !reviewData.service || !reviewData.description) {
      toast({
        title: "Error",
        description: "Completa la valoración (0-5), el servicio y la reseña",
        variant: "destructive",
      });
      return;
    }

    try {
      await fetch("https://n8n-n8n.s9u5gg.easypanel.host/webhook-test/f42509e5-c86f-4726-9cd7-74f2a1977e2d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "review", ...reviewData }),
      });
    } catch (err) {
      // Ignoramos errores del webhook; mostramos confirmación igualmente
    } finally {
      toast({ description: "¡Gracias por tu reseña!" });
      setShowReviewThanks(true);
      setTimeout(() => setShowReviewThanks(false), 4000);
      setReviewData({ rating: 0, service: "", description: "" });
    }
  };

  const handleChatSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { role: 'user' as const, content: chatInput.trim() };
    setChatMessages((msgs) => [...msgs, userMsg]);

    const payload = {
      message: userMsg.content,
      chatInput: userMsg.content,
      sessionId: chatSessionId,
      data: {
        key: {
          id: chatSessionId,
          remoteJid: 'web-session',
        },
      },
    };

    setChatInput("");
    setIsTyping(true);

    try {
      const res = await fetch("https://n8n-n8n.s9u5gg.easypanel.host/webhook/b699b932-8ede-4872-b1c4-ed8d9ab51e4d/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let assistantText = "";
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        const pick = (obj: any): string | undefined => {
          if (!obj || typeof obj !== 'object') return undefined;
          const direct = obj.output ?? obj.reply ?? obj.message ?? obj.text;
          if (typeof direct === 'string' && direct.trim()) return direct;
          if (Array.isArray(obj)) {
            for (const it of obj) {
              const v = pick(it);
              if (v) return v;
            }
          }
          const nested = obj.data ?? obj.result ?? obj.payload ?? obj.body;
          if (nested) return pick(nested);
          return undefined;
        };
        assistantText = pick(data) ?? JSON.stringify(data);
      } else {
        assistantText = await res.text();
      }

      if (assistantText && assistantText.toString().trim()) {
        setChatMessages((msgs) => [...msgs, { role: 'assistant', content: assistantText.toString() }]);
      }
    } catch (err) {
      // Silently ignore errors; do not send any fallback message.
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (!showAssistant || chatMessages.length > 0) return;
    // Default greeting when panel opens
    setChatMessages((msgs) => [
      ...msgs,
      {
        role: 'assistant',
        content: '¡Hola! Somos el asistente IA de DYN Agency. ¿En qué podemos ayudarte hoy?',
      },
    ]);
  }, [showAssistant, chatMessages.length]);

>>>>>>> 560454f (feat: testimonios, webhook en contacto y reseñas, chatbot IA n8n + UI/UX chat)
  return (
    <section id="contacto" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Solicita tu <span className="text-primary text-glow">Evaluación Gratuita</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Agenda una demo personalizada y descubre cómo la IA puede transformar tu negocio
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-card border border-border rounded-2xl p-8 animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nombre completo *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                  className="bg-background border-border focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                  className="bg-background border-border focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Teléfono
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
<<<<<<< HEAD
                  placeholder="+54 9 11 1234-5678"
=======
                  placeholder="+34 600 123 456"
>>>>>>> 560454f (feat: testimonios, webhook en contacto y reseñas, chatbot IA n8n + UI/UX chat)
                  className="bg-background border-border focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensaje *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu negocio y qué te gustaría automatizar..."
                  rows={5}
                  required
                  className="bg-background border-border focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-lg shadow-xl hover:shadow-2xl transition-all group"
              >
                Solicitar Evaluación Gratuita
                <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 animate-fade-in delay-200">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
              
              <div className="space-y-6">
                <a
                  href="mailto:dynagencyia@gmail.com"
                  className="flex items-start gap-4 group hover:opacity-80 transition-opacity"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <div className="text-muted-foreground">dynagencyia@gmail.com</div>
                  </div>
                </a>

                <a
<<<<<<< HEAD
                  href="https://wa.me/5491234567890"
=======
                  href="https://wa.me/34653705275"
>>>>>>> 560454f (feat: testimonios, webhook en contacto y reseñas, chatbot IA n8n + UI/UX chat)
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group hover:opacity-80 transition-opacity"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">WhatsApp</div>
                    <div className="text-muted-foreground">Chatea con nosotros</div>
                  </div>
                </a>

                <a
                  href="https://instagram.com/dyn.agency"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 group hover:opacity-80 transition-opacity"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Instagram</div>
                    <div className="text-muted-foreground">@dyn.agency</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Horarios de Atención</h3>
              <p className="text-muted-foreground mb-2">Lunes a Viernes: 9:00 - 18:00</p>
              <p className="text-muted-foreground">Sábados: 10:00 - 14:00</p>
              <p className="text-sm text-primary mt-4">Respuesta en menos de 24 horas</p>
            </div>
          </div>
        </div>
<<<<<<< HEAD
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5491234567890"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-50 animate-pulse"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
=======
      
        {/* Reviews Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">
              ¿Ya has trabajado con nosotros?
            </h3>
            <p className="text-muted-foreground mt-2 mb-4">
              Déjanos tu experiencia en una breve reseña.
            </p>
            <Button size="lg" onClick={() => setShowReviewForm((s) => !s)}>
              DEJA TU RESEÑA
            </Button>
          </div>

          {showReviewForm && (
            <div className="bg-card border border-border rounded-2xl p-8 animate-fade-in">
              <form onSubmit={handleReviewSubmit} className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Valoración
                    </label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`${i} estrellas`}
                          onClick={() => setReviewData({ ...reviewData, rating: i })}
                          className="p-1"
                        >
                          <Star
                            className={`w-6 h-6 ${reviewData.rating >= i ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                          />
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => setReviewData({ ...reviewData, rating: 0 })}
                        className="ml-3 text-xs text-muted-foreground hover:text-foreground underline"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="service" className="block text-sm font-medium mb-2">
                      Tipo de servicio
                    </label>
                    <Input
                      id="service"
                      name="service"
                      value={reviewData.service}
                      onChange={(e) => setReviewData({ ...reviewData, service: e.target.value })}
                      placeholder="p. ej., Chatbot de reservas, Optimización web, Asistente de voz..."
                      className="bg-background border-border focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    Reseña
                  </label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={reviewData.description}
                    onChange={(e) => setReviewData({ ...reviewData, description: e.target.value })}
                    placeholder="Escribe una breve descripción de tu experiencia..."
                    className="bg-background border-border focus:border-primary resize-none"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Enviar Reseña
                </Button>
              </form>
            </div>
          )}
        </div>

      </div>

      {/* Overlay de agradecimiento reseña */}
      {showReviewThanks && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card border border-border rounded-2xl p-8 max-w-md text-center shadow-2xl">
            <h4 className="text-xl font-bold mb-2">¡Gracias por tu reseña!</h4>
            <p className="text-muted-foreground">
              Gracias a ella, nos ayudas a escalar y mejorar nuestro servicio.
            </p>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setShowAssistant((s) => !s)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-50"
        aria-label="Abrir asistente IA de DYN Agency"
      >
        <Bot className="w-7 h-7 text-black" />
      </button>

      {showAssistant && (
        <div className="fixed bottom-24 right-6 w-[30rem] max-w-[95vw] bg-card/95 backdrop-blur border border-border rounded-2xl shadow-2xl z-50 overflow-hidden font-medium">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-gradient-to-r from-yellow-300/60 to-yellow-400/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center shadow">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <div className="font-semibold">Asistente IA · DYN Agency</div>
            </div>
            <button onClick={() => setShowAssistant(false)} aria-label="Cerrar" className="p-1 hover:opacity-80">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="dyn-chat-scroll max-h-[28rem] h-[28rem] overflow-y-auto px-5 py-4 space-y-4">
            {chatMessages.length === 0 && (
              <div className="text-sm text-muted-foreground">
                Estamos aquí para ayudarte. Escríbenos tu consulta.
              </div>
            )}
            {chatMessages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`${m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'} px-4 py-3 rounded-2xl max-w-[80%] text-base leading-relaxed shadow-md`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted px-4 py-3 rounded-2xl max-w-[80%] text-base inline-flex items-center gap-2">
                  <span className="text-muted-foreground">Escribiendo</span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/70 animate-pulse"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/70 animate-pulse" style={{ animationDelay: '120ms' }}></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/70 animate-pulse" style={{ animationDelay: '240ms' }}></span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleChatSend} className="flex items-center gap-3 p-4 border-t border-border bg-background">
            <Input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 text-base py-6 font-medium"
            />
            <Button type="submit" className="bg-yellow-400 text-black hover:bg-yellow-500">Enviar</Button>
          </form>
        </div>
      )}
      <style>{`
        /* Chat scrollbar styling */
        .dyn-chat-scroll { scrollbar-width: thin; scrollbar-color: #0a0a0a rgba(0,0,0,0.25); }
        .dyn-chat-scroll::-webkit-scrollbar { width: 8px; }
        .dyn-chat-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.25); border-radius: 9999px; }
        .dyn-chat-scroll::-webkit-scrollbar-thumb { background: #0a0a0a; border-radius: 9999px; }
        .dyn-chat-scroll::-webkit-scrollbar-thumb:hover { background: #000; }
      `}</style>
>>>>>>> 560454f (feat: testimonios, webhook en contacto y reseñas, chatbot IA n8n + UI/UX chat)
    </section>
  );
};

export default Contact;
