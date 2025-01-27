const mega = require("megajs");

const auth = {
    email: 'teamchalah@gmail.com',
    password: 'CHALAH@1228@',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246'
};

const upload = (data, name) => {
    return new Promise((resolve, reject) => {
        try {
            const storage = new mega.Storage(auth, () => {
                // Ensure the storage is initialized properly
                console.log('Storage initialized. Starting upload...');
                storage.on("ready", async () => {
                    try {
                        // Upload file
                        const file = await storage.upload({ name: name, allowUploadBuffering: true });
                        
                        // Once file is uploaded, retrieve the link
                        file.link((err, url) => {
                            if (err) {
                                reject(`Error getting the file link: ${err}`);
                            } else {
                                storage.close();
                                resolve(url); // Return the file URL
                            }
                        });
                    } catch (err) {
                        reject(`Error uploading file: ${err}`);
                    }
                });

                // Check for any other storage events or errors
                storage.on("error", (err) => {
                    reject(`Storage error: ${err}`);
                });
            });
        } catch (err) {
            reject(`Error initializing storage: ${err}`);
        }
    });
};

module.exports = { upload };
