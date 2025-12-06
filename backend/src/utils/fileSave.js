import fs from "fs";
import path from "path";

const __dirname = path.resolve();

export const readJSON = (relativePath) => {
    const data = fs.readFileSync(path.join(__dirname, relativePath), "utf-8");
    return JSON.parse(data);
};

export const writeJSON = (relativePath, data) => {
    fs.writeFileSync(
        path.join(__dirname, relativePath),
        JSON.stringify(data, null, 2)
    );
};
