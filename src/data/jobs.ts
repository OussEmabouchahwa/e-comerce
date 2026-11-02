export type JobType = "FULL_TIME" | "PART_TIME" | "REMOTE" | "CONTRACT" | "INTERNSHIP";
export type ApplicationStatus = "PENDING" | "REVIEWING" | "INTERVIEW" | "ACCEPTED" | "REJECTED";
export type Role = "JOB_SEEKER" | "EMPLOYER" | "ADMIN";

export interface JobItem {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  department: string;
  salary: string;
  experience: string;
  description: string;
  requirements: string[];
  featured?: boolean;
  isActive?: boolean;
  createdAt?: string;
  employerId?: string;
}

export interface ApplicationItem {
  id: string;
  jobId: string;
  jobTitle?: string;
  company?: string;
  fullName: string;
  email: string;
  phone: string;
  resumeUrl?: string;
  portfolio?: string;
  coverLetter: string;
  experience: string;
  status: ApplicationStatus;
  createdAt: string;
}

export const initialJobs: JobItem[] = [
  {
    id: "job-1",
    title: "Senior Master Cobbler & Last Maker",
    company: "Marlow & Reed Atelier",
    location: "Porto, Portugal (Relocation Assistance)",
    type: "FULL_TIME",
    department: "Artisan Craftsmanship",
    salary: "€52,000 - €68,000 / yr",
    experience: "5+ years",
    description: "Lead our Porto hand-lasting workshop. You will shape wooden lasts, hand-welt vegetable-tanned hides, and mentor apprentice cordwainers in heritage Portuguese shoemaking techniques.",
    requirements: [
      "Mastery in Goodyear welting, Blake stitching, and bespoke wooden last shaping",
      "Deep understanding of Italian vegetable-tanned full-grain leather properties",
      "Passion for zero-plastic, resoleable sustainable footwear engineering",
      "Experience leading a team of artisan craftsmen"
    ],
    featured: true,
    isActive: true,
    createdAt: "2026-10-15T09:00:00Z"
  },
  {
    id: "job-2",
    title: "E-Commerce Full-Stack Engineer (Next.js & Prisma)",
    company: "Marlow & Reed HQ",
    location: "Remote (Europe & UK timezones)",
    type: "REMOTE",
    department: "Engineering & Tech",
    salary: "$90,000 - $125,000 / yr",
    experience: "3+ years",
    description: "Build the next iteration of Marlow & Reed's headless commerce platform. Optimize cart conversion, engineer high-throughput product feeds with PostgreSQL and Prisma, and deliver micro-interactions with Motion.",
    requirements: [
      "Strong proficiency in Next.js 15/16 App Router, TypeScript, and React 19",
      "Demonstrated backend skills with PostgreSQL, Prisma ORM, and caching strategies",
      "Experience with Tailwind CSS and performance profiling for core web vitals",
      "Familiarity with Stripe API and payment gateway integrations"
    ],
    featured: true,
    isActive: true,
    createdAt: "2026-10-20T11:30:00Z"
  },
  {
    id: "job-3",
    title: "Artisanal Footwear Product Designer",
    company: "Marlow & Reed Design Studio",
    location: "Milan, Italy / Hybrid",
    type: "FULL_TIME",
    department: "Design & Product",
    salary: "€60,000 - €75,000 / yr",
    experience: "4+ years",
    description: "Translate timeless silhouettes into modern luxury footwear. Collaborate closely with Tuscan tanneries and Porto makers to prototype new season sneakers, boots, and loafers.",
    requirements: [
      "Portfolio demonstrating luxury leather goods or footwear silhouettes",
      "Proficiency in 3D footwear rendering (Rhino, Modo, or Blender) and tech-packs",
      "Obsessive attention to tactile details, stitching gauges, and cork footbeds",
      "Fluent communication with Italian and Portuguese artisan tanneries"
    ],
    featured: false,
    isActive: true,
    createdAt: "2026-10-25T14:15:00Z"
  },
  {
    id: "job-4",
    title: "Global Supply Chain & Tannery Operations Manager",
    company: "Marlow & Reed Operations",
    location: "Florence, Italy",
    type: "CONTRACT",
    department: "Supply Chain",
    salary: "€55,000 - €70,000 / yr",
    experience: "3+ years",
    description: "Oversee direct relationships with certified vegetable tanneries across Tuscany and sustainable sole manufacturers in Portugal. Maintain strict ethical sourcing standards.",
    requirements: [
      "Proven track record in luxury fashion or footwear raw materials sourcing",
      "Experience in European transport logistics, customs, and carbon auditing",
      "Bilingual in English and Italian (Portuguese is a plus)",
      "Strong analytical mind and vendor contract negotiation skills"
    ],
    featured: false,
    isActive: true,
    createdAt: "2026-10-28T08:45:00Z"
  },
  {
    id: "job-5",
    title: "Customer Experience & Fit Concierge Lead",
    company: "Marlow & Reed Concierge",
    location: "Remote (Global)",
    type: "FULL_TIME",
    department: "Customer Success",
    salary: "$48,000 - $62,000 / yr",
    experience: "2+ years",
    description: "Help customers across the world discover their perfect fit, manage free 30-day wear-around returns, and advise footwear aficionados on leather care and patina longevity.",
    requirements: [
      "High empathy, impeccable written English, and warm conversational tone",
      "Deep interest in leather care, shoe lasts, sizing conversions, and resolutions",
      "Familiarity with modern CRM tools and help-desk omnichannel systems",
      "Availability across rotating European or US daytime windows"
    ],
    featured: false,
    isActive: true,
    createdAt: "2026-10-30T10:00:00Z"
  }
];

export const initialApplications: ApplicationItem[] = [
  {
    id: "app-101",
    jobId: "job-2",
    jobTitle: "E-Commerce Full-Stack Engineer (Next.js & Prisma)",
    company: "Marlow & Reed HQ",
    fullName: "Yassine Mansour",
    email: "yassine.mansour@example.com",
    phone: "+216 98 450 123",
    portfolio: "https://github.com/yassine-dev",
    coverLetter: "Experienced Next.js engineer with 4 years building e-commerce and SaaS platforms with Prisma and PostgreSQL. Passionate about craftsmanship and UI fidelity.",
    experience: "4 years",
    status: "INTERVIEW",
    createdAt: "2026-10-31T15:20:00Z"
  },
  {
    id: "app-102",
    jobId: "job-1",
    jobTitle: "Senior Master Cobbler & Last Maker",
    company: "Marlow & Reed Atelier",
    fullName: "Marco Silva",
    email: "marco.silva@cordwain.pt",
    phone: "+351 912 345 678",
    portfolio: "https://marcosilva-craft.pt",
    coverLetter: "Third-generation cobbler trained in Guimarães and Porto. Over 8 years specializing in hand-lasted vegetable leather shoes and Goodyear resoleable soles.",
    experience: "8 years",
    status: "REVIEWING",
    createdAt: "2026-11-01T09:40:00Z"
  }
];
