const fs = require('fs');
const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

const topBarHtml = `
    <div class="top-bar">
        <div class="container">
            <a href="tel:+385976050419"><i class="fa fa-phone"></i> +385 97 605 0419</a>
            <a href="mailto:info@buket3klika.hr"><i class="fa fa-envelope"></i> info@buket3klika.hr</a>
        </div>
    </div>
`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    if (!content.includes('class="top-bar"')) {
        content = content.replace(/<body>/i, '<body>' + topBarHtml);
    }
    
    // Remove old nav-contact
    content = content.replace(/<div class="nav-contact">[\s\S]*?<\/div>/g, '');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Processed ' + file);
});
