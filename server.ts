const express = require('express');

const app = express();
app.use(express.json());

const user = require('./src/controllers/User/user.ts');
const products = require('./src/controllers/User/products.ts');
const authy = require('./src/controllers/User/authy.ts');


app.use('/api/user', user);
app.use('/api/user/products', products);
app.use('/api/authy', authy);





const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
