import archiver from 'archiver';
import { createWriteStream } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '..');
const buildDir = resolve(rootDir, 'build');
const outputPath = resolve(rootDir, 'colourntp.zip');

const output = createWriteStream(outputPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
    console.log(`Created ${outputPath} (${archive.pointer()} bytes)`);
});

archive.on('error', (err) => {
    throw err;
});

archive.pipe(output);
archive.directory(buildDir, false);
archive.finalize();
