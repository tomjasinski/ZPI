module.exports = mongoose => {
    var schema = mongoose.Schema(
            {
                
                      title: String,
                      description: String,
                      visUrl: String,
                      size: String,
                      length: Number,
                      height: Number,
                      width: Number,
                      color: String,
                      price: Number,
                      category: String,
                      files: [Object]                
            },
             { timestamps: true }


            )
    
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
    const multipleFile = mongoose.model("multipleFile", schema);

    return multipleFile;
}