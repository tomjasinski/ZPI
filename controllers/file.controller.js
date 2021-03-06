const db = require("../models");
const singleFile = db.singleFiles;
const multipleFile = db.multipleFiles;

exports.singleFileUpload = async (req, res, next) => {
    try{
        const file = new singleFile({
            title: req.body.title,
            description: req.body.description,
            visUrl: req.body.visUrl,
            size: req.body.size,
            length: req.body.length,
            height: req.body.length,
            width: req.body.width,
            color: req.body.color,
            price: req.body.price,
            category: req.body.category,
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        });
        await file.save();
        res.status(201).send({message: 'File Uploaded Successfully'});
    }catch(error) {
        res.status(400).send(error.message);
    }

};

exports.multipleFileUpload = async (req, res, next) => {
    try{
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
        const multipleFiles = new multipleFile({
            title: req.body.title,
            name: req.body.name,
            description: req.body.description,
            visUrl: req.body.visUrl,
            size: req.body.size,
            length: req.body.length,
            height: req.body.length,
            width: req.body.width,
            color: req.body.color,
            price: req.body.price,
            category: req.body.category,
            files: filesArray
        });
        await multipleFiles.save();
        res.status(201).send({message: 'Files Uploaded Successfully'});
    }catch(error) {
        res.status(400).send(error.message);
    }

};

exports.getOneProduct = (req, res) => {
    const id = req.params.id;
  
    singleFile.findById(id)
      .then(data => {
        if (!data){
          multipleFile.findById(id)
          .then(data => {
            if (!data)
              res.status(404).send({ message: "Not found File with id " + id });
            else res.send(data);
          })
    
        }
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving File with id=" + id });
      });

};

exports.getallProducts = async (req, res, next) => {
    try{
        var files = await singleFile.find();
        var files1 = await multipleFile.find();
        files = files.concat(files1);
        res.status(200).send(files);

    }catch(error) {
        res.status(400).send(error.message);
    }

};

exports.getFilteredProducts = async (req, res, next) => {
  
    const { title, category, size, length_from, length_to, height_from, height_to, width_from, width_to, price_from, price_to, color, sort} = req.query;
    let query = {};
  
    if(title) {
      query.title = { $regex: new RegExp(title), $options: "i" }
    }
  
    if(category){
  
      const categories = category.split(',');
      query.category = categories;
    }
  
    if(size) {
     
      const sizes = size.split(',');
      query.size = sizes;
    }

    if(width_from || width_to){
  
      if(width_from && width_to){
        query.width = {$gt: width_from, $lt: width_to};
      }
      else if (width_from){
        
        query.width = {$gt: width_from};
      }
      else{
  
        query.width = {$lt: width_to};
      }
    }

    if(length_from || length_to){
  
      if(length_from && length_to){
        query.length = {$gt: length_from, $lt: length_to};
      }
      else if (length_from){
        
        query.length = {$gt: length_from};
      }
      else{
  
        query.length = {$lt: length_to};
      }
    }

    if(height_from || height_to){
  
      if(height_from && height_to){
        query.height = {$gt: height_from, $lt: height_to};
      }
      else if (height_from){
        
        query.height = {$gt: width_from};
      }
      else{
  
        query.height = {$lt: height_to};
      }
    }
  
    if(price_from || price_to){
  
      if(price_from && price_to){
        query.price = {$gt: price_from, $lt: price_to};
      }
      else if (price_from){
        
        query.price = {$gt: price_from};
      }
      else{
  
        query.price = {$lt: price_to};
      }
    }
  
    if(color){
  
      const colors = color.split(',');
      for(var i=0; i < colors.length; i++){
        colors[i] = "#" + colors[i];
    }
      query.color = colors;
    }
  
    //sorting params
    let sort_param = {};
  
    if(sort){
      sort_param = {price: sort};
    }
    else{
      sort_param = {createdAt: 'desc'};
    }

        try{
          var files = await multipleFile.find(query).sort(sort_param);
          var files1 = await singleFile.find(query).sort(sort_param);
          files = files.concat(files1);
          res.status(200).send(files);
  
      }catch(error) {
          res.status(400).send(error.message);
      }
  

};

exports.updateOneFileFromMultiples = (req, res) => { 
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      multipleFile.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update File with id=${id}. Maybe File was not found!`
            });
          } else res.send({ message: "File was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating File with id=" + id
          });
        });

};

exports.updateOneSingleFile = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      singleFile.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update File with id=${id}. Maybe File was not found!`
            });
          } else res.send({ message: "File was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating File with id=" + id
          });
        });

};

exports.deleteProduct = (req, res) => {
   
    const id = req.params.id;
  
    singleFile.findByIdAndRemove(id)
      .then(data => {
        if (!data){
          multipleFile.findByIdAndRemove(id)
          .then(data => {
            if (!data)
              res.status(404).send({ message: `Cannot delete File with id=${id}. Maybe File was not found!` });
            else res.send({message: "File was deleted successfully!"});
          })
    
        }
        else res.send({message: "File was deleted successfully!"});
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Could not delete File with id=" + id });
      });

};
  
//get available categories
exports.categories = async (req, res) => {
  singleFile.distinct("category").then(data => {multipleFile.distinct("category").then(data1 => {data1 = data1.concat(data); res.send(data1) })});
};

const fileSizeFormatter = (bytes, decimal) => { //okre??la rozmiar pliku do wpisania do bazy
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}


