import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-bypass-security',
  templateUrl: './bypass-security.component.html',
  styleUrls: ['./bypass-security.component.css']
})
export class BypassSecurityComponent implements OnInit {
  dangerousUrl: string;
  dangerousVideoUrl = 'https://www.youtube.com/embed/lgSLz5FeXUg';
  trustedUrl: any;
  videoUrl: any;
  htmlSnippet = 'Template <script>alert("0wned")</script> <b>Syntax</b>';
  
  constructor(private sanitizer: DomSanitizer) {
  // javascript: URLs are dangerous if attacker controlled.
  // Angular sanitizes them in data binding, but you can
  // explicitly tell Angular to trust this value:
  this.dangerousUrl = 'javascript:alert("Hi there")';
  this.trustedUrl = sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);
  this.videoUrl =
  this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/F3J0iwwsq-w');
   }

  ngOnInit() {
  }

  updateVideoUrl(id: string) {
    // Appending an ID to a YouTube URL is safe.
    // Always make sure to construct SafeValue objects as
    // close as possible to the input data so
    // that it's easier to check if the value is safe.
    this.dangerousVideoUrl = 'https://www.youtube.com/embed/' + id;
    this.videoUrl =
        this.sanitizer.bypassSecurityTrustResourceUrl(this.dangerousVideoUrl);
  }
}
