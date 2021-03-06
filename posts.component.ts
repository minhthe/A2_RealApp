import {Component, OnInit} from 'angular2/core';
import {PostService} from './post.service';
import {UsersService} from './users.service';
import {SpinnerComponent} from './spinner.component';

@Component({
    templateUrl: 'app/post.component.html',
    providers: [PostService, UsersService],
    directives: [SpinnerComponent],
    styles: [`
         .posts li { cursor: default; }
         .posts li:hover { background: #ecf0f1; } 
         .list-group-item.active, 
         .list-group-item.active:hover, 
         .list-group-item.active:focus { 
            background-color: #ecf0f1;
            border-color: #ecf0f1; 
            color: #2c3e50; 
                }
    `]
})

export class PostsComponent implements OnInit {
    posts;
    users;
    postsLoading = true;
    currentPost;
    comments;
    commentsLoading ;
    constructor(private _postService: PostService,private _userService: UsersService) {
    }

    ngOnInit() {
        this.loadPosts();
        this.loadUsers();
   }
   
   private loadUsers(){
        this._userService.getUsers().subscribe(users => this.users = users);
   }

   private loadPosts(userId?){
        this._postService.getPosts(userId).subscribe(post => this.posts = post, null, () => { this.postsLoading = false; });
   }

    select(post) {
        this.commentsLoading = true;
        
        this.currentPost = post;
        this._postService.getComments(post.id).subscribe(comments => this.comments = comments, null, () => { this.commentsLoading = false; });

    }

    reloadPosts(id){
        this.postsLoading = true;
        this.currentPost = null;
        this.loadPosts(id);
}
}