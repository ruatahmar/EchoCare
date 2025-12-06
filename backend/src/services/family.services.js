import fs from "fs";

const filePath = "./src/db/family.json";

export const getAllFamily = () => {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    return data.family || [];
};

export const getFamilyMemberByName = (name) => {
    const family = getAllFamily();
    return family.find(
        p => p.name.toLowerCase() === name.toLowerCase()
    );
};