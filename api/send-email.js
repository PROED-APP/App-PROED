// Importamos la librería de Resend
import { Resend } from 'resend';

// Vercel usará la variable de entorno que configuramos antes
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Solo permitimos peticiones de tipo POST (enviar datos)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { studentName, type, description, parentEmail } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'Escuela <onboarding@resend.dev>', // Luego podrás usar tu propio dominio
      to: [parentEmail],
      subject: `Reporte Escolar: ${type} - ${studentName}`,
      html: `
        <div style="font-family: sans-serif; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #1754cf;">Notificación de Convivencia Escolar</h2>
          <p>Estimado representante,</p>
          <p>Se ha registrado una novedad sobre el alumno <strong>${studentName}</strong>:</p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #1754cf;">
            <p><strong>Tipo:</strong> ${type}</p>
            <p><strong>Detalle:</strong> ${description || 'Seguimiento de rutina.'}</p>
          </div>
          <p style="font-size: 12px; color: #666; margin-top: 20px;">
            Este es un mensaje automático del sistema de Gestión Escolar.
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
