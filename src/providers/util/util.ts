import { Injectable } from '@angular/core';
import { AlertController, Platform } from 'ionic-angular';
import { Camera, CameraOptions  } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';

@Injectable()
export class UtilProvider {

    constructor(private platform: Platform, private alertCtrl: AlertController, 
                private toast: Toast, private camera: Camera){


        
    }

    
    doAlert(title, message, buttonText){
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: [buttonText]
        });
        alert.present();
    }

    getToast(message, duration){
       this.toast.show(message,'3000','center').subscribe(
           toast=>{
               console.log(toast);
           }
       );
        
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
        destinationType: this.camera.DestinationType.DATA_URL,
        sourceType: sourceType,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
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
