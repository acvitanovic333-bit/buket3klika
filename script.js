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

    let globalOrders = JSON.parse(localStorage.getItem('buket3klik_orders')) || defaultOrders;

    function saveOrders() {
        localStorage.setItem('buket3klik_orders', JSON.stringify(globalOrders));
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

            if (user === 'buket3klik' && pass === 'antonio2000') {
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

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const productCards = document.querySelectorAll('.product-card, .subscribe-card');
    
    productCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
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
                        <input type="text" id="delivery-address" placeholder="Delivery zip code ili adresa (npr. Maksimirska 10)">
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
                    <button id="back-to-address-btn" class="btn-back"><i class="fa-solid fa-arrow-left"></i> Natrag</button>
                </div>

                <div class="delivery-card" id="step-payment" style="display: none;">
                    <h2>Unesite podatke kartice</h2>
                    <form id="payment-form" class="payment-form">
                        <div class="card-input-group">
                            <label>Broj kartice</label>
                            <input type="text" id="card-number" placeholder="0000 0000 0000 0000" maxlength="19" required>
                        </div>
                        <div class="card-row">
                            <div class="card-input-group">
                                <label>Datum isteka</label>
                                <input type="text" id="card-expiry" placeholder="MM / YY" maxlength="7" required>
                            </div>
                            <div class="card-input-group">
                                <label>CVV</label>
                                <input type="text" id="card-cvv" placeholder="123" maxlength="3" required>
                            </div>
                        </div>
                        <button type="submit" class="btn-next">Plati <i class="fa-solid fa-lock"></i></button>
                    </form>
                    <button id="back-to-calendar-btn" class="btn-back"><i class="fa-solid fa-arrow-left"></i> Natrag</button>
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

    // Make all products clickable
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if(e.target.closest('.wishlist-btn')) return;

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
                modalBg.style.backgroundImage = `url(${img.src})`;
                modal.classList.add('active');
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
    });

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.classList.contains('modal-bg')) {
            modal.classList.remove('active');
        }
    });

    calculateBtn.addEventListener('click', () => {
        const address = addressInput.value.trim();
        if(address) {
            mapContainer.style.display = 'block';
            const mapUrl = `https://maps.google.com/maps?saddr=Glavni+Kolodvor,+Zagreb&daddr=${encodeURIComponent(address + ', Zagreb')}&output=embed`;
            mapContainer.innerHTML = `<iframe src="${mapUrl}"></iframe>`;
            goToCalendarBtn.style.display = 'inline-block';
        }
    });

    goToCalendarBtn.addEventListener('click', () => {
        stepAddress.style.display = 'none';
        stepCalendar.style.display = 'block';
        renderCalendar();
    });

    backToAddressBtn.addEventListener('click', () => {
        stepCalendar.style.display = 'none';
        stepAddress.style.display = 'block';
    });

    backToCalendarBtn.addEventListener('click', () => {
        stepPayment.style.display = 'none';
        stepCalendar.style.display = 'block';
    });

    finishBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Generate Order Code
        const orderId = 'BK-' + Math.floor(100000 + Math.random() * 900000);
        const today = new Date().toLocaleDateString('hr-HR');
        const deliveryAddress = addressInput.value.trim();
        
        // Add to global orders with enriched data
        globalOrders.unshift({
            id: orderId,
            product: currentSelectedProduct || 'Ruže',
            status: 'Zaprimljeno',
            date: today,
            price: currentSelectedPrice,
            address: deliveryAddress,
            deliveryTime: currentSelectedTime
        });
        saveOrders();

        // Update Success Screen with the new code
        const successMessage = document.getElementById('success-message');
        successMessage.innerHTML = `Hvala vam na narudžbi. Vaš buket će biti dostavljen: <strong>${currentSelectedTime}</strong> na adresu <strong>${deliveryAddress}</strong>.<br><br>Vaš kod narudžbe za praćenje: <strong>${orderId}</strong>`;

        // Mocking transaction
        stepPayment.style.display = 'none';
        stepSuccess.style.display = 'block';

        // Email confirmation logic
        const sendEmailBtn = document.getElementById('send-email-btn');
        const emailInput = document.getElementById('confirm-email');
        const emailSentMsg = document.getElementById('email-sent-msg');
        
        if (sendEmailBtn) {
            sendEmailBtn.onclick = () => {
                const email = emailInput.value.trim();
                if (email.includes('@')) {
                    // Start loading state
                    sendEmailBtn.disabled = true;
                    sendEmailBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Šaljem...';
                    
                    // --- EmailJS Integration ---
                    const templateParams = {
                        email: email, // Promijenjeno iz to_email kako bi odgovaralo slici
                        order_id: orderId,
                        product_name: currentSelectedProduct || 'Prekrasan Buket',
                        delivery_address: deliveryAddress,
                        delivery_time: currentSelectedTime,
                        price: currentSelectedPrice,
                        from_email: "acvitanovic333@gmail.com"
                    };

                    // SLANJE PRAVOG MAILA
                    emailjs.send('service_1mrp9v8', 'template_h36aac9', templateParams)
                        .then(function(response) {
                           console.log('SUCCESS!', response.status, response.text);
                           showEmailSuccess(email);
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

        function showEmailSuccess(email) {
            sendEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Poslano';
            emailInput.disabled = true;
            emailSentMsg.classList.remove('hidden');
            emailSentMsg.innerHTML = `Potvrda je uspješno poslana na <strong>${email}</strong>!<br><small>Hvala što koristite Buket3Klika.</small>`;
        }

        // Refresh admin orders if logged in
        if (adminDashboardView && !adminDashboardView.classList.contains('hidden')) {
            renderAdminOrders();
        }
    });

    function renderCalendar() {
        calendarWrapper.innerHTML = '';
        const now = new Date();
        const daysToShow = 31;
        
        const grid = document.createElement('div');
        grid.className = 'calendar-grid';

        for (let i = 0; i < daysToShow; i++) {
            const date = new Date();
            date.setDate(now.getDate() + i);
            
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            const dayName = date.toLocaleDateString('hr-HR', { weekday: 'short' });
            const dayNum = date.getDate();
            const monthName = date.toLocaleDateString('hr-HR', { month: 'short' });

            dayEl.innerHTML = `
                <span class="day-name">${dayName}</span>
                <span class="day-num">${dayNum}</span>
                <span class="month-name">${monthName}</span>
            `;

            dayEl.addEventListener('click', () => {
                document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                dayEl.classList.add('selected');
                showTimeSlots(date);
            });

            grid.appendChild(dayEl);
        }
        calendarWrapper.appendChild(grid);
    }

    function showTimeSlots(date) {
        selectedDateDisplay.innerText = date.toLocaleDateString('hr-HR', { day: 'numeric', month: 'long' });
        timeslotsGrid.innerHTML = '';
        timeslotsWrapper.style.display = 'block';

        for (let hour = 9; hour <= 21; hour++) {
            const slot = document.createElement('div');
            slot.className = 'time-slot';
            slot.innerText = `${hour}:00 h`;
            
            slot.addEventListener('click', () => {
                document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                slot.classList.add('selected');
                
                currentSelectedTime = `${selectedDateDisplay.innerText} u ${slot.innerText}`;

                // Transition to Payment Step
                setTimeout(() => {
                    stepCalendar.style.display = 'none';
                    stepPayment.style.display = 'block';
                }, 300);
            });

            timeslotsGrid.appendChild(slot);
        }
    }
    
    addressInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            calculateBtn.click();
        }
    });

    // --- Footer Links Logic ---
    const footerLinks = document.querySelectorAll('.footer-link');
    const textModal = document.createElement('div');
    textModal.id = 'text-modal-content';
    textModal.className = 'text-modal';
    
    // Insert text modal directly into the main modal wrapper
    modal.appendChild(textModal);
    
    const contents = {
        'sitemap': {
            title: 'Mapa weba',
            text: 'Ovdje možete pronaći strukturu naše web stranice radi lakšeg snalaženja. Pregled svih stranica, kategorije vrhunskih buketa i ostale važne informacije organizirane su radi vaše udobnosti.'
        },
        'accessibility': {
            title: 'Izjava o pristupačnosti',
            text: 'Kupi najbolji buket na tržištu<br>u samo tri klika.'
        },
        'terms': {
            title: 'Uvjeti korištenja',
            text: 'Korištenjem web stranice Buket3klika pristajete na naše opće uvjete kupnje. Sve naše cijene su finalne, a dostavna mreža osigurava premium kvalitetu isporuke na vaš prag.'
        },
        'privacy': {
            title: 'Pravila privatnosti',
            text: 'Vaša privatnost nam je najvažnija. Podaci koje unesete (poput željene adrese za dostavu) koriste se isključivo za uspješnu isporuku iznenađenja te se strogo čuvaju i ne dijele dalje.'
        }
    };

    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const type = link.getAttribute('data-type');
            if(contents[type]) {
                textModal.innerHTML = `
                    <button class="close-modal text-close" id="close-text-modal"><i class="fa-solid fa-xmark"></i></button>
                    <h2>${contents[type].title}</h2>
                    <p>${contents[type].text}</p>
                `;
                
                // Sakrij elemente za dostavu
                document.querySelector('.modal-content').style.display = 'none';
                
                // Očisti sliku iz pozadine
                modalBg.style.backgroundImage = 'none';
                modalBg.style.backgroundColor = 'rgba(0,0,0,0.8)';
                
                // Prikaži tekstualni prozor
                textModal.style.display = 'block';
                modal.classList.add('active');

                // Zatvaranje ovog specifičnog prozora
                document.getElementById('close-text-modal').addEventListener('click', () => {
                    modal.classList.remove('active');
                });
            }
        });
    });

    // Kad se zatvara modal na bilo koji način (klik na sivilo ili stari 'X') vrati prikaze na staro
    modal.addEventListener('transitionend', function(e) {
        if(!modal.classList.contains('active') && e.propertyName === 'opacity') {
             document.querySelector('.modal-content').style.display = 'flex';
             textModal.style.display = 'none';
        }
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
    function renderAdminOrders() {
        if (!adminOrdersList) return;
        adminOrdersList.innerHTML = globalOrders.map(order => `
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
                        renderAdminOrders();
                    }
                }
            });
        });
    }

});
