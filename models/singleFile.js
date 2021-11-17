module.exports = mongoose => {
    var schema = mongoose.Schema(
            {
                
                      title: String,
                      description: String,
                      visUrl: String,
                      size: String,
                      color: String,
                      price: Number,
                      category: String,
                      fileName: {
                        type: String,
                        required: true
                    },
                    filePath: {
                        type: String,
                        required: true
                    },
                    fileType: {
                        type: String,
                        required: true
                    },
                    fileSize: {
                        type: String,
                        required: true
                    }                
            },
             { timestamps: true }


            )
    
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
    const singleFile = mongoose.model("singleFile", schema);

    return singleFile;
}