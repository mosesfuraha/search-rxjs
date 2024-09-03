import { Component, Input } from '@angular/core';
import { UserPost } from '../../../models/user';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.css',
})
export class UserPostsComponent {
  @Input() userPosts: UserPost[] = [];
}
