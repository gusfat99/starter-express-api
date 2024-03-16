const moment = require("moment");
const path = require("path");

class Utilities {
  today(format = "YYYY-MM-DD") {
    const result = moment().locale("id").format(format);
    return result;
  }

  convertDate(val, format = "YYYY-MM-DD") {
    const result = moment(val).locale("id").format(format);
    return result;
  }

  intToRoman = (num) => {
    const map = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };
    let result = '';
  
    for (let key in map) {
      const repeatCounter = Math.floor(num / map[key]);
  
      if (repeatCounter !== 0) {
        result += key.repeat(repeatCounter);
      }
  
      num %= map[key];
  
      if (num === 0) return result;
    }
  
    return result;
  };
  
  makeid(length = 10) {
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    var result = "";
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  blobToFile(theBlob, fileName, fileType) {
    const file = new File([theBlob], fileName, { lastModified: new Date(), type: fileType });
    return file;
  }

  dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  blobToUint8Array(blobData) {

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = event => {
        resolve(new Uint8Array(event.target.result));
      };
      reader.onerror = () => {
        reject();
      };
      reader.readAsArrayBuffer(blobData);
    });
  }
}

module.exports = new Utilities();
