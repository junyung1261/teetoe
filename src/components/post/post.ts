import { NgModule, Component, Input, OnInit, OnChanges} from '@angular/core';

import { CommunityProvider } from '../../providers/community/community';




@Component({
    selector: 'post',
    templateUrl: 'post.html'
})

export class PostCmp {
    @Input() feed;
    post;
    poster;
    constructor(public communityProvider:CommunityProvider) {
        
    }

    ngOnInit() {
        let postID = this.feed.$key;
        this.post = this.communityProvider.getPost(postID);
        this.post
        .subscribe(value => {
            this.poster = this.communityProvider.getUser(value.from);
        });
    }
}