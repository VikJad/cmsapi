module.exports.validateMaster = (req, res, next) => {
    if (req.body.masterName === null || req.body.masterName === "") {
      console.log(true);
      return res.status(422).send({ message: "Master Name is Required" });
      next(0);
    }
    if (req.body.inputText === null || req.body.inputText === "") {
      return res.status(422).send({ message: "Please Provide Input" });
      next(0);
    }
    if (req.body.inputText.length < 3) {
      return res
        .status(422)
        .send({ message: "Input Text Should have atleast four Character" });
      next(0);
    }
    next();
  };
  
  module.exports.validateUser = (req, res, next) => {
    var mailFormat =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  
    if (req.body.firstName === null || req.body.firstName === "") {
      return res.status(422).send({ message: "First Name is Required" });
      next(0);
    }
    if (req.body.firstName.length < 3) {
      return res
        .status(422)
        .send({ message: "First Name Should have atleast four Character" });
      next(0);
    }
    if (req.body.lastName === null || req.body.lastName === "") {
      return res.status(422).send({ message: "Last Name is Required" });
      next(0);
    }
    if (req.body.lastName.length < 3) {
      return res
        .status(422)
        .send({ message: "Last Name Should have three Character" });
      next(0);
    }
    if (req.body.mobileNo === null || req.body.mobileNo === "") {
      return res
        .status(422)
        .send({ message: "Please Enter Employee Mobile No." });
      next(0);
    }
    if (req.body.mobileNo.length < 10 || req.body.mobileNo.length > 10) {
      return res.status(422).send({
        message: "Mobile No. is not valid, Please Enter 10 Digit Mobile No.",
      });
      next(0);
    }
  
    if (req.body.email === null || req.body.email === "") {
      return res.status(422).send({ message: "Please enter your Email Id" });
      next(0);
    }
    if (!mailFormat.test(req.body.emailId)) {
      return res.status(422).send({
        message: "Email Address is not valid, Please provide a valid Email",
      });
      next(0);
    }
    if (req.body.userRoleId === null || req.body.userRoleId === 0) {
      return res.status(422).send({ message: "userRoleId required" });
      next(0);
    }
    if (req.body.userName === null || req.body.userName === "") {
      return res.status(422).send({ message: "UserName  is Required" });
      next(0);
    }
    if (req.body.userName.length < 6) {
      return res.status(422).send({
        message:
          "User Name Should have atleast Six Character with number and special character",
      });
      next(0);
    }
    if (req.body.password === null || req.body.password === "") {
      return res.status(422).send({ message: "Password is Required" });
      next(0);
    }
    if (req.body.password.length < 5) {
      return res.status(422).send({ message: "Passwrod is too Short" });
      next(0);
    }
    next();
  };
  
  module.exports.validateLead = async (req, res, next) => {
    var mailFormat =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var name = /[a-zA-Z]/;
    if (req.body.length === 0) {
      return res.status(422).send({ message: "Data not available for insert" });
    }
  
    for await (let i of req.body) {
      if (i.name === null || i.name === "") {
        return res.status(422).send({ message: "Lead Name Should not be Empty" });
        next(0);
      }
      if (!name.test(i.name)) {
        return res
          .status(422)
          .send({ message: "Name should not contain numbers and Special" });
        next(0);
      }
      if (i.name.length < 4) {
        return res.status(422).send({ message: "Name should have atleast 4 Character" });
        next(0);
      }
  
      if (i.mobileNo === null || i.mobileNo === "") {
        return res.status(422).send({ message: "Please enter your Mobile No." });
        next(0);
      }
      if (i.mobileNo.length < 10 || i.mobileNo.length > 10) {
        return res
          .status(422)
          .send({ message: "Mobile No. is not valid, Please Enter 10 Digit Mobile No." });
        next(0);
      }
      if (i.emailId === null || i.emailId === "") {
        return res.status(422).send({ message: "Please enter your Email Id" });
        next(0);
      }
      if (!mailFormat.test(i.emailId)) {
        return res
          .status(422)
          .send({ message: "Email Address is not valid, Please provide a valid Email" });
        next(0);
      }
    }
    // console.log(true)
    next();
  };
  
  module.exports.validateCatalogue = (req, res, next) => {
    var name = /[a-zA-Z]/;
    if (req.body.catId === 0) {
      if (req.body.gsName === null || req.body.gsName === "") {
        console.log(true);
        return res.status(422).send({ message: "Please Enter Catalogue Name" });
        next(0);
      }
      if (!name.test(req.body.gsName)) {
        return res
          .status(422)
          .send({ message: "Name should not contain numbers and Special" });
        next(0);
      }
      if (req.body.gsName.length < 3) {
        console.log(true);
        return res
          .status(422)
          .send({ message: "Catalogue Name Should have atleast 4 Character" });
        next(0);
      }
      if (req.body.price === null || req.body.price === "") {
        return res.status(422).send({ message: "Please Enter Price" });
        next(0);
      }
      if (req.body.price < 5000) {
        return res
          .status(422)
          .send({ message: "Price Should Greater than 5000" });
        next(0);
      }
    }
    next();
  };
  
  module.exports.validateQuotation = (req, res, next) => {
    var mailFormat =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var panValidate = /^([a-zA-Z])([0-9])([a-zA-Z])?$/;
  
    if (req.body.leadId === null || req.body.leadId === 0) {
      console.log(true);
      return res.status(422).send({ message: "leadId required" });
      next(0);
    }
    if (req.body.billTo === null || req.body.billTo === "") {
      return res.status(422).send({ message: "Please Enter Customer Name" });
      next(0);
    }
    if (req.body.clientPan === null || req.body.clientPan === "") {
      return res.status(422).send({ message: "Pan Number is Mandatory" });
      next(0);
    }
    if (!panValidate.test(req.body.clientPan)) {
      return res.status(422).send({
        message: "Please Enter Valid Pan Number",
      });
      next(0);
    }
    if (req.body.clientEmail === null || req.body.clientEmail === "") {
      return res.status(422).send({ message: "Please enter your Email Id" });
      next(0);
    }
    if (!mailFormat.test(req.body.clientEmail)) {
      return res.status(422).send({
        message: "Email Address is not valid, Please provide a valid Email",
      });
      next(0);
    }
    if (req.body.clientContact === null || req.body.clientContact === "") {
      return res.status(422).send({ message: "Please Enter Client Mobile No." });
      next(0);
    }
    if (
      req.body.clientContact.length < 10 ||
      req.body.clientContact.length > 10
    ) {
      return res.status(422).send({
        message: "Mobile No. is not valid, Please Enter 10 Digit Mobile No.",
      });
      next(0);
    }
    if (req.body.clientAddress === null || req.body.clientAddress === "") {
      return res.status(422).send({ message: "Client Address is Nedded" });
      next(0);
    }
    if (req.body.gsCatalogueId === null || req.body.gsCatalogueId === 0) {
      return res.status(422).send({ message: "Catalogue Id is Required" });
      next(0);
    }
    next();
  };
  
  module.exports.validateInvoice = (req, res, next) => {
    var mailFormat =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var panValidate = /^([a-zA-Z])([0-9])([a-zA-Z])?$/;
  
    if (req.body.leadId === null || req.body.leadId === 0) {
      console.log(true);
      return res.status(422).send({ message: "leadId required" });
      next(0);
    }
    if (req.body.billTo === null || req.body.billTo === "") {
      return res.status(422).send({ message: "Please Enter Customer Name" });
      next(0);
    }
    if (req.body.clientPan === null || req.body.clientPan === "") {
      return res.status(422).send({ message: "Pan Number is Mandatory" });
      next(0);
    }
    if (!panValidate.test(req.body.clientPan)) {
      return res.status(422).send({
        message: "Please Enter Valid Pan Number",
      });
      next(0);
    }
    if (req.body.clientEmail === null || req.body.clientEmail === "") {
      return res.status(422).send({ message: "Please enter your Email Id" });
      next(0);
    }
    if (!mailFormat.test(req.body.clientEmail)) {
      return res.status(422).send({
        message: "Email Address is not valid, Please provide a valid Email",
      });
      next(0);
    }
    if (req.body.clientContact === null || req.body.clientContact === "") {
      return res.status(422).send({ message: "Please Enter Client Mobile No." });
      next(0);
    }
    if (
      req.body.clientContact.length < 10 ||
      req.body.clientContact.length > 10
    ) {
      return res.status(422).send({
        message: "Mobile No. is not valid, Please Enter 10 Digit Mobile No.",
      });
      next(0);
    }
    if (req.body.clientAddress === null || req.body.clientAddress === "") {
      return res.status(422).send({ message: "Client Address is Nedded" });
      next(0);
    }
    if (req.body.gsCatalogueId === null || req.body.gsCatalogueId === 0) {
      return res.status(422).send({ message: "Catalogue Id is Required" });
      next(0);
    }
    if (req.body.invoiceType === null || req.body.invoiceType === "") {
      return res.status(422).send({ message: "Please Provide Invoice Type" });
      next(0);
    }
    next();
  };
  