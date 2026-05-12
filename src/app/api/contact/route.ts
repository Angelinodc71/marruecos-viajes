import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, people, dateOut, dateBack, tripType, prefs, itemName } = body;

    await resend.emails.send({
      from: "Marruecos Viajes <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `Nueva consulta de ${name}`,
      html: `
        <h2>Nueva solicitud de viaje</h2>
        ${itemName ? `<p><strong>Item de interés:</strong> ${itemName}</p>` : ""}
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone || "—"}</p>
        <p><strong>Personas:</strong> ${people}</p>
        <p><strong>Fecha de salida:</strong> ${dateOut || "—"}</p>
        <p><strong>Fecha de regreso:</strong> ${dateBack || "—"}</p>
        <p><strong>Tipo de viaje:</strong> ${tripType}</p>
        <p><strong>Preferencias:</strong> ${prefs || "—"}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}