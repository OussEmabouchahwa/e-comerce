"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Users,
  FileCheck,
  CheckCircle,
  XCircle,
  Clock,
  Sparkles,
  ExternalLink,
  Phone,
  Mail,
  FolderOpen
} from "lucide-react";
import { JobItem, ApplicationItem, ApplicationStatus } from "@/data/jobs";

interface AdminPortalProps {
  jobs: JobItem[];
  applications: ApplicationItem[];
  onOpenPostJob: () => void;
  onStatusChange: (appId: string, newStatus: ApplicationStatus) => void;
}

export function AdminPortal({
  jobs,
  applications,
  onOpenPostJob,
  onStatusChange,
}: AdminPortalProps) {
  const [activeTab, setActiveTab] = useState<"applications" | "jobs" | "overview">("overview");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const pendingCount = applications.filter((a) => a.status === "PENDING").length;
  const interviewingCount = applications.filter((a) => a.status === "INTERVIEW").length;
  const acceptedCount = applications.filter((a) => a.status === "ACCEPTED").length;

  const filteredApps =
    filterStatus === "ALL"
      ? applications
      : applications.filter((a) => a.status === filterStatus);

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "REVIEWING":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "INTERVIEW":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "ACCEPTED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "REJECTED":
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      {/* Top Bar with Metrics */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand px-3 py-1 rounded-full bg-brand/10">
            Employer & Admin Command Center
          </span>
          <h3 className="font-serif text-3xl font-bold text-ink mt-2">
            Marlow & Reed Talent Management
          </h3>
          <p className="text-slate-500 text-xs mt-1">
            Connected to PostgreSQL schema (User, Job, Application) & Prisma ORM
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenPostJob}
            className="pop inline-flex items-center gap-2 bg-brand hover:bg-sky2 text-white font-bold text-xs px-5 py-2.5 rounded-full shadow cursor-pointer transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" /> Post New Job
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
        <div className="p-4 rounded-2xl bg-tint border border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Live Postings</span>
            <Briefcase className="w-4 h-4 text-brand" />
          </div>
          <p className="font-serif text-2xl font-bold text-ink mt-2">{jobs.length}</p>
          <span className="text-[11px] text-emerald-600 font-medium">Active in atelier</span>
        </div>

        <div className="p-4 rounded-2xl bg-tint border border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Applicants</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-ink mt-2">{applications.length}</p>
          <span className="text-[11px] text-purple-600 font-medium">Shoemakers & tech</span>
        </div>

        <div className="p-4 rounded-2xl bg-tint border border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Pending Review</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="font-serif text-2xl font-bold text-ink mt-2">{pendingCount}</p>
          <span className="text-[11px] text-amber-600 font-medium">Awaiting decision</span>
        </div>

        <div className="p-4 rounded-2xl bg-tint border border-slate-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">In Interview</span>
            <FileCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-ink mt-2">{interviewingCount}</p>
          <span className="text-[11px] text-emerald-600 font-medium">{acceptedCount} Hired</span>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="flex items-center gap-2 border-b border-slate-100 mb-6 pb-2 text-xs font-bold">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 rounded-full transition-colors cursor-pointer ${
            activeTab === "overview"
              ? "bg-ink text-white"
              : "text-slate-600 hover:text-ink hover:bg-slate-100"
          }`}
        >
          Overview & Quick Actions
        </button>
        <button
          onClick={() => setActiveTab("applications")}
          className={`px-4 py-2 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === "applications"
              ? "bg-ink text-white"
              : "text-slate-600 hover:text-ink hover:bg-slate-100"
          }`}
        >
          Applications Pipeline
          <span className="w-4 h-4 rounded-full bg-brand text-white text-[10px] grid place-items-center font-normal">
            {applications.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("jobs")}
          className={`px-4 py-2 rounded-full transition-colors cursor-pointer ${
            activeTab === "jobs"
              ? "bg-ink text-white"
              : "text-slate-600 hover:text-ink hover:bg-slate-100"
          }`}
        >
          Active Job Listings ({jobs.length})
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-tint border border-slate-100">
              <h4 className="font-serif text-lg font-bold text-ink">Recent Candidates</h4>
              <p className="text-xs text-slate-500 mt-1 mb-4">Latest incoming artisan talent</p>
              <div className="space-y-3">
                {applications.slice(0, 3).map((app) => (
                  <div
                    key={app.id}
                    className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-ink">{app.fullName}</p>
                      <p className="text-[11px] text-slate-500">{app.jobTitle}</p>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-tint border border-slate-100">
              <h4 className="font-serif text-lg font-bold text-ink">Department Distribution</h4>
              <p className="text-xs text-slate-500 mt-1 mb-4">Active vacancies across brand divisions</p>
              <div className="space-y-2.5">
                {[
                  { name: "Artisan Craftsmanship", count: 2, color: "bg-butter" },
                  { name: "Engineering & Tech", count: 1, color: "bg-brand" },
                  { name: "Design & Product", count: 1, color: "bg-aqua" },
                  { name: "Supply Chain", count: 1, color: "bg-sky2" },
                ].map((dept) => (
                  <div key={dept.name} className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700">{dept.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200 font-bold text-ink">
                      {dept.count} openings
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Applications Workflow Pipeline */}
      {activeTab === "applications" && (
        <div>
          {/* Status Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-4 pb-3 border-b border-slate-100">
            <span className="text-xs text-slate-500 mr-2">Filter by workflow:</span>
            {["ALL", "PENDING", "REVIEWING", "INTERVIEW", "ACCEPTED", "REJECTED"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                  filterStatus === st
                    ? "bg-brand text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredApps.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <FolderOpen className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                <p className="text-sm">No candidates in this pipeline stage.</p>
              </div>
            ) : (
              filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl bg-tint border border-slate-200/80 hover:border-slate-300 transition-colors"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-lg font-bold text-ink">{app.fullName}</h4>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                      </div>
                      <p className="text-xs text-brand font-semibold mt-0.5">
                        Applied for: {app.jobTitle}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                        <span className="inline-flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" /> {app.email}
                        </span>
                        {app.phone && (
                          <span className="inline-flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5" /> {app.phone}
                          </span>
                        )}
                        <span>Experience: {app.experience}</span>
                      </div>
                    </div>

                    {/* Status updater dropdown buttons */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => onStatusChange(app.id, "REVIEWING")}
                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-sky-300 text-sky-700 hover:bg-sky-50 transition-colors cursor-pointer"
                      >
                        Reviewing
                      </button>
                      <button
                        onClick={() => onStatusChange(app.id, "INTERVIEW")}
                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-purple-300 text-purple-700 hover:bg-purple-50 transition-colors cursor-pointer"
                      >
                        Interview
                      </button>
                      <button
                        onClick={() => onStatusChange(app.id, "ACCEPTED")}
                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-emerald-300 text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <CheckCircle className="w-3 h-3" /> Hire
                      </button>
                      <button
                        onClick={() => onStatusChange(app.id, "REJECTED")}
                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg border border-slate-300 text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <XCircle className="w-3 h-3" /> Decline
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 bg-white p-3 rounded-xl text-xs text-slate-700 leading-relaxed">
                    <p className="font-semibold text-slate-900 mb-1">Candidate Note:</p>
                    {app.coverLetter}
                  </div>

                  {app.portfolio && (
                    <div className="mt-2 text-right">
                      <a
                        href={app.portfolio}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-brand hover:underline font-semibold"
                      >
                        View Portfolio / Profile <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Active Jobs List */}
      {activeTab === "jobs" && (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-4 rounded-2xl bg-tint border border-slate-200 flex flex-wrap items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-base font-bold text-ink">{job.title}</h4>
                  {job.featured && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-butter text-ink">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {job.department} • {job.location} • {job.salary} • {job.type}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
