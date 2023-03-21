import { Component, Input, OnInit } from '@angular/core';
import { PostModel } from 'src/app/model/post-model';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { PostService } from 'src/app/service/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-title',
  templateUrl: './post-title.component.html',
  styleUrls: ['./post-title.component.css']
})
export class PostTitleComponent implements OnInit {

  faComments = faComments;
  @Input()
  posts: PostModel[]|any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPost(id: number): void {
    this.router.navigateByUrl('/view-post/' + id);
  }

}
