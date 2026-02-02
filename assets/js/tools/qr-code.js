document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("qr-form");
    const input = document.getElementById("qr-input");
    const sizeInput = document.getElementById("qr-size");
    const canvas = document.getElementById("qr-canvas");
    const resultBox = document.getElementById("qr-result");
    const downloadBtn = document.getElementById("qr-download");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const text = input.value.trim();
        if (!text) return;

        const size = parseInt(sizeInput.value, 10);
        const dpr = window.devicePixelRatio || 1;

        canvas.width = size * dpr;
        canvas.height = size * dpr;
        canvas.style.width = size + "px";
        canvas.style.height = size + "px";

        const ctx = canvas.getContext("2d");
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        await QRCode.toCanvas(canvas, text, {
            width: size,
            margin: 4,          // ⭐ CRUCIAL POUR LE SCAN
            errorCorrectionLevel: "M", // meilleur équilibre
            color: {
                dark: "#000000",
                light: "#ffffff"
            }
        });

        resultBox.style.display = "block";
    });

    downloadBtn.addEventListener("click", () => {
        const link = document.createElement("a");
        link.download = "qrcode.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
});
