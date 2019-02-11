const multer = require('multer');
    const uuidv4 = require('uuid/v4');
    const path = require('path');
    const fs =require('fs')
    const URL = require('url').URL;
    const busboy = require('connect-busboy');
    const ffmpeg = require('fluent-ffmpeg');
    var thumb = require('node-thumbnail').thumb;
   

    const uploadPath = path.join(__dirname, '..',"uploads/");; // Register the upload path
   // fs.ensureDir(uploadPath); 
   const tumbnailPath = path.join(__dirname, '..',"uploads/thumbnail/");
  //  const proc = new ffmpeg(fullPathTofileName)
  // .takeScreenshots({
  //     count: 1,
  //     timemarks: [ '600' ] // number of seconds
  //   }, tumbnailPath, function(err) {
  //   console.log('screenshots were saved')
  // });

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
  app.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})); 
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
        console.log('/api/images/:imageName aaaa:',imageName);
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
            if(err) reject(err)
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

    app.get("/api/videos/:videoName", function(req, res) {
      const videoName = req.params.videoName;
      const path1= path.join(__dirname, '..',"uploads/"+videoName);
     // const path = 'assets/sample.mp4'
      const stat = fs.statSync(path1)
      const fileSize = stat.size
      const range = req.headers.range
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10)
        const end = parts[1] 
          ? parseInt(parts[1], 10)
          : fileSize-1
        const chunksize = (end-start)+1
        const file = fs.createReadStream(path1, {start, end})
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        }
        res.writeHead(200, head)
        fs.createReadStream(path).pipe(res)
      }
    });


    app.post('/api/video',(req, res, next) => {
 
      req.pipe(req.busboy); // Pipe it trough busboy
      req.busboy.on('field', function(key, value, keyTruncated, valueTruncated) {
        console.log(`field name,value '${key}', '${value}' started`);
      });

      req.busboy.on('file', (fieldname, file, filename) => {
          console.log(`Upload of '${filename}' started`);
   
          // Create a write stream of the new file
          const fstream = fs.createWriteStream(path.join(uploadPath, filename));
          // Pipe it trough
          file.pipe(fstream);
   
          // On finish of the upload
          fstream.on('close', () => {
              console.log(`Upload of '${filename}' finished`);
              const fullFileName=path.join(uploadPath, filename);

              console.log(`fullFileName: '${fullFileName}' finished`);
             // proc(fullFileName);
          
res.send();
            //  res.status(200).send({upload:'success'});
          });
      });
  });


    //for displaying image as <img  src="/api/images/b.jpeg"
  app.get("/api22/videos/:videoName", (req, res) => {
    const videoName = req.params.videoName;
    const imageFullName= path.join(__dirname, '..',"uploads/"+videoName);
    res.sendFile(path.join(__dirname, '..',"uploads/"+videoName));
  });

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