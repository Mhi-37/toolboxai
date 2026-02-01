/**
 * qr-code.js - Générateur de QR Code (Canvas, vanilla JS, sans dépendance)
 * Implémentation minimale basée sur le standard QR Code
 * Pour textes UTF-8, version 1 (21x21 modules)
 */
(function () {
    'use strict';

    // Convertit une string en octets UTF-8
    function toUTF8(str) {
        const bytes = [];
        for (let i = 0; i < str.length; i++) {
            const c = str.charCodeAt(i);
            if (c < 128) bytes.push(c);
            else if (c < 2048) bytes.push(192 | (c >> 6), 128 | (c & 63));
            else bytes.push(224 | (c >> 12), 128 | ((c >> 6) & 63), 128 | (c & 63));
        }
        return bytes;
    }

    // Génère le flux de bits pour l'encodage Byte (mode 4)
    function buildBitStream(str) {
        const bytes = toUTF8(str);
        const bits = [];
        bits.push(0, 1, 0, 0); // Mode Byte
        bits.push(...toBits(bytes.length, 8));
        bytes.forEach(b => bits.push(...toBits(b, 8)));
        bits.push(0, 0, 0, 0); // Terminateur
        while (bits.length % 8 !== 0) bits.push(0);
        while (bits.length < 152) bits.push(1, 1, 1, 0, 1, 1, 0, 0); // Padding
        return bits.slice(0, 152);
    }

    function toBits(n, len) {
        const out = [];
        for (let i = len - 1; i >= 0; i--) out.push((n >> i) & 1);
        return out;
    }

    // Place les bits en spirale dans la matrice (zone de données)
    function placeData(matrix, bits) {
        const n = 21;
        let idx = 0;
        const reserved = (r, c) => {
            if (r === 6 || c === 6) return true;
            if (r < 9 && c < 9) return true;
            if (r < 9 && c >= 12) return true;
            if (r >= 12 && c < 9) return true;
            return false;
        };

        let row = n - 1, col = n - 1;
        let goingUp = true;

        for (let i = 0; i < n * n; i++) {
            if (!reserved(row, col) && matrix[row][col] === -1) {
                matrix[row][col] = bits[idx] !== undefined ? bits[idx] : 0;
                idx++;
            }
            if (goingUp) {
                row--;
                if (row < 0) { row = 0; col -= 2; goingUp = false; if (col === 6) col--; }
            } else {
                row++;
                if (row >= n) { row = n - 1; col -= 2; goingUp = true; if (col === 6) col--; }
            }
        }
    }

    // Applique le masque (pattern 0 : (r+c) % 2 === 0)
    function applyMask(matrix) {
        const n = matrix.length;
        for (let r = 0; r < n; r++)
            for (let c = 0; c < n; c++)
                if (matrix[r][c] >= 0 && ((r + c) % 2 === 0))
                    matrix[r][c] ^= 1;
    }

    // Crée la matrice QR complète
    function createQRMatrix(text) {
        if (!text || text.length > 100) text = (text || '').substring(0, 100);
        const bits = buildBitStream(text);
        const n = 21;
        const matrix = Array(n).fill(0).map(() => Array(n).fill(-1));

        // Finder patterns
        const drawFinder = (r0, c0) => {
            for (let r = r0; r < r0 + 7; r++)
                for (let c = c0; c < c0 + 7; c++) {
                    if (r === r0 || r === r0 + 6 || c === c0 || c === c0 + 6 ||
                        (r >= r0 + 2 && r <= r0 + 4 && c >= c0 + 2 && c <= c0 + 4))
                        matrix[r][c] = 1;
                }
        };
        drawFinder(0, 0);
        drawFinder(0, 14);
        drawFinder(14, 0);

        // Timing
        for (let i = 8; i < 13; i++) matrix[6][i] = matrix[i][6] = (i - 8) % 2;

        placeData(matrix, bits);
        for (let r = 0; r < n; r++)
            for (let c = 0; c < n; c++)
                if (matrix[r][c] === -1) matrix[r][c] = 0;
        applyMask(matrix);
        return matrix;
    }

    function drawToCanvas(canvas, matrix, cellSize) {
        const n = matrix.length;
        const size = n * cellSize;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = '#000000';
        for (let r = 0; r < n; r++)
            for (let c = 0; c < n; c++)
                if (matrix[r][c] === 1)
                    ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
    }

    function init() {
        const form = document.getElementById('qr-form');
        const input = document.getElementById('qr-input');
        const sizeInput = document.getElementById('qr-size');
        const resultDiv = document.getElementById('qr-result');
        const canvas = document.getElementById('qr-canvas');
        const downloadBtn = document.getElementById('qr-download');

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const text = input.value.trim();
            if (!text) {
                alert('Entrez du contenu pour le QR code.');
                return;
            }
            const pixelSize = Math.min(512, Math.max(64, parseInt(sizeInput.value, 10) || 256));
            const cellSize = Math.max(2, Math.floor(pixelSize / 21));
            const matrix = createQRMatrix(text);
            drawToCanvas(canvas, matrix, cellSize);
            resultDiv.style.display = 'block';
            resultDiv.scrollIntoView({ behavior: 'smooth' });
        });

        downloadBtn.addEventListener('click', function () {
            const a = document.createElement('a');
            a.download = 'qrcode.png';
            a.href = canvas.toDataURL('image/png');
            a.click();
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
