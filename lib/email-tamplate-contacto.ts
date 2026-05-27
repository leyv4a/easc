interface ContactTemplateProps {
  nombre: string;
  email: string;
  mensaje: string;
}

export function contactEmailTemplate({
  nombre,
  email,
  mensaje,
}: ContactTemplateProps) {
  return `
  <!DOCTYPE html>
  <html lang="es">
    <body style="
      margin:0;
      padding:40px 20px;
      background:#F4EFE7;
      font-family:Arial,sans-serif;
    ">

      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
      >
        <tr>
          <td align="center">

            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              style="
                max-width:700px;
                background:white;
                border-radius:28px;
                overflow:hidden;
              "
            >

              <!-- HEADER -->
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
                      width:240px;
                      max-width:100%;
                      margin-bottom:28px;
                    "
                  />

                  <p style="
                    margin:0;
                    color:#C8A97E;
                    letter-spacing:3px;
                    text-transform:uppercase;
                    font-size:12px;
                  ">
                    Nuevo mensaje
                  </p>

                  <h1 style="
                    margin:18px 0 0 0;
                    color:white;
                    font-size:38px;
                    line-height:1.2;
                  ">
                    Contacto General
                  </h1>

                </td>
              </tr>

              <!-- BODY -->
              <tr>
                <td style="padding:50px 40px;">

                  <p style="
                    margin:0;
                    color:#94A3B8;
                    font-size:12px;
                    letter-spacing:2px;
                    text-transform:uppercase;
                  ">
                    Visitante
                  </p>

                  <h2 style="
                    margin:12px 0 6px 0;
                    font-size:30px;
                    color:#0F172A;
                  ">
                    ${nombre}
                  </h2>

                  <p style="
                    margin:0;
                    color:#475569;
                    font-size:18px;
                  ">
                    ${email}
                  </p>

                  <div style="
                    margin-top:36px;
                    background:#F8FAFC;
                    border-radius:24px;
                    padding:32px;
                    line-height:1.9;
                    color:#334155;
                    font-size:16px;
                  ">
                    ${mensaje}
                  </div>

                  <div style="
                    margin-top:40px;
                  ">

                    <a
                      href="mailto:${email}"
                      style="
                        display:inline-block;
                        background:#00AEEF;
                        color:white;
                        text-decoration:none;
                        padding:18px 28px;
                        border-radius:999px;
                        font-weight:700;
                      "
                    >
                      Responder mensaje
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