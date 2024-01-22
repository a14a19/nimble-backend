import fs from "fs";
import path from "path";

export const checkExistingDirectory = (dir) => {
    const __dirname = path.resolve("")
    if (!fs.existsSync(path.join(__dirname + dir))) {
        console.log(dir, fs.existsSync(path.join(__dirname + dir)), __dirname);
        fs.mkdir('public', (err) => {
            if (err) {
                console.log(err);
                return;
            }
            fs.mkdir('public/profile-pic', (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(dir + ' directory created successfully!');
            });
        });
    }
}