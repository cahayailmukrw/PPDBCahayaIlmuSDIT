import { Router } from 'express';
import { prisma } from '../prisma.ts';
import { generateRegistrationNumber } from '../utils/generateRegistrationNumber.ts';
import { authMiddleware, AuthRequest } from '../middleware/authMiddleware.ts';

const router = Router();

router.post('/', async (req, res) => {
  const {
    fullName,
    nik,
    nisn,
    birthPlace,
    birthDate,
    gender,
    religion,
    address,
    originSchool,
    siblingOrder,
    siblingCount,
    programChoice,
    fatherName,
    motherName,
    fatherJob,
    motherJob,
    income,
    phone,
    email,
    parentAddress,
    documents
  } = req.body;

  const registrationNo = generateRegistrationNumber();
  const parent = await prisma.parent.create({
    data: {
      fatherName,
      motherName,
      fatherJob,
      motherJob,
      income,
      phone,
      email,
      address: parentAddress
    }
  });

  const student = await prisma.student.create({
    data: {
      fullName,
      nik,
      nisn,
      birthPlace,
      birthDate: new Date(birthDate),
      gender,
      religion,
      address,
      originSchool,
      siblingOrder: Number(siblingOrder),
      siblingCount: Number(siblingCount),
      programChoice,
      parentId: parent.id
    }
  });

  await prisma.registration.create({
    data: {
      registrationNo,
      studentId: student.id
    }
  });

  if (Array.isArray(documents)) {
    await prisma.document.createMany({
      data: documents.map((item) => ({
        fileName: item.fileName,
        filePath: item.filePath,
        fileType: item.fileType,
        studentId: student.id
      }))
    });
  }

  return res.status(201).json({ registrationNo, status: 'PENDING' });
});

router.get('/', authMiddleware, async (req: AuthRequest, res) => {
  const { status, search } = req.query;
  const filters: any = {};

  if (status) filters.status = status;
  if (search) {
    filters.OR = [
      { fullName: { contains: String(search), mode: 'insensitive' } },
      { nik: { contains: String(search), mode: 'insensitive' } },
      { nisn: { contains: String(search), mode: 'insensitive' } }
    ];
  }

  const students = await prisma.student.findMany({
    where: filters,
    include: { parent: true, registration: true, documents: true }
  });
  res.json(students);
});

router.patch('/:id/verify', authMiddleware, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { verified, note, status } = req.body;

  const registration = await prisma.registration.update({
    where: { id },
    data: {
      verified: Boolean(verified),
      verificationNote: note,
      student: { update: { status: status ?? (verified ? 'VERIFIED' : 'PENDING') as any } }
    },
    include: { student: true }
  });

  res.json(registration);
});

router.get('/check', async (req, res) => {
  const { registrationNo, birthDate } = req.query;
  if (!registrationNo || !birthDate) return res.status(400).json({ message: 'Nomor pendaftaran dan tanggal lahir diperlukan' });

  const registration = await prisma.registration.findUnique({
    where: { registrationNo: String(registrationNo) },
    include: { student: true }
  });
  if (!registration) return res.status(404).json({ message: 'Data tidak ditemukan' });

  const isMatch = registration.student.birthDate.toISOString().slice(0, 10) === String(birthDate);
  if (!isMatch) return res.status(401).json({ message: 'Data tidak cocok' });

  return res.json({ status: registration.student.status, registrationNo, fullName: registration.student.fullName });
});

export default router;
