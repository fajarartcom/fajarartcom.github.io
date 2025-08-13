
    <script>
        // Data Storage
        let kegiatanData = JSON.parse(localStorage.getItem('kegiatanData')) || [];
        let perbaikanData = JSON.parse(localStorage.getItem('perbaikanData')) || [];
        
        // Current Page State
        let currentKegiatanPage = 1;
        let currentPerbaikanPage = 1;
        const itemsPerPage = 5;
        let currentDetailId = null;
        let isEditing = false;
        let currentActiveNav = 'kegiatan';
        
        // DOM Elements
        const kegiatanForm = document.getElementById('kegiatan-form');
        const perbaikanForm = document.getElementById('perbaikan-form');
        const kegiatanTableBody = document.getElementById('kegiatan-table-body');
        const perbaikanTableBody = document.getElementById('perbaikan-table-body');
        const pagination = document.getElementById('pagination');
        const paginationPerbaikan = document.getElementById('pagination-perbaikan');
        const paginationInfo = document.getElementById('pagination-info');
        const paginationPerbaikanInfo = document.getElementById('pagination-perbaikan-info');
        const searchInput = document.getElementById('search-input');
        const searchPerbaikanInput = document.getElementById('search-perbaikan-input');
        const filterJenis = document.getElementById('filter-jenis');
        const filterStatus = document.getElementById('filter-status');
        const filterPerbaikanKerusakan = document.getElementById('filter-perbaikan-kerusakan');
        const filterPerbaikanStatus = document.getElementById('filter-perbaikan-status');
        const currentDateElement = document.getElementById('current-date');
        
        // Content Sections
        const dashboardContent = document.getElementById('dashboard-content');
        const kegiatanContent = document.getElementById('kegiatan-content');
        const perbaikanContent = document.getElementById('perbaikan-content');
        const inventarisContent = document.getElementById('inventaris-content');
        const laporanContent = document.getElementById('laporan-content');
        
        // Navigation Links
        const dashboardLink = document.getElementById('dashboard-link');
        const kegiatanLink = document.getElementById('kegiatan-link');
        const perbaikanLink = document.getElementById('perbaikan-link');
        const inventarisLink = document.getElementById('inventaris-link');
        const laporanLink = document.getElementById('laporan-link');
        
        // Filter Buttons
        const filterHariIni = document.getElementById('filter-hari-ini');
        const filterMingguIni = document.getElementById('filter-minggu-ini');
        const filterBulanIni = document.getElementById('filter-bulan-ini');
        const filterSemua = document.getElementById('filter-semua');
        const filterPerbaikanHariIni = document.getElementById('filter-perbaikan-hari-ini');
        const filterPerbaikanMingguIni = document.getElementById('filter-perbaikan-minggu-ini');
        const filterPerbaikanBulanIni = document.getElementById('filter-perbaikan-bulan-ini');
        const filterPerbaikanSemua = document.getElementById('filter-perbaikan-semua');
        
        // Laporan Form
        const laporanKegiatanForm = document.getElementById('laporan-kegiatan-form');
        const laporanPerbaikanForm = document.getElementById('laporan-perbaikan-form');
        const laporanResult = document.getElementById('laporan-result');
        const laporanTitle = document.getElementById('laporan-title');
        const laporanContentData = document.getElementById('laporan-content-data');
        const cetakLaporanBtn = document.getElementById('cetak-laporan');
        
        // Sidebar Toggle
        const toggleSidebarBtn = document.getElementById('toggle-sidebar');
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('main-content');
        
        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            // Set current date
            const now = new Date();
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            currentDateElement.textContent = now.toLocaleDateString('id-ID', options);
            
            // Set default date in forms
            document.getElementById('tanggal').valueAsDate = now;
            document.getElementById('perbaikan-tanggal').valueAsDate = now;
            
            // Load initial data
            renderKegiatanTable();
            renderPerbaikanTable();
            updateStats();
            
            // Set active nav
            setActiveNav(currentActiveNav);
            
            // Initialize chart
            initChart();
        });
        
        // Navigation
        dashboardLink.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveNav('dashboard');
        });
        
        kegiatanLink.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveNav('kegiatan');
        });
        
        perbaikanLink.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveNav('perbaikan');
        });
        
        inventarisLink.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveNav('inventaris');
        });
        
        laporanLink.addEventListener('click', function(e) {
            e.preventDefault();
            setActiveNav('laporan');
        });
        
        function setActiveNav(nav) {
            currentActiveNav = nav;
            
            // Hide all content
            dashboardContent.classList.add('hidden');
            kegiatanContent.classList.add('hidden');
            perbaikanContent.classList.add('hidden');
            inventarisContent.classList.add('hidden');
            laporanContent.classList.add('hidden');
            
            // Remove active class from all nav links
            dashboardLink.classList.remove('bg-blue-800');
            kegiatanLink.classList.remove('bg-blue-800');
            perbaikanLink.classList.remove('bg-blue-800');
            inventarisLink.classList.remove('bg-blue-800');
            laporanLink.classList.remove('bg-blue-800');
            
            // Show selected content and set active nav link
            switch(nav) {
                case 'dashboard':
                    dashboardContent.classList.remove('hidden');
                    dashboardLink.classList.add('bg-blue-800');
                    document.getElementById('page-title').textContent = 'Dashboard';
                    break;
                case 'kegiatan':
                    kegiatanContent.classList.remove('hidden');
                    kegiatanLink.classList.add('bg-blue-800');
                    document.getElementById('page-title').textContent = 'Kegiatan Harian';
                    break;
                case 'perbaikan':
                    perbaikanContent.classList.remove('hidden');
                    perbaikanLink.classList.add('bg-blue-800');
                    document.getElementById('page-title').textContent = 'Laporan Perbaikan';
                    break;
                case 'inventaris':
                    inventarisContent.classList.remove('hidden');
                    inventarisLink.classList.add('bg-blue-800');
                    document.getElementById('page-title').textContent = 'Inventaris Perangkat';
                    break;
                case 'laporan':
                    laporanContent.classList.remove('hidden');
                    laporanLink.classList.add('bg-blue-800');
                    document.getElementById('page-title').textContent = 'Laporan';
                    break;
            }
        }
        
        // Toggle Sidebar
        toggleSidebarBtn.addEventListener('click', function() {
            sidebar.classList.toggle('sidebar-collapsed');
            mainContent.classList.toggle('main-content-expanded');
            
            if (sidebar.classList.contains('sidebar-collapsed')) {
                toggleSidebarBtn.innerHTML = '<i class="fas fa-chevron-right"></i><span class="sidebar-text">Perluas Sidebar</span>';
            } else {
                toggleSidebarBtn.innerHTML = '<i class="fas fa-chevron-left"></i><span class="sidebar-text">Sembunyikan Sidebar</span>';
            }
        });
        
        // Kegiatan Form Submission
        kegiatanForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                id: Date.now(),
                tanggal: document.getElementById('tanggal').value,
                jenis: document.getElementById('jenis_kegiatan').value,
                perangkat: document.getElementById('perangkat').value,
                deskripsi: document.getElementById('deskripsi').value,
                status: document.getElementById('status').value,
                createdAt: new Date().toISOString()
            };
            
            if (isEditing) {
                // Update existing kegiatan
                const index = kegiatanData.findIndex(item => item.id === currentDetailId);
                if (index !== -1) {
                    kegiatanData[index] = formData;
                }
                isEditing = false;
            } else {
                // Add new kegiatan
                kegiatanData.unshift(formData);
            }
            
            // Save to localStorage
            localStorage.setItem('kegiatanData', JSON.stringify(kegiatanData));
            
            // Reset form
            kegiatanForm.reset();
            document.getElementById('tanggal').valueAsDate = new Date();
            
            // Refresh table
            renderKegiatanTable();
            updateStats();
            
            // Show success message
            alert('Kegiatan berhasil disimpan!');
        });
        
        // Perbaikan Form Submission
        perbaikanForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                id: Date.now(),
                tanggal: document.getElementById('perbaikan-tanggal').value,
                perangkat: document.getElementById('perbaikan-perangkat').value,
                kerusakan: document.getElementById('perbaikan-kerusakan').value,
                deskripsi: document.getElementById('perbaikan-deskripsi').value,
                tindakan: document.getElementById('perbaikan-tindakan').value,
                status: document.getElementById('perbaikan-status').value,
                keterangan: document.getElementById('perbaikan-keterangan').value,
                createdAt: new Date().toISOString()
            };
            
            if (isEditing) {
                // Update existing perbaikan
                const index = perbaikanData.findIndex(item => item.id === currentDetailId);
                if (index !== -1) {
                    perbaikanData[index] = formData;
                }
                isEditing = false;
            } else {
                // Add new perbaikan
                perbaikanData.unshift(formData);
            }
            
            // Save to localStorage
            localStorage.setItem('perbaikanData', JSON.stringify(perbaikanData));
            
            // Reset form
            perbaikanForm.reset();
            document.getElementById('perbaikan-tanggal').valueAsDate = new Date();
            
            // Refresh table
            renderPerbaikanTable();
            updateStats();
            
            // Show success message
            alert('Laporan perbaikan berhasil disimpan!');
        });
        
        // Render Kegiatan Table
        function renderKegiatanTable(page = 1, filter = {}) {
            currentKegiatanPage = page;
            
            // Apply filters
            let filteredData = [...kegiatanData];
            
            if (filter.jenis) {
                filteredData = filteredData.filter(item => item.jenis === filter.jenis);
            }
            
            if (filter.status) {
                filteredData = filteredData.filter(item => item.status === filter.status);
            }
            
            if (filter.search) {
                const searchTerm = filter.search.toLowerCase();
                filteredData = filteredData.filter(item => 
                    item.perangkat.toLowerCase().includes(searchTerm) || 
                    item.deskripsi.toLowerCase().includes(searchTerm) ||
                    item.jenis.toLowerCase().includes(searchTerm)
                );
            }
            
            if (filter.dateRange) {
                const startDate = new Date(filter.dateRange.start);
                const endDate = new Date(filter.dateRange.end);
                
                filteredData = filteredData.filter(item => {
                    const itemDate = new Date(item.tanggal);
                    return itemDate >= startDate && itemDate <= endDate;
                });
            }
            
            // Pagination
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedData = filteredData.slice(startIndex, endIndex);
            const totalPages = Math.ceil(filteredData.length / itemsPerPage);
            
            // Clear table
            kegiatanTableBody.innerHTML = '';
            
            // Populate table
            if (paginatedData.length === 0) {
                kegiatanTableBody.innerHTML = `
                    <tr class="bg-white border-b hover:bg-gray-50">
                        <td colspan="5" class="px-6 py-4 text-center">Tidak ada data kegiatan</td>
                    </tr>
                `;
            } else {
                paginatedData.forEach(item => {
                    const row = document.createElement('tr');
                    row.className = 'bg-white border-b hover:bg-gray-50';
                    row.innerHTML = `
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            ${formatDate(item.tanggal)}
                        </td>
                        <td class="px-6 py-4">
                            <div class="font-medium">${getJenisKegiatanText(item.jenis)}</div>
                            <div class="text-gray-500 text-xs">${item.deskripsi.substring(0, 50)}${item.deskripsi.length > 50 ? '...' : ''}</div>
                        </td>
                        <td class="px-6 py-4">${item.perangkat}</td>
                        <td class="px-6 py-4">
                            ${getStatusBadge(item.status)}
                        </td>
                        <td class="px-6 py-4">
                            <button data-id="${item.id}" class="detail-kegiatan-btn font-medium text-blue-600 hover:underline">Detail</button>
                        </td>
                    `;
                    kegiatanTableBody.appendChild(row);
                });
            }
            
            // Update pagination info
            paginationInfo.innerHTML = `Menampilkan <span class="font-semibold text-gray-900">${startIndex + 1}-${Math.min(endIndex, filteredData.length)}</span> dari <span class="font-semibold text-gray-900">${filteredData.length}</span>`;
            
            // Render pagination buttons
            renderPagination(pagination, totalPages, page, 'kegiatan');
            
            // Add event listeners to detail buttons
            document.querySelectorAll('.detail-kegiatan-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    showDetailKegiatanModal(parseInt(this.getAttribute('data-id')));
                });
            });
        }
        
        // Render Perbaikan Table
        function renderPerbaikanTable(page = 1, filter = {}) {
            currentPerbaikanPage = page;
            
            // Apply filters
            let filteredData = [...perbaikanData];
            
            if (filter.kerusakan) {
                filteredData = filteredData.filter(item => item.kerusakan === filter.kerusakan);
            }
            
            if (filter.status) {
                filteredData = filteredData.filter(item => item.status === filter.status);
            }
            
            if (filter.search) {
                const searchTerm = filter.search.toLowerCase();
                filteredData = filteredData.filter(item => 
                    item.perangkat.toLowerCase().includes(searchTerm) || 
                    item.deskripsi.toLowerCase().includes(searchTerm) ||
                    item.kerusakan.toLowerCase().includes(searchTerm)
                );
            }
            
            if (filter.dateRange) {
                const startDate = new Date(filter.dateRange.start);
                const endDate = new Date(filter.dateRange.end);
                
                filteredData = filteredData.filter(item => {
                    const itemDate = new Date(item.tanggal);
                    return itemDate >= startDate && itemDate <= endDate;
                });
            }
            
            // Pagination
            const startIndex = (page - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedData = filteredData.slice(startIndex, endIndex);
            const totalPages = Math.ceil(filteredData.length / itemsPerPage);
            
            // Clear table
            perbaikanTableBody.innerHTML = '';
            
            // Populate table
            if (paginatedData.length === 0) {
                perbaikanTableBody.innerHTML = `
                    <tr class="bg-white border-b hover:bg-gray-50">
                        <td colspan="5" class="px-6 py-4 text-center">Tidak ada data perbaikan</td>
                    </tr>
                `;
            } else {
                paginatedData.forEach(item => {
                    const row = document.createElement('tr');
                    row.className = 'bg-white border-b hover:bg-gray-50';
                    row.innerHTML = `
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            ${formatDate(item.tanggal)}
                        </td>
                        <td class="px-6 py-4">${item.perangkat}</td>
                        <td class="px-6 py-4">${getJenisKerusakanText(item.kerusakan)}</td>
                        <td class="px-6 py-4">
                            ${getPerbaikanStatusBadge(item.status)}
                        </td>
                        <td class="px-6 py-4">
                            <button data-id="${item.id}" class="detail-perbaikan-btn font-medium text-blue-600 hover:underline">Detail</button>
                        </td>
                    `;
                    perbaikanTableBody.appendChild(row);
                });
            }
            
            // Update pagination info
            paginationPerbaikanInfo.innerHTML = `Menampilkan <span class="font-semibold text-gray-900">${startIndex + 1}-${Math.min(endIndex, filteredData.length)}</span> dari <span class="font-semibold text-gray-900">${filteredData.length}</span>`;
            
            // Render pagination buttons
            renderPagination(paginationPerbaikan, totalPages, page, 'perbaikan');
            
            // Add event listeners to detail buttons
            document.querySelectorAll('.detail-perbaikan-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    showDetailPerbaikanModal(parseInt(this.getAttribute('data-id')));
                });
            });
        }
        
        // Render Pagination
        function renderPagination(element, totalPages, currentPage, type) {
            element.innerHTML = '';
            
            if (totalPages <= 1) return;
            
            // Previous button
            const prevLi = document.createElement('li');
            prevLi.innerHTML = `
                <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}">
                    Previous
                </a>
            `;
            prevLi.addEventListener('click', function(e) {
                e.preventDefault();
                if (currentPage > 1) {
                    if (type === 'kegiatan') {
                        renderKegiatanTable(currentPage - 1, getCurrentKegiatanFilters());
                    } else {
                        renderPerbaikanTable(currentPage - 1, getCurrentPerbaikanFilters());
                    }
                }
            });
            element.appendChild(prevLi);
            
            // Page buttons
            const maxVisiblePages = 5;
            let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
            let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
            
            if (endPage - startPage + 1 < maxVisiblePages) {
                startPage = Math.max(1, endPage - maxVisiblePages + 1);
            }
            
            for (let i = startPage; i <= endPage; i++) {
                const pageLi = document.createElement('li');
                pageLi.innerHTML = `
                    <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight ${i === currentPage ? 'text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'}">
                        ${i}
                    </a>
                `;
                pageLi.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (type === 'kegiatan') {
                        renderKegiatanTable(i, getCurrentKegiatanFilters());
                    } else {
                        renderPerbaikanTable(i, getCurrentPerbaikanFilters());
                    }
                });
                element.appendChild(pageLi);
            }
            
            // Next button
            const nextLi = document.createElement('li');
            nextLi.innerHTML = `
                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}">
                    Next
                </a>
            `;
            nextLi.addEventListener('click', function(e) {
                e.preventDefault();
                if (currentPage < totalPages) {
                    if (type === 'kegiatan') {
                        renderKegiatanTable(currentPage + 1, getCurrentKegiatanFilters());
                    } else {
                        renderPerbaikanTable(currentPage + 1, getCurrentPerbaikanFilters());
                    }
                }
            });
            element.appendChild(nextLi);
        }
        
        // Show Detail Kegiatan Modal
        function showDetailKegiatanModal(id) {
            currentDetailId = id;
            const kegiatan = kegiatanData.find(item => item.id === id);
            
            if (kegiatan) {
                document.getElementById('detail-tanggal').textContent = formatDate(kegiatan.tanggal, true);
                document.getElementById('detail-jenis').textContent = getJenisKegiatanText(kegiatan.jenis);
                document.getElementById('detail-perangkat').textContent = kegiatan.perangkat;
                document.getElementById('detail-status').textContent = getStatusText(kegiatan.status);
                document.getElementById('detail-deskripsi').textContent = kegiatan.deskripsi;
                
                // Show modal
                const modal = new FlowbiteModal(document.getElementById('detail-kegiatan-modal'));
                modal.show();
            }
        }
        
        // Show Detail Perbaikan Modal
        function showDetailPerbaikanModal(id) {
            currentDetailId = id;
            const perbaikan = perbaikanData.find(item => item.id === id);
            
            if (perbaikan) {
                document.getElementById('detail-perbaikan-tanggal').textContent = formatDate(perbaikan.tanggal, true);
                document.getElementById('detail-perbaikan-perangkat').textContent = perbaikan.perangkat;
                document.getElementById('detail-perbaikan-kerusakan').textContent = getJenisKerusakanText(perbaikan.kerusakan);
                document.getElementById('detail-perbaikan-status').textContent = getPerbaikanStatusText(perbaikan.status);
                document.getElementById('detail-perbaikan-deskripsi').textContent = perbaikan.deskripsi;
                document.getElementById('detail-perbaikan-tindakan').textContent = perbaikan.tindakan;
                document.getElementById('detail-perbaikan-keterangan').textContent = perbaikan.keterangan || '-';
                
                // Show modal
                const modal = new FlowbiteModal(document.getElementById('detail-perbaikan-modal'));
                modal.show();
            }
        }
        
        // Edit Kegiatan
        document.getElementById('edit-kegiatan-btn').addEventListener('click', function() {
            const kegiatan = kegiatanData.find(item => item.id === currentDetailId);
            
            if (kegiatan) {
                document.getElementById('tanggal').value = kegiatan.tanggal;
                document.getElementById('jenis_kegiatan').value = kegiatan.jenis;
                document.getElementById('perangkat').value = kegiatan.perangkat;
                document.getElementById('deskripsi').value = kegiatan.deskripsi;
                document.getElementById('status').value = kegiatan.status;
                
                isEditing = true;
                
                // Hide modal
                const modal = new FlowbiteModal(document.getElementById('detail-kegiatan-modal'));
                modal.hide();
                
                // Scroll to form
                document.getElementById('kegiatan-form').scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Hapus Kegiatan
        document.getElementById('hapus-kegiatan-btn').addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin menghapus kegiatan ini?')) {
                kegiatanData = kegiatanData.filter(item => item.id !== currentDetailId);
                localStorage.setItem('kegiatanData', JSON.stringify(kegiatanData));
                
                // Hide modal
                const modal = new FlowbiteModal(document.getElementById('detail-kegiatan-modal'));
                modal.hide();
                
                // Refresh table
                renderKegiatanTable(currentKegiatanPage, getCurrentKegiatanFilters());
                updateStats();
                
                alert('Kegiatan berhasil dihapus!');
            }
        });
        
        // Edit Perbaikan
        document.getElementById('edit-perbaikan-btn').addEventListener('click', function() {
            const perbaikan = perbaikanData.find(item => item.id === currentDetailId);
            
            if (perbaikan) {
                document.getElementById('perbaikan-tanggal').value = perbaikan.tanggal;
                document.getElementById('perbaikan-perangkat').value = perbaikan.perangkat;
                document.getElementById('perbaikan-kerusakan').value = perbaikan.kerusakan;
                document.getElementById('perbaikan-deskripsi').value = perbaikan.deskripsi;
                document.getElementById('perbaikan-tindakan').value = perbaikan.tindakan;
                document.getElementById('perbaikan-status').value = perbaikan.status;
                document.getElementById('perbaikan-keterangan').value = perbaikan.keterangan || '';
                
                isEditing = true;
                
                // Hide modal
                const modal = new FlowbiteModal(document.getElementById('detail-perbaikan-modal'));
                modal.hide();
                
                // Scroll to form
                document.getElementById('perbaikan-form').scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Hapus Perbaikan
        document.getElementById('hapus-perbaikan-btn').addEventListener('click', function() {
            if (confirm('Apakah Anda yakin ingin menghapus laporan perbaikan ini?')) {
                perbaikanData = perbaikanData.filter(item => item.id !== currentDetailId);
                localStorage.setItem('perbaikanData', JSON.stringify(perbaikanData));
                
                // Hide modal
                const modal = new FlowbiteModal(document.getElementById('detail-perbaikan-modal'));
                modal.hide();
                
                // Refresh table
                renderPerbaikanTable(currentPerbaikanPage, getCurrentPerbaikanFilters());
                updateStats();
                
                alert('Laporan perbaikan berhasil dihapus!');
            }
        });
        
        // Filter Kegiatan
        filterJenis.addEventListener('change', function() {
            renderKegiatanTable(1, getCurrentKegiatanFilters());
        });
        
        filterStatus.addEventListener('change', function() {
            renderKegiatanTable(1, getCurrentKegiatanFilters());
        });
        
        searchInput.addEventListener('input', function() {
            renderKegiatanTable(1, getCurrentKegiatanFilters());
        });
        
        filterHariIni.addEventListener('click', function() {
            const today = new Date();
            const startDate = new Date(today.setHours(0, 0, 0, 0));
            const endDate = new Date(today.setHours(23, 59, 59, 999));
            
            // Update filter buttons style
            filterHariIni.classList.add('bg-blue-100', 'text-blue-800');
            filterHariIni.classList.remove('bg-gray-100');
            filterMingguIni.classList.remove('bg-blue-100', 'text-blue-800');
            filterMingguIni.classList.add('bg-gray-100');
            filterBulanIni.classList.remove('bg-blue-100', 'text-blue-800');
            filterBulanIni.classList.add('bg-gray-100');
            filterSemua.classList.remove('bg-blue-100', 'text-blue-800');
            filterSemua.classList.add('bg-gray-100');
            
            renderKegiatanTable(1, {
                ...getCurrentKegiatanFilters(),
                dateRange: {
                    start: startDate.toISOString().split('T')[0],
                    end: endDate.toISOString().split('T')[0]
                }
            });
        });
        
        filterMingguIni.addEventListener('click', function() {
            const today = new Date();
            const startDate = new Date(today.setDate(today.getDate() - today.getDay()));
            const endDate = new Date(today.setDate(today.getDate() + 6));
            
            // Update filter buttons style
            filterHariIni.classList.remove('bg-blue-100', 'text-blue-800');
            filterHariIni.classList.add('bg-gray-100');
            filterMingguIni.classList.add('bg-blue-100', 'text-blue-800');
            filterMingguIni.classList.remove('bg-gray-100');
            filterBulanIni.classList.remove('bg-blue-100', 'text-blue-800');
            filterBulanIni.classList.add('bg-gray-100');
            filterSemua.classList.remove('bg-blue-100', 'text-blue-800');
            filterSemua.classList.add('bg-gray-100');
            
            renderKegiatanTable(1, {
                ...getCurrentKegiatanFilters(),
                dateRange: {
                    start: startDate.toISOString().split('T')[0],
                    end: endDate.toISOString().split('T')[0]
                }
            });
        });
        
        filterBulanIni.addEventListener('click', function() {
            const today = new Date();
            const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            
            // Update filter buttons style
            filterHariIni.classList.remove('bg-blue-100', 'text-blue-800');
            filterHariIni.classList.add('bg-gray-100');
            filterMingguIni.classList.remove('bg-blue-100', 'text-blue-800');
            filterMingguIni.classList.add('bg-gray-100');
            filterBulanIni.classList.add('bg-blue-100', 'text-blue-800');
            filterBulanIni.classList.remove('bg-gray-100');
            filterSemua.classList.remove('bg-blue-100', 'text-blue-800');
            filterSemua.classList.add('bg-gray-100');
            
            renderKegiatanTable(1, {
                ...getCurrentKegiatanFilters(),
                dateRange: {
                    start: startDate.toISOString().split('T')[0],
                    end: endDate.toISOString().split('T')[0]
                }
            });
        });
        
        filterSemua.addEventListener('click', function() {
            // Update filter buttons style
            filterHariIni.classList.remove('bg-blue-100', 'text-blue-800');
            filterHariIni.classList.add('bg-gray-100');
            filterMingguIni.classList.remove('bg-blue-100', 'text-blue-800');
            filterMingguIni.classList.add('bg-gray-100');
            filterBulanIni.classList.remove('bg-blue-100', 'text-blue-800');
            filterBulanIni.classList.add('bg-gray-100');
            filterSemua.classList.add('bg-blue-100', 'text-blue-800');
            filterSemua.classList.remove('bg-gray-100');
            
            renderKegiatanTable(1, {
                ...getCurrentKegiatanFilters(),
                dateRange: null
            });
        });
        
        // Filter Perbaikan
        filterPerbaikanKerusakan.addEventListener('change', function() {
            renderPerbaikanTable(1, getCurrentPerbaikanFilters());
        });
        
        filterPerbaikanStatus.addEventListener('change', function() {
            renderPerbaikanTable(1, getCurrentPerbaikanFilters());
        });
        
        searchPerbaikanInput.addEventListener('input', function() {
            renderPerbaikanTable(1, getCurrentPerbaikanFilters());
        });
        
        filterPerbaikanHariIni.addEventListener('click', function() {
            const today = new Date();
            const startDate = new Date(today.setHours(0, 0, 0, 0));
            const endDate = new Date(today.setHours(23, 59, 59, 999));
            
            // Update filter buttons style
            filterPerbaikanHariIni.classList.add('bg-blue-100', 'text-blue-800');
            filterPerbaikanHariIni.classList.remove('bg-gray-100');
            filterPerbaikanMingguIni.classList.remove('bg-blue-100', 'text-blue-800');
            filterPerbaikanMingguIni.classList.add('bg-gray-100');
            filterPerbaikanBulanIni.classList.remove('bg-blue-100', 'text-blue-800');
            filterPerbaikanBulanIni.classList.add('bg-gray-100');
            filterPerbaikanSemua.classList.remove('bg-blue-100', 'text-blue-800');
            filterPerbaikanSemua.classList.add('bg-gray-100');
            
            renderPerbaikanTable(1, {
                ...getCurrentPerbaikanFilters(),
                dateRange: {
                    start: startDate.toISOString().split('T')[0],
                    end: endDate.toISOString().split('T')[0]
                }
            });
        });
        
        filterPerbaikanMingguIni.addEventListener('click', function() {
            const today = new Date();
            const startDate = new Date(today.setDate(today.getDate() - today.getDay()));
            const endDate = new Date(today.setDate(today.getDate() + 6));
            
            // Update filter buttons style
            filterPerbaikanHariIni.classList.remove('bg-blue-100', 'text-blue-800');
            filterPerbaikanHariIni.classList.add('bg-gray-100');
            filterPerbaikanMingguIni.classList.add('bg-blue-100', 'text-blue-800');
            filterPerbaikanMingguIni.classList.remove('bg-gray-100');
            filterPerbaikanBulanIni.classList.remove('bg-blue-100', 'text-blue-800');
            filterPerbaikanBulanIni.classList.add('bg-gray-100');
            filterPerbaikanSemua.classList.remove('bg-blue-100', 'text-blue-800');
            filterPerbaikanSemua.classList.add('bg-gray-100');
            
            renderPerbaikanTable(1, {
                ...getCurrentPerbaikanFilters(),
                dateRange: {
                    start: startDate.toISOString().split('T')[0],
                    end: endDate.toISOString().split('T')[0]
                }
            });
        });
        
        filterPerbaikanBulanIni.addEventListener('click', function() {
            const today = new Date();
            const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            
            // Update filter buttons style
            filterPerbaikanHariIni.classList.remove('bg-blue-100', 'text-blue-800');
            filterPerbaikanHariIni.classList.add('bg-gray-100');
            filterPerbaikanMingguIni.classList.remove('bg-blue-100', 'text-blue-800');
            filterPerbaikanMingguIni.classList.add('bg-gray-100');
            filterPerbaikanBulanIni.classList.add('bg-blue-100', 'text-blue-800');
            filterPerbaikanBulanIni.classList.remove('bg-gray-100');
            filterPerbaikanSemua.classList.remove('bg-blue-100', 'text-blue-800');
            filterPerbaikanSemua.classList.add('bg-gray-100');
            
            renderPerbaikanTable(1, {
                ...getCurrentPerbaikanFilters(),
                dateRange: {
                    start: startDate.toISOString().split('T')[0],
                    end: endDate.toISOString().split('T')[0]
                }
            });
        });
        
        filterPerbaikanSemua.addEventListener('click', function() {
            // Update filter buttons style
            filterPerbaikanHariIni.classList.remove('bg-blue-100', 'text-blue-800');
            filterPerbaikanHariIni.classList.add('bg-gray-100');
            filterPerbaikanMingguIni.classList.remove('bg-blue-100', 'text-blue-800');
            filterPerbaikanMingguIni.classList.add('bg-gray-100');
            filterPerbaikanBulanIni.classList.remove('bg-blue-100', 'text-blue-800');
            filterPerbaikanBulanIni.classList.add('bg-gray-100');
            filterPerbaikanSemua.classList.add('bg-blue-100', 'text-blue-800');
            filterPerbaikanSemua.classList.remove('bg-gray-100');
            
            renderPerbaikanTable(1, {
                ...getCurrentPerbaikanFilters(),
                dateRange: null
            });
        });
        
        // Get Current Kegiatan Filters
        function getCurrentKegiatanFilters() {
            const today = new Date();
            let dateRange = null;
            
            if (filterHariIni.classList.contains('bg-blue-100')) {
                const startDate = new Date(today.setHours(0, 0, 0, 0));
                const endDate = new Date(today.setHours(23, 59, 59, 999));
                dateRange = {
                    start: startDate.toISOString().split('T')[0],
                    end: endDate.toISOString().split('T')[0]
                };
            } else if (filterMingguIni.classList.contains('bg-blue-100')) {
                const startDate = new Date(today.setDate(today.getDate() - today.getDay()));
                const endDate = new Date(today.setDate(today.getDate() + 6));
                dateRange = {
                    start: startDate.toISOString().split('T')[0],
                    end: endDate.toISOString().split('T')[0]
                };
            } else if (filterBulanIni.classList.contains('bg-blue-100')) {
                const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                dateRange = {
                    start: startDate.toISOString().split('T')[0],
                    end: endDate.toISOString().split('T')[0]
                };
            }
            
            return {
                jenis: filterJenis.value || '',
                status: filterStatus.value || '',
                search: searchInput.value || '',
                dateRange: dateRange
            };
        }
        
        // Get Current Perbaikan Filters
        function getCurrentPerbaikanFilters() {
            const today = new Date();
            let dateRange = null;
            
            if (filterPerbaikanHariIni.classList.contains('bg-blue-100')) {
                const startDate = new Date(today.setHours(0, 0, 0, 0));
                const endDate = new Date(today.setHours(23, 59, 59, 999));
                dateRange = {
                    start: startDate.toISOString().split('T')[0],
                    end: endDate.toISOString().split('T')[0]
                };
            } else if (filterPerbaikanMingguIni.classList.contains('bg-blue-100')) {
                const startDate = new Date(today.setDate(today.getDate() - today.getDay()));
                const endDate = new Date(today.setDate(today.getDate() + 6));
                dateRange = {
                    start: startDate.toISOString().split('T')[0],
                    end: endDate.toISOString().split('T')[0]
                };
            } else if (filterPerbaikanBulanIni.classList.contains('bg-blue-100')) {
                const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                dateRange = {
                    start: startDate.toISOString().split('T')[0],
                    end: endDate.toISOString().split('T')[0]
                };
            }
            
            return {
                kerusakan: filterPerbaikanKerusakan.value || '',
                status: filterPerbaikanStatus.value || '',
                search: searchPerbaikanInput.value || '',
                dateRange: dateRange
            };
        }
        
        // Laporan Kegiatan Form
        laporanKegiatanForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const dariTanggal = document.getElementById('laporan-kegiatan-dari').value;
            const sampaiTanggal = document.getElementById('laporan-kegiatan-sampai').value;
            const jenis = document.getElementById('laporan-kegiatan-jenis').value;
            const status = document.getElementById('laporan-kegiatan-status').value;
            
            if (new Date(dariTanggal) > new Date(sampaiTanggal)) {
                alert('Tanggal "Dari" tidak boleh lebih besar dari tanggal "Sampai"');
                return;
            }
            
            // Filter data
            let filteredData = [...kegiatanData].filter(item => {
                const itemDate = new Date(item.tanggal);
                return itemDate >= new Date(dariTanggal) && itemDate <= new Date(sampaiTanggal);
            });
            
            if (jenis) {
                filteredData = filteredData.filter(item => item.jenis === jenis);
            }
            
            if (status) {
                filteredData = filteredData.filter(item => item.status === status);
            }
            
            // Generate laporan
            generateLaporanKegiatan(filteredData, dariTanggal, sampaiTanggal, jenis, status);
        });
        
        // Laporan Perbaikan Form
        laporanPerbaikanForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const dariTanggal = document.getElementById('laporan-perbaikan-dari').value;
            const sampaiTanggal = document.getElementById('laporan-perbaikan-sampai').value;
            const kerusakan = document.getElementById('laporan-perbaikan-kerusakan').value;
            const status = document.getElementById('laporan-perbaikan-status').value;
            
            if (new Date(dariTanggal) > new Date(sampaiTanggal)) {
                alert('Tanggal "Dari" tidak boleh lebih besar dari tanggal "Sampai"');
                return;
            }
            
            // Filter data
            let filteredData = [...perbaikanData].filter(item => {
                const itemDate = new Date(item.tanggal);
                return itemDate >= new Date(dariTanggal) && itemDate <= new Date(sampaiTanggal);
            });
            
            if (kerusakan) {
                filteredData = filteredData.filter(item => item.kerusakan === kerusakan);
            }
            
            if (status) {
                filteredData = filteredData.filter(item => item.status === status);
            }
            
            // Generate laporan
            generateLaporanPerbaikan(filteredData, dariTanggal, sampaiTanggal, kerusakan, status);
        });
        
        // Generate Laporan Kegiatan
        function generateLaporanKegiatan(data, dariTanggal, sampaiTanggal, jenis, status) {
            laporanTitle.textContent = `Laporan Kegiatan ${formatDate(dariTanggal, true)} - ${formatDate(sampaiTanggal, true)}`;
            
            let html = `
                <div class="mb-4">
                    <p><strong>Periode:</strong> ${formatDate(dariTanggal, true)} - ${formatDate(sampaiTanggal, true)}</p>
                    <p><strong>Jumlah Data:</strong> ${data.length}</p>
                    ${jenis ? `<p><strong>Jenis Kegiatan:</strong> ${getJenisKegiatanText(jenis)}</p>` : ''}
                    ${status ? `<p><strong>Status:</strong> ${getStatusText(status)}</p>` : ''}
                </div>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3">Tanggal</th>
                                <th scope="col" class="px-6 py-3">Jenis Kegiatan</th>
                                <th scope="col" class="px-6 py-3">Perangkat</th>
                                <th scope="col" class="px-6 py-3">Deskripsi</th>
                                <th scope="col" class="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            if (data.length === 0) {
                html += `
                    <tr class="bg-white border-b hover:bg-gray-50">
                        <td colspan="5" class="px-6 py-4 text-center">Tidak ada data kegiatan</td>
                    </tr>
                `;
            } else {
                data.forEach(item => {
                    html += `
                        <tr class="bg-white border-b hover:bg-gray-50">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                ${formatDate(item.tanggal)}
                            </td>
                            <td class="px-6 py-4">${getJenisKegiatanText(item.jenis)}</td>
                            <td class="px-6 py-4">${item.perangkat}</td>
                            <td class="px-6 py-4">${item.deskripsi}</td>
                            <td class="px-6 py-4">
                                ${getStatusBadge(item.status)}
                            </td>
                        </tr>
                    `;
                });
            }
            
            html += `
                        </tbody>
                    </table>
                </div>
            `;
            
            laporanContentData.innerHTML = html;
            laporanResult.classList.remove('hidden');
            
            // Scroll to result
            laporanResult.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Generate Laporan Perbaikan
        function generateLaporanPerbaikan(data, dariTanggal, sampaiTanggal, kerusakan, status) {
            laporanTitle.textContent = `Laporan Perbaikan ${formatDate(dariTanggal, true)} - ${formatDate(sampaiTanggal, true)}`;
            
            let html = `
                <div class="mb-4">
                    <p><strong>Periode:</strong> ${formatDate(dariTanggal, true)} - ${formatDate(sampaiTanggal, true)}</p>
                    <p><strong>Jumlah Data:</strong> ${data.length}</p>
                    ${kerusakan ? `<p><strong>Jenis Kerusakan:</strong> ${getJenisKerusakanText(kerusakan)}</p>` : ''}
                    ${status ? `<p><strong>Status:</strong> ${getPerbaikanStatusText(status)}</p>` : ''}
                </div>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="px-6 py-3">Tanggal</th>
                                <th scope="col" class="px-6 py-3">Perangkat</th>
                                <th scope="col" class="px-6 py-3">Kerusakan</th>
                                <th scope="col" class="px-6 py-3">Deskripsi</th>
                                <th scope="col" class="px-6 py-3">Tindakan</th>
                                <th scope="col" class="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            if (data.length === 0) {
                html += `
                    <tr class="bg-white border-b hover:bg-gray-50">
                        <td colspan="6" class="px-6 py-4 text-center">Tidak ada data perbaikan</td>
                    </tr>
                `;
            } else {
                data.forEach(item => {
                    html += `
                        <tr class="bg-white border-b hover:bg-gray-50">
                            <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                ${formatDate(item.tanggal)}
                            </td>
                            <td class="px-6 py-4">${item.perangkat}</td>
                            <td class="px-6 py-4">${getJenisKerusakanText(item.kerusakan)}</td>
                            <td class="px-6 py-4">${item.deskripsi}</td>
                            <td class="px-6 py-4">${item.tindakan}</td>
                            <td class="px-6 py-4">
                                ${getPerbaikanStatusBadge(item.status)}
                            </td>
                        </tr>
                    `;
                });
            }
            
            html += `
                        </tbody>
                    </table>
                </div>
            `;
            
            laporanContentData.innerHTML = html;
            laporanResult.classList.remove('hidden');
            
            // Scroll to result
            laporanResult.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Cetak Laporan
        cetakLaporanBtn.addEventListener('click', function() {
            const printContent = laporanContentData.innerHTML;
            const originalContent = document.body.innerHTML;
            
            document.body.innerHTML = `
                <div style="padding: 20px;">
                    <h1 style="text-align: center; margin-bottom: 20px;">${laporanTitle.textContent}</h1>
                    ${printContent}
                </div>
            `;
            
            window.print();
            document.body.innerHTML = originalContent;
            renderKegiatanTable(currentKegiatanPage, getCurrentKegiatanFilters());
            renderPerbaikanTable(currentPerbaikanPage, getCurrentPerbaikanFilters());
        });
        
        // Update Stats
        function updateStats() {
            // Total kegiatan
            document.getElementById('total-kegiatan').textContent = kegiatanData.length;
            
            // Kegiatan selesai
            const selesai = kegiatanData.filter(item => item.status === 'selesai').length;
            document.getElementById('selesai-kegiatan').textContent = selesai;
            
            // Kegiatan dalam proses
            const proses = kegiatanData.filter(item => item.status === 'proses').length;
            document.getElementById('proses-kegiatan').textContent = proses;
            
            // Kegiatan ditunda
            const tunda = kegiatanData.filter(item => item.status === 'tunda').length;
            document.getElementById('tunda-kegiatan').textContent = tunda;
            
            // Update recent activities
            const recentActivities = document.getElementById('recent-activities');
            recentActivities.innerHTML = '';
            
            const sortedKegiatan = [...kegiatanData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
            
            if (sortedKegiatan.length === 0) {
                recentActivities.innerHTML = `
                    <tr class="bg-white border-b hover:bg-gray-50">
                        <td colspan="3" class="px-6 py-4 text-center">Tidak ada data kegiatan</td>
                    </tr>
                `;
            } else {
                sortedKegiatan.forEach(item => {
                    const row = document.createElement('tr');
                    row.className = 'bg-white border-b hover:bg-gray-50';
                    row.innerHTML = `
                        <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            ${formatDate(item.tanggal)}
                        </td>
                        <td class="px-6 py-4">${getJenisKegiatanText(item.jenis)}</td>
                        <td class="px-6 py-4">
                            ${getStatusBadge(item.status)}
                        </td>
                    `;
                    recentActivities.appendChild(row);
                });
            }
            
            // Update chart
            updateChart();
        }
        
        // Initialize Chart
        function initChart() {
            const ctx = document.getElementById('repairChart').getContext('2d');
            window.repairChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Perawatan', 'Perbaikan', 'Instalasi', 'Troubleshooting', 'Jaringan', 'Lainnya'],
                    datasets: [{
                        label: 'Jumlah Kegiatan',
                        data: [0, 0, 0, 0, 0, 0],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.5)',
                            'rgba(255, 99, 132, 0.5)',
                            'rgba(75, 192, 192, 0.5)',
                            'rgba(255, 206, 86, 0.5)',
                            'rgba(153, 102, 255, 0.5)',
                            'rgba(201, 203, 207, 0.5)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(201, 203, 207, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                }
            });
        }
        
        // Update Chart
        function updateChart() {
            const jenisKegiatan = ['perawatan', 'perbaikan', 'instalasi', 'troubleshooting', 'jaringan', 'lainnya'];
            const data = jenisKegiatan.map(jenis => 
                kegiatanData.filter(item => item.jenis === jenis).length
            );
            
            window.repairChart.data.datasets[0].data = data;
            window.repairChart.update();
        }
        
        // Helper Functions
        function formatDate(dateString, full = false) {
            const date = new Date(dateString);
            const options = full 
                ? { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
                : { day: '2-digit', month: '2-digit', year: 'numeric' };
            return date.toLocaleDateString('id-ID', options);
        }
        
        function getJenisKegiatanText(jenis) {
            const jenisMap = {
                'perawatan': 'Perawatan Rutin',
                'perbaikan': 'Perbaikan Hardware',
                'instalasi': 'Instalasi Software',
                'troubleshooting': 'Troubleshooting',
                'jaringan': 'Perbaikan Jaringan',
                'lainnya': 'Lainnya'
            };
            return jenisMap[jenis] || jenis;
        }
        
        function getJenisKerusakanText(jenis) {
            const jenisMap = {
                'hardware': 'Hardware',
                'software': 'Software',
                'jaringan': 'Jaringan',
                'lainnya': 'Lainnya'
            };
            return jenisMap[jenis] || jenis;
        }
        
        function getStatusText(status) {
            const statusMap = {
                'selesai': 'Selesai',
                'proses': 'Dalam Proses',
                'tunda': 'Ditunda'
            };
            return statusMap[status] || status;
        }
        
        function getPerbaikanStatusText(status) {
            const statusMap = {
                'selesai': 'Selesai',
                'proses': 'Dalam Proses',
                'butuh-part': 'Butuh Part Pengganti',
                'tunda': 'Ditunda'
            };
            return statusMap[status] || status;
        }
        
        function getStatusBadge(status) {
            const statusMap = {
                'selesai': { text: 'Selesai', class: 'bg-green-100 text-green-800' },
                'proses': { text: 'Dalam Proses', class: 'bg-yellow-100 text-yellow-800' },
                'tunda': { text: 'Ditunda', class: 'bg-red-100 text-red-800' }
            };
            
            const statusInfo = statusMap[status] || { text: status, class: 'bg-gray-100 text-gray-800' };
            
            return `<span class="${statusInfo.class} text-xs font-medium px-2.5 py-0.5 rounded">${statusInfo.text}</span>`;
        }
        
        function getPerbaikanStatusBadge(status) {
            const statusMap = {
                'selesai': { text: 'Selesai', class: 'bg-green-100 text-green-800' },
                'proses': { text: 'Dalam Proses', class: 'bg-yellow-100 text-yellow-800' },
                'butuh-part': { text: 'Butuh Part', class: 'bg-blue-100 text-blue-800' },
                'tunda': { text: 'Ditunda', class: 'bg-red-100 text-red-800' }
            };
            
            const statusInfo = statusMap[status] || { text: status, class: 'bg-gray-100 text-gray-800' };
            
            return `<span class="${statusInfo.class} text-xs font-medium px-2.5 py-0.5 rounded">${statusInfo.text}</span>`;
        }
    </script>