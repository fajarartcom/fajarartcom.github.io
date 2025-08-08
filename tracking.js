// Pastikan kamu include file data.js terlebih dahulu
const trackingData = {
    "ORD001": {
      status: "Dalam Proses",
      tanggal: "08 Agustus 2025",
      lokasi: "Gudang Surabaya"
    },
    "ORD002": {
      status: "Sedang Dikirim",
      tanggal: "07 Agustus 2025",
      lokasi: "Menuju Lokasi Tujuan"
    },
    "ORD003": {
      status: "Selesai",
      tanggal: "06 Agustus 2025",
      lokasi: "Diterima oleh pelanggan"
    }
  };
  
function trackOrder() {
    const orderId = document.getElementById('orderId').value.trim().toUpperCase();
    const resultDiv = document.getElementById('trackingResult');
  
    if (trackingData[orderId]) {
      const data = trackingData[orderId];
      resultDiv.innerHTML = `
        <div class="p-4 border rounded bg-gray-50">
          <p><strong>Status:</strong> ${data.status}</p>
          <p><strong>Tanggal Update:</strong> ${data.tanggal}</p>
          <p><strong>Lokasi Terakhir:</strong> ${data.lokasi}</p>
        </div>
      `;
    } else {
      resultDiv.innerHTML = `
        <div class="p-4 bg-red-100 text-red-700 border border-red-400 rounded">
          ID Pesanan tidak ditemukan. Silakan cek kembali.
        </div>
      `;
    }
  }
  