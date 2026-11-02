"use client";

import React, { useState } from "react";
import { X, PlusCircle, Building2, MapPin, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { JobItem, JobType } from "@/data/jobs";

interface PostJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated?: (newJob: JobItem) => void;
}

export function PostJobModal({ isOpen, onClose, onJobCreated }: PostJobModalProps) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("Marlow & Reed Atelier");
  const [location, setLocation] = useState("Porto, Portugal / Hybrid");
  const [department, setDepartment] = useState("Artisan Craftsmanship");
  const [type, setType] = useState<JobType>("FULL_TIME");
  const [salary, setSalary] = useState("€45,000 - €60,000 / yr");
  const [experience, setExperience] = useState("3+ years");
  const [description, setDescription] = useState("");
  const [requirementsText, setRequirementsText] = useState("");
  const [featured, setFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage("");

    try {
      const requirements = requirementsText
        .split("\n")
        .map((r) => r.trim())
        .filter((r) => r.length > 0);

      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          company,
          location,
          department,
          type,
          salary,
          experience,
          description,
          requirements,
          featured,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to publish job");
      }

      const data = await res.json();
      setSuccess(true);
      if (onJobCreated) onJobCreated(data.job);
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to create job posting.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-ink transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-10 text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-ink">Job Opportunity Published!</h3>
            <p className="mt-2 text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
              Your opening for <strong>{title}</strong> is now live on the Marlow & Reed Careers Portal. Candidates can now submit applications directly.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 rounded-full bg-brand text-white font-bold text-sm hover:bg-sky2 transition-colors cursor-pointer"
            >
              View Listings
            </button>
          </div>
        ) : (
          <div>
            <div className="border-b border-slate-100 pb-4 mb-6">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-butter text-ink inline-flex items-center gap-1 mb-2">
                <PlusCircle className="w-3.5 h-3.5" /> Employer / Atelier Admin
              </span>
              <h3 className="font-serif text-2xl font-bold text-ink leading-snug">
                Post a New Career Opportunity
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Reach shoemakers, leather artisans, engineers, and brand builders across Europe & worldwide.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Master Sole Finisher"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-brand bg-slate-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hiring Unit / Company *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Marlow & Reed Atelier"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-brand bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Department *
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-brand bg-slate-50/50"
                  >
                    <option value="Artisan Craftsmanship">Artisan Craftsmanship</option>
                    <option value="Engineering & Tech">Engineering & Tech</option>
                    <option value="Design & Product">Design & Product</option>
                    <option value="Supply Chain">Supply Chain</option>
                    <option value="Customer Success">Customer Success</option>
                    <option value="Marketing & Brand">Marketing & Brand</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Employment Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as JobType)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-brand bg-slate-50/50"
                  >
                    <option value="FULL_TIME">Full Time</option>
                    <option value="REMOTE">Remote</option>
                    <option value="PART_TIME">Part Time</option>
                    <option value="CONTRACT">Contract</option>
                    <option value="INTERNSHIP">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="Porto, Portugal"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-brand bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Salary / Compensation
                  </label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="€45,000 - €60,000 / yr"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-brand bg-slate-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Required Experience
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. 3+ years"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-brand bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Role Description *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Detail the daily craftsmanship, tasks, and mission of this role..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-brand bg-slate-50/50 resize-y"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Key Requirements (One per line)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g.&#10;5+ years in Blake welt or Goodyear welting&#10;Knowledge of Tuscan vegetable hides"
                  value={requirementsText}
                  onChange={(e) => setRequirementsText(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 outline-none focus:border-brand bg-slate-50/50 resize-y"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded border-slate-300 text-brand focus:ring-brand"
                />
                <label htmlFor="featured-checkbox" className="text-xs text-slate-700 font-medium">
                  Mark as <strong>Featured Opportunity</strong> (pinned at top with distinctive gold badge)
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-full bg-ink hover:bg-brand text-white text-xs font-bold inline-flex items-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "Publishing..." : "Publish Job Opening"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
