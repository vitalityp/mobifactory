// === ADE Smart Router ===
(function() {
    // صرف اصلی ڈومین پر چلے — Domain Lock کے ساتھ ہم آہنگ
    if (window.location.hostname !== 'mobifactory.pages.dev') return;

    // ہر ٹول کے لیے اگلے تجویز کردہ ٹول کا نقشہ
    const routeMap = {
        'contract-craft': { name: 'Invoice Generator', url: '/tools/invoice-generator.html', icon: '🧾', reason: 'Create a professional invoice for this contract' },
        'invoice-generator': { name: 'Tax Calculator', url: '/tools/tax-calculator.html', icon: '💰', reason: 'Estimate how much tax to reserve' },
        'tax-calculator': { name: 'Proposal Generator', url: '/tools/proposal-generator.html', icon: '📝', reason: 'Send a polished project proposal' },
        'proposal-generator': { name: 'Pricing Calculator', url: '/tools/pricing-calculator.html', icon: '💲', reason: 'Price your next project confidently' },
        'pricing-calculator': { name: 'Rate Optimizer', url: '/tools/rate-optimizer.html', icon: '⚡', reason: 'Find your ideal hourly rate' },
        'rate-optimizer': { name: 'Get Custom Tool', url: '/offer.html', icon: '✨', reason: 'Need a custom tool? Starting at $50' },
        'roast-bio': { name: 'Hacker Name Generator', url: '/tools/hacker-name.html', icon: '💻', reason: 'Get your hacker alias' },
        'hacker-name': { name: 'Fake iMessage Chat', url: '/tools/fake-chat.html', icon: '💬', reason: 'Create a prank screenshot' },
        'fake-chat': { name: 'ContractCraft', url: '/tools/contract-craft.html', icon: '📄', reason: 'Try our serious freelance tools' },
        'demand-scanner': { name: 'ContractCraft', url: '/tools/contract-craft.html', icon: '📄', reason: 'Start with a professional contract' }
    };

    // موجودہ صفحے کا پتہ لگائیں
    const currentPath = window.location.pathname;
    let currentToolId = null;

    // URL سے ٹول کا نام نکالیں (مثلاً /tools/contract-craft.html → contract-craft)
    const match = currentPath.match(/\/tools\/(.+)\.html/);
    if (match) {
        currentToolId = match[1];
    }

    if (!currentToolId || !routeMap[currentToolId]) return;

    const next = routeMap[currentToolId];

    // روٹر باکس کا HTML ڈھانچہ
    const routerHTML = `
        <div id="ade-router" style="margin-top: 20px; padding: 16px; background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px solid #38bdf8; border-radius: 16px; text-align: center; font-family: system-ui, sans-serif;">
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">🧠 Smart Router Suggests</p>
            <p style="margin: 0 0 12px 0; font-size: 14px; color: #e2e8f0;">${next.reason}</p>
            <a href="${next.url}" style="display: inline-block; background: #2563eb; color: white; font-weight: 600; padding: 10px 24px; border-radius: 9999px; text-decoration: none; font-size: 14px; transition: background 0.2s;">
                ${next.icon} Try ${next.name} →
            </a>
        </div>
    `;

    // روٹر کو صفحے میں شامل کریں — تول کے نتیجے کے بعد
    function injectRouter() {
        // اگر پہلے سے موجود ہے تو دوبارہ نہ ڈالیں
        if (document.getElementById('ade-router')) return;

        // زیادہ تر ٹولز میں ایک result area یا آخری بٹن کے بعد ڈالنے کی کوشش کریں
        const resultArea = document.querySelector('#resultArea, #contractArea, #invoiceArea, #proposalArea, #roastResult, #hackerResult');
        if (resultArea && resultArea.offsetParent !== null) {
            // نتیجہ ظاہر ہونے پر اس کے آخر میں روٹر ڈالیں
            resultArea.insertAdjacentHTML('beforeend', routerHTML);
        } else {
            // اگر کوئی خاص نتیجہ والا علاقہ نہیں ہے تو embed سیکشن سے پہلے ڈالیں
            const embedSection = document.querySelector('#embedCode');
            if (embedSection) {
                embedSection.closest('.mt-6, .text-center').insertAdjacentHTML('beforebegin', routerHTML);
            } else {
                // آخر میں body میں شامل کریں
                document.body.insertAdjacentHTML('beforeend', routerHTML);
            }
        }
    }

    // جب صفحہ لوڈ ہو جائے تو روٹر ڈالنے کی کوشش کریں
    window.addEventListener('DOMContentLoaded', function() {
        // کچھ ٹولز میں نتیجہ پہلے سے دکھتا ہے، جیسے fake-chat یا roast-bio
        const isStatic = ['fake-chat', 'demand-scanner'].includes(currentToolId);
        if (isStatic) {
            // فوراً دکھائیں
            injectRouter();
        } else {
            // دوسرے ٹولز میں جنریٹ بٹن کے بعد دکھائیں
            // MutationObserver سے دیکھیں گے کہ نتیجہ کب ظاہر ہو
            const targetNode = document.body;
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.addedNodes.length) {
                        const resultEl = document.querySelector('#resultArea, #contractArea, #invoiceArea, #proposalArea');
                        if (resultEl && resultEl.offsetParent !== null) {
                            injectRouter();
                            observer.disconnect();
                        }
                    }
                });
            });
            observer.observe(targetNode, { childList: true, subtree: true });
        }
    });
})();
