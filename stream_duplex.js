//Duplex Steam objects can
var stream = require('stream');
var util = require('util');

// here we sort of declare the object Duplexer is an implementation of the of the Duplexer class prototype in the stream module
util.inherits(Duplexer, stream.Duplex);
function Duplexer(opt) {
    stream.Duplex.call(this, opt);
    this.data = [];
}

// remember the inherits stream.duplex class, here we define the interface prototypes
// for the Duplexer object, specifically the _read(size) and _write(data, encoding, callback) methods.
// 
Duplexer.prototype._read = function readItem(size) {
    
    var chunk = this.data.shift();
    if (chunk == "stop"){
        this.push(null);
    } else{
        if(chunk){
            this.push(chunk);
        } else{
            setTimeout(readItem.bind(this), 500, size);
        }
    }
};

// implementation of the _write(data, encoding, callback) method prototype
Duplexer.prototype._write = function(data, encoding, callback) {
    this.data.push(data);
    callback();
};

var d = new Duplexer(); //create an instance of our Duplexer class
d.on('data', function(chunk){
    console.log('read: ', chunk.toString());
});
d.on('end', function(chunk){
    console.log('message complete');
});

d.write("Croutons");
d.write("Soup");
d.write("cabbage");
d.write("rabbit");
d.write("stop");