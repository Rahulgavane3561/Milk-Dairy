const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const suppliersigninRoutes = require('./api/temp_supplier_register');
const supplierotpverify = require('./api/otpverify')
const supplier_authentications = require('./api/supplier_login')
const supplier_orders = require('./api/get_supplier_product')
const milk_history = require('./api/get_milk_history')
const milk_payment = require('./api/get_milk_payment')
const advance_payment = require('./api/get_advance_details')
// const otherRoutes = require('./api/otherRoutes');

const app = express();
const PORT = 8086;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/supplie', suppliersigninRoutes);
app.use('/api/supplie', supplierotpverify);
app.use('/api/supplier', supplier_authentications);
app.use('/api/supplier',supplier_orders);
app.use('/api/supplier',milk_history);
app.use('/api/supplier',milk_payment);
app.use('/api/supplier',advance_payment);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
