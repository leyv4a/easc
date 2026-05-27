import { contactEmailTemplate } from "@/lib/email-tamplate-contacto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      nombre,
      email,
      mensaje,
    } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

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
      subject: `Nuevo mensaje de contacto - ${nombre}`,

      html: contactEmailTemplate({
        nombre,
        email,
        mensaje,
      }),
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error("ERROR CONTACTO:");
    console.error(error);

    return NextResponse.json(
      { error: "Error enviando correo" },
      { status: 500 }
    );
  }
}