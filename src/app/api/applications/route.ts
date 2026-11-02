import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { initialApplications, ApplicationItem, initialJobs } from "@/data/jobs";

let memoryApplications: ApplicationItem[] = [...initialApplications];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const jobId = searchParams.get("jobId");

    // Try Prisma DB first
    try {
      const dbApps = await prisma.application.findMany({
        where: {
          ...(status ? { status: status as any } : {}),
          ...(jobId ? { jobId } : {}),
        },
        include: {
          job: {
            select: { title: true, company: true },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      if (dbApps && dbApps.length > 0) {
        const formatted = dbApps.map((a) => ({
          ...a,
          jobTitle: a.job?.title,
          company: a.job?.company,
          createdAt: a.createdAt.toISOString(),
        }));
        return NextResponse.json({ source: "database", applications: formatted });
      }
    } catch {
      // Fallback to memory
    }

    let filtered = [...memoryApplications];
    if (status && status !== "ALL") {
      filtered = filtered.filter((a) => a.status === status);
    }
    if (jobId) {
      filtered = filtered.filter((a) => a.jobId === jobId);
    }

    return NextResponse.json({ source: "memory", applications: filtered });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { jobId, fullName, email, phone, portfolio, coverLetter, experience } = body;

    if (!jobId || !fullName || !email || !coverLetter) {
      return NextResponse.json(
        { error: "Full Name, Email, Job ID, and Cover Letter are required." },
        { status: 400 }
      );
    }

    const targetJob = initialJobs.find((j) => j.id === jobId);

    const newApp: ApplicationItem = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: targetJob?.title || "Artisan Position",
      company: targetJob?.company || "Marlow & Reed",
      fullName,
      email,
      phone: phone || "",
      portfolio: portfolio || "",
      coverLetter,
      experience: experience || "1-2 years",
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    // Try DB
    try {
      const created = await prisma.application.create({
        data: {
          jobId: newApp.jobId,
          fullName: newApp.fullName,
          email: newApp.email,
          phone: newApp.phone,
          portfolio: newApp.portfolio,
          coverLetter: newApp.coverLetter,
          experience: newApp.experience,
          status: "PENDING",
        },
      });
      return NextResponse.json({ success: true, application: created }, { status: 201 });
    } catch {
      memoryApplications.unshift(newApp);
      return NextResponse.json({ success: true, application: newApp }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Application submission failed" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ error: "ID and status are required" }, { status: 400 });
    }

    // Try DB
    try {
      const updated = await prisma.application.update({
        where: { id },
        data: { status: status as any },
      });
      return NextResponse.json({ success: true, application: updated });
    } catch {
      const found = memoryApplications.find((a) => a.id === id);
      if (found) {
        found.status = status;
        return NextResponse.json({ success: true, application: found });
      }
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
