import axios from '../../config/axios/axiosBlog'
import Logger from 'logger';

const logger =Logger('MediaActions');

export const uploadMedia =(data)=> async dispatch =>{

    try{
        let formData = new FormData();
       
        formData.append('lastName', data.lastName);
        formData.append('ImageDropField2', data);
       
       // formData.append('ImageDropField2', data.ImageDropField2);
      // logger.log('formData',formData)
       // const res = await axios.post('/fileUpload', formData);
        const res = await axios.post('/video', formData);


    }catch(error){
        logger.error('uploadFile error:',error);
    }

}

export const uploadFile =(data)=> async dispatch =>{
//logger.log('uploadFile data',data);
    try{
        let formData = new FormData();
        formData.append('file', data);
        const res = await axios.post('/video', formData);
       // logger.log('uploadFile res',res);
        return res;


    }catch(error){
        logger.error('uploadFile error:',error);
    }

}

// can be used to upload file along with form data 
export const uploadFileWithFormData =(data)=> async dispatch =>{

    try{
        let formData = new FormData();
      // logger.log('data.ImageDropField3',data.ImageDropField3)
        formData.append('lastName', data.lastName);

        for (let i = 0; i < data.ImageDropField3.length; i += 1) {
            formData.append('ImageDropField2', data.ImageDropField3[i]);
           // logger.log('loop data.ImageDropField2[i]',data.ImageDropField3[i])
          }
       // formData.append('ImageDropField2', data.ImageDropField2);
      // logger.log('formData',formData)
       // const res = await axios.post('/fileUpload', formData);
        const res = await axios.post('/video', formData);


    }catch(error){
        logger.error('uploadFile error:',error);
    }

}

export const  getImage=(imageUrl)=>async dispatch=>{

   // logger.log('getImage imageUrl',imageUrl)
    const res = await axios.get(imageUrl);
    //logger.log('getImage res',res);
    return res;
}

export const  getVideo=(videoName)=>async dispatch=>{

    logger.log('getVideo videoName',videoName)
    const res = await axios.get('/videos/'+videoName);
    logger.log('getVideo res',res);
    return res;
}