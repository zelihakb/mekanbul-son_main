var mongoose = require("mongoose");

var dbURI =
  "mongodb+srv://zelihabayraktar9597:zeliha123@mekanbul.azwe4.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbURI);
mongoose.connection.on("connected", function () {
  console.log(dbURI + " adresine bağlandı");
});
mongoose.connection.on("disconnected", function () {
  console.log(dbURI + " bağlantısı koptu");
});

process.on("SIGINT", function () {
  mongoose.connection.close();
  console.log("Bağlantı kapatıldı");
  process.exit(0);
});
require("./venue");
