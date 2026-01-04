let currentTab = 'html';
let codes = {
    html: '',
    css: '',
    js: ''
};

const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

function switchTab(tab) {
    // Simpan code lama
    codes[currentTab] = editor.value;
    
    // Ganti tab aktif
    currentTab = tab;
    
    // Update UI tombol
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-white', 'text-black', 'border-white');
        btn.classList.add('text-white/40', 'border-white/10');
    });
    
    const activeBtn = document.getElementById(`btn-${tab}`);
    activeBtn.classList.remove('text-white/40', 'border-white/10');
    activeBtn.classList.add('bg-white', 'text-black', 'border-white');
    
    // Update Editor
    editor.value = codes[tab];
    editor.placeholder = `// Write your ${tab.toUpperCase()} code here...`;
}

function updatePreview() {
    codes[currentTab] = editor.value;
    
    const combinedCode = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>${codes.css}</style>
        </head>
        <body style="margin:0;">
          ${codes.html}
          <script>${codes.js}<\/script>
        </body>
      </html>
    `;
    
    const blob = new Blob([combinedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    preview.src = url;
}

// Event Listeners
editor.addEventListener('input', updatePreview);

function handleClear() {
    editor.value = "";
    codes[currentTab] = "";
    updatePreview();
}

// PERBAIKAN DI SINI: alert() dihapus
async function handleCopy() {
    try {
        await navigator.clipboard.writeText(editor.value);
        
        // Opsional: Memberi feedback visual tanpa pop-up
        const copyBtn = document.querySelector('[onclick="handleCopy()"]');
        const originalContent = copyBtn.innerHTML;
        
        copyBtn.innerHTML = "Done!"; // Berubah jadi tulisan Done sementara
        setTimeout(() => {
            copyBtn.innerHTML = originalContent;
        }, 1500);

    } catch (err) {
        console.error('Failed to copy');
    }
}

function toggleExpand() {
    const editorSection = document.getElementById('editor-container');
    const previewSection = document.getElementById('preview-container');
    const closeBtn = document.getElementById('close-preview');
    
    if (editorSection.classList.contains('hidden')) {
        // Balik ke Normal
        editorSection.classList.remove('hidden');
        previewSection.classList.remove('fixed', 'inset-0', 'z-50');
        closeBtn.classList.add('hidden');
    } else {
        // Full Preview
        editorSection.classList.add('hidden');
        previewSection.classList.add('fixed', 'inset-0', 'z-50');
        closeBtn.classList.remove('hidden');
    }
}

// Jalankan preview pertama kali
updatePreview();
