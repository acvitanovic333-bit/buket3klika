const fs = require('fs');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix known broken strings with replacement character (\ufffd)
    content = content.replace(/Na\ufffda/g, 'Naša');
    content = content.replace(/ru\ufffda/g, 'ruža');
    content = content.replace(/ru\ufffde/g, 'ruže');
    content = content.replace(/zna\ufffdenje/g, 'značenje');
    content = content.replace(/cvije\ufffda/g, 'cvijeća');
    content = content.replace(/cvje\ufffdarnica/g, 'cvjećarnica');
    content = content.replace(/Ro\ufffdendanski/g, 'Rođendanski');
    content = content.replace(/Ro\ufffdendansko/g, 'Rođendansko');
    content = content.replace(/iznena\ufffdenje/g, 'iznenađenje');
    content = content.replace(/odr\ufffdavanje/g, 'održavanje');
    content = content.replace(/\ufffd/g, ''); // Remove any remaining broken characters
    
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed encoding in ${file}`);
});
