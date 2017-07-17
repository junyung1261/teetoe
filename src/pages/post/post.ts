import { Component } from '@angular/core';
import { ViewController, NavController, ActionSheetController, IonicPage } from 'ionic-angular';
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet';
import { CommunityProvider } from '../../providers/community/community';
import { UtilProvider } from '../../providers/util/util';


@IonicPage()


@Component({
    selector: 'page-post',
    templateUrl: 'post.html'
})
export class PostPageModal {
    postContent:string;
    image = null;
    blobImage;
    constructor(
        private viewController:ViewController, 
        private navController: NavController, 
        private socialProvider: CommunityProvider, 
        private util:UtilProvider,
        private actionSheetCtrl: ActionSheetController) {
    }

    dismiss() {
        this.viewController.dismiss();
    }

    sendPost() {
        let obj = {content: this.postContent, image:this.image};
        this.socialProvider.createPost(obj)
        .then((postKey) => {
            console.log(postKey);
            // if Image is Added
            if(this.blobImage) {
                this.socialProvider.postImage(postKey, this.blobImage)
                .then(url => {
                    this.socialProvider.updatePost(postKey,{image:url});
                });
            }
            this.reset();
            this.dismiss();
        });
    }

    addImage() {
        this.presentPictureSource()
        .then(source => {
            let sourceType:number = Number(source);
            return this.util.getPicture(sourceType, false);
        })
        .then(imageData => {
            this.blobImage = this.util.dataURItoBlob(imageData);
        });
    }

   presentPictureSource() {
        let promise = new Promise((res, rej) => {
            let actionSheet = this.actionSheetCtrl.create({
            title: 'Select Picture Source',
            buttons: [
                { text: 'Camera', handler: () => { res(1); } },
                { text: 'Gallery', handler: () => { res(0); } },
                { text: 'Cancel', role: 'cancel', handler: () => { rej('cancel'); } }
            ]
            });
            actionSheet.present();
        });
        return promise;
    }


    reset() {
        this.postContent = "";
        this.image = null;
        this.blobImage = null;
    }
}