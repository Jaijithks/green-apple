export interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Consultation",
    description: "We listen to your ideas and understand your needs.",
  },
  {
    stepNumber: "02",
    title: "Planning",
    description: "We plan every detail to bring your vision to life.",
  },
  {
    stepNumber: "03",
    title: "Execution",
    description: "We serve delicious food with care and perfection.",
  },
  {
    stepNumber: "04",
    title: "Enjoy",
    description: "Relax and enjoy your moments with great food.",
  },
];

export interface ValueProp {
  iconName: "Utensils" | "Calendar" | "ConciergeBell" | "Heart";
  title: string;
  subtitle: string;
}

export const valuePropsData: ValueProp[] = [
  {
    iconName: "Utensils",
    title: "Delicious Food",
    subtitle: "Hygiene to your food prepared with care.",
  },
  {
    iconName: "Calendar",
    title: "Every Occasion",
    subtitle: "Perfect for all types of events & celebrations.",
  },
  {
    iconName: "ConciergeBell",
    title: "Quality Service",
    subtitle: "Professional service you can rely on.",
  },
  {
    iconName: "Heart",
    title: "Memorable Moments",
    subtitle: "We make your moments truly unforgettable.",
  },
];
