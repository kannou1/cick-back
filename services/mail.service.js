const transporter = require('../config/mailer');

const getInitials = (name) =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

const formatDate = () =>
  new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

const sendContactEmail = async ({ name, email, company, message }) => {
  const initials = getInitials(name);
  const date = formatDate();

  return transporter.sendMail({
    from: `"CICK Website" <${process.env.EMAIL_USER}>`,
    to: 'info@marbre-kedhel.com',
    replyTo: email,
    subject: `New Inquiry — ${name}`,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>New Project Inquiry</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{background:#e8e4dc;font-family:Georgia,'Times New Roman',serif;padding:2rem 1rem}
  .shell{max-width:560px;margin:0 auto;background:#f5f2ec;border:1px solid #d4c9b0}

  /* Header */
  .hdr{background:#2c2b26;border-bottom:3px solid #b8924a}
  .hdr-top{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.75rem 1rem;border-bottom:1px solid rgba(184,146,74,0.2)}
  .brand{display:flex;align-items:center;gap:12px}
  .brand-icon{width:40px;height:40px;border:1.5px solid #b8924a;display:flex;align-items:center;justify-content:center}
  .brand-name-main{font-size:15px;font-weight:700;color:#f5f2ec;letter-spacing:0.1em;font-family:Georgia,serif;display:block}
  .brand-name-sub{font-size:9px;color:#b8924a;letter-spacing:0.12em;text-transform:uppercase;font-family:Arial,sans-serif;display:block;margin-top:2px}
  .badge{font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:#b8924a;border:1px solid rgba(184,146,74,0.4);padding:5px 12px;font-family:Arial,sans-serif;font-weight:500;white-space:nowrap}
  .hdr-hero{padding:1.5rem 1.75rem 1.75rem}
  .hdr-label{font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:#b8924a;margin-bottom:6px;font-family:Arial,sans-serif;font-weight:500}
  .hdr-hero h1{font-size:24px;font-weight:400;color:#f5f2ec;margin-bottom:6px;font-family:Georgia,serif}
  .hdr-hero p{font-size:12px;color:rgba(245,242,236,0.45);font-family:Arial,sans-serif;line-height:1.6}

  /* Body */
  .body{padding:1.75rem}
  .sender-card{display:flex;align-items:center;gap:14px;padding:1rem 1.25rem;background:#edeae1;border:1px solid #d4c9b0;border-left:3px solid #b8924a;margin-bottom:1.5rem}
  .avatar{width:44px;height:44px;background:#2c2b26;border:1.5px solid #b8924a;display:flex;align-items:center;justify-content:center;color:#b8924a;font-size:14px;font-weight:700;font-family:Georgia,serif;flex-shrink:0;letter-spacing:0.05em;text-align:center;line-height:44px}
  .sname{font-size:14px;color:#2c2b26;font-family:Georgia,serif}
  .smeta{font-size:11px;color:#8a7d65;margin-top:2px;font-family:Arial,sans-serif}

  /* Divider */
  .div-row{border-bottom:1px solid #d4c9b0;margin-bottom:1.5rem;padding-bottom:2px}
  .div-label{font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:#b8924a;font-family:Arial,sans-serif;font-weight:500;background:#f5f2ec;padding-right:10px;display:inline-block;position:relative;top:9px}

  /* Fields */
  .fields{margin-bottom:1.5rem;border-top:1px solid #d4c9b0}
  .field-row{display:flex;border-bottom:1px solid #e0dace}
  .field-key{width:110px;flex-shrink:0;padding:0.6rem 0.75rem 0.6rem 0;font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:#b8924a;font-family:Arial,sans-serif;font-weight:500;border-right:1px solid #d4c9b0}
  .field-val{padding:0.6rem 0 0.6rem 0.75rem;font-size:13px;color:#2c2b26;font-family:Arial,sans-serif}
  .field-val.gold{color:#8a6e35;font-weight:500}

  /* Message */
  .msg-label{font-size:9px;letter-spacing:0.18em;text-transform:uppercase;color:#b8924a;font-family:Arial,sans-serif;font-weight:500;margin-bottom:8px}
  .msg-body{background:#edeae1;border:1px solid #d4c9b0;border-left:3px solid #b8924a;padding:1rem 1.25rem;font-size:13px;line-height:1.75;color:#3a3830;font-family:Georgia,serif;font-style:italic;margin-bottom:1.75rem}

  /* CTA */
  .reply-btn{display:block;text-align:center;padding:0.9rem;background:#2c2b26;color:#b8924a;text-decoration:none;font-size:11px;font-weight:500;letter-spacing:0.18em;text-transform:uppercase;font-family:Arial,sans-serif;border:1px solid #b8924a}

  /* Footer */
  .ftr{background:#2c2b26;padding:1rem 1.75rem;border-top:1px solid rgba(184,146,74,0.25)}
  .ftr table{width:100%}
  .ftr-left{font-size:10px;color:rgba(245,242,236,0.35);font-family:Arial,sans-serif;line-height:1.7}
  .ftr-left strong{color:rgba(245,242,236,0.6);font-weight:500;display:block}
  .ftr-right{font-size:10px;color:rgba(184,146,74,0.6);font-family:Arial,sans-serif;text-align:right;line-height:1.7}
</style>
</head>
<body>
<div class="shell">

  <!-- HEADER -->
  <div class="hdr">
    <div class="hdr-top">
      <div class="brand">
        <div class="brand-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="4" width="7" height="7" stroke="#b8924a" stroke-width="1.2"/>
            <rect x="13" y="4" width="7" height="7" stroke="#b8924a" stroke-width="1.2"/>
            <rect x="4" y="13" width="7" height="7" stroke="#b8924a" stroke-width="1.2"/>
            <rect x="13" y="13" width="7" height="7" stroke="#b8924a" stroke-width="1.2"/>
          </svg>
        </div>
        <div>
          <span class="brand-name-main">CICK</span>
          <span class="brand-name-sub">Compagnie Industrielle des Céramiques du Kef</span>
        </div>
      </div>
      <div class="badge">New inquiry</div>
    </div>
    <div class="hdr-hero">
      <div class="hdr-label">Contact form submission</div>
      <h1>New Project Inquiry</h1>
      <p>A visitor has reached out through the contact form on cick.tn</p>
    </div>
  </div>

  <!-- BODY -->
  <div class="body">
    <div class="sender-card">
      <div class="avatar">${initials}</div>
      <div>
        <div class="sname">${name}</div>
        <div class="smeta">${email} &nbsp;·&nbsp; Reply-to configured</div>
      </div>
    </div>

    <div class="div-row">
      <span class="div-label">Details</span>
    </div>

    <div class="fields">
      <div class="field-row">
        <div class="field-key">Full name</div>
        <div class="field-val">${name}</div>
      </div>
      <div class="field-row">
        <div class="field-key">Email</div>
        <div class="field-val gold">${email}</div>
      </div>
      <div class="field-row">
        <div class="field-key">Company</div>
        <div class="field-val">${company || 'N/A'}</div>
      </div>
    </div>

    <div class="msg-label">Message</div>
    <div class="msg-body">&ldquo;${message}&rdquo;</div>

    <a href="mailto:${email}" class="reply-btn">Reply to ${name} &rarr;</a>
  </div>

  <!-- FOOTER -->
  <div class="ftr">
    <table>
      <tr>
        <td class="ftr-left">
          <strong>CICK &middot; cick.tn</strong>
          Zone Industrielle, Borj Cedria Ben Arous, Tunisia
        </td>
        <td class="ftr-right">
          dhiakannou1@gmail.com<br/>
          ${date}
        </td>
      </tr>
    </table>
  </div>

</div>
</body>
</html>`,
  });
};

module.exports = { sendContactEmail };