import React, { useContext, useEffect, useState } from 'react';
// import AWS from 'aws-sdk';
import { UserContext } from '../context/UserContext';
import axios, * as others from 'axios';
const { v4: uuidv4 } = require('uuid');

function generateUniqueId() {
  return uuidv4();
}

export const UploadExpenseForm = (closePopUp) => {
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { UserData, setUserData } = useContext(UserContext);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    e.target.value = '';
  };
  const removeFile = (fileName) => {
    setFile(null);
  };
  async function uploadFile() {
      //console.log(UserData)
      // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      //   IdentityPoolId: process.env.REACT_APP_AUTH_USER_POOL_ID,
      //   Logins: {
      //     [`cognito-idp.us-east-1.amazonaws.com/`+process.env.REACT_APP_AUTH_USER_POOL_WEB_CLIENT_ID]: UserData.accessToken
      //   }
      // });
      // AWS.config.update({
      //   accessKeyId: "",
      //   secretAccessKey: "process.env.AWS_SECRET_ACCESS_KEY",
      //   region: "us-east-1"
      // });
      
    //AWS.config.update({region:'us-east-1'})
    //console.log(AWS.config.credentials)
    //const BUCKET_NAME = 'react-whopay-test-12232444-dis';
    //const url = 'https://t49hx9gvjh.execute-api.us-east-1.amazonaws.com/dev';
    const BUCKET_NAME = 'pdf-to-textract-2';
    const url = 'https://d0wdzqjl92.execute-api.us-east-1.amazonaws.com/Test';


    axios.put((url+"/"+BUCKET_NAME+"/"+generateUniqueId()+"_"+"id"+"."+file.type.split("/")[1]), file, { //UserData.id
      headers: {
          'Content-Type': 'image/png' //'application/octet-stream' // Tipo MIME para archivos binarios
      },
    })
    .then((response) => {
      console.log('Respuesta de la API:', response); //response.data
      closePopUp.closePopUp();
    })
    .catch((error) => {
      console.error('Error al enviar archivo:', error);
      closePopUp.closePopUp();
    });
      //https://aws.amazon.com/es/blogs/compute/uploading-to-amazon-s3-directly-from-a-web-or-mobile-application/
  //   const s3 = new AWS.S3({
  //     region: 'us-east-1'
  //   });
  //   AWS.config.update({
  //     credentials: null
  // });
    //const fileContent = fs.readFileSync(fileName);
    // await new Promise((resolve, reject) => {
    //   AWS.config.credentials.refresh((error) => {
    //     if (error) {
    //       reject(error);
    //     } else {
    //       resolve();
    //     }
    //   });
    // });
    // const params = {
    //     Bucket: BUCKET_NAME,
    //     Key: file.name,//LpServiceImpl.getZipFileName(),
    //     Body: file,
    //     ACL: 'public-read', // Hacer el archivo público
    //     ContentType: file.type
    // };
  //   const params = {
  //     Bucket: BUCKET_NAME,
  // };
  //   s3.listObjects(params, (err, data) => {
  //       if (err) {
  //           console.log('File upload failed.');
  //           throw err;
  //       }
  
  //       console.log('File uploaded successfully.' + data); //data.Location
  
  //   });
  };
  return (
    <div className="popup-content">
      <div className="popup-body">
      <button className='close-button' onClick={closePopUp.closePopUp}>&times;</button>
        
        <div className="upload-box" onClick={() => document.getElementById('fileInput').click()}>
          <span className="upload-header">Upload File</span>
          <div className="upload-icon">📤</div>
          <p>Click To Upload</p>
          <input id="fileInput" type="file" onChange={handleFileChange} accept="image/png, image/jpeg" />
        </div>
          {file &&
          <div className="uploaded-files">
            <h3>Uploaded Documents</h3>
            <div className="file-item">
                <div className="file-type">{file.type.split("/")[1]}</div>
                <div className="file-name">{file.name}</div>
                <button className="remove-button" onClick={() => removeFile(file.name)}>✖</button>
            </div>
          </div>
          }
        {file && <button className='button-29' onClick={uploadFile}>Upload</button>}
      </div>
    </div>
  );
};
