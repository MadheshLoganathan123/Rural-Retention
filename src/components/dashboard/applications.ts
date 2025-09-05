import { BookOpen, BarChart3, MapPin, Lightbulb, Users } from "lucide-react";

export interface Application {
  id: string;
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export const applications: Application[] = [
  {
    id: 'pedagogy',
    title: 'AI Pedagogy Library',
    url: 'https://v0-rural-teacher-resource-app.vercel.app/',
    icon: BookOpen,
    description: 'Access teaching resources and methodologies'
  },
  {
    id: 'feedback',
    title: 'Data Driven Feedback System',
    url: 'https://educator-lens.lovable.app',
    icon: BarChart3,
    description: 'Analyze student performance and feedback'
  },
  {
    id: 'travel',
    title: 'Teacher Travel & Safety Assistant',
    url: 'https://edupulse-6ddv6u.manus.space/',
    icon: MapPin,
    description: 'Plan safe educational trips and excursions'
  },
  {
    id: 'lesson',
    title: 'Local Context Generator',
    url: 'https://loclesson-boguev.manus.space/',
    icon: Lightbulb,
    description: 'Create contextually relevant lesson plans'
  },
  {
    id: 'classifier',
    title: 'AI Teacher Classifier',
    url: 'https://v0-teacher-classification-app-iota.vercel.app/',
    icon: Users,
    description: 'Classify and organize teaching resources'
  }
];
