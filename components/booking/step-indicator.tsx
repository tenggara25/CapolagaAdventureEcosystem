"use client";

import { Check, Home, Calendar, Sparkles, ShoppingCart, CreditCard, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Pilih Akomodasi", icon: Home },
  { id: 2, label: "Pilih Tanggal", icon: Calendar },
  { id: 3, label: "Add-on", icon: Sparkles },
  { id: 4, label: "Keranjang", icon: ShoppingCart },
  { id: 5, label: "Checkout", icon: CreditCard },
  { id: 6, label: "Konfirmasi", icon: CheckCircle },
];

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full py-4 overflow-x-auto">
      <div className="flex items-center justify-between min-w-[600px] px-4">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const Icon = step.icon;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                    isCompleted && "bg-primary border-primary text-primary-foreground",
                    isCurrent && "bg-primary/10 border-primary text-primary",
                    !isCompleted && !isCurrent && "bg-muted border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium text-center whitespace-nowrap",
                    isCurrent && "text-primary",
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
                    "flex-1 h-0.5 mx-2 mt-[-20px]",
                    currentStep > step.id ? "bg-primary" : "bg-muted-foreground/30"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
