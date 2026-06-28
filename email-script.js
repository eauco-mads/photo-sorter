// ─────────────────────────────────────────────────────────────
//  Photo Organization System — Email Delivery Script
//  Paste this into script.google.com → Deploy as Web App
//  Instructions at the bottom of this file
// ─────────────────────────────────────────────────────────────

const SNAP_PDF_LINK  = 'https://drive.google.com/file/d/1eVezxvBbbswu6IqOFPVOge3Oc5aLdUjX/view';
const PHOTO_PDF_LINK = 'https://drive.google.com/file/d/1y4U6gvId1TEWqFZDvJB3Qn4wa1OGojWn/view';
const DESKTOP_LINK   = 'https://eauco-mads.github.io/photo-sorter/';
const YOUR_NAME      = 'Maddie';

function doPost(e) {
  try {
    const data   = JSON.parse(e.postData.contents);
    const email  = data.email;
    const action = data.action || 'delivery';
    if (!email) return respond(400, 'No email provided');

    if (action === 'waitlist') {
      notifyWaitlist(email);
    } else {
      sendDeliveryEmail(email);
    }
    return respond(200, 'sent');
  } catch(err) {
    return respond(500, err.message);
  }
}

function doGet(e) {
  // Lets you test by visiting the URL in a browser
  return respond(200, 'Script is running!');
}

function respond(code, msg) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: code, message: msg }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendDeliveryEmail(toEmail) {
  const subject = 'Your Photo Organization System is ready ✓';
  const html    = buildEmail();
  GmailApp.sendEmail(toEmail, subject, '', { htmlBody: html, name: YOUR_NAME });
}

function notifyWaitlist(email) {
  const subject = `New waitlist signup: ${email}`;
  const body    = `Someone joined the Google Photos Sorter waitlist!\n\nEmail: ${email}\n\nAdd them to your list for when it launches.`;
  GmailApp.sendEmail(Session.getActiveUser().getEmail(), subject, body);
}

function buildEmail() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Your downloads are ready</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 20px;">
<tr><td align="center">

  <!-- CARD -->
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

    <!-- HEADER -->
    <tr>
      <td style="background:#0a0a0a;padding:36px 40px;text-align:center;">
        <p style="margin:0 0 6px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;">Photo Organization System</p>
        <h1 style="margin:0;font-size:26px;font-weight:300;color:#ffffff;line-height:1.2;">Your downloads<br>are ready.</h1>
      </td>
    </tr>

    <!-- BODY -->
    <tr>
      <td style="padding:36px 40px;">
        <p style="margin:0 0 28px;font-size:15px;color:#555;line-height:1.7;">
          Everything is here — click any link to open or save it. Bookmark this email so you always have your downloads.
        </p>

        <!-- DOWNLOAD 1 -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border:1px solid #e8e8e8;border-radius:10px;margin-bottom:12px;">
          <tr>
            <td style="padding:20px 24px;">
              <p style="margin:0 0 2px;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:700;">Desktop · Mac &amp; PC · Chrome or Edge</p>
              <p style="margin:0 0 12px;font-size:15px;font-weight:600;color:#111;">Photo Sorter Tool</p>
              <p style="margin:0 0 16px;font-size:13px;color:#888;line-height:1.5;">One keypress per photo · files move instantly · customize folder names &amp; keys on the start screen</p>
              <a href="${DESKTOP_LINK}" style="display:inline-block;background:#0a0a0a;color:#ffffff;font-size:13px;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;">Open Tool →</a>
            </td>
          </tr>
        </table>

        <!-- DOWNLOAD 2 -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border:1px solid #e8e8e8;border-radius:10px;margin-bottom:12px;">
          <tr>
            <td style="padding:20px 24px;">
              <p style="margin:0 0 2px;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:700;">PDF Guide · Snapchat Edition</p>
              <p style="margin:0 0 12px;font-size:15px;font-weight:600;color:#111;">5-Minute Guide: Sort Your Snap Memories</p>
              <p style="margin:0 0 16px;font-size:13px;color:#888;line-height:1.5;">How to download your Memories directly to your computer, iPhone export steps, and the full folder system</p>
              <a href="${SNAP_PDF_LINK}" style="display:inline-block;background:#c9a84c;color:#000000;font-size:13px;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;">Download PDF →</a>
            </td>
          </tr>
        </table>

        <!-- DOWNLOAD 3 -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f8;border:1px solid #e8e8e8;border-radius:10px;margin-bottom:28px;">
          <tr>
            <td style="padding:20px 24px;">
              <p style="margin:0 0 2px;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#c9a84c;font-weight:700;">PDF Guide · Photographer Edition</p>
              <p style="margin:0 0 12px;font-size:15px;font-weight:600;color:#111;">5-Minute Guide: Cull &amp; Organize Your Shoots</p>
              <p style="margin:0 0 16px;font-size:13px;color:#888;line-height:1.5;">Import from SD card, iPhone, or hard drive. Default and custom folder systems. Sort everything in one session.</p>
              <a href="${PHOTO_PDF_LINK}" style="display:inline-block;background:#c9a84c;color:#000000;font-size:13px;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;">Download PDF →</a>
            </td>
          </tr>
        </table>

        <!-- QUICK KEYS -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border-radius:10px;margin-bottom:28px;">
          <tr>
            <td style="padding:20px 24px;">
              <p style="margin:0 0 14px;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#666;">Keyboard shortcuts</p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:3px 10px 3px 0;">
                    <span style="background:#1e1e1e;border:1px solid #333;border-radius:5px;padding:3px 10px;font-family:monospace;font-size:12px;color:#fff;display:inline-block;">T</span>
                    <span style="font-size:12px;color:#888;margin-left:6px;">Travel</span>
                  </td>
                  <td style="padding:3px 10px 3px 0;">
                    <span style="background:#1e1e1e;border:1px solid #333;border-radius:5px;padding:3px 10px;font-family:monospace;font-size:12px;color:#fff;display:inline-block;">S</span>
                    <span style="font-size:12px;color:#888;margin-left:6px;">Stock/Print</span>
                  </td>
                  <td style="padding:3px 10px 3px 0;">
                    <span style="background:#1e1e1e;border:1px solid #333;border-radius:5px;padding:3px 10px;font-family:monospace;font-size:12px;color:#fff;display:inline-block;">B</span>
                    <span style="font-size:12px;color:#888;margin-left:6px;">Best</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:3px 10px 3px 0;">
                    <span style="background:#1e1e1e;border:1px solid #333;border-radius:5px;padding:3px 10px;font-family:monospace;font-size:12px;color:#fff;display:inline-block;">A</span>
                    <span style="font-size:12px;color:#888;margin-left:6px;">Archive</span>
                  </td>
                  <td style="padding:3px 10px 3px 0;">
                    <span style="background:#1e1e1e;border:1px solid #333;border-radius:5px;padding:3px 10px;font-family:monospace;font-size:12px;color:#fff;display:inline-block;">→</span>
                    <span style="font-size:12px;color:#888;margin-left:6px;">Skip</span>
                  </td>
                  <td style="padding:3px 10px 3px 0;">
                    <span style="background:#1e1e1e;border:1px solid #333;border-radius:5px;padding:3px 10px;font-family:monospace;font-size:12px;color:#fff;display:inline-block;">U</span>
                    <span style="font-size:12px;color:#888;margin-left:6px;">Undo</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <p style="margin:0;font-size:13px;color:#aaa;line-height:1.7;">
          Questions? Just reply to this email — I'm a real person and I'll get back to you.<br>
          <strong style="color:#555;">— ${YOUR_NAME}</strong>
        </p>

      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td style="background:#f8f8f8;border-top:1px solid #ebebeb;padding:20px 40px;text-align:center;">
        <p style="margin:0;font-size:11px;color:#bbb;line-height:1.6;">
          Photo Organization System · You're receiving this because you requested your download links.<br>
          Questions? <a href="mailto:maddie@elevatealign.com" style="color:#999;">maddie@elevatealign.com</a>
        </p>
      </td>
    </tr>

  </table>

</td></tr>
</table>

</body>
</html>`;
}

/*
─────────────────────────────────────────────
  SETUP INSTRUCTIONS (5 minutes)
─────────────────────────────────────────────

1. Go to script.google.com (sign in with your Google account)
2. Click "New Project" → delete the existing code → paste this whole file
3. Click Save (name it "Photo Sorter Email")
4. Click Deploy → New Deployment
5. Type: Web App
6. Description: Photo Sorter Email v1
7. Execute as: Me
8. Who has access: Anyone
9. Click Deploy → copy the Web App URL
10. Send that URL to Claude and it goes straight into your thank-you page

That's it. Every time someone fills in their email on the thank-you page,
this script sends them a branded email from YOUR Gmail address automatically.
Free forever, no monthly fees, no third-party accounts.
─────────────────────────────────────────────
*/
