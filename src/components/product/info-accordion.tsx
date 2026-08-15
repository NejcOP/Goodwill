import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product } from "@/lib/types";

export function InfoAccordion({ product }: { product: Product }) {
  const sections = [
    { title: "Opis", content: product.description },
    { title: "Materiali", content: product.materials },
    { title: "Nega", content: product.care },
    { title: "Dostava in vra\u010dila", content: product.shipping },
  ];

  return (
    <Accordion defaultValue={["Opis"]}>
      {sections.map((section) => (
        <AccordionItem key={section.title} value={section.title}>
          <AccordionTrigger className="font-serif text-base">
            {section.title}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {section.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
