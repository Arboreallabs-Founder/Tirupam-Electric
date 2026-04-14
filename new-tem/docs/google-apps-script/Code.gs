/**
 * Tem Motorrs — Website form handler
 * Deploy as Web App: Execute as Me, Who has access: Anyone
 *
 * Set SHEET_ID, SECRET, TEAM_EMAIL below. SECRET must match FORMS_WEBHOOK_SECRET in .env.local
 */

var SHEET_ID = 'PASTE_YOUR_SPREADSHEET_ID_HERE';
var SECRET = 'PASTE_SAME_SECRET_AS_ENV_FORMS_WEBHOOK_SECRET';
var TEAM_EMAIL = 'finance@temmotorrs.com';

function doPost(e) {
  try {
    if (!e.postData || !e.postData.contents) {
      return jsonOut({ ok: false, error: 'No body' });
    }
    var data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) {
      return jsonOut({ ok: false, error: 'Unauthorized' });
    }

    var ss = SpreadsheetApp.openById(SHEET_ID);
    var ts = new Date();

    if (data.form === 'contact') {
      var shC = ss.getSheetByName('Contact');
      if (!shC) {
        shC = ss.insertSheet('Contact');
      }
      if (shC.getLastRow() === 0) {
        shC.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message']);
      }
      shC.appendRow([ts, data.name, data.email, data.subject, data.message]);

      MailApp.sendEmail(
        TEAM_EMAIL,
        '[Website] Contact: ' + data.subject,
        formatContact(data)
      );
      MailApp.sendEmail(
        data.email,
        'We received your message — Tem Motorrs',
        'Hi ' + data.name + ',\n\nThank you for contacting Tem Motorrs. We typically respond within 24 hours.\n\n---\nYour message:\n' + data.message + '\n---\n\n— Tem Motorrs'
      );
    } else if (data.form === 'preorder') {
      var shP = ss.getSheetByName('PreOrder');
      if (!shP) {
        shP = ss.insertSheet('PreOrder');
      }
      if (shP.getLastRow() === 0) {
        shP.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'City']);
      }
      shP.appendRow([ts, data.name, data.email, data.phone, data.city]);

      MailApp.sendEmail(
        TEAM_EMAIL,
        '[Website] New pre-order request',
        formatPreorder(data)
      );
      MailApp.sendEmail(
        data.email,
        'Pre-order request received — Tem Motorrs',
        'Hi ' + data.name + ',\n\nThanks for your interest in the TEM Electric. Our team will contact you soon using your email or phone.\n\n— Tem Motorrs'
      );
    } else {
      return jsonOut({ ok: false, error: 'Unknown form' });
    }

    return jsonOut({ ok: true });
  } catch (err) {
    return jsonOut({ ok: false, error: err.message || 'Server error' });
  }
}

function jsonOut(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function formatContact(d) {
  return (
    'New contact form submission\n\n' +
    'Name: ' +
    d.name +
    '\nEmail: ' +
    d.email +
    '\nSubject: ' +
    d.subject +
    '\n\nMessage:\n' +
    d.message
  );
}

function formatPreorder(d) {
  return (
    'New pre-order request\n\n' +
    'Name: ' +
    d.name +
    '\nEmail: ' +
    d.email +
    '\nPhone: ' +
    d.phone +
    '\nCity: ' +
    d.city
  );
}
