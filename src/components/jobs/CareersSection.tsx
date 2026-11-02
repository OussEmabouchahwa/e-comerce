"use client";

import React, { useState, useEffect } from "react";
import {
  Briefcase,
  Search,
  MapPin,
  Clock,
  Euro,
  DollarSign,
  Filter,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  PlusCircle,
  Building,
  Layers,
  SlidersHorizontal,
  X
} from "lucide-react";
import { JobItem, ApplicationItem, ApplicationStatus, initialJobs, initialApplications } from "@/data/jobs";
import { ApplyModal } from "./ApplyModal";
import { PostJobModal } from "./PostJobModal";
import { AdminPortal } from "./AdminPortal";

export function CareersSection() {
  const [jobs, setJobs] = useState<JobItem[]>(initialJobs);
  const [applications, setApplications] = useState<ApplicationItem[]>(initialApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");
  const [selectedLocation, setSelectedLocation] = useState("");

  const [selectedJobForApply, setSelectedJobForApply] = useState<JobItem | null>(null);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [showAdminView, setShowAdminView] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch jobs dynamically from Next.js API / PostgreSQL
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetch("/api/jobs");
        if (res.ok) {
          const data = await res.json();
          if (data.jobs && data.jobs.length > 0) {
            setJobs(data.jobs);
          }
        }

        const appRes = await fetch("/api/applications");
        if (appRes.ok) {
          const appData = await appRes.json();
          if (appData.applications) {
            setApplications(appData.applications);
          }
        }
      } catch (err) {
        console.error("Failed loading jobs:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleStatusChange = async (appId: string, newStatus: ApplicationStatus) => {
    // Optimistic UI update
    setApplications((prev) =>
      prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
    );

    try {
      await fetch("/api/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: appId, status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update application status:", err);
    }
  };

  const handleJobCreated = (newJob: JobItem) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  // Filter listings
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = selectedDept === "ALL" || job.department === selectedDept;
    const matchesType = selectedType === "ALL" || job.type === selectedType;
    const matchesLoc =
      !selectedLocation ||
      job.location.toLowerCase().includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesDept && matchesType && matchesLoc;
  });

  const departments = [
    "ALL",
    "Artisan Craftsmanship",
    "Engineering & Tech",
    "Design & Product",
    "Supply Chain",
    "Customer Success",
  ];

  return (
    <section id="careers" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Banner */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand px-3 py-1 rounded-full bg-brand/10">
              Careers & Artisan Portal
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-ink mt-3">
              Shape the Future of Handcrafted Luxury
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed text-base">
              From our heritage Porto workshop to our distributed engineering hubs, we are hiring shoemakers, software architects, and brand visionaries.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAdminView(!showAdminView)}
              className={`pop px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                showAdminView
                  ? "bg-ink text-white"
                  : "bg-white border border-slate-300 text-slate-700 hover:border-brand hover:text-brand"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              {showAdminView ? "Exit Admin Dashboard" : "Admin & Employer Portal"}
            </button>

            <button
              onClick={() => setIsPostJobOpen(true)}
              className="pop px-6 py-2.5 rounded-full bg-brand hover:bg-sky2 text-white text-xs font-bold flex items-center gap-2 shadow cursor-pointer transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Post Job
            </button>
          </div>
        </div>

        {/* Admin Dashboard toggle */}
        {showAdminView ? (
          <div className="mb-16">
            <AdminPortal
              jobs={jobs}
              applications={applications}
              onOpenPostJob={() => setIsPostJobOpen(true)}
              onStatusChange={handleStatusChange}
            />
          </div>
        ) : null}

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 mb-10 space-y-4">
          <div className="grid md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Search job title, skill (e.g. Next.js, Goodyear welt)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-sm rounded-full bg-tint border border-slate-200 outline-none focus:border-brand text-ink"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-ink cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Location filter */}
            <div className="md:col-span-4 relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="Location (e.g. Porto, Milan, Remote)..."
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-sm rounded-full bg-tint border border-slate-200 outline-none focus:border-brand text-ink"
              />
            </div>

            {/* Job Type dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded-full bg-tint border border-slate-200 outline-none focus:border-brand text-ink font-semibold"
              >
                <option value="ALL">All Employment Types</option>
                <option value="FULL_TIME">Full Time</option>
                <option value="REMOTE">Remote</option>
                <option value="CONTRACT">Contract</option>
                <option value="PART_TIME">Part Time</option>
              </select>
            </div>
          </div>

          {/* Department pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Department:
            </span>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedDept === dept
                    ? "bg-brand text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-ink"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 px-1">
          <span>
            Showing <strong>{filteredJobs.length}</strong> available career opportunities
          </span>
          {(searchTerm || selectedDept !== "ALL" || selectedType !== "ALL" || selectedLocation) && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedDept("ALL");
                setSelectedType("ALL");
                setSelectedLocation("");
              }}
              className="text-brand hover:underline font-semibold cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-slate-200">
              <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="font-serif text-xl font-bold text-ink">No matching roles found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try loosening your search keywords or browse other craftsmanship departments.
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                className={`p-6 sm:p-7 rounded-3xl bg-white border transition-all duration-200 hover:shadow-md ${
                  job.featured
                    ? "border-brand/40 ring-1 ring-brand/10 shadow-sm"
                    : "border-slate-200"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Job Details */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {job.department}
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-tint text-slate-600 border border-slate-200">
                        {job.type}
                      </span>
                      {job.featured && (
                        <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-butter text-ink flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-600" /> Featured Role
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Building className="w-3.5 h-3.5 text-slate-400" /> {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                      </span>
                      <span className="flex items-center gap-1 text-ink font-semibold">
                        <Euro className="w-3.5 h-3.5 text-brand" /> {job.salary}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" /> Exp: {job.experience}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed pt-2 max-w-3xl">
                      {job.description}
                    </p>

                    {/* Requirements checklist */}
                    {job.requirements && job.requirements.length > 0 && (
                      <div className="pt-3">
                        <p className="text-xs font-bold text-slate-900 mb-2">Key Competencies:</p>
                        <div className="grid sm:grid-cols-2 gap-2 text-xs text-slate-600">
                          {job.requirements.map((req, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="lg:text-right shrink-0">
                    <button
                      onClick={() => setSelectedJobForApply(job)}
                      className="pop inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 rounded-full bg-ink hover:bg-brand text-white font-bold text-xs shadow cursor-pointer transition-colors"
                    >
                      Apply for Position <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[11px] text-slate-400 mt-2 text-center lg:text-right">
                      Fast 3-day review cycle
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Application Workflow Modal */}
      {selectedJobForApply && (
        <ApplyModal
          job={selectedJobForApply}
          isOpen={!!selectedJobForApply}
          onClose={() => setSelectedJobForApply(null)}
          onSuccess={() => {
            // Refresh applications list
            fetch("/api/applications")
              .then((r) => r.json())
              .then((d) => d.applications && setApplications(d.applications));
          }}
        />
      )}

      {/* Post Job Modal */}
      <PostJobModal
        isOpen={isPostJobOpen}
        onClose={() => setIsPostJobOpen(false)}
        onJobCreated={handleJobCreated}
      />
    </section>
  );
}
