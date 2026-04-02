"use client";

import { Check, Home, Calendar, Sparkles, ShoppingCart, CreditCard, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Akomodasi", icon: Home },
  { id: 2, label: "Tanggal", icon: Calendar },
  { id: 3, label: "Add-on", icon: Sparkles },
  { id: 4, label: "Keranjang", icon: ShoppingCart },
  { id: 5, label: "Checkout", icon: CreditCard },
  { id: 6, label: "Selesai", icon: CheckCircle },
];

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-0 sm:gap-2 w-full max-w-3xl px-2">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center gap-2 w-full">
                  <div
                    className={cn(
                      "relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300",
                      isCompleted && "bg-primary border-primary text-primary-foreground shadow-md",
                      isCurrent && "bg-primary/10 border-primary text-primary ring-4 ring-primary/20",
                      !isCompleted && !isCurrent && "bg-muted border-border text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={3} />
                    ) : (
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-[10px] sm:text-xs font-medium text-center transition-colors",
                      isCurrent && "text-primary font-semibold",
                      isCompleted && "text-primary",
                      !isCompleted && !isCurrent && "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 mx-1 sm:mx-2 -mt-6 transition-colors duration-300",
                      currentStep > step.id ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
