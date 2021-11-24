module.exports = app => {
    const files = require("../controllers/fileController.js");
    const {upload} = require('../helpers/filehelper');
    const { authJwt } = require("../middlewares");


    var router = require("express").Router();
  
    router.post('/singleFile', upload.single('file'), [authJwt.verifyToken, authJwt.isAdmin], files.singleFileUpload); //działania ograniczone do funkcji administratorskich
    router.post('/multipleFiles', upload.array('files'), [authJwt.verifyToken, authJwt.isAdmin], files.multipleFileUpload);
    
    router.get('/getSingleFiles', files.getallSingleFiles);
    router.get('/getMultipleFiles', files.getallMultipleFiles);
    
    router.get("/getMultipleFiles/:id", files.getOneFileFromMultiples); //get from MultipleFiles 
    router.get("/getSingleFiles/:id", files.getOneSingleFile); //get from SingleFiles 
    
    router.put("/getMultipleFiles/:id", [authJwt.verifyToken, authJwt.isAdmin], files.updateOneFileFromMultiples);
    router.put("/getSingleFiles/:id", [authJwt.verifyToken, authJwt.isAdmin], files.updateOneSingleFile);
    
    router.delete("/getMultipleFiles/:id", [authJwt.verifyToken, authJwt.isAdmin], files.deleteFileFromMultiples); 
    router.delete("/getSingleFiles/:id", [authJwt.verifyToken, authJwt.isAdmin], files.deleteOneSingleFile); 
    
    router.get("/getFilteredMultipleFiles", files.getFilteredMultipleFiles);
    router.get("/getFilteredSingleFiles", files.getFilteredSingleFiles);

    router.get("/getCategoriesMultipleFiles", files.categoriesMultiple);
    router.get("/getCategoriesSingleFiles", files.categoriesOne);

    app.use('/api/', router);
    
  };