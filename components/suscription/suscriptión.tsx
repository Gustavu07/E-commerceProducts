"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export default function Suscription() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");

      setTimeout(() => setIsSuccess(false), 3000);
    }, 1000);
  };

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          suscríbete ahora para obtener un 20% de descuento
        </h2>
        <p className="text-gray-600 mb-8">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="email"
              placeholder="Enter your email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="pl-10 h-12 text-base"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 h-12 whitespace-nowrap"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>

        {isSuccess && (
          <p className="mt-4 text-green-600 font-medium">
            ✓ Successfully subscribed!
          </p>
        )}
      </div>
    </section>
  );
}