module.exports = app => {
    const files = require("../controllers/file.controller.js");
    const {upload} = require('../helpers/filehelper');
    const { authJwt } = require("../middlewares");

    var router = require("express").Router();
  
    router.post('/singleFile', upload.single('file'), [authJwt.verifyToken, authJwt.isAdmin], files.singleFileUpload);
    router.post('/multipleFiles', upload.array('files'), [authJwt.verifyToken, authJwt.isAdmin], files.multipleFileUpload);
    
    router.get('/getallProducts', files.getallProducts);    
    router.get("/getOneProduct/:id", files.getOneProduct);
    
    router.put("/getMultipleFiles/:id", [authJwt.verifyToken, authJwt.isAdmin], files.updateOneFileFromMultiples);
    router.put("/getSingleFiles/:id", [authJwt.verifyToken, authJwt.isAdmin], files.updateOneSingleFile);
    
    router.delete("/getOneProduct/:id", [authJwt.verifyToken, authJwt.isAdmin], files.deleteProduct); 
    
    router.get("/getFilteredProducts", files.getFilteredProducts);

    router.get("/getCategories", files.categories);

    app.use('/api/', router);
    
  };