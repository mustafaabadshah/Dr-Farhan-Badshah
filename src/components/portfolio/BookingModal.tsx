import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCMS } from "@/lib/cms-store";
import { Calendar, CheckCircle2, Clock, MapPin, Send, Stethoscope } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { toast } from "sonner";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedClinic?: string;
  preselectedService?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  preselectedClinic,
  preselectedService,
}: BookingModalProps) {
  const { data, addBooking } = useCMS();
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [clinic, setClinic] = useState(preselectedClinic || data.clinics[0]?.name || "");
  const [service, setService] = useState(preselectedService || data.services[0]?.title || "");
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [timeSlot, setTimeSlot] = useState("Morning (10:00 AM – 01:00 PM)");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState("");

  // Update clinic/service when props change
  React.useEffect(() => {
    if (preselectedClinic) setClinic(preselectedClinic);
  }, [preselectedClinic]);

  React.useEffect(() => {
    if (preselectedService) setService(preselectedService);
  }, [preselectedService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim()) {
      toast.error("Please enter your name and phone number");
      return;
    }

    // Add to CMS
    addBooking({
      patientName,
      phone,
      clinic,
      service,
      preferredDate,
      preferredTimeSlot: timeSlot,
      notes,
    });

    // Generate WhatsApp text
    const message = `Hello Dr. Farhan,\n\nI would like to book a physiotherapy appointment:\n- *Patient:* ${patientName}\n- *Phone:* ${phone}\n- *Clinic:* ${clinic}\n- *Treatment/Service:* ${service}\n- *Preferred Date:* ${preferredDate}\n- *Preferred Slot:* ${timeSlot}${
      notes ? `\n- *Notes/Condition:* ${notes}` : ""
    }\n\nPlease confirm availability. Thank you!`;

    const cleanNumber = data.contact.whatsappNumber.replace(/[^0-9]/g, "");
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    setLastWhatsAppUrl(waUrl);
    setSubmitted(true);
    toast.success("Appointment request recorded successfully!");
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setPatientName("");
    setPhone("");
    setNotes("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleResetAndClose()}>
      <DialogContent className="max-w-lg rounded-2xl border-border/60 bg-background/95 p-6 backdrop-blur-xl sm:p-8">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Calendar className="h-4 w-4" /> Quick Consultation
          </div>
          <DialogTitle className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {submitted ? "Inquiry Confirmed!" : "Book an Appointment"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {submitted
              ? "Your appointment request has been recorded. You can also send this directly via WhatsApp for fastest confirmation."
              : "Select your preferred clinic, specialty treatment, and schedule. We'll confirm your slot promptly."}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="mt-4 space-y-6">
            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
              <h3 className="mt-3 font-display text-lg font-bold text-foreground">
                Thank you, {patientName}!
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Appointment requested for{" "}
                <span className="font-semibold text-foreground">{service}</span> at{" "}
                <span className="font-semibold text-foreground">{clinic}</span> on{" "}
                <span className="font-semibold text-foreground">{preferredDate}</span>.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                asChild
                className="w-full rounded-full bg-[#25D366] py-3.5 text-base font-bold text-white shadow-lg shadow-[#25D366]/30 hover:bg-[#1ebe5d]"
              >
                <a href={lastWhatsAppUrl} target="_blank" rel="noreferrer">
                  <FaWhatsapp className="mr-2 h-5 w-5" /> Send Confirmation on WhatsApp
                </a>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleResetAndClose}
                className="rounded-full"
              >
                Close & Return
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your Full Name *
                </label>
                <Input
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Phone Number *
                </label>
                <Input
                  required
                  placeholder="+92 3XX XXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> Clinic Location *
                </label>
                <select
                  value={clinic}
                  onChange={(e) => setClinic(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {[...data.clinics]
                    .sort((a, b) => (a.openHour ?? 0) - (b.openHour ?? 0))
                    .map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} ({c.hours})
                      </option>
                    ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Stethoscope className="h-3.5 w-3.5 text-primary" /> Service / Care *
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {data.services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5 text-primary" /> Preferred Date *
                </label>
                <Input
                  type="date"
                  required
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <Clock className="h-3.5 w-3.5 text-primary" /> Time Window *
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Morning (09:00 AM – 02:00 PM)">
                    Morning (09:00 AM – 02:00 PM) - Ali Medical Center
                  </option>
                  <option value="Afternoon (02:00 PM – 05:00 PM)">
                    Afternoon (02:00 PM – 05:00 PM) - Shahida Khaliq Hospital
                  </option>
                  <option value="Evening (05:00 PM – 08:00 PM)">
                    Evening (05:00 PM – 08:00 PM) - General Practice Hospital
                  </option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Brief Symptoms or Condition (Optional)
              </label>
              <Textarea
                placeholder="e.g. Knee pain when running, lower back stiffness in mornings..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="rounded-xl"
              />
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                className="w-full rounded-full bg-primary py-3.5 text-base font-semibold text-white shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-0.5"
              >
                <Send className="mr-2 h-4 w-4" /> Request Appointment Slot
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
