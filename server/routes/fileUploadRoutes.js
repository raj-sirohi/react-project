const multer = require('multer');
    const uuidv4 = require('uuid/v4');
    const path = require('path');

     // configure storage
     const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          /*
            Files will be saved in the 'uploads' directory. Make
            sure this directory already exists!
          */
          cb(null, './uploads');
        },
        filename: (req, file, cb) => {
          /*
            uuidv4() will generate a random ID that we'll use for the
            new filename. We use path.extname() to get
            the extension from the original file name and add that to the new
            generated ID. These combined will create the file name used
            to save the file on the server and will be available as
            req.file.pathname in the router handler.
          */
          const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
          req.test={a:'A value',b:'B value'}
         // cb(new Error('I don\'t have a clue!'))
          cb(null, newFilename);
        // cb(null, false);
        },
      });
      // create the multer instance that will be used to upload/save the file
      const upload = multer({ storage });

module.exports = app=>{
  //upload.single('ImageDropField2')
   // console.log('fileUpload ************')
    app.post('/api/fileUpload', upload.array('ImageDropField2',12) , (req, res) => {

        console.log('fileUpload req.test api/fileUpload ************',req.test)
        console.log('fileUpload req.files api/fileUpload ************',req.files[0].filename)

        console.log('fileUpload req.body api/fileUpload ************',req.body)
        /*
          We now have a new req.file object here. At this point the file has been saved
          and the req.file.filename value will be the name returned by the
          filename() function defined in the diskStorage configuration. Other form fields
          are available here in req.body.
        */
        res.send();
      });

      app.get("/api/images222", (req, res) => {
        console.log('***********aaaaaaaaaaaaaaaaaa');
       // res.sendFile(path.join(__dirname, "./uploads/a.jpeg"));
        res.send();
      });

     

}