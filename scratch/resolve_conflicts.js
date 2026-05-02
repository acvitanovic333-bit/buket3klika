const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if the file has git conflict markers
    if (content.includes('<<<<<<< HEAD')) {
        // Remove the incoming changes (from ======= to >>>>>>> commit-hash)
        // Keep the HEAD changes (which have our recent fixes)
        content = content.replace(/=======\r?\n[\s\S]*?>>>>>>>[^\n]*\r?\n?/g, '');
        // Remove the <<<<<<< HEAD marker itself
        content = content.replace(/<<<<<<< HEAD\r?\n?/g, '');
    }
    
    // Fix the double ČČesta bug
    content = content.replace(/ČČesta/g, 'Česta');
    // Fix any stray questions marks if they were caught as literal '' (though usually it's just bad encoding)
    // We already fixed most encodings in the HEAD branch.
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Cleaned conflicts in ${file}`);
});
