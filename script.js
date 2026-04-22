document.addEventListener('DOMContentLoaded', () => {
    // Top Nav Scroll Effect
    const navTop = document.querySelector('.nav-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navTop.classList.add('scrolled');
        } else {
            navTop.classList.remove('scrolled');
        }
    });

    // Global Order Data with Persistence
    const defaultOrders = [
        { id: 'BK-123', product: 'Zaljubljeni Buket', status: 'U izradi', date: '09.03.2026.', address: 'Maksimirska 10, Zagreb', deliveryTime: '12. ožujka u 10:00 h', price: '€45.00' },
        { id: 'BK-456', product: 'Bijela Elegancija', status: 'Dostavljeno', date: '08.03.2026.', address: 'Ilica 50, Zagreb', deliveryTime: '10. ožujka u 14:00 h', price: '€55.00' },
        { id: 'BK-789', product: 'Proljetni Mix', status: 'Zaprimljeno', date: '09.03.2026.', address: 'Selska 120, Zagreb', deliveryTime: '11. ožujka u 09:00 h', price: '€35.00' }
    ];

    // Initialize Supabase
    const supabaseUrl = 'https://mwczxmahgppnlxbhkmbi.supabase.co';
    const supabaseKey = 'sb_publishable_ELnMzzd-dDQGbnwkU103_Q_pP0k7WfU';
    const supabaseClient = window.supabase ? window.supabase.createClient(supabaseUrl, supabaseKey) : null;

    let globalOrders = JSON.parse(localStorage.getItem('buket3klik_orders')) || defaultOrders;

    function saveOrders(order = null) {
        localStorage.setItem('buket3klik_orders', JSON.stringify(globalOrders));
        
        // Sync new order to Supabase if provided
        if (order && supabaseClient) {
            syncOrderToSupabase(order);
        }
    }

    async function syncOrderToSupabase(order) {
        try {
            const { error } = await supabaseClient
                .from('orders')
                .insert([{
                    order_id: order.id,
                    product: order.product,
                    status: order.status,
                    price: order.price,
                    address: order.address,
                    delivery_time: order.deliveryTime,
                    payment_method: order.paymentMethod,
                    date: order.date
                }]);
            if (error) console.error('Supabase Sync Error:', error);
            else console.log('Order synced to Supabase!');
        } catch (err) {
            console.error('Supabase Sync failed:', err);
        }
    }

    let currentSelectedProduct = '';
    let currentSelectedPrice = '';
    let currentSelectedTime = '';

    // Admin Account Elements
    const adminHeartLink = document.getElementById('admin-heart-link');
    const adminModal = document.getElementById('admin-modal');
    const closeAdminModal = document.getElementById('close-admin-modal');
    const adminLoginBtn = document.getElementById('admin-login-btn');
    const adminUsernameInput = document.getElementById('admin-username');
    const adminPasswordInput = document.getElementById('admin-password');
    const adminLoginView = document.getElementById('admin-login-view');
    const adminDashboardView = document.getElementById('admin-dashboard-view');
    const adminOrdersList = document.getElementById('admin-orders-list');

    if (adminHeartLink) {
        adminHeartLink.addEventListener('click', (e) => {
            e.preventDefault();
            adminModal.style.display = 'block';
            adminLoginView.classList.remove('hidden');
            adminDashboardView.classList.add('hidden');
            setTimeout(() => adminModal.classList.add('active'), 10);
        });

        closeAdminModal.addEventListener('click', () => {
            adminModal.classList.remove('active');
            setTimeout(() => adminModal.style.display = 'none', 300);
        });

        // Check for saved credentials on open
        const savedUser = localStorage.getItem('adminUser');
        const savedPass = localStorage.getItem('adminPass');
        if (savedUser && savedPass) {
            adminUsernameInput.value = savedUser;
            adminPasswordInput.value = savedPass;
            document.getElementById('admin-remember').checked = true;
        }

        // Password visibility toggle
        const togglePassword = document.getElementById('toggle-password');
        if (togglePassword) {
            togglePassword.addEventListener('click', () => {
                const type = adminPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                adminPasswordInput.setAttribute('type', type);
                togglePassword.classList.toggle('fa-eye');
                togglePassword.classList.toggle('fa-eye-slash');
            });
        }

        // Auto-fill logic (first 3 letters)
        adminUsernameInput.addEventListener('input', (e) => {
            const val = e.target.value;
            if (val.length === 3) {
                const savedUser = localStorage.getItem('adminUser');
                const savedPass = localStorage.getItem('adminPass');
                
                if (savedUser && savedPass && savedUser.toLowerCase().startsWith(val.toLowerCase())) {
                    adminUsernameInput.value = savedUser;
                    adminPasswordInput.value = savedPass;
                    document.getElementById('admin-remember').checked = true;
                    // Trigger a small visual feedback or just focus the login button
                    adminLoginBtn.focus();
                }
            }
        });

        adminLoginBtn.addEventListener('click', () => {
            const user = adminUsernameInput.value;
            const pass = adminPasswordInput.value;
            const remember = document.getElementById('admin-remember').checked;

            if (user === 'buket3klika' && pass === 'antonio2000') {
                if (remember) {
                    localStorage.setItem('adminUser', user);
                    localStorage.setItem('adminPass', pass);
                } else {
                    localStorage.removeItem('adminUser');
                    localStorage.removeItem('adminPass');
                }
                adminLoginView.classList.add('hidden');
                adminDashboardView.classList.remove('hidden');
                renderAdminOrders();
            } else {
                alert('Pogrešno korisničko ime ili lozinka.');
            }
        });

        const adminLogoutBtn = document.getElementById('admin-logout-btn');
        if (adminLogoutBtn) {
            adminLogoutBtn.addEventListener('click', () => {
                adminModal.classList.remove('active');
                setTimeout(() => {
                    adminModal.style.display = 'none';
                    adminLoginView.classList.remove('hidden');
                    adminDashboardView.classList.add('hidden');
                    adminUsernameInput.value = '';
                    adminPasswordInput.value = '';
                }, 300);
            });
        }
    }

    // Wishlist Button Interaction
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');

    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent navigating if wrapped in a link
            const icon = btn.querySelector('i');
            
            // Toggle solid vs regular heart and color
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                btn.style.color = 'var(--accent-red)';
                
                // Add a little pop animation
                btn.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    btn.style.transform = '';
                }, 150);
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                btn.style.color = '';
            }
        });
    });

    // Simple scroll animation for product cards
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('on-screen'); // Za efekt na mobitelu
            } else {
                entry.target.classList.remove('on-screen');
            }
        });
    }, { ...observerOptions, threshold: 0.3 }); // Veći threshold za bolji efekt na sredini ekrana

    const productCards = document.querySelectorAll('.product-card, .subscribe-card');
    
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease-out, transform 0.6s ease-out`; // Maknut delay za on-screen klasu
        observer.observe(card);
    });

    // --- Modal and Map Logic ---
    const modal = document.createElement('div');
    modal.id = 'delivery-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-bg" id="modal-bg"></div>
        <div class="modal-content">
            <button class="close-modal" id="close-modal"><i class="fa-solid fa-xmark"></i></button>
            <div class="delivery-steps-container">
                <div class="delivery-card" id="step-address">
                    <h2>Podaci za dostavu</h2>
                    <div class="input-group">
                        <i class="fa-solid fa-location-dot"></i>
                        <input type="text" id="delivery-address" placeholder="Poštanski broj ili adresa dostave (npr. Maksimirska 10)">
                        <button id="calculate-route-btn">Traži</button>
                    </div>
                    <div id="map-container" class="map-container"></div>
                    <button id="go-to-calendar-btn" class="btn-next" style="display: none;">Dalje <i class="fa-solid fa-arrow-right"></i></button>
                </div>
                
                <div class="delivery-card" id="step-calendar" style="display: none;">
                    <h2>Odaberite termin dostave</h2>
                    <div id="calendar-wrapper" class="calendar-wrapper"></div>
                    <div id="timeslots-wrapper" class="timeslots-wrapper" style="display: none;">
                        <h3>Dostupni termini za <span id="selected-date-display">...</span></h3>
                        <div class="timeslots-grid" id="timeslots-grid"></div>
                    </div>
                </div>

                <div class="delivery-card" id="step-payment" style="display: none;">
                    <div class="secure-badge"><i class="fa-solid fa-shield-halved"></i> Sigurno plaćanje</div>
                    <h2>Pregled narudžbe</h2>
                    <div class="order-summary" id="order-summary">
                        <div class="summary-row">
                            <span>Proizvod</span>
                            <strong id="summary-product">—</strong>
                        </div>
                        <div class="summary-row">
                            <span>Dostava</span>
                            <strong id="summary-delivery">—</strong>
                        </div>
                        <div class="summary-row total">
                            <span>Ukupno</span>
                            <strong id="summary-price">—</strong>
                        </div>
                    </div>

                    <!-- Discount Section -->
                    <div class="discount-section" style="margin-top: 1rem; border-top: 1px solid #eee; padding-top: 1rem;">
                        <div class="discount-toggle" id="discount-toggle" style="display: flex; align-items: center; justify-content: space-between; cursor: pointer; color: var(--text-secondary); font-size: 0.9rem; padding: 0.5rem 0;">
                            <span>Imate kod za popust?</span>
                            <i class="fa-solid fa-chevron-down" id="discount-arrow" style="transition: transform 0.3s ease;"></i>
                        </div>
                        <div id="discount-input-container" class="hidden" style="margin-top: 0.8rem; overflow: hidden; transition: all 0.3s ease;">
                            <div style="display: flex; gap: 0.5rem;">
                                <input type="text" id="discount-code-input" placeholder="Unesite kod" style="flex: 1; padding: 0.8rem; border: 1px solid #ddd; border-radius: 8px; font-size: 0.95rem;">
                                <button id="apply-discount-btn" class="btn-secondary" style="padding: 0 1.2rem; white-space: nowrap; border-radius: 8px;">Primijeni</button>
                            </div>
                            <p id="discount-msg" style="font-size: 0.85rem; margin-top: 0.6rem; min-height: 1.2rem;"></p>
                        </div>
                    </div>

                    <h3 class="payment-methods-title">Odaberite način plaćanja</h3>
                    <div class="payment-methods-grid">
                        <div class="payment-option" data-method="pouzecem">
                            <i class="fa-solid fa-money-bill-wave"></i>
                            <span>Pouzećem</span>
                        </div>
                        <div class="payment-option" data-method="virman">
                            <i class="fa-solid fa-building-columns"></i>
                            <span>Virman</span>
                        </div>
                        <div class="payment-option" data-method="paypal">
                            <i class="fa-brands fa-paypal"></i>
                            <span>PayPal</span>
                        </div>
                        <div class="payment-option" data-method="stripe">
                            <i class="fa-solid fa-credit-card"></i>
                            <span>Kartica</span>
                        </div>
                    </div>

                    <div id="payment-detail-pouzecem" class="payment-detail hidden">
                        <div class="payment-info-box cash">
                            <i class="fa-solid fa-truck"></i>
                            <p>Platite gotovinom ili karticom prilikom preuzimanja buketa na vašim vratima.</p>
                        </div>
                        <button id="btn-order-pouzecem" class="btn-confirm-order"><i class="fa-solid fa-check"></i> Potvrdi narudžbu</button>
                    </div>

                    <div id="payment-detail-virman" class="payment-detail hidden">
                        <div class="payment-info-box bank">
                            <p>Uplatite na sljedeći račun ili skenirajte QR kod:</p>
                            <div class="qr-code-container" style="text-align: center; margin: 1rem 0;">
                                <img src="assets/sepa-qr.png" alt="SEPA QR Kod" style="max-width: 160px; height: auto; border: 1px solid var(--border-color); border-radius: 8px; padding: 5px; background: white;">
                            </div>
                            <div class="iban-display">
                                <span>IBAN</span>
                                <strong>HR51 2360 0003 1186 6255 4</strong>
                            </div>
                            <div class="iban-display">
                                <span>Poziv na broj</span>
                                <strong id="virman-order-id">—</strong>
                            </div>
                            <p class="small-note">Nakon što zaprimimo uplatu, buket će biti poslan u odabranom terminu.</p>
                        </div>
                        <button id="btn-order-virman" class="btn-confirm-order"><i class="fa-solid fa-check"></i> Potvrdi narudžbu</button>
                    </div>

                    <div id="payment-detail-paypal" class="payment-detail hidden">
                        <div class="payment-info-box paypal">
                            <i class="fa-brands fa-paypal" style="font-size: 2rem; color: #003087;"></i>
                            <p>Pošaljite uplatu na naš PayPal račun:</p>
                            <strong class="paypal-email">prodaja.buket3klika@gmail.com</strong>
                            <p class="small-note">U opis uplate upišite svoj kod narudžbe.</p>
                            <p class="small-note" style="margin-top: 0.5rem; color: #be185d; font-weight: 600;">
                                <i class="fa-solid fa-circle-info"></i> Kod narudžbe će se pojaviti nakon što kliknete "Potvrdi narudžbu".
                            </p>
                        </div>
                        <button id="btn-order-paypal" class="btn-confirm-order"><i class="fa-solid fa-check"></i> Potvrdi narudžbu</button>
                    </div>

                    <div id="payment-detail-stripe" class="payment-detail hidden">
                        <div class="payment-info-box stripe">
                            <i class="fa-solid fa-lock" style="font-size: 1.5rem; color: #635bff;"></i>
                            <p>Preusmjerit ćemo vas na sigurnu Stripe stranicu za plaćanje karticom.</p>
                            <p class="small-note">Vaši kartični podaci su potpuno zaštićeni.</p>
                        </div>
                        <button id="stripe-pay-btn" class="btn-stripe"><i class="fa-solid fa-lock"></i> Plati karticom</button>
                    </div>
                </div>

                <div class="delivery-card success-card" id="step-success" style="display: none;">
                    <div class="success-icon"><i class="fa-solid fa-circle-check"></i></div>
                    <h2>Platna transakcija uspješno provedena!</h2>
                    <p id="success-message">Hvala vam na narudžbi. Vaš buket će biti dostavljen u odabranom terminu.</p>
                    
                    <div class="order-confirmation-email">
                        <p>Želite li potvrdu na email? (nije obavezno)</p>
                        <div class="email-input-group">
                            <input type="email" id="confirm-email" placeholder="vaš@email.com">
                            <button id="send-email-btn" class="btn-secondary">Pošalji</button>
                        </div>
                        <p id="email-sent-msg" class="hidden" style="color: var(--accent-green); font-size: 0.9rem; margin-top: 0.5rem;">Potvrda poslana!</p>
                    </div>

                    <div class="tracking-notice">
                        <i class="fa-solid fa-circle-info"></i>
                        <p>Svoju narudžbu možete pratiti u bilo kojem trenutku klikom na <strong>ikonu korisnika u gornjem desnom kutu</strong>.</p>
                    </div>

                    <button id="finish-btn" class="btn-next">Završi</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const closeModalBtn = document.getElementById('close-modal');
    const modalBg = document.getElementById('modal-bg');
    const calculateBtn = document.getElementById('calculate-route-btn');
    const addressInput = document.getElementById('delivery-address');
    const mapContainer = document.getElementById('map-container');
    const goToCalendarBtn = document.getElementById('go-to-calendar-btn');
    const backToAddressBtn = document.getElementById('back-to-address-btn');
    const backToCalendarBtn = document.getElementById('back-to-calendar-btn');
    const finishBtn = document.getElementById('finish-btn');
    const stepAddress = document.getElementById('step-address');
    const stepCalendar = document.getElementById('step-calendar');
    const stepPayment = document.getElementById('step-payment');
    const stepSuccess = document.getElementById('step-success');
    const calendarWrapper = document.getElementById('calendar-wrapper');
    const timeslotsWrapper = document.getElementById('timeslots-wrapper');
    const timeslotsGrid = document.getElementById('timeslots-grid');
    const selectedDateDisplay = document.getElementById('selected-date-display');
    const paymentForm = document.getElementById('payment-form');
    const stripePayBtn = document.getElementById('stripe-pay-btn');

    // Make all products clickable
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if(e.target.closest('.wishlist-btn')) return;
            if(e.target.closest('a')) return; // Allow normal link navigation Without launching modal

            const titleOverlay = card.querySelector('.product-title-overlay');
            if (titleOverlay) {
                currentSelectedProduct = titleOverlay.innerText;
            }

            const priceTag = card.querySelector('.price');
            if (priceTag) {
                currentSelectedPrice = priceTag.innerText;
            }

            const img = card.querySelector('.image-wrapper img');
            if(img) {
                modalBg.style.background = `url("${img.src}") center/cover no-repeat`;
                modalBg.style.filter = "brightness(0.7)";
                modal.classList.add('active');
                document.body.classList.add('modal-open');
                addressInput.value = '';
                mapContainer.style.display = 'none';
                mapContainer.innerHTML = '';
                goToCalendarBtn.style.display = 'none';
                resetToStepAddress();
            }
        });
    });

    function resetToStepAddress() {
        stepAddress.style.display = 'block';
        stepCalendar.style.display = 'none';
        stepPayment.style.display = 'none';
        stepSuccess.style.display = 'none';
    }

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    });

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.classList.contains('modal-bg')) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });

    calculateBtn.addEventListener('click', () => {
        const address = addressInput.value.toLowerCase().trim();
        
        // List of major Croatian cities outside Zagreb region to block
        const blockedCities = [
            'split', 'rijeka', 'osijek', 'zadar', 'pula', 'slavonski brod', 
            'karlovac', 'varazdin', 'sibenik', 'sisak', 'dubrovnik', 
            'koprivnica', 'bjelovar', 'vukovar', 'cakovec', 'pozega'
        ];

        const mentionsBlockedCity = blockedCities.some(city => address.includes(city));
        const outsideRegionZip = /\b[2-5]\d{4}\b/.test(address); 

        if (mentionsBlockedCity || outsideRegionZip) {
            showWarning('Ispričavamo se, ali kupnja i dostava su trenutno dozvoljeni samo u Gradu Zagrebu i Zagrebačkoj županiji.');
            return; // Stop here, don't show map
        }

        if(address) {
            mapContainer.style.display = 'block';
            const mapUrl = `https://maps.google.com/maps?saddr=Importanne+Centar,+Zagreb&daddr=${encodeURIComponent(address + ', Zagreb')}&output=embed`;
            mapContainer.innerHTML = `<iframe src="${mapUrl}"></iframe>`;
            goToCalendarBtn.style.display = 'inline-block';
        }
    });

    goToCalendarBtn.addEventListener('click', () => {
        const address = addressInput.value.toLowerCase();
        
        // List of major Croatian cities outside Zagreb region to block
        const blockedCities = [
            'split', 'rijeka', 'osijek', 'zadar', 'pula', 'slavonski brod', 
            'karlovac', 'varazdin', 'sibenik', 'sisak', 'dubrovnik', 
            'koprivnica', 'bjelovar', 'vukovar', 'cakovec', 'pozega'
        ];

        // Check if address mentions an explicitly blocked city
        const mentionsBlockedCity = blockedCities.some(city => address.includes(city));
        
        // Check for Croatian ZIP codes outside Zagreb region (which start with 2, 3, 4, or 5)
        const outsideRegionZip = /\b[2-5]\d{4}\b/.test(address); 

        if (mentionsBlockedCity || outsideRegionZip) {
            showWarning('Ispričavamo se, ali kupnja i dostava su trenutno dozvoljeni samo u Gradu Zagrebu i Zagrebačkoj županiji.');
            return; // Prevent going to the calendar
        }

        stepAddress.style.display = 'none';
        stepCalendar.style.display = 'block';
        renderCalendar();
    });

    if (backToAddressBtn) {
        backToAddressBtn.addEventListener('click', () => {
            stepCalendar.style.display = 'none';
            stepAddress.style.display = 'block';
        });
    }

    if (backToCalendarBtn) {
        backToCalendarBtn.addEventListener('click', () => {
            stepPayment.style.display = 'none';
            stepCalendar.style.display = 'block';
        });
    }

    finishBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Initialize Stripe with your Publishable Key
    // IMPORTANT: Replace this with your actual Stripe Publishable Key
    const stripePublishableKey = 'pk_live_51TGlCLDAAbrNGNblOBxuNHKCsYW23Xk71vifBUPzFmsJT0F26rmqWgESX5quQcwCh5MZRe9I0tGnDej05ZmHEROe00Kje4tjXH';
    let stripeInstance = null;
    if (typeof Stripe !== 'undefined' && stripePublishableKey !== 'pk_test_PLACEHOLDER') {
        stripeInstance = Stripe(stripePublishableKey);
    }

    // Populate order summary when payment step loads
    // --- Discount Code Logic ---
    let activeDiscount = 0; // percentage

    const setupDiscountLogic = () => {
        const toggle = document.getElementById('discount-toggle');
        const container = document.getElementById('discount-input-container');
        const arrow = document.getElementById('discount-arrow');
        const applyBtn = document.getElementById('apply-discount-btn');
        const codeInput = document.getElementById('discount-code-input');
        const msg = document.getElementById('discount-msg');
        const summaryPrice = document.getElementById('summary-price');

        if (!toggle) return;

        toggle.addEventListener('click', () => {
            container.classList.toggle('hidden');
            arrow.style.transform = container.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        });

        applyBtn.addEventListener('click', () => {
            const code = codeInput.value.trim().toLowerCase();
            let basePrice = parseFloat(currentSelectedPrice.replace(/[^0-9.,]/g, '').replace(',', '.'));
            let discountPercent = 0;
            let discountFlat = 0;
            
            if (code === 'buket3klika10') {
                discountPercent = 10;
            } else if (code === 'buket3klika15') {
                discountPercent = 15;
            } else if (code === 'promo50') {
                if (basePrice > 100) {
                    discountFlat = 50;
                } else {
                    msg.style.color = '#e11d48'; // var(--accent-red)
                    msg.textContent = 'Kod "promo50" vrijedi samo za narudžbe iznad 100€. Vaša cijena je ' + basePrice.toFixed(2) + '€. ';
                    return;
                }
            }

            if (discountPercent > 0 || discountFlat > 0) {
                let newPrice;
                if (discountPercent > 0) {
                    newPrice = (basePrice * (1 - discountPercent / 100)).toFixed(2);
                    msg.textContent = `Popust od ${discountPercent}% je uspješno primijenjen!`;
                } else {
                    newPrice = (basePrice - discountFlat).toFixed(2);
                    msg.textContent = `Popust od ${discountFlat}€ je uspješno primijenjen!`;
                }

                msg.style.color = '#10b981'; // var(--accent-green)
                summaryPrice.textContent = '€' + newPrice;
                currentSelectedPrice = '€' + newPrice; // Update global price for payment
                
                applyBtn.disabled = true;
                codeInput.disabled = true;
                applyBtn.style.opacity = '0.5';
            } else {
                msg.style.color = '#e11d48'; // var(--accent-red)
                msg.textContent = 'Kod nije valjan. Molimo pokušajte ponovno.';
            }
        });
    };

    function populateOrderSummary() {
        const summaryProduct = document.getElementById('summary-product');
        const summaryDelivery = document.getElementById('summary-delivery');
        const summaryPrice = document.getElementById('summary-price');
        if (summaryProduct) summaryProduct.textContent = currentSelectedProduct || 'Buket Ruža';
        if (summaryDelivery) summaryDelivery.textContent = currentSelectedTime || '—';
        if (summaryPrice) summaryPrice.textContent = currentSelectedPrice || '—';
        
        setupDiscountLogic();
    }

    // Override step transition to populate summary
    const origShowTimeSlots = showTimeSlots;

    // --- Payment Method Selection Logic ---
    const paymentOptions = document.querySelectorAll('.payment-option');
    const paymentDetails = document.querySelectorAll('.payment-detail');

    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Toggle active state on options
            paymentOptions.forEach(o => o.classList.remove('active'));
            option.classList.add('active');

            // Show corresponding detail
            const method = option.dataset.method;
            paymentDetails.forEach(d => d.classList.add('hidden'));
            const detail = document.getElementById(`payment-detail-${method}`);
            if (detail) detail.classList.remove('hidden');

            // Pre-fill virman order ID
            if (method === 'virman') {
                const virmanId = document.getElementById('virman-order-id');
                if (virmanId) virmanId.textContent = 'BK-' + Math.floor(100000 + Math.random() * 900000);
            }
        });
    });

    // --- Confirm buttons for non-Stripe methods ---
    function setupConfirmButton(btnId, paymentMethodLabel) {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', () => {
                const orderId = (paymentMethodLabel === 'Virman') 
                    ? document.getElementById('virman-order-id').textContent 
                    : 'BK-' + Math.floor(100000 + Math.random() * 900000);
                const deliveryAddress = addressInput.value.trim();
                completePurchase(orderId, deliveryAddress, paymentMethodLabel);
            });
        }
    }

    setupConfirmButton('btn-order-pouzecem', 'Pouzećem');
    setupConfirmButton('btn-order-virman', 'Virman');
    setupConfirmButton('btn-order-paypal', 'PayPal');

    // --- Stripe Button Handler ---
    if (stripePayBtn) {
        stripePayBtn.addEventListener('click', async () => {
            const orderId = 'BK-' + Math.floor(100000 + Math.random() * 900000);
            const deliveryAddress = addressInput.value.trim();

            localStorage.setItem('pendingOrder', JSON.stringify({
                id: orderId,
                product: currentSelectedProduct || 'Ruže',
                price: currentSelectedPrice,
                address: deliveryAddress,
                deliveryTime: currentSelectedTime,
                date: new Date().toLocaleDateString('hr-HR')
            }));

            if (!stripeInstance) {
                completePurchase(orderId, deliveryAddress, 'Kartica (demo)');
                return;
            }

            stripePayBtn.disabled = true;
            stripePayBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preusmjeravanje...';

            try {
                const response = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        product_name: currentSelectedProduct || 'Buket Ruža',
                        price: currentSelectedPrice,
                        order_id: orderId,
                        delivery_address: deliveryAddress,
                        delivery_time: currentSelectedTime
                    })
                });

                const data = await response.json();

                if (data.sessionId) {
                    await stripeInstance.redirectToCheckout({ sessionId: data.sessionId });
                } else {
                    throw new Error(data.error || 'Nepoznata greška');
                }
            } catch (error) {
                console.error('Payment error:', error);
                alert('Greška pri pokretanju plaćanja: ' + error.message);
                stripePayBtn.disabled = false;
                stripePayBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Plati karticom';
            }
        });
    }

    // Handle successful payment return from Stripe
    function handlePaymentReturn() {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentStatus = urlParams.get('payment');
        const returnOrderId = urlParams.get('order_id');

        if (paymentStatus === 'success' && returnOrderId) {
            const pendingOrder = JSON.parse(localStorage.getItem('pendingOrder'));
            if (pendingOrder) {
                globalOrders.unshift({
                    ...pendingOrder,
                    status: 'Zaprimljeno'
                });
                saveOrders();
                localStorage.removeItem('pendingOrder');

                // Show success in modal
                const successStepModal = document.getElementById('delivery-modal');
                const successStepElem = document.getElementById('step-success');
                const successMsgElem = document.getElementById('success-message');
                const addressStepElem = document.getElementById('step-address');
                
                if (successStepModal) successStepModal.classList.add('active');
                document.body.classList.add('modal-open');
                
                if (addressStepElem) addressStepElem.style.display = 'none';
                if (successStepElem) successStepElem.style.display = 'block';
                
                if (successMsgElem) {
                    successMsgElem.innerHTML = `
                        Hvala vam na narudžbi! Vaš buket će biti dostavljen: <strong>${pendingOrder.deliveryTime}</strong> na adresu <strong>${pendingOrder.address}</strong>.<br>
                        Svoj buket možete pratiti pomoću koda:<br>
                        <span class="order-id-display">${pendingOrder.id}</span>
                    `;
                }

                // RESTORE product and price from pending order for emails
                currentSelectedProduct = pendingOrder.product;
                currentSelectedPrice = pendingOrder.price;
                currentSelectedTime = pendingOrder.deliveryTime;

                // 1. AUTOMATICALLY Send notification to owner (prodaja.buket3klika@gmail.com)
                const ownerNotifParams = {
                    to_email: 'prodaja.buket3klika@gmail.com',
                    order_id: pendingOrder.id,
                    product_name: pendingOrder.product || 'Buket',
                    price: (pendingOrder.price || '').replace(/^Od\s+/i, ''),
                    delivery_address: pendingOrder.address,
                    delivery_time: pendingOrder.deliveryTime,
                    payment_method: 'Kartica (Stripe)'
                };
                emailjs.send('service_eoswglo', 'template_6hdora9', ownerNotifParams)
                    .then(() => console.log('Obavijest vlasniku poslana (Stripe)!'))
                    .catch(err => console.error('Greška slanja obavijesti vlasniku:', err));

                // 2. Setup button for CUSTOMER to request their own confirmation
                setupEmailConfirmation(pendingOrder.id, pendingOrder.address, pendingOrder.deliveryTime);
            }

            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
        } else if (paymentStatus === 'cancelled') {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    // Complete purchase flow for all methods
    function completePurchase(orderId, deliveryAddress, paymentMethod) {
        const newOrder = {
            id: orderId,
            product: currentSelectedProduct || 'Ruže',
            status: 'Zaprimljeno',
            date: new Date().toLocaleDateString('hr-HR'),
            price: currentSelectedPrice,
            address: deliveryAddress,
            deliveryTime: currentSelectedTime,
            paymentMethod: paymentMethod || 'N/A'
        };
        globalOrders.unshift(newOrder);
        saveOrders(newOrder);

        const successMessage = document.getElementById('success-message');
        successMessage.innerHTML = `
            Hvala vam na narudžbi! Vaš buket će biti dostavljen: <strong>${currentSelectedTime}</strong> na adresu <strong>${deliveryAddress}</strong>.<br>
            Način plaćanja: <strong>${paymentMethod}</strong><br>
            Svoj buket možete pratiti pomoću koda:<br>
            <span class="order-id-display">${orderId}</span>
        `;

        stepPayment.style.display = 'none';
        stepSuccess.style.display = 'block';

        // Automatski šalji obavijest vlasniku na prodaja.buket3klika@gmail.com
        const ownerNotifParams = {
            to_email: 'prodaja.buket3klika@gmail.com',
            order_id: orderId,
            product_name: currentSelectedProduct || 'Buket',
            price: (currentSelectedPrice || '').replace(/^Od\s+/i, ''),
            delivery_address: deliveryAddress,
            delivery_time: currentSelectedTime,
            payment_method: paymentMethod || 'N/A',
            logo_url: 'https://buket3klika.hr/assets/rose-logo.png'
        };
        emailjs.send('service_eoswglo', 'template_6hdora9', ownerNotifParams)
            .then(() => console.log('Obavijest vlasniku poslana!'))
            .catch(err => console.error('Greška slanja obavijesti:', err));

        setupEmailConfirmation(orderId, deliveryAddress, currentSelectedTime);

        if (adminDashboardView && !adminDashboardView.classList.contains('hidden')) {
            renderAdminOrders();
        }
    }

    function setupEmailConfirmation(orderId, deliveryAddress, deliveryTime) {
        const sendEmailBtn = document.getElementById('send-email-btn');
        const emailInput = document.getElementById('confirm-email');
        const emailSentMsg = document.getElementById('email-sent-msg');
        
        if (sendEmailBtn) {
            // Reset state for new order
            sendEmailBtn.disabled = false;
            sendEmailBtn.innerHTML = 'Pošalji';
            if (emailInput) { emailInput.disabled = false; emailInput.value = ''; }
            if (emailSentMsg) emailSentMsg.classList.add('hidden');

            sendEmailBtn.onclick = () => {
                const email = emailInput.value.trim();
                if (email.includes('@')) {
                    sendEmailBtn.disabled = true;
                    sendEmailBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Šaljem...';
                    
                    const templateParams = {
                        email: email,
                        order_id: orderId,
                        logo_url: 'https://buket3klika.hr/assets/rose-logo.png',
                        product_name: currentSelectedProduct || 'Prekrasan Buket',
                        delivery_address: deliveryAddress,
                        delivery_time: deliveryTime,
                        price: (currentSelectedPrice || '').replace(/^Od\s+/i, ''),
                        from_email: "prodaja.buket3klika@gmail.com"
                    };

                    emailjs.send('service_eoswglo', 'template_1f1nsi8', templateParams)
                        .then(function(response) {
                           console.log('SUCCESS!', response.status, response.text);
                           sendEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Poslano';
                           emailInput.disabled = true;
                           emailSentMsg.classList.remove('hidden');
                           emailSentMsg.innerHTML = `Potvrda je uspješno poslana na <strong>${email}</strong>!<br><small>Hvala što koristite Buket3Klika.</small>`;
                        }, function(error) {
                           console.log('FAILED...', error);
                           alert('Greška pri slanju: ' + (error.text || 'Nepoznata greška') + '. Provjerite Service ID i Template ID.');
                           sendEmailBtn.disabled = false;
                           sendEmailBtn.innerHTML = 'Pošalji';
                        });
                } else {
                    alert('Molimo unesite ispravan email.');
                }
            };
        }
    }

    // Check for payment return on page load
    handlePaymentReturn();

    function renderCalendar() {
        calendarWrapper.innerHTML = '';
        const now = new Date();
        const daysToShow = 30; 
        
        const navWrapper = document.createElement('div');
        navWrapper.className = 'calendar-nav-wrapper';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'nav-arrow prev-arrow';
        prevBtn.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'nav-arrow next-arrow';
        nextBtn.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'date-slider-container';

        const slider = document.createElement('div');
        slider.className = 'date-slider';

        for (let i = 0; i <= daysToShow; i++) {
            const date = new Date();
            date.setDate(now.getDate() + i);
            
            // If it's today, check if there are any slots left before adding to calendar
            // Actually, we'll allow it and show "no slots" inside if everything is past
            
            const dayEl = document.createElement('div');
            dayEl.className = 'date-item';
            const dayName = date.toLocaleDateString('hr-HR', { weekday: 'short' });
            const dayNum = date.getDate();
            const monthName = date.toLocaleDateString('hr-HR', { month: 'short' });

            dayEl.innerHTML = `
                <span class="date-item-day">${dayName}</span>
                <span class="date-item-num">${dayNum}</span>
                <span class="date-item-month">${monthName}</span>
            `;

            dayEl.addEventListener('click', () => {
                document.querySelectorAll('.date-item').forEach(d => d.classList.remove('selected'));
                dayEl.classList.add('selected');
                showTimeSlots(date);
            });

            if (i === 0) {
                dayEl.classList.add('selected');
                // Defer initial time slots
                setTimeout(() => showTimeSlots(date), 0);
            }

            slider.appendChild(dayEl);
        }

        // Arrow functionality
        const updateArrows = () => {
            const scrollLeft = sliderContainer.scrollLeft;
            const maxScroll = sliderContainer.scrollWidth - sliderContainer.clientWidth;
            
            // Hide prev arrow if at the beginning
            prevBtn.style.opacity = scrollLeft <= 10 ? '0' : '1';
            prevBtn.style.pointerEvents = scrollLeft <= 10 ? 'none' : 'auto';
            
            // Hide next arrow if at the end
            nextBtn.style.opacity = scrollLeft >= maxScroll - 10 ? '0' : '1';
            nextBtn.style.pointerEvents = scrollLeft >= maxScroll - 10 ? 'none' : 'auto';
        };

        sliderContainer.addEventListener('scroll', updateArrows);
        window.addEventListener('resize', updateArrows); // Update on resize too
        setTimeout(updateArrows, 100);

        prevBtn.addEventListener('click', () => {
            sliderContainer.scrollBy({ left: -300, behavior: 'smooth' });
            setTimeout(updateArrows, 400); // Check after animation
        });
        nextBtn.addEventListener('click', () => {
            sliderContainer.scrollBy({ left: 300, behavior: 'smooth' });
            setTimeout(updateArrows, 400); // Check after animation
        });

        sliderContainer.appendChild(slider);
        navWrapper.appendChild(prevBtn);
        navWrapper.appendChild(sliderContainer);
        navWrapper.appendChild(nextBtn);
        calendarWrapper.appendChild(navWrapper);
    }

    function showTimeSlots(date) {
        selectedDateDisplay.innerText = date.toLocaleDateString('hr-HR', { day: 'numeric', month: 'long' });
        timeslotsGrid.innerHTML = '';
        timeslotsWrapper.style.display = 'block';

        const isToday = new Date().toDateString() === date.toDateString();
        const currentHour = new Date().getHours();

        for (let hour = 9; hour <= 21; hour++) {
            // If today, only show future hours + at least 1h buffer (next full hour)
            if (isToday && hour < currentHour + 2) continue;

            const slot = document.createElement('div');
            slot.className = 'time-btn';
            slot.innerHTML = `
                <span class="time-text">${hour}:00</span>
                <span class="time-suffix">h</span>
            `;
            
            slot.addEventListener('click', () => {
                document.querySelectorAll('.time-btn').forEach(s => s.classList.remove('selected'));
                slot.classList.add('selected');
                
                currentSelectedTime = `${selectedDateDisplay.innerText} u ${hour}:00 h`;

                // Quick visual feedback then transition
                slot.style.backgroundColor = 'var(--accent-gold)';
                slot.style.color = 'white';
                
                setTimeout(() => {
                    populateOrderSummary();
                    stepCalendar.style.display = 'none';
                    stepPayment.style.display = 'block';
                }, 400);
            });

            timeslotsGrid.appendChild(slot);
        }

        if (timeslotsGrid.children.length === 0) {
            timeslotsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary); padding: 1rem;">Nema više dostupnih termina za danas.</p>';
        }
    }
    
    addressInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            calculateBtn.click();
        }
    });

    // --- Footer Links Logic ---
    const footerLinks = document.querySelectorAll('.footer-link');
    
    // --- Standalone Info Modal for Legal Content ---
    const infoModal = document.createElement('div');
    infoModal.id = 'info-modal';
    infoModal.className = 'modal info-modal';
    infoModal.innerHTML = `
        <div class="modal-bg"></div>
        <div class="info-modal-content">
            <button class="close-info-modal"><i class="fa-solid fa-xmark"></i></button>
            <div id="info-modal-body"></div>
        </div>
    `;
    document.body.appendChild(infoModal);

    const infoModalBody = document.getElementById('info-modal-body');
    const closeInfoModalBtn = infoModal.querySelector('.close-info-modal');

    const legalContents = {
        'sitemap': {
            title: 'Mapa weba',
            text: `
                <div class="legal-section">
                    <h3>Glavna navigacija</h3>
                    <ul>
                        <li>Naslovnica - Pregled tjedne ponude</li>
                        <li>Korisnički račun - Praćenje narudžbi</li>
                        <li>Trgovina - Svi cvjetni aranžmani</li>
                    </ul>
                    <h3>Kategorije proizvoda</h3>
                    <ul>
                        <li>Klasične Ruže (Crvene, Roze, Bijele)</li>
                        <li>Premium Buketi (Prity Brigitte, Grand Amour)</li>
                        <li>Ekskluzivna Pakiranja</li>
                    </ul>
                    <h3>Korisnička podrška</h3>
                    <ul>
                        <li>Dostava i termini</li>
                        <li>Česta pitanja (FAQ)</li>
                        <li>Kontakt obrazac</li>
                    </ul>
                    <h3>Pravne informacije</h3>
                    <ul>
                        <li>Uvjeti korištenja</li>
                        <li>Pravila privatnosti</li>
                        <li>Izjava o pristupačnosti</li>
                    </ul>
                </div>
            `
        },
        'accessibility': {
            title: 'Izjava o pristupačnosti',
            text: `
                <div class="legal-section">
                    <p>Buket3Klika nastoji osigurati pristupačnost svoje web stranice u skladu sa Zakonom o pristupačnosti mrežnih stranica i programskih rješenja za pokretne uređaje tijela javnog sektora Republike Hrvatske.</p>
                    <h3>Standardi pristupačnosti</h3>
                    <p>Naša stranica implementira sljedeće značajke:</p>
                    <ul>
                        <li>Prilagođeni kontrast boja za bolju čitljivost teksta.</li>
                        <li>Mogućnost navigacije putem tipkovnice.</li>
                        <li>Jasna i konzistentna struktura naslova (H1-H4).</li>
                        <li>Opisni alt tekstovi za sve ključne slike proizvoda.</li>
                    </ul>
                    <h3>Povratne informacije</h3>
                    <p>Ako primijetite bilo kakve poteškoće u korištenju naše stranice, molimo vas da nas kontaktirate putem e-maila kako bismo mogli dodatno unaprijediti vaše iskustvo.</p>
                </div>
            `
        },
        'terms': {
            title: 'Uvjeti korištenja',
            text: `
                <div class="legal-section">
                    <p>Dobrodošli na Buket3Klika. Korištenjem naših usluga pristajete na sljedeće uvjete:</p>
                    <h3>1. Proces kupnje</h3>
                    <p>Kupnja se smatra obavljenom u trenutku uspješne potvrde transakcije. Sve cijene na stranici su iskazane u eurima (€) i uključuju PDV.</p>
                    <h3>2. Dostava i isporuka</h3>
                    <p>Dostava se obavlja na području grada Zagreba i okolice prema terminima odabranim u kalendaru. U slučaju nemogućnosti isporuke zbog krive adrese, zadržavamo pravo dodatne naplate ponovljene dostave.</p>
                    <h3>3. Povrat i reklamacije</h3>
                    <p>Budući da se radi o svježem cvijeću (pokvarljiva roba), povrat nije moguć prema Zakonu o zaštiti potrošača, osim u slučaju vidljivih oštećenja prilikom primopredaje.</p>
                    <h3>4. Odgovornost</h3>
                    <p>Buket3Klika nije odgovoran za privremenu nedostupnost stranice uzrokovanu tehničkim poteškoćama izvan naše kontrole.</p>
                </div>
            `
        },
        'privacy': {
            title: 'Pravila privatnosti i GDPR',
            text: `
                <div class="legal-section">
                    <p>Vaša privatnost nam je prioritet. Ova pravila objašnjavaju kako prikupljamo i štitimo vaše podatke.</p>
                    <h3>1. Prikupljanje podataka</h3>
                    <p>Prikupljamo samo podatke nužne za isporuku: ime, prezime, adresu dostave i e-mail adresu za potvrdu narudžbe.</p>
                    <h3>2. Sigurnost plaćanja</h3>
                    <p>Vaši kartični podaci se ne pohranjuju na našim serverima. Koristimo najnaprednije enkripcijske protokole za obradu transakcija.</p>
                    <h3>3. Kolačići (Cookies)</h3>
                    <p>Koristimo kolačiće kako bismo zapamtili vaše odabire (npr. spremljene narudžbe u lokalnoj pohrani) i poboljšali rad stranice.</p>
                    <h3>4. Vaša prava</h3>
                    <p>U svakom trenutku imate pravo zatražiti uvid u vaše podatke, njihovu ispravku ili potpuno brisanje iz našeg sustava.</p>
                </div>
            `
        }
    };

    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const type = link.getAttribute('data-type');
            if (legalContents[type]) {
                infoModalBody.innerHTML = `
                    <h2 class="legal-modal-title">${legalContents[type].title}</h2>
                    <div class="legal-modal-text">${legalContents[type].text}</div>
                `;
                infoModal.style.display = 'flex';
                setTimeout(() => infoModal.classList.add('active'), 10);
            }
        });
    });

    closeInfoModalBtn.addEventListener('click', () => {
        infoModal.classList.remove('active');
        setTimeout(() => infoModal.style.display = 'none', 300);
    });

    infoModal.querySelector('.modal-bg').addEventListener('click', () => {
        closeInfoModalBtn.click();
    });

    // Order Tracking Logic
    const accountBtn = document.querySelector('.account-btn');
    const trackingModal = document.getElementById('tracking-modal');
    const searchTrackingBtn = document.getElementById('search-tracking-btn');
    const trackingInput = document.getElementById('tracking-code-input');
    const trackingStatusContainer = document.getElementById('tracking-status-container');
    const closeTrackingModalBtn = trackingModal.querySelector('.close-modal');

    accountBtn.addEventListener('click', () => {
        trackingModal.style.display = 'block';
        trackingStatusContainer.classList.add('hidden');
        trackingInput.value = '';
        setTimeout(() => {
            trackingModal.classList.add('active');
        }, 10);
    });

    if (searchTrackingBtn) {
        searchTrackingBtn.addEventListener('click', () => {
            const code = trackingInput.value.trim().toUpperCase();
            const foundOrder = globalOrders.find(o => o.id === code);

            if (foundOrder) {
                trackingStatusContainer.classList.remove('hidden');
                
                const stepReceived = document.getElementById('step-received');
                const stepProcessing = document.getElementById('step-processing');
                const stepDelivered = document.getElementById('step-delivered');
                const lines = document.querySelectorAll('.progress-line');

                // Reset
                [stepReceived, stepProcessing, stepDelivered].forEach(s => s.classList.remove('active'));
                lines.forEach(l => l.classList.remove('active'));

                // Always show received
                stepReceived.classList.add('active');

                if (foundOrder.status === 'U izradi') {
                    stepProcessing.classList.add('active');
                    lines[0].classList.add('active');
                } else if (foundOrder.status === 'Dostavljeno') {
                    stepProcessing.classList.add('active');
                    stepDelivered.classList.add('active');
                    lines.forEach(l => l.classList.add('active'));
                }
            } else {
                alert('Narudžba s tim kodom nije pronađena.');
            }
        });
    }

    closeTrackingModalBtn.addEventListener('click', () => {
        trackingModal.classList.remove('active');
        setTimeout(() => {
            trackingModal.style.display = 'none';
        }, 300);
    });

    window.addEventListener('click', (e) => {
        if (e.target === trackingModal) {
            closeTrackingModalBtn.click();
        }
    });

    searchTrackingBtn.addEventListener('click', () => {
        const code = trackingInput.value.trim().toUpperCase();
        const foundOrder = globalOrders.find(o => o.id === code);

        if (foundOrder) {
            trackingStatusContainer.classList.remove('hidden');
            
            const stepReceived = document.getElementById('step-received');
            const stepProcessing = document.getElementById('step-processing');
            const stepDelivered = document.getElementById('step-delivered');
            const lines = document.querySelectorAll('.progress-line');

            // Reset
            [stepReceived, stepProcessing, stepDelivered].forEach(s => s.classList.remove('active'));
            lines.forEach(l => l.classList.remove('active'));

            // Always show received
            stepReceived.classList.add('active');

            if (foundOrder.status === 'U izradi') {
                stepProcessing.classList.add('active');
                lines[0].classList.add('active');
            } else if (foundOrder.status === 'Dostavljeno') {
                stepProcessing.classList.add('active');
                stepDelivered.classList.add('active');
                lines.forEach(l => l.classList.add('active'));
            }

            // Show additional details for the customer
            let detailsCard = document.getElementById('tracking-details-card');
            if (!detailsCard) {
                detailsCard = document.createElement('div');
                detailsCard.id = 'tracking-details-card';
                detailsCard.className = 'tracking-details-card';
                trackingStatusContainer.appendChild(detailsCard);
            }

            detailsCard.innerHTML = `
                <div class="order-details-grid" style="margin-top: 1.5rem;">
                    <div class="detail-item">
                        <span class="detail-label">Proizvod:</span>
                        <span>${foundOrder.product}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Cijena:</span>
                        <span>${foundOrder.price || '...'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Adresa:</span>
                        <span>${foundOrder.address || '...'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Termin:</span>
                        <span>${foundOrder.deliveryTime || '...'}</span>
                    </div>
                </div>
            `;
        } else {
            alert('Narudžba s tim kodom nije pronađena.');
        }
    });
    async function renderAdminOrders() {
        if (!adminOrdersList) return;

        // 1. First render what we have locally (immediate)
        const renderList = (orders) => {
            if (orders.length === 0) {
                adminOrdersList.innerHTML = '<p style="text-align:center; padding: 2rem; opacity: 0.6;">Nema zaprimljenih narudžbi.</p>';
                return;
            }
            adminOrdersList.innerHTML = orders.map(order => `
                <div class="order-item" data-id="${order.id}">
                    <div class="order-header">
                        <div class="order-info">
                            <h4>${order.product}</h4>
                            <p>Kod: <strong>${order.id}</strong> | Datum: ${order.date}</p>
                        </div>
                        <button class="delete-order-btn" title="Obriši narudžbu"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                    
                    <div class="order-details-grid">
                        <div class="detail-item">
                            <span class="detail-label">Adresa:</span>
                            <span>${order.address || 'Nije navedeno'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Vrijeme dostave:</span>
                            <span>${order.deliveryTime || 'Nije navedeno'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Cijena:</span>
                            <span>${order.price || '...'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Status:</span>
                            <span style="font-weight:700;">${order.status}</span>
                        </div>
                    </div>

                    <div class="admin-status-controls">
                        <button class="status-btn ${order.status === 'Zaprimljeno' ? 'active' : ''}" data-status="Zaprimljeno">Zaprimljeno</button>
                        <button class="status-btn ${order.status === 'U izradi' ? 'active' : ''}" data-status="U izradi">U izradi</button>
                        <button class="status-btn ${order.status === 'Dostavljeno' ? 'active' : ''}" data-status="Dostavljeno">Dostavljeno</button>
                    </div>
                </div>
            `).join('');
            attachOrderEvents();
        };

        renderList(globalOrders);
        
        // 2. Then fetch latest from Supabase if client exists (async)
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient
                    .from('orders')
                    .select('*')
                    .order('created_at', { ascending: false });
                
                if (!error && data) {
                    globalOrders = data.map(o => ({
                        id: o.order_id,
                        product: o.product,
                        status: o.status,
                        date: o.date,
                        price: o.price,
                        address: o.address,
                        deliveryTime: o.delivery_time,
                        paymentMethod: o.payment_method
                    }));
                    renderList(globalOrders);
                }
            } catch (err) {
                console.error('Fetch failed:', err);
            }
        }
    }

    function attachOrderEvents() {
        // Add event listeners to status buttons
        adminOrdersList.querySelectorAll('.status-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const orderId = e.target.closest('.order-item').dataset.id;
                const newStatus = e.target.dataset.status;
                
                // Update shared state
                const orderIndex = globalOrders.findIndex(o => o.id === orderId);
                if (orderIndex !== -1) {
                    globalOrders[orderIndex].status = newStatus;
                    saveOrders();
                    
                    // Update Supabase if client exists
                    if (supabaseClient) {
                        supabaseClient
                            .from('orders')
                            .update({ status: newStatus })
                            .eq('order_id', orderId)
                            .then(({ error }) => {
                                if (error) console.error('Status sync error:', error);
                            });
                    }
                    
                    renderAdminOrders(); // Re-render to show active state
                }
            });
        });

        // Add event listeners to delete buttons
        adminOrdersList.querySelectorAll('.delete-order-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const orderItem = e.target.closest('.order-item');
                const orderId = orderItem.dataset.id;
                
                if (confirm(`Jeste li sigurni da želite obrisati narudžbu ${orderId}?`)) {
                    const orderIndex = globalOrders.findIndex(o => o.id === orderId);
                    if (orderIndex !== -1) {
                        globalOrders.splice(orderIndex, 1);
                        saveOrders();
                        
                        // Delete from Supabase if client exists
                        if (supabaseClient) {
                            supabaseClient
                                .from('orders')
                                .delete()
                                .eq('order_id', orderId)
                                .then(({ error }) => {
                                    if (error) console.error('Delete sync error:', error);
                                });
                        }

                        renderAdminOrders();
                    }
                }
            });
        });
    }

    window.showWarning = function(message) {
        const warningModal = document.getElementById('warning-modal');
        const warningText = document.getElementById('warning-text');
        if (warningModal && warningText) {
            warningText.textContent = message;
            warningModal.classList.add('active');
        }
    };

    window.closeWarning = function() {
        const warningModal = document.getElementById('warning-modal');
        if (warningModal) {
            warningModal.classList.remove('active');
        }
    };

    window.openCheckout = function(customProduct) {
        currentSelectedProduct = customProduct.title;
        currentSelectedPrice = "€" + customProduct.price.toFixed(2);
        if(customProduct.image && modalBg) {
            modalBg.style.background = `url("${customProduct.image}") center/cover no-repeat`;
            modalBg.style.filter = "brightness(0.7)";
        }
        if(modal) {
            modal.classList.add('active');
            document.body.classList.add('modal-open');
            addressInput.value = '';
            mapContainer.style.display = 'none';
            mapContainer.innerHTML = '';
            goToCalendarBtn.style.display = 'none';
            resetToStepAddress();
        }
    };
});

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = document.getElementById('contact-submit-btn');
            
            // Collect data
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;

            const templateParams = {
                from_name: name,
                reply_to: email,
                message: message,
            };

            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Šaljem...';
            submitBtn.disabled = true;

            // Slanje preko novog EmailJS servera za kontakt formu
            emailjs.send('service_r61ifgg', 'template_fxcxnjj', templateParams, 'Wysfkzz-egv4cmg91')
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Uspješno poslano';
                    submitBtn.style.backgroundColor = 'var(--accent-red)';
                    contactForm.reset();
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                    }, 3000);
                }, function(error) {
                    console.error('FAILED...', error);
                    submitBtn.innerHTML = 'Greška! Pokušaj ponovno.';
                    submitBtn.disabled = false;
                });
        });
    }
});
