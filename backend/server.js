const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const suppliersigninRoutes = require('./api/temp_supplier_register');
const supplierotpverify = require('./api/otpverify');
const supplier_authentications = require('./api/supplier_login');
const supplier_orders = require('./api/get_supplier_product');
const milk_history = require('./api/get_milk_history');
const milk_payment = require('./api/get_milk_payment');
const advance_payment = require('./api/get_advance_details');
const updatesupplier = require('./api/update_supplier');
const getsupplier = require('./api/get_supplier');
const getsupplierhome = require('./api/get_supplier_home');
const getsupplierforgotpassword = require('./api/supplier_forgot_password');
const getProducts = require('./api/getproducts');
const getProduct = require('./api/get_product');
const makepayment = require('./api/Make_payment');
const getOrderDetails = require('./api/getOrderDetails');
const getmilkinsert = require('./api/getmilkinsert');
const getvarify = require('./api/getvarify');
const getmilkData = require('./api/getmilkData');
const adminMilkDate = require('./admindata/milkdata');
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
app.use('/api/supplie',updatesupplier);
app.use('/api/supplie',getsupplier);
app.use('/api/supplie',getsupplierhome);
app.use('/api/supplier',getsupplierforgotpassword);
app.use('/api/product',getProducts);
app.use('/api/product',getProduct);
app.use('/api/product',makepayment);
app.use('/api/supplier',getOrderDetails);
app.use('/api/supplier',getmilkinsert);
app.use('/api/milkcollection',getvarify);
app.use('/api/collection',getmilkData);
app.use('/api/admindata',adminMilkDate);



// app.post('/api/product/getproducts', (req, res) => {
//   console.log("supplierId");
//   // Handle the POST request logic here
// });



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
