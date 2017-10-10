module.exports = mongoose => {
    var Schema = mongoose.Schema,
        bookSchema = new Schema({
        title: String,
        author: String,
        published_date: { type: Date, default: Date.now  }
        });

    return mongoose.model('book', bookSchema);
}
