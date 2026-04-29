// === Embed Factory Domain Lock ===
(function() {
  const ALLOWED_HOST = 'mobifactory.pages.dev';
  
  // چیک کریں کہ یہ اصلی ڈومین ہے یا نہیں
  if (window.location.hostname !== ALLOWED_HOST) {
    // ایک خوبصورت بلاکنگ پیج دکھائیں
    document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes">
        <title>⚠️ Unauthorized Domain</title>
        <style>
          body { background: #0f0f0f; color: #f1f5f9; font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; text-align: center; }
          .box { max-width: 400px; padding: 30px; background: #1e1e2e; border: 1px solid #f87171; border-radius: 16px; }
          a { color: #38bdf8; text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="box">
          <h2>⚠️ This tool is locked</h2>
          <p>This embeddable tool can only be used on the official <strong>Embed Factory</strong> website.</p>
          <p style="margin-top: 20px; font-size: 14px;">👉 <a href="https://${ALLOWED_HOST}/">Open Original Tool</a></p>
        </div>
      </body>
      </html>
    `);
    document.close();
    throw new Error('Unauthorized domain — tool locked');
  }
})();
