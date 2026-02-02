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
        const size = parseInt(sizeInput.value, 10);

        if (!text) return;

        await QRCode.toCanvas(canvas, text, {
            width: size,
            margin: 2
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
