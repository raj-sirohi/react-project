const becrypt = require('bcrypt-nodejs');


console.log('password file')

const password="AA"

/*var hashedPassword = '2a$10$qQ3ue0GKJKsXtenDvfNcw.m1sw11T9HSze.5bAs4sBWol5yvEcIZ.';

becrypt.compare("A", hashedPassword, function(err, res) {
    console.log(err);
});

becrypt.hash("bacon", null, null, function(err, hash) {
    console.log(hash);
});*/

const generatePassword =(password)=>{

    return new Promise((resolve,reject)=>{
        becrypt.genSalt(10, function(err, salt) {
            if (err) { return reject(err); }

            // hash (encrypt) our password using the salt
            becrypt.hash(password, salt, null, function(err, hash) {
                if (err) { return reject(err); }

               console.log('success')
               return resolve(hash);
            });
        });

    })
};

const hashPwd = generatePassword("a")
    .then(hash=>console.log('hash',hash))
    .catch(error=>console.log(error,error))

/*
becrypt.genSalt(10, function(err, salt) {
    if (err) { return console.log(err); }

    // hash (encrypt) our password using the salt
    becrypt.hash(password, salt, null, function(err, hash) {
        if (err) { console.log(err); }

        // overwrite plain text password with encrypted password
        console.log('hash:',hash);
    });
});

const hashedPassword2 ='$2a$10$L78G5Iuq6mrUMvEh8795x.UQLk8EmIpX4smvtRGC4Da9cLxr/gBoa';

becrypt.compare(password, hashedPassword2, function(err, res) {
    console.log('error:',err);
    console.log('res:',res)
});*/
