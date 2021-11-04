module.exports = app => {
    const files = require("../controllers/fileController.js");
    const {upload} = require('../helpers/filehelper');

    var router = require("express").Router();
  
    router.post('/singleFile', upload.single('file'), files.singleFileUpload);
    router.post('/multipleFiles', upload.array('files'), files.multipleFileUpload);
    
    router.get('/getSingleFiles', files.getallSingleFiles);
    router.get('/getMultipleFiles', files.getallMultipleFiles);
    
    router.get("/getMultipleFiles/:id", files.getOneFileFromMultiples); //get from MultipleFiles 
    router.get("/getSingleFiles/:id", files.getOneSingleFile); //get from SingleFiles 
    
    router.put("/getMultipleFiles/:id", files.updateOneFileFromMultiples); //???????
    router.put("/getSingleFiles/:id", files.updateOneSingleFile); //??????
    
    router.delete("/getMultipleFiles/:id", files.deleteFileFromMultiples); 
    router.delete("/getSingleFiles/:id", files.deleteOneSingleFile); 
    
    router.get("/getFilteredMultipleFiles", files.getFilteredMultipleFiles);
    router.get("/getFilteredSingleFiles", files.getFilteredSingleFiles);

    router.get("/getCategoriesMultipleFiles", files.categoriesMultiple);
    router.get("/getCategoriesSingleFiles", files.categoriesOne);

    app.use('/api/', router);
    
  };
  