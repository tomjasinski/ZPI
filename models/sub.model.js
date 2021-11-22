module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        email_address: String,
        status: String,
      },
      { timestamps: false }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Sub = mongoose.model("sub", schema);
    return Sub;
  };
  