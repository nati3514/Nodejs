const fs = require("fs");
const path = require("path");

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );

    fs.readFile(p, (err, fileContent) => {
      let products = [];

      if (!err) {
        try {
          products = JSON.parse(fileContent);
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
        }
      }

      products.push(this);

      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) {
          console.error("Error writing to file:", err);
        }
      });
    });
  }

  static fetchAll(cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      "data",
      "products.json"
    );

    fs.readFile(p, (err, fileContent) => {
      if (err) {
        if (err.code === "ENOENT") {
          // File doesn't exist, create an empty array
          fs.writeFile(p, "[]", (err) => {
            if (err) {
              console.error("Error creating file:", err);
            }
          });
          cb([]); // Return an empty array
        } else {
          console.error("Error reading file:", err);
          cb([]);
        }
      } else {
        try {
          const products = JSON.parse(fileContent);
          cb(products);
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          cb([]);
        }
      }
    });
  }
};
