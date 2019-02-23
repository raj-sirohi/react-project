const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const ThumbnailGenerator = require('video-thumbnail-generator').default;

const uploadPath = path.join(__dirname, '..',"uploads/");
console.log('uploadPath:',uploadPath);
const sourcePath=uploadPath+'SampleVideo_1280x720_20mb.mp4'
console.log('sourcePath:',sourcePath);
const outputDir =uploadPath+'thumbnail/'
console.log('outputDir:',outputDir);

// var proc = new ffmpeg(sourcePath)
//   .takeScreenshots({
//       count: 1,
//       timemarks: [ '1' ] // number of seconds
//     }, outputDir, function(err) {
//     console.log('screenshots were saved')
//   });


 
 // pathToFile = path.join(__dirname, 'folder', 'file.mov'),
  //pathToSnapshot = path.join(__dirname, 'folder', 'file-snapshot.jpg');

// Also a default node module
// require('child_process').exec(('ffmpeg -ss 00:00:01 -i ' + sourcePath + ' -vframes 1 -q:v 2 ' + outputDir), function () {

//   console.log('Saved the thumb to:', outputDir);

// });


  
// const tg = new ThumbnailGenerator({
//     sourcePath: sourcePath,
//     thumbnailPath: outputDir,
//     tmpDir: outputDir //only required if you can't write to /tmp/ and you need to generate gifs
//   });

//   tg.generate()
//   .then(console.log('generated files'));

ffmpeg(sourcePath)
  .on('end', function() {
    console.log('Screenshots taken');
  })
  .on('error', function(err) {
    console.error('ffmped error:',err);
  })
  .screenshots({
    // Will take screenshots at 20%, 40%, 60% and 80% of the video
   filename:'awwwww.jpg',
    timestamps: ['2'],
    folder: outputDir
  });