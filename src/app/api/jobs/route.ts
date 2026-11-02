import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initialJobs, JobItem } from "@/data/jobs";

let memoryJobs: JobItem[] = [...initialJobs];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.toLowerCase() || "";
    const department = searchParams.get("department") || "ALL";
    const type = searchParams.get("type") || "ALL";
    const location = searchParams.get("location")?.toLowerCase() || "";

    if (prisma) {
      try {
        const dbJobs = await prisma.job.findMany({
          where: {
            isActive: true,
            ...(department !== "ALL" ? { department } : {}),
            ...(type !== "ALL" ? { type: type as any } : {}),
            ...(query
              ? {
                  OR: [
                    { title: { contains: query, mode: "insensitive" } },
                    { description: { contains: query, mode: "insensitive" } },
                    { company: { contains: query, mode: "insensitive" } },
                  ],
                }
              : {}),
            ...(location ? { location: { contains: location, mode: "insensitive" } } : {}),
          },
          orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        });

        if (dbJobs && dbJobs.length > 0) {
          return NextResponse.json({ source: "database", jobs: dbJobs });
        }
      } catch {
        // Fallback
      }
    }

    let filtered = memoryJobs.filter((job) => job.isActive !== false);

    if (query) {
      filtered = filtered.filter(
        (j) =>
          j.title.toLowerCase().includes(query) ||
          j.description.toLowerCase().includes(query) ||
          j.company.toLowerCase().includes(query)
      );
    }
    if (department !== "ALL") {
      filtered = filtered.filter((j) => j.department === department);
    }
    if (type !== "ALL") {
      filtered = filtered.filter((j) => j.type === type);
    }
    if (location) {
      filtered = filtered.filter((j) => j.location.toLowerCase().includes(location));
    }

    return NextResponse.json({ source: "memory", jobs: filtered });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      company,
      location,
      type,
      department,
      salary,
      experience,
      description,
      requirements,
      featured,
    } = body;

    if (!title || !company || !location || !description) {
      return NextResponse.json(
        { error: "Title, company, location, and description are required" },
        { status: 400 }
      );
    }

    const reqArray = Array.isArray(requirements)
      ? requirements
      : typeof requirements === "string"
      ? requirements.split("\n").filter((r) => r.trim().length > 0)
      : [];

    const newJob: JobItem = {
      id: `job-${Date.now()}`,
      title,
      company,
      location,
      type: type || "FULL_TIME",
      department: department || "General",
      salary: salary || "Competitive",
      experience: experience || "1+ year",
      description,
      requirements: reqArray,
      featured: Boolean(featured),
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    if (prisma) {
      try {
        const created = await prisma.job.create({
          data: {
            title: newJob.title,
            company: newJob.company,
            location: newJob.location,
            type: newJob.type as any,
            department: newJob.department,
            salary: newJob.salary,
            experience: newJob.experience,
            description: newJob.description,
            requirements: newJob.requirements,
            featured: newJob.featured ?? false,
            isActive: true,
          },
        });
        return NextResponse.json({ success: true, job: created }, { status: 201 });
      } catch {
        // Fallback
      }
    }

    memoryJobs.unshift(newJob);
    return NextResponse.json({ success: true, job: newJob }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create job posting" }, { status: 500 });
  }
}
