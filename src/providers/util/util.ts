import { Injectable } from '@angular/core';
import { AlertController, ToastController, Platform } from 'ionic-angular';
import { Camera, CameraOptions  } from '@ionic-native/camera';


@Injectable()
export class UtilProvider {

    constructor(private platform: Platform, private alertCtrl: AlertController, 
                private toastCtrl: ToastController, private camera: Camera){


        
    }

    
    doAlert(title, message, buttonText){
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: [buttonText]
        });
        alert.present();
    }

    getToast(message: string) {
    return this.toastCtrl.create({
      message: message,
      duration: 2000
    })
  }

 

    dataURItoBlob(dataURI){
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++){
            ia[i] = byteString.charCodeAt(i);
        }

        var bb = new Blob([ab], {type: mimeString});
        return bb;
    }

    



    

    
    getPicture(sourceType = 0, allowEdit = true){
        let base64Picture;
        const options: CameraOptions = {
        quality: 100,
        destinationType: 0,
        sourceType: sourceType,
        encodingType: 0,
        mediaType: 0,
        allowEdit: allowEdit
        };
        let promise = new Promise((resolve, reject)=>{
            this.camera.getPicture(options).then((imageData)=>{
                base64Picture = "data/:image/jpeg;base64," + imageData;
                resolve(base64Picture);
            }, (error)=>{
                reject(error);
            });
        });
        return promise;

    }

}
