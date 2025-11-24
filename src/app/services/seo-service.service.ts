// src/app/services/seo-service.service.ts
import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoServiceService {
  constructor(private title: Title, private meta: Meta) {}

  /**
   * setMeta
   * @param titlePage page title
   * @param description meta description
   * @param schemas - a single JSON-LD object or an array of JSON-LD objects
   * @param canonicalUrl - optional canonical URL
   */
  setMeta(titlePage: string, description: string, schemas?: any | any[], canonicalUrl?: string) {
    // title + description
    this.title.setTitle(titlePage);
    this.meta.updateTag({ name: 'description', content: description || '' });

    // remove old dynamic JSON-LD scripts
    const oldScripts = Array.from(document.querySelectorAll('script[data-dynamic-schema]'));
    oldScripts.forEach(s => s.remove());

    // set canonical
    if (canonicalUrl) {
      // remove existing canonical links
      const oldCanon = document.querySelectorAll('link[rel="canonical"]');
      oldCanon.forEach(n => n.remove());

      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', canonicalUrl);
      document.head.appendChild(link);
    }

    // accept single object or array
    if (schemas) {
      const arr = Array.isArray(schemas) ? schemas : [schemas];
      arr.forEach(schemaObj => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-dynamic-schema', 'true');
        // pretty JSON not necessary, but readable
        script.text = JSON.stringify(schemaObj);
        document.head.appendChild(script);
      });
    }
  }
}
