import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Mendapatkan __dirname di ES Modules dengan import.meta.url
// const __dirname = path.dirname(new URL(import.meta.url).pathname);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, '../src/assets'); // Path ke folder assets
const outputFile = path.join(__dirname, '../src/lib/theme/images/Images.ts');

// Cek jika folder assets ada
if (!fs.existsSync(assetsDir)) {
    console.error(`Folder assets tidak ditemukan: ${__dirname}`);
    console.error(`Folder assets tidak ditemukan: ${assetsDir}`);
    process.exit(1);
}

// Fungsi untuk mendapatkan semua file dalam direktori dan subdirektori
const getFilesRecursively = (dir) => {
    let files = [];
    const items = fs.readdirSync(dir);

    items.forEach((item) => {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
            // Jika item adalah folder, rekursif untuk membaca isi folder tersebut
            files = files.concat(getFilesRecursively(fullPath));
        } else {
            // Jika item adalah file, tambahkan ke daftar
            files.push(fullPath);
        }
    });

    return files;
};

// Fungsi untuk membuat import statement dari file yang ditemukan
const generateImports = () => {
    const files = getFilesRecursively(assetsDir);

    const imports = [];

    // Generate imports untuk setiap file
    files.forEach((file) => {
        const filePath = path.relative(assetsDir, file); // Mendapatkan path relatif dari assets
        const fileName = path.basename(file, path.extname(file)); // Mengambil nama file tanpa ekstensi
        const folder = path.dirname(filePath).replace(/\\/g, '/'); // Mengambil folder dan ganti backslash jadi slash

        // Buat import statement
        const importName = `${folder ? folder.replace(/\//g, '_') + '_' : ''}${fileName}`;
        const finalName = importName.replace("-", "_").replace(".", "");
        imports.push(`import ${finalName} from '@/assets/${filePath.replace(/\\/g, '/')}'`);
    });

    // Menyusun import statements menjadi satu string
    const importStatements = imports.join('\n');
    const exportStatement = `\nexport default {\n  ${imports.map(name => name.split(' ')[1]).join(',\n  ')}\n};`;

     // Menambahkan komentar di atas
     const fileContent = `// Generated automatically, do not edit manually\n\n${importStatements}${exportStatement}`;

    // Tulis hasil ke file output
    fs.writeFileSync(outputFile, fileContent, 'utf-8');
    console.log('Asset import file generated!');
};

generateImports();
