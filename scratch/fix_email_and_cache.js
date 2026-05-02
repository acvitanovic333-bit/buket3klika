const fs = require('fs');

// 1. BUMP SCRIPT VERSION IN ALL HTML FILES TO BYPASS BROWSER CACHE
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));
htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('script.js?v=3.7')) {
        content = content.replace(/script\.js\?v=3\.7/g, 'script.js?v=3.8');
        fs.writeFileSync(file, content, 'utf8');
    }
});
console.log('Bumped script version to v=3.8 in HTML files.');

// 2. DUPLICATE EMAIL SENDING FOR ADMIN IN SCRIPT.JS
let scriptJs = fs.readFileSync('script.js', 'utf8');

// Find the emailjs.send call and replace it to send two emails (one to customer, one to admin)
const oldEmailCall = `emailjs.send('service_eoswglo', 'template_1f1nsi8', templateParams)
                          .then(function(response) {
                             console.log('SUCCESS!', response.status, response.text);
                             sendEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Poslano';
                             sendEmailBtn.classList.add('success');
                             sendEmailBtn.style.backgroundColor = 'var(--accent-green)';
                             document.getElementById('email-sent-msg').classList.remove('hidden');
                             setTimeout(() => {
                                 sendEmailBtn.innerHTML = 'Pošalji podatke';
                                 sendEmailBtn.classList.remove('success');
                                 sendEmailBtn.style.backgroundColor = '';
                                 document.getElementById('email-sent-msg').classList.add('hidden');
                             }, 4000);
                          }, function(error) {
                             console.log('FAILED...', error);
                             alert('Došlo je do greške prilikom slanja emaila. Pokušajte ponovno.');
                             sendEmailBtn.innerHTML = 'Pošalji podatke';
                          });`;

const newEmailCall = `emailjs.send('service_eoswglo', 'template_1f1nsi8', templateParams)
                          .then(function(response) {
                             console.log('Kupcu poslano:', response.status, response.text);
                             
                             // 3. SEND DUPLICATE TO ADMIN
                             const adminParams = { ...templateParams, email: 'prodaja.buket3klika@gmail.com' };
                             emailjs.send('service_eoswglo', 'template_1f1nsi8', adminParams)
                                .then(() => console.log('Adminu poslano!'))
                                .catch(err => console.log('Greška admin mail:', err));
                             
                             sendEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Poslano';
                             sendEmailBtn.classList.add('success');
                             sendEmailBtn.style.backgroundColor = 'var(--accent-green)';
                             document.getElementById('email-sent-msg').classList.remove('hidden');
                             setTimeout(() => {
                                 sendEmailBtn.innerHTML = 'Pošalji podatke';
                                 sendEmailBtn.classList.remove('success');
                                 sendEmailBtn.style.backgroundColor = '';
                                 document.getElementById('email-sent-msg').classList.add('hidden');
                             }, 4000);
                          }, function(error) {
                             console.log('FAILED...', error);
                             alert('Došlo je do greške prilikom slanja emaila. Pokušajte ponovno.');
                             sendEmailBtn.innerHTML = 'Pošalji podatke';
                          });`;

// Because the indentation might slightly differ, we'll use string replacement if it exactly matches,
// otherwise we can just use regex for the basic block. Let's do regex to be safe.
scriptJs = scriptJs.replace(/emailjs\.send\('service_eoswglo',\s*'template_1f1nsi8',\s*templateParams\)\s*\.then\(function\(response\)\s*\{[\s\S]*?(?=,\s*function\(error\))/g, `emailjs.send('service_eoswglo', 'template_1f1nsi8', templateParams)
                          .then(function(response) {
                             console.log('Kupcu poslano:', response.status, response.text);
                             
                             // SEND DUPLICATE TO ADMIN
                             const adminParams = { ...templateParams, email: 'prodaja.buket3klika@gmail.com' };
                             emailjs.send('service_eoswglo', 'template_1f1nsi8', adminParams)
                                .then(() => console.log('Adminu poslano!'))
                                .catch(err => console.log('Greška admin mail:', err));
                             
                             sendEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Poslano';
                             sendEmailBtn.classList.add('success');
                             sendEmailBtn.style.backgroundColor = 'var(--accent-green)';
                             document.getElementById('email-sent-msg').classList.remove('hidden');
                             setTimeout(() => {
                                 sendEmailBtn.innerHTML = 'Pošalji podatke';
                                 sendEmailBtn.classList.remove('success');
                                 sendEmailBtn.style.backgroundColor = '';
                                 document.getElementById('email-sent-msg').classList.add('hidden');
                             }, 4000);`);

// 3. Ensure the absolute path to logo is correct and forcing HTTPs
scriptJs = scriptJs.replace(/logo_url:\s*'[^']+'/g, "logo_url: 'https://buket3klika.hr/assets/rose-logo.png'");

fs.writeFileSync('script.js', scriptJs, 'utf8');
console.log('Successfully updated script.js and version bumps.');
