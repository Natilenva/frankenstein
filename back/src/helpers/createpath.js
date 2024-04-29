import fs from 'fs/promises';
const createPathIfNotExists = async (path) => {
    try {
        await fs.access(path);
    } catch (error) {
        await fs.mkdir(path);
    }
};
export { createPathIfNotExists };
