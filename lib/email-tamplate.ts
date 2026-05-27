interface EmailTemplateProps {
  nombre: string;
  negocio: string;
  categoria: string;
  telefono: string;
  email: string;
  mensaje?: string;
}

export function collaborationEmailTemplate({
  nombre,
  negocio,
  categoria,
  telefono,
  email,
  mensaje,
}: EmailTemplateProps) {
  return `
  <!DOCTYPE html>
  <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>

    <body style="
      margin:0;
      padding:0;
      background:#F3EFE7;
      font-family:Arial,sans-serif;
      color:#0B1E2D;
    ">

      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center" style="padding:40px 16px;">

            <table width="100%" cellpadding="0" cellspacing="0" style="
              max-width:680px;
              background:#ffffff;
              border-radius:28px;
              overflow:hidden;
            ">

              <!-- HERO -->
              <tr>
                <td style="
                  background:#0B1E2D;
                  padding:50px 40px;
                  text-align:center;
                ">

                  <img
                    src="http://escapateasancarlos.com/LOGO 1X1.png"
                    alt="Escápate a San Carlos"
                    style="
                      width:260px;
                      max-width:100%;
                      margin-bottom:30px;
                    "
                  />

                  <p style="
                    color:#C8A97E;
                    margin:0 0 12px 0;
                    letter-spacing:3px;
                    font-size:12px;
                    text-transform:uppercase;
                  ">
                    Nueva colaboración
                  </p>

                  <h1 style="
                    color:white;
                    margin:0;
                    font-size:38px;
                    line-height:1.2;
                    font-weight:700;
                  ">
                    ${negocio}
                  </h1>

                  <p style="
                    margin-top:16px;
                    color:rgba(255,255,255,0.72);
                    font-size:16px;
                  ">
                    Solicitud recibida desde Escápate a San Carlos
                  </p>

                </td>
              </tr>

              <!-- BODY -->
              <tr>
                <td style="padding:50px 40px;">

                  <!-- PERSONA -->
                  <div style="
                    padding-bottom:30px;
                    border-bottom:1px solid #EAEAEA;
                  ">

                    <p style="
                      margin:0;
                      color:#C8A97E;
                      font-size:12px;
                      letter-spacing:2px;
                      text-transform:uppercase;
                    ">
                      Contacto
                    </p>

                    <h2 style="
                      margin:10px 0 6px 0;
                      font-size:30px;
                      color:#0B1E2D;
                    ">
                      ${nombre}
                    </h2>

                    <p style="
                      margin:0;
                      color:#5B6573;
                      font-size:17px;
                    ">
                      ${categoria}
                    </p>

                  </div>

                  <!-- DATOS -->
                  <div style="
                    padding:30px 0;
                    border-bottom:1px solid #EAEAEA;
                  ">

                    <table width="100%" cellpadding="0" cellspacing="0">

                      <tr>
                        <td style="padding-bottom:16px;">

                          <p style="
                            margin:0 0 4px 0;
                            color:#94A3B8;
                            font-size:12px;
                            letter-spacing:1px;
                            text-transform:uppercase;
                          ">
                            Teléfono
                          </p>

                          <p style="
                            margin:0;
                            font-size:18px;
                            color:#0F172A;
                            font-weight:600;
                          ">
                            ${telefono}
                          </p>

                        </td>
                      </tr>

                      <tr>
                        <td>

                          <p style="
                            margin:0 0 4px 0;
                            color:#94A3B8;
                            font-size:12px;
                            letter-spacing:1px;
                            text-transform:uppercase;
                          ">
                            Correo electrónico
                          </p>

                          <p style="
                            margin:0;
                            font-size:18px;
                            color:#0F172A;
                            font-weight:600;
                          ">
                            ${email}
                          </p>

                        </td>
                      </tr>

                    </table>

                  </div>

                  <!-- MENSAJE -->
                  <div style="padding-top:35px;">

                    <p style="
                      margin:0 0 18px 0;
                      color:#C8A97E;
                      font-size:12px;
                      letter-spacing:2px;
                      text-transform:uppercase;
                    ">
                      Mensaje
                    </p>

                    <div style="
                      background:#F8FAFC;
                      border-radius:20px;
                      padding:28px;
                      line-height:1.9;
                      color:#334155;
                      font-size:16px;
                    ">
                      ${mensaje || "No se agregó mensaje."}
                    </div>

                  </div>

                  <!-- BOTON -->
                  <div style="
                    padding-top:40px;
                    text-align:center;
                  ">

                    <a
                      href="mailto:${email}"
                      style="
                        display:inline-block;
                        background:#00AEEF;
                        color:white;
                        text-decoration:none;
                        padding:16px 28px;
                        border-radius:999px;
                        font-weight:700;
                        font-size:15px;
                      "
                    >
                      Responder solicitud
                    </a>

                  </div>

                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>

    </body>
  </html>
  `;
}