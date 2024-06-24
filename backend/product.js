const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
//Given courier charges
const courierCharges = [
    { maxWeight: 200, charge: 5 },
    { maxWeight: 500, charge: 10 },
    { maxWeight: 1000, charge: 15 },
    { maxWeight: 5000, charge: 20 }
];
//Takes weight and finds the shipping cost
const getCourierCharge = (weight) => {
    for (let charge of courierCharges) {
        if (weight <= charge.maxWeight) {
            return charge.charge;
        }
    }
    return 20;
};
//Handles orer requests
app.post('/api/order', (req, res) => {
    const { products } = req.body;
    const packages = [];
    let currentPackage = { items: [], totalWeight: 0, totalPrice: 0 };

    for (let product of products) {
        if (currentPackage.totalPrice + product.price > 250) {
            packages.push(currentPackage);
            currentPackage = { items: [], totalWeight: 0, totalPrice: 0 };
        }
        currentPackage.items.push(product.name);
        currentPackage.totalWeight += product.weight;
        currentPackage.totalPrice += product.price;
    }
    //If any items left in current packages we add it to the list of the packages
    if (currentPackage.items.length > 0) {
        packages.push(currentPackage);
    }
    //Calculate the courier prices
    const resultPackages = packages.map(pkg => ({
        ...pkg,
        courierPrice: getCourierCharge(pkg.totalWeight)
    }));

    res.json({ packages: resultPackages });
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
