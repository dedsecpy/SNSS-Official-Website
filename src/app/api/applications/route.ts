import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.studentName || !body.dateOfBirth || !body.gradeAppliedFor || !body.guardianName || !body.contactPhone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const application = await prisma.admissionForm.create({
      data: {
        studentName: body.studentName,
        dateOfBirth: body.dateOfBirth,
        gradeAppliedFor: body.gradeAppliedFor,
        previousSchool: body.previousSchool || null,
        guardianName: body.guardianName,
        contactPhone: body.contactPhone,
      },
    });

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (error) {
    console.error('Admission submission error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
