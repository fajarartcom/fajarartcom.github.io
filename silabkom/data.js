// Data Inventaris (dummy 20+ items)
const inventarisData = [
    { nama: "Testing Fajar", jumlah: 1, kondisi: "Baik" },
    { nama: "PC Rakitan", jumlah: 20, kondisi: "Baik" },
    { nama: "Proyektor", jumlah: 2, kondisi: "Perbaikan" },
    { nama: "Switch 24 Port", jumlah: 3, kondisi: "Baik" },
    { nama: "Printer", jumlah: 1, kondisi: "Baik" },
    { nama: "Router", jumlah: 4, kondisi: "Baik" },
    { nama: "Monitor LCD", jumlah: 18, kondisi: "Baik" },
    { nama: "Keyboard", jumlah: 25, kondisi: "Baik" },
    { nama: "Mouse", jumlah: 25, kondisi: "Baik" },
    { nama: "Speaker", jumlah: 5, kondisi: "Baik" },
    { nama: "Kabel LAN", jumlah: 100, kondisi: "Baik" },
    { nama: "CCTV", jumlah: 6, kondisi: "Baik" },
    { nama: "Uninterruptible Power Supply (UPS)", jumlah: 3, kondisi: "Baik" },
    { nama: "Webcam", jumlah: 10, kondisi: "Baik" },
    { nama: "Microphone", jumlah: 8, kondisi: "Baik" },
    { nama: "Access Point", jumlah: 7, kondisi: "Baik" },
    { nama: "Server Rack", jumlah: 1, kondisi: "Baik" },
    { nama: "Flashdisk", jumlah: 15, kondisi: "Baik" },
    { nama: "External HDD", jumlah: 5, kondisi: "Baik" },
    { nama: "Projector Screen", jumlah: 2, kondisi: "Baik" },
    { nama: "Whiteboard Marker", jumlah: 10, kondisi: "Baik" },
    { nama: "Router Backup", jumlah: 1, kondisi: "Cadangan" },
  ];

  // Data Perawatan dengan foto dokumentasi dan laporan
  const perawatanData = [
    {
      kegiatan: "Penggantian RAM PC-01",
      tanggal: "2025-08-01",
      foto: "https://picsum.photos/id/1011/200/150",
      status: "Selesai",
      laporan: [
        { nama: "Laporan_Ram_PC01.pdf", url: "https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf" },
      ],
    },
    {
      kegiatan: "Install Ulang OS PC-05",
      tanggal: "2025-07-28",
      foto: "https://picsum.photos/id/1015/200/150",
      status: "Selesai",
      laporan: [
        { nama: "Laporan_Install_OS.docx", url: "https://file-examples-com.github.io/uploads/2017/02/file-sample_1MB.docx" },
      ],
    },
    {
      kegiatan: "Penggantian Lampu Proyektor",
      tanggal: "2025-08-10",
      foto: "https://picsum.photos/id/1025/200/150",
      status: "Menunggu",
      laporan: [],
    },
    {
      kegiatan: "Perbaikan Switch 24 Port",
      tanggal: "2025-08-05",
      foto: "https://picsum.photos/id/1020/200/150",
      status: "Proses",
      laporan: [
        { nama: "Laporan_Perbaikan_Switch.xlsx", url: "https://file-examples-com.github.io/uploads/2017/02/file_example_XLS_10.xls" },
      ],
    },
    {
      kegiatan: "Pembersihan Kabel LAN",
      tanggal: "2025-08-07",
      foto: "https://picsum.photos/id/1030/200/150",
      status: "Selesai",
      laporan: [],
    },
    {
      kegiatan: "Upgrade RAM Server",
      tanggal: "2025-08-12",
      foto: "https://picsum.photos/id/1035/200/150",
      status: "Proses",
      laporan: [
        { nama: "Laporan_Upgrade_Server.pdf", url: "https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf" },
      ],
    },
    {
      kegiatan: "Backup Data",
      tanggal: "2025-08-14",
      foto: "https://picsum.photos/id/1040/200/150",
      status: "Selesai",
      laporan: [],
    },
    {
      kegiatan: "Penggantian Keyboard PC-03",
      tanggal: "2025-08-02",
      foto: "https://picsum.photos/id/1050/200/150",
      status: "Selesai",
      laporan: [
        { nama: "Laporan_Keyboard_PC03.docx", url: "https://file-examples-com.github.io/uploads/2017/02/file-sample_1MB.docx" },
      ],
    },
    {
      kegiatan: "Update Firmware Router",
      tanggal: "2025-08-11",
      foto: "https://picsum.photos/id/1060/200/150",
      status: "Menunggu",
      laporan: [],
    },
    {
      kegiatan: "Cek Kondisi Monitor",
      tanggal: "2025-08-03",
      foto: "https://picsum.photos/id/1070/200/150",
      status: "Proses",
      laporan: [],
    },
  ];

    // Data Jadwal (Manual, FullCalendar)
    const jadwalEvents = [
        { title: "Praktikum Jaringan", start: "2025-08-09" },
        { title: "Desain Grafis", start: "2025-08-10" },
        { title: "Ujian Lab", start: "2025-08-15" },
        { title: "Maintenance Server", start: "2025-08-15" },
        { title: "Upgrade Jaringan", start: "2025-08-20" },
        { title: "Backup Data", start: "2025-08-22" },
      ];
    
      // Maintenance events for announcement & toast
      const maintenanceEvents = [
        {
          title: "Maintenance Server",
          date: "2025-08-15",
          description: "Pemeliharaan server utama laboratorium",
        },
        {
          title: "Upgrade Jaringan",
          date: "2025-08-20",
          description: "Peningkatan kapasitas jaringan internet",
        },
      ];

       // Data dokumen manual (15 data)
       const dokumenData = [
        { nama: "Laporan_fajar.pdf", url: "https://file-examples.com/storage/feff5c8b11c7a92f287/file-sample_150kB.pdf", unduhan: 0 },
        { nama: "Laporan_Perawatan_PC01.pdf", url: "https://file-examples.com/storage/feff5c8b11c7a92f287/file-sample_150kB.pdf", unduhan: 0 },
        { nama: "Laporan_Perawatan_PC02.pdf", url: "https://file-examples.com/storage/feff5c8b11c7a92f287/file-sample_150kB.pdf", unduhan: 0 },
        { nama: "Jadwal_Maintenance_Januari.xlsx", url: "https://file-examples.com/storage/feff5c8b11c7a92f287/file_example_XLSX_10.xlsx", unduhan: 0 },
        { nama: "Jadwal_Maintenance_Februari.xlsx", url: "https://file-examples.com/storage/feff5c8b11c7a92f287/file_example_XLSX_10.xlsx", unduhan: 0 },
        { nama: "Manual_User_PC01.docx", url: "https://file-examples.com/storage/feff5c8b11c7a92f287/file-sample_1MB.docx", unduhan: 0 },
        { nama: "Manual_User_PC02.docx", url: "https://file-examples.com/storage/feff5c8b11c7a92f287/file-sample_1MB.docx", unduhan: 0 },
        { nama: "Topologi_Jaringan.pdf", url: "https://file-examples.com/storage/feff5c8b11c7a92f287/file-sample_150kB.pdf", unduhan: 0 },
        { nama: "Checklist_Perawatan.pdf", url: "https://file-examples.com/storage/feff5c8b11c7a92f287/file-sample_150kB.pdf", unduhan: 0 },
        { nama: "Buku_Panduan_IT.docx", url: "https://file-examples.com/storage/feff5c8b11c7a92f287/file-sample_1MB.docx", unduhan: 0 },
        { nama: "Inventaris_2025.xlsx", url: "https://file-examples.com/storage/feff5c8b11c7a92f287/file_example_XLSX_10.xlsx", unduhan: 0 },
        { nama: "Backup_Konfigurasi_Router.pdf", url: "https://file-examples.com/storage/feff5c8b11c7a92f287/file-sample_150kB.pdf", unduhan: 0 },
        { nama: "Data_Penggunaan_Lab.xlsx", url: "https://file-examples.com/storage/feff5c8b11c7a92f287/file_example_XLSX_10.xlsx", unduhan: 0 },
        { nama: "Gambar_Skema_Kabel.jpg", url: "https://picsum.photos/200/300", unduhan: 0 },
        { nama: "Panduan_Instalasi_OS.docx", url: "https://file-examples.com/storage/feff5c8b11c7a92f287/file-sample_1MB.docx", unduhan: 0 },
        { nama: "Laporan_Audit_IT.pdf", url: "https://file-examples.com/storage/feff5c8b11c7a92f287/file-sample_150kB.pdf", unduhan: 0 },
      ];   

      // js/data.js

// Data Roadmap
const roadmapData = [
    {
      bulan: "Juli 2025",
      judul: "Awal Tahun Ajaran",
      deskripsi: "Persiapan lab, pengecekan inventaris, dan instalasi software terbaru.",
      status: "success"
    },
    {
      bulan: "September 2025",
      judul: "Pelatihan Guru & Staff",
      deskripsi: "Workshop penggunaan software baru dan keamanan data.",
      status: "info"
    },
    {
      bulan: "November 2025",
      judul: "Maintenance Perangkat",
      deskripsi: "Pembersihan fisik komputer, update OS, dan backup data.",
      status: "warning"
    },
    {
      bulan: "Januari 2026",
      judul: "Inventaris Tengah Tahun",
      deskripsi: "Pengecekan peralatan dan penambahan perangkat baru jika diperlukan.",
      status: "info"
    },
    {
      bulan: "Mei 2026",
      judul: "Persiapan Ujian Akhir",
      deskripsi: "Pengecekan koneksi internet dan perangkat ujian CBT.",
      status: "danger"
    }
  ];
  
  // data.js

// Data Pengumuman
const announcements = [
    {
      text: "🔧 Jadwal Maintenance: 15 Agustus 2025 - Pembersihan Lab Komputer & Update Software",
      type: "danger" // danger, info, success
    },
    {
      text: "💡 Info: Harap backup data sebelum tanggal tersebut",
      type: "info"
    },
    {
      text: "📢 Ujian CBT dimulai 20 Agustus 2025",
      type: "success"
    }
  ];

  // data.js

// Data Galeri Dokumentasi
const galleryPhotos = [
    {
      src: "https://picsum.photos/id/1011/800/500",
      title: "Pembersihan CPU",
      description: "Membersihkan debu dari unit CPU lab komputer."
    },
    {
      src: "https://picsum.photos/id/1025/800/500",
      title: "Penggantian Keyboard",
      description: "Mengganti keyboard rusak dengan yang baru."
    },
    {
      src: "https://picsum.photos/id/1040/800/500",
      title: "Perawatan Monitor",
      description: "Membersihkan dan memeriksa monitor lab."
    },
    {
      src: "https://picsum.photos/id/1057/800/500",
      title: "Upgrade RAM",
      description: "Menambah kapasitas RAM untuk kinerja lebih baik."
    }
  ];
  
  