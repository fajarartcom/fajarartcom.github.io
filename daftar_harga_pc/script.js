// Data komponen PC
let components = [
    { id: 1, name: 'Intel Core i5-12400F', category: 'processor', price: 2850000, stock: 15 },
    { id: 2, name: 'AMD Ryzen 5 5600X', category: 'processor', price: 3100000, stock: 8 },
    { id: 3, name: 'ASUS ROG Strix B550-F Gaming', category: 'motherboard', price: 3200000, stock: 5 },
    { id: 4, name: 'MSI B660M Mortar DDR4', category: 'motherboard', price: 2250000, stock: 10 },
    { id: 5, name: 'Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz', category: 'ram', price: 1200000, stock: 20 },
    { id: 6, name: 'Team T-Force Delta RGB 32GB (2x16GB) DDR4 3600MHz', category: 'ram', price: 2100000, stock: 12 },
    { id: 7, name: 'NVIDIA RTX 3060 Ti 8GB', category: 'vga', price: 6500000, stock: 3 },
    { id: 8, name: 'AMD Radeon RX 6700 XT 12GB', category: 'vga', price: 7200000, stock: 4 },
    { id: 9, name: 'Samsung 980 Pro 1TB NVMe SSD', category: 'storage', price: 2500000, stock: 7 },
    { id: 10, name: 'Seagate Barracuda 2TB HDD', category: 'storage', price: 850000, stock: 15 },
    { id: 11, name: 'Corsair RM750 80+ Gold', category: 'psu', price: 1800000, stock: 6 },
    { id: 12, name: 'FSP Hydro G Pro 850W 80+ Gold', category: 'psu', price: 2100000, stock: 4 },
    { id: 13, name: 'Lian Li PC-O11 Dynamic', category: 'case', price: 2500000, stock: 5 },
    { id: 14, name: 'NZXT H510 Flow', category: 'case', price: 1500000, stock: 8 }
];

// Fungsi untuk menampilkan komponen ke tabel
function renderComponents(componentsToRender = components) {
    const tableBody = document.getElementById('components-table');
    tableBody.innerHTML = '';
    
    componentsToRender.forEach((component, index) => {
        const row = document.createElement('tr');
        row.className = `bg-white border-b component-row ${component.category}`;
        row.innerHTML = `
            <td class="px-6 py-4">${index + 1}</td>
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${component.name}</td>
            <td class="px-6 py-4">${getCategoryName(component.category)}</td>
            <td class="px-6 py-4 price-cell" data-price="${component.price}">${formatPrice(component.price)}</td>
            <td class="px-6 py-4 stock-cell">${component.stock}</td>
            <td class="px-6 py-4">
                <button class="edit-btn font-medium text-blue-600 hover:underline mr-3" data-id="${component.id}">Edit</button>
                <button class="delete-btn font-medium text-red-600 hover:underline" data-id="${component.id}">Hapus</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Tambahkan event listener untuk tombol edit
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            openEditModal(id);
        });
    });
    
    // Tambahkan event listener untuk tombol hapus
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            deleteComponent(id);
        });
    });
}

// Fungsi untuk mendapatkan nama kategori yang lebih baik
function getCategoryName(category) {
    const categoryNames = {
        'processor': 'Processor',
        'motherboard': 'Motherboard',
        'ram': 'RAM',
        'vga': 'VGA',
        'storage': 'Storage',
        'psu': 'Power Supply',
        'case': 'Casing'
    };
    return categoryNames[category] || category;
}

// Fungsi untuk memformat harga ke format Rupiah
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
}

// Fungsi untuk membuka modal edit
function openEditModal(id) {
    const component = components.find(c => c.id === id);
    if (!component) return;
    
    document.getElementById('edit-id').value = component.id;
    document.getElementById('edit-name').value = component.name;
    document.getElementById('edit-price').value = component.price;
    document.getElementById('edit-stock').value = component.stock;
    
    // Tampilkan modal
    const modal = new Flowbite.Modal(document.getElementById('edit-modal'));
    modal.show();
}

// Fungsi untuk menyimpan perubahan harga
document.getElementById('save-edit').addEventListener('click', (e) => {
    e.preventDefault();
    
    const id = parseInt(document.getElementById('edit-id').value);
    const newPrice = parseInt(document.getElementById('edit-price').value);
    const newStock = parseInt(document.getElementById('edit-stock').value);
    
    if (isNaN(newPrice) || isNaN(newStock)) {
        alert('Harap masukkan harga dan stok yang valid');
        return;
    }
    
    const index = components.findIndex(c => c.id === id);
    if (index !== -1) {
        components[index].price = newPrice;
        components[index].stock = newStock;
        renderComponents();
        
        // Tutup modal
        const modal = new Flowbite.Modal(document.getElementById('edit-modal'));
        modal.hide();
    }
});

// Fungsi untuk menghapus komponen
function deleteComponent(id) {
    if (confirm('Apakah Anda yakin ingin menghapus komponen ini?')) {
        components = components.filter(c => c.id !== id);
        renderComponents();
    }
}

// Fungsi untuk update semua harga dengan perubahan acak (simulasi perubahan harga)
function updateAllPrices() {
    components = components.map(component => {
        // Buat perubahan harga acak antara -10% sampai +10%
        const changePercent = (Math.random() * 0.2 - 0.1); // -0.1 sampai 0.1
        const newPrice = Math.round(component.price * (1 + changePercent));
        
        // Juga update stok secara acak
        const stockChange = Math.floor(Math.random() * 5) - 2; // -2 sampai +2
        let newStock = component.stock + stockChange;
        newStock = Math.max(0, newStock); // Pastikan stok tidak negatif
        
        return {
            ...component,
            price: newPrice,
            stock: newStock
        };
    });
    
    renderComponents();
    
    // Animasi perubahan harga
    document.querySelectorAll('.price-cell').forEach(cell => {
        cell.classList.add('price-change');
        setTimeout(() => {
            cell.classList.remove('price-change');
        }, 1000);
    });
}

// Filter berdasarkan kategori
document.getElementById('category-filter').addEventListener('change', (e) => {
    const category = e.target.value;
    if (category === 'all') {
        renderComponents();
    } else {
        const filtered = components.filter(c => c.category === category);
        renderComponents(filtered);
    }
});

// Fungsi pencarian
document.getElementById('search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = components.filter(c => 
        c.name.toLowerCase().includes(searchTerm) || 
        getCategoryName(c.category).toLowerCase().includes(searchTerm)
    );
    renderComponents(filtered);
});

// Tombol update semua harga
document.getElementById('update-prices').addEventListener('click', updateAllPrices);

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    renderComponents();
});
// Variabel untuk simulasi rakitan
let selectedComponents = [];
let savedBuilds = JSON.parse(localStorage.getItem('savedBuilds')) || [];

// Fungsi untuk menambahkan komponen ke simulasi rakitan
function addToBuild(id) {
    const component = components.find(c => c.id === id);
    if (!component) return;
    
    // Cek apakah komponen sudah ada di rakitan
    const existingIndex = selectedComponents.findIndex(c => c.id === id);
    
    if (existingIndex !== -1) {
        // Jika sudah ada, tambahkan jumlahnya
        selectedComponents[existingIndex].quantity += 1;
    } else {
        // Jika belum ada, tambahkan komponen baru
        selectedComponents.push({
            ...component,
            quantity: 1
        });
    }
    
    renderSelectedComponents();
}

// Fungsi untuk menghapus komponen dari simulasi rakitan
function removeFromBuild(id) {
    selectedComponents = selectedComponents.filter(c => c.id !== id);
    renderSelectedComponents();
}

// Fungsi untuk menampilkan komponen yang dipilih
function renderSelectedComponents() {
    const container = document.getElementById('selected-components-list');
    const emptyMessage = document.getElementById('empty-message');
    const table = document.getElementById('selected-table');
    
    container.innerHTML = '';
    
    if (selectedComponents.length === 0) {
        emptyMessage.classList.remove('hidden');
        table.classList.add('hidden');
    } else {
        emptyMessage.classList.add('hidden');
        table.classList.remove('hidden');
        
        let total = 0;
        
        selectedComponents.forEach(component => {
            const row = document.createElement('tr');
            row.className = 'border-b';
            row.innerHTML = `
                <td class="py-2">${component.name} (${component.quantity})</td>
                <td class="text-right py-2">${formatPrice(component.price * component.quantity)}</td>
                <td class="text-right py-2">
                    <button class="remove-btn text-red-600 hover:text-red-800" data-id="${component.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </td>
            `;
            container.appendChild(row);
            
            total += component.price * component.quantity;
        });
        
        document.getElementById('total-price').textContent = formatPrice(total);
        document.getElementById('summary-total').textContent = formatPrice(total);
        document.getElementById('component-count').textContent = selectedComponents.reduce((sum, c) => sum + c.quantity, 0);
    }
    
    // Tambahkan event listener untuk tombol hapus
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            removeFromBuild(id);
        });
    });
}

// Fungsi untuk menyimpan rakitan
function saveBuild() {
    const buildName = document.getElementById('build-name').value.trim();
    
    if (!buildName) {
        alert('Harap beri nama untuk rakitan ini');
        return;
    }
    
    if (selectedComponents.length === 0) {
        alert('Tidak ada komponen dalam rakitan');
        return;
    }
    
    const newBuild = {
        id: Date.now(),
        name: buildName,
        components: [...selectedComponents],
        createdAt: new Date().toISOString()
    };
    
    savedBuilds.push(newBuild);
    localStorage.setItem('savedBuilds', JSON.stringify(savedBuilds));
    
    renderSavedBuilds();
    alert('Rakitan berhasil disimpan!');
}

// Fungsi untuk menampilkan rakitan tersimpan
function renderSavedBuilds() {
    const container = document.getElementById('saved-builds-list');
    container.innerHTML = '';
    
    if (savedBuilds.length === 0) {
        container.innerHTML = '<p class="text-gray-500 italic">Belum ada rakitan tersimpan</p>';
        return;
    }
    
    savedBuilds.forEach(build => {
        const total = build.components.reduce((sum, c) => sum + (c.price * c.quantity), 0);
        
        const buildElement = document.createElement('div');
        buildElement.className = 'border-b py-3 last:border-b-0';
        buildElement.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <h4 class="font-medium">${build.name}</h4>
                    <p class="text-sm text-gray-500">${new Date(build.createdAt).toLocaleDateString()}</p>
                    <p class="text-sm">${build.components.length} komponen • ${formatPrice(total)}</p>
                </div>
                <div class="flex gap-2">
                    <button class="load-build-btn p-1 text-blue-600 hover:text-blue-800" data-id="${build.id}" title="Muat rakitan">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                    </button>
                    <button class="print-build-btn p-1 text-green-600 hover:text-green-800" data-id="${build.id}" title="Cetak rakitan">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    <button class="delete-build-btn p-1 text-red-600 hover:text-red-800" data-id="${build.id}" title="Hapus rakitan">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(buildElement);
    });
    
    // Tambahkan event listener untuk tombol aksi
    document.querySelectorAll('.load-build-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            loadBuild(id);
        });
    });
    
    document.querySelectorAll('.print-build-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            printBuild(id);
        });
    });
    
    document.querySelectorAll('.delete-build-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.closest('button').getAttribute('data-id'));
            deleteBuild(id);
        });
    });
}

// Fungsi untuk memuat rakitan tersimpan
function loadBuild(id) {
    const build = savedBuilds.find(b => b.id === id);
    if (!build) return;
    
    selectedComponents = [...build.components];
    document.getElementById('build-name').value = build.name;
    renderSelectedComponents();
}

// Fungsi untuk mencetak rakitan
function printBuild(id = null) {
    // Buat elemen untuk cetakan
    const printWindow = window.open('', '_blank');
    const buildToPrint = id ? 
        savedBuilds.find(b => b.id === id) : 
        {
            name: document.getElementById('build-name').value || 'Rakitan PC',
            components: selectedComponents,
            createdAt: new Date().toISOString()
        };
    
    if (!buildToPrint || buildToPrint.components.length === 0) {
        alert('Tidak ada komponen untuk dicetak');
        return;
    }
    
    const total = buildToPrint.components.reduce((sum, c) => sum + (c.price * c.quantity), 0);
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="id">
        <head>
            <title>Cetak Rakitan PC: ${buildToPrint.name}</title>
            <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
            <link rel="stylesheet" href="print.css">
        </head>
        <body class="p-6">
            <div class="max-w-4xl mx-auto">
                <h1 class="text-2xl font-bold mb-2">Rakitan PC: ${buildToPrint.name}</h1>
                <p class="text-gray-600 mb-6">Dicetak pada ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</p>
                
                <table class="w-full border-collapse mb-6">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border py-2 px-4 text-left">No</th>
                            <th class="border py-2 px-4 text-left">Komponen</th>
                            <th class="border py-2 px-4 text-left">Kategori</th>
                            <th class="border py-2 px-4 text-right">Harga Satuan</th>
                            <th class="border py-2 px-4 text-right">Jumlah</th>
                            <th class="border py-2 px-4 text-right">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${buildToPrint.components.map((component, index) => `
                            <tr>
                                <td class="border py-2 px-4">${index + 1}</td>
                                <td class="border py-2 px-4">${component.name}</td>
                                <td class="border py-2 px-4">${getCategoryName(component.category)}</td>
                                <td class="border py-2 px-4 text-right">${formatPrice(component.price)}</td>
                                <td class="border py-2 px-4 text-right">${component.quantity}</td>
                                <td class="border py-2 px-4 text-right">${formatPrice(component.price * component.quantity)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="5" class="border py-2 px-4 text-right font-bold">Total</td>
                            <td class="border py-2 px-4 text-right font-bold">${formatPrice(total)}</td>
                        </tr>
                    </tfoot>
                </table>
                
                <div class="text-sm text-gray-500 mt-8">
                    <p>Catatan:</p>
                    <ul class="list-disc pl-5 mt-2">
                        <li>Harga dapat berubah sewaktu-waktu</li>
                        <li>Pastikan kompatibilitas komponen sebelum membeli</li>
                        <li>Periksa ketersediaan stok di toko</li>
                    </ul>
                </div>
            </div>
            
            <script>
                window.onload = function() {
                    window.print();
                    setTimeout(function() {
                        window.close();
                    }, 1000);
                };
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// Fungsi untuk menghapus rakitan tersimpan
function deleteBuild(id) {
    if (confirm('Apakah Anda yakin ingin menghapus rakitan ini?')) {
        savedBuilds = savedBuilds.filter(b => b.id !== id);
        localStorage.setItem('savedBuilds', JSON.stringify(savedBuilds));
        renderSavedBuilds();
    }
}

// Fungsi untuk mengosongkan rakitan
function clearBuild() {
    if (selectedComponents.length === 0 || confirm('Apakah Anda yakin ingin mengosongkan rakitan?')) {
        selectedComponents = [];
        document.getElementById('build-name').value = '';
        renderSelectedComponents();
    }
}

// Tambahkan event listener untuk tombol aksi
document.getElementById('save-build').addEventListener('click', saveBuild);
document.getElementById('print-build').addEventListener('click', () => printBuild());
document.getElementById('clear-build').addEventListener('click', clearBuild);

// Modifikasi fungsi renderComponents untuk menambahkan tombol "Tambah ke Rakitan"
function renderComponents(componentsToRender = components) {
    const tableBody = document.getElementById('components-table');
    tableBody.innerHTML = '';
    
    componentsToRender.forEach((component, index) => {
        const row = document.createElement('tr');
        row.className = `bg-white border-b component-row ${component.category}`;
        row.innerHTML = `
            <td class="px-6 py-4">${index + 1}</td>
            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">${component.name}</td>
            <td class="px-6 py-4">${getCategoryName(component.category)}</td>
            <td class="px-6 py-4 price-cell" data-price="${component.price}">${formatPrice(component.price)}</td>
            <td class="px-6 py-4 stock-cell">${component.stock}</td>
            <td class="px-6 py-4">
                <button class="add-to-build-btn px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 mr-2" data-id="${component.id}">
                    Tambah
                </button>
                <button class="edit-btn px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200 mr-2" data-id="${component.id}">
                    Edit
                </button>
                <button class="delete-btn px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200" data-id="${component.id}">
                    Hapus
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Tambahkan event listener untuk tombol tambah ke rakitan
    document.querySelectorAll('.add-to-build-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            addToBuild(id);
        });
    });
    
    // ... (event listener lainnya tetap sama)
}

// Panggil renderSavedBuilds saat inisialisasi
document.addEventListener('DOMContentLoaded', () => {
    renderComponents();
    renderSavedBuilds();
});
const fetchWithCache = async (url, expiryMinutes = 60) => {
    const cacheKey = `cache_${url}`;
    const cached = localStorage.getItem(cacheKey);
    const now = new Date().getTime();
    
    if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (now - timestamp < expiryMinutes * 60 * 1000) {
            return data;
        }
    }
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        localStorage.setItem(cacheKey, JSON.stringify({
            data,
            timestamp: now
        }));
        return data;
    } catch (error) {
        if (cached) return JSON.parse(cached).data;
        throw error;
    }
};

// Contoh penggunaan:
const loadComponentPrices = async () => {
    try {
        const prices = await fetchWithCache('https://api.example.com/pc-prices', 120);
        components = prices;
        renderComponents();
    } catch (error) {
        console.error('Failed to load prices:', error);
    }
};
const animatePriceChange = (element, oldPrice, newPrice) => {
    const duration = 1000;
    const start = performance.now();
    const difference = newPrice - oldPrice;
    
    const updatePrice = (timestamp) => {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = oldPrice + (difference * progress);
        
        element.textContent = formatPrice(Math.round(currentValue));
        
        if (progress < 1) {
            requestAnimationFrame(updatePrice);
        }
    };
    
    requestAnimationFrame(updatePrice);
};
// Di script.js tambahkan:
const measurePerf = () => {
    // Time to Interactive
    const tti = window.performance.timing.domInteractive - window.performance.timing.navigationStart;
    console.log(`Time to Interactive: ${tti}ms`);
    
    // First Input Delay
    const fidListener = () => {
        const fid = performance.now() - window.performance.timing.domInteractive;
        console.log(`First Input Delay: ${fid}ms`);
        window.removeEventListener('click', fidListener);
    };
    window.addEventListener('click', fidListener);
    
    // Lazy load other metrics
    setTimeout(() => {
        const entries = performance.getEntriesByType('navigation');
        if (entries.length > 0) {
            const navEntry = entries[0];
            console.log('DOM Complete:', navEntry.domComplete);
            console.log('Load Event End:', navEntry.loadEventEnd);
        }
    }, 0);
};

window.addEventListener('load', measurePerf);
// Fungsi untuk generate shareable link
function generateShareLink(buildData) {
    // Kompres data rakitan ke URL
    const compressedData = LZString.compressToEncodedURIComponent(
        JSON.stringify({
            n: buildData.name,
            c: buildData.components.map(c => c.id)
        })
    );
    
    return `${window.location.origin}${window.location.pathname}?build=${compressedData}`;
}

// Fungsi untuk memuat rakitan dari URL
function loadBuildFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const buildParam = urlParams.get('build');
    
    if (buildParam) {
        try {
            const decompressed = LZString.decompressFromEncodedURIComponent(buildParam);
            const buildData = JSON.parse(decompressed);
            
            selectedComponents = buildData.c.map(id => {
                const component = components.find(c => c.id === id);
                return { ...component, quantity: 1 };
            });
            
            document.getElementById('build-name').value = buildData.n;
            renderSelectedComponents();
            
            // Scroll ke bagian simulasi
            document.getElementById('simulation-section').scrollIntoView({ behavior: 'smooth' });
        } catch (e) {
            console.error('Error loading build from URL:', e);
        }
    }
}

// Fungsi untuk membuka modal sharing
function openShareModal() {
    if (selectedComponents.length === 0) {
        alert('Tidak ada komponen dalam rakitan untuk dibagikan');
        return;
    }
    
    const buildName = document.getElementById('build-name').value || 'Rakitan PC Saya';
    const buildData = {
        name: buildName,
        components: selectedComponents
    };
    
    const shareLink = generateShareLink(buildData);
    document.getElementById('share-link').value = shareLink;
    
    // Generate embed code
    const embedCode = `<iframe src="${shareLink}&embed=true" width="100%" height="500" frameborder="0" style="border:1px solid #eee;"></iframe>`;
    document.getElementById('embed-code').value = embedCode;
    
    // Tampilkan modal
    const modal = new Flowbite.Modal(document.getElementById('share-modal'));
    modal.show();
}

// Fungsi untuk share ke platform tertentu
function shareToPlatform(platform) {
    const link = document.getElementById('share-link').value;
    const buildName = document.getElementById('build-name').value || 'Rakitan PC Saya';
    const text = `Lihat rakitan PC saya "${buildName}": ${link}`;
    
    switch (platform) {
        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`, '_blank');
            break;
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
            break;
        case 'whatsapp':
            window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
            break;
        case 'telegram':
            window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(buildName)}`, '_blank');
            break;
        case 'email':
            window.open(`mailto:?subject=Rakitan PC ${encodeURIComponent(buildName)}&body=${encodeURIComponent(text)}`, '_blank');
            break;
    }
}

// Fungsi untuk copy link
function copyToClipboard() {
    const linkInput = document.getElementById('share-link');
    linkInput.select();
    document.execCommand('copy');
    
    // Beri feedback
    const copyButton = document.getElementById('copy-link');
    copyButton.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>';
    
    setTimeout(() => {
        copyButton.innerHTML = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path></svg>';
    }, 2000);
}

// Event listeners
document.getElementById('share-build').addEventListener('click', openShareModal);
document.getElementById('copy-link').addEventListener('click', copyToClipboard);
document.querySelectorAll('.share-platform').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const platform = e.currentTarget.getAttribute('data-platform');
        shareToPlatform(platform);
    });
});

// Panggil saat load untuk cek URL
document.addEventListener('DOMContentLoaded', () => {
    loadBuildFromURL();
});
// Di script.js, tambahkan di loadBuildFromURL():
function loadBuildFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const buildParam = urlParams.get('build');
    const isEmbed = urlParams.get('embed') === 'true';
    
    if (isEmbed) {
        // Sederhanakan UI untuk embed
        document.querySelector('header').classList.add('hidden');
        document.getElementById('components-section').classList.add('hidden');
        document.getElementById('simulation-section').classList.remove('mt-12');
        document.getElementById('simulation-section').classList.add('mt-4');
        document.getElementById('recommendations-container').classList.add('hidden');
        
        // Tambahkan tombol "Buka di Aplikasi"
        const openBtn = document.createElement('a');
        openBtn.href = window.location.href.replace('&embed=true', '');
        openBtn.className = 'px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-4 inline-block';
        openBtn.textContent = 'Buka di Aplikasi PC Builder';
        document.getElementById('simulation-section').prepend(openBtn);
    }
    
    if (buildParam) {
        // ... kode sebelumnya ...
    }
}
function openShareModal() {
    if (selectedComponents.length === 0) {
        alert('Tidak ada komponen dalam rakitan untuk dibagikan');
        return;
    }
    
    const buildName = document.getElementById('build-name').value || 'Rakitan PC Saya';
    const buildData = {
        name: buildName,
        components: selectedComponents
    };
    
    const shareLink = generateShareLink(buildData);
    
    // Cek jika Web Share API tersedia (mobile devices)
    if (navigator.share) {
        navigator.share({
            title: `Rakitan PC: ${buildName}`,
            text: 'Lihat rakitan PC yang saya buat:',
            url: shareLink
        }).catch(err => {
            console.log('Error sharing:', err);
            // Fallback ke modal biasa jika Web Share gagal
            showShareModal(shareLink, buildName);
        });
    } else {
        // Gunakan modal biasa untuk desktop
        showShareModal(shareLink, buildName);
    }
}

function showShareModal(shareLink, buildName) {
    document.getElementById('share-link').value = shareLink;
    
    // Generate embed code
    const embedCode = `<iframe src="${shareLink}&embed=true" width="100%" height="500" frameborder="0" style="border:1px solid #eee;"></iframe>`;
    document.getElementById('embed-code').value = embedCode;
    
    // Tampilkan modal
    const modal = new Flowbite.Modal(document.getElementById('share-modal'));
    modal.show();
}
// Panduan Perakitan Interaktif
document.querySelectorAll('.assembly-step').forEach(step => {
    const header = step.querySelector('.flex.items-center');
    const content = step.querySelector('.step-content');
    const icon = step.querySelector('svg');
    
    header.addEventListener('click', () => {
        content.classList.toggle('hidden');
        content.classList.toggle('show');
        icon.classList.toggle('rotate-180');
    });
});

// Video Tutorial Selector
document.querySelectorAll('.video-option').forEach(btn => {
    btn.addEventListener('click', () => {
        const videoId = btn.getAttribute('data-video');
        document.getElementById('tutorial-video').src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        
        // Update active button
        document.querySelectorAll('.video-option').forEach(b => b.classList.remove('bg-blue-600', 'text-white'));
        btn.classList.add('bg-blue-600', 'text-white');
    });
});
const glossaryTerms = [
    {
        term: "CPU",
        definition: "Central Processing Unit - Otak komputer yang menjalankan instruksi dan memproses data.",
        category: "Processor"
    },
    {
        term: "GPU",
        definition: "Graphics Processing Unit - Prosesor khusus untuk menangani grafis dan visual.",
        category: "VGA"
    },
    {
        term: "RAM",
        definition: "Random Access Memory - Memori jangka pendek untuk menyimpan data yang sedang diproses.",
        category: "Memory"
    },
    {
        term: "SSD",
        definition: "Solid State Drive - Penyimpanan data menggunakan memori flash, lebih cepat dari HDD.",
        category: "Storage"
    },
    {
        term: "PSU",
        definition: "Power Supply Unit - Mengkonversi daya listrik untuk komponen komputer.",
        category: "Power"
    },
    {
        term: "TDP",
        definition: "Thermal Design Power - Ukuran panas maksimum yang dihasilkan komponen (dalam watt).",
        category: "Cooling"
    },
    {
        term: "Overclocking",
        definition: "Meningkatkan kecepatan clock komponen melebihi spesifikasi pabrik untuk performa lebih tinggi.",
        category: "Performance"
    },
    {
        term: "Air Cooling",
        definition: "Sistem pendingin menggunakan heatsink dan kipas untuk membuang panas.",
        category: "Cooling"
    },
    {
        term: "Liquid Cooling",
        definition: "Sistem pendingin menggunakan cairan untuk mentransfer panas lebih efisien.",
        category: "Cooling"
    }
];

// Render Glosarium
function renderGlossary(terms = glossaryTerms) {
    const container = document.getElementById('glossary-container');
    container.innerHTML = '';
    
    terms.forEach(item => {
        const card = document.createElement('div');
        card.className = 'bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600';
        card.innerHTML = `
            <h3 class="font-bold text-lg mb-1">${item.term}</h3>
            <span class="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full mb-2">${item.category}</span>
            <p class="text-gray-600 dark:text-gray-300">${item.definition}</p>
        `;
        container.appendChild(card);
    });
}

// Search Glosarium
document.getElementById('glossary-search').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = glossaryTerms.filter(item => 
        item.term.toLowerCase().includes(searchTerm) || 
        item.definition.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
    renderGlossary(filtered);
});

// Panggil saat load
document.addEventListener('DOMContentLoaded', () => {
    renderGlossary();
});
// Kalkulator Kebutuhan Daya
document.getElementById('calculate-psu').addEventListener('click', () => {
    const cpu = parseInt(document.getElementById('psu-cpu').value);
    const gpu = parseInt(document.getElementById('psu-gpu').value);
    const ram = parseInt(document.getElementById('psu-ram').value);
    const storage = parseInt(document.getElementById('psu-storage').value);
    const cooling = parseInt(document.getElementById('psu-cooling').value);
    const peripherals = parseInt(document.getElementById('psu-peripherals').value);
    
    const total = cpu + gpu + ram + storage + cooling + peripherals;
    const recommended = Math.round(total * 1.3); // Tambahkan 30% headroom
    
    document.getElementById('psu-total').textContent = `${total}W`;
    document.getElementById('psu-recommendation').textContent = `${recommended}W - ${recommended + 100}W`;
    
    // Update efficiency bar
    const efficiency = Math.min(100, (total / recommended) * 100);
    document.getElementById('psu-efficiency-bar').style.width = `${efficiency}%`;
    
    // Beri warna berdasarkan efisiensi
    const bar = document.getElementById('psu-efficiency-bar');
    if (efficiency > 85) {
        bar.classList.remove('bg-yellow-500', 'bg-green-600');
        bar.classList.add('bg-red-600');
        document.getElementById('psu-efficiency-text').textContent = 'Kapasitas PSU hampir penuh - Pertimbangkan PSU lebih besar';
    } else if (efficiency > 70) {
        bar.classList.remove('bg-green-600', 'bg-red-600');
        bar.classList.add('bg-yellow-500');
        document.getElementById('psu-efficiency-text').textContent = 'Kapasitas PSU cukup - 80+ Gold direkomendasikan';
    } else {
        bar.classList.remove('bg-yellow-500', 'bg-red-600');
        bar.classList.add('bg-green-600');
        document.getElementById('psu-efficiency-text').textContent = 'Kapasitas PSU optimal - 80+ Bronze atau lebih tinggi';
    }
});
// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('svg');
        
        answer.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    });
});