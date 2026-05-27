import { collaborationEmailTemplate } from "@/lib/email-tamplate";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";


export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nombre,
      negocio,
      categoria,
      telefono,
      email,
      mensaje,
    } = body;

    // Validación básica
    if (
      !nombre ||
      !negocio ||
      !categoria ||
      !telefono ||
      !email
    ) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }
    console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Escápate a San Carlos" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Nueva solicitud de colaboración - ${negocio}`,
      html: collaborationEmailTemplate({
  nombre,
  negocio,
  categoria,
  telefono,
  email,
  mensaje,
}),
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
   console.error("ERROR EMAIL:");
console.error(error);

    return NextResponse.json(
      { error: "Error enviando correo" },
      { status: 500 }
    );
  }
}