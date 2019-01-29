const multer = require('multer');
    const uuidv4 = require('uuid/v4');
    const path = require('path');
    const fs =require('fs')
    const URL = require('url').URL;

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
    
    // for displaying image as <img  src='data:image/jpeg;base64, LzlqLzRBQ...<!-- base64 data -->' />
    // with aync await
      app.get("/api/images/:imageName", async (req, res)=>{
        const imageName = req.params.imageName;
        const imageFullName= path.join(__dirname, '..',"uploads/"+imageName);
        const imageData = await getImageBase64Data(imageFullName);
        let extensionName = path.extname(imageFullName);
        let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${imageData}`;
        //let imgSrcString =imageData;
            res.writeHead(200, {
              'Content-Type': 'image/jpeg',
              'Content-Length': imgSrcString.length
            });
            res.end(imgSrcString); 
    });

    // converting readFile to return promise to asycn await can be used
    getImageBase64Data= (imageFullName)=>(
      new Promise((resolve,reject)=>{
        fs.readFile(imageFullName, (err, data)=>{
            //error handle
            if(err) reject(error)
            //get image file extension name
            let extensionName = path.extname(imageFullName);
            //convert image file to base64-encoded string

           // var blob = new Blob([data], {type: 'image/bmp'});
           // const a =URL.createObjectURL(data);
           // logger.log('****objectURL',a);

            let base64Image = new Buffer(data, 'binary').toString('base64');
            resolve(base64Image);
        });
      })
    )
    

    // for displaying image as <img  src='data:image/jpeg;base64, LzlqLzRBQ...<!-- base64 data -->' />
    // without aync await
    app.get("/api22/images/:imageName", async (req, res)=>{
      const imageName = req.params.imageName;
      const imageFullName= path.join(__dirname, '..',"uploads/"+imageName);
     
      //read image file
      fs.readFile(imageFullName, (err, data)=>{
          
          //error handle
          if(err) res.status(500).send(err);
          
          //get image file extension name
          let extensionName = path.extname(imageFullName);
          
          //convert image file to base64-encoded string
          let base64Image = new Buffer(data, 'binary').toString('base64');
          
          //combine all strings
          let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
          
          res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': imgSrcString.length
          });
          res.end(imgSrcString); 
      })
  });

  //for displaying image as <img  src="/api/images/b.jpeg"
  app.get("/api222/images/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    const imageFullName= path.join(__dirname, '..',"uploads/"+imageName);
    res.sendFile(path.join(__dirname, '..',"uploads/"+imageName));
  });

   
}