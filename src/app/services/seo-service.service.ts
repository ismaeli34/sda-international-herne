import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoServiceService {
  constructor(private title: Title, private meta: Meta) {}

  setMeta(title: string, description: string, breadcrumbs?: any) {
    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });

    if (breadcrumbs) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(breadcrumbs);
      document.head.appendChild(script);
    }
  }
}
