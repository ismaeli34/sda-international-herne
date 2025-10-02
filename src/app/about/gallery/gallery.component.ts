import { Component } from '@angular/core';
import { GalleryItem, GalleryModule, ImageItem} from 'ng-gallery';

@Component({
  selector: 'app-gallery',
  imports: [GalleryModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {


  images: GalleryItem[] =[];

  ngOnInit() {
    // Set items array
    const imagePaths = [
      'sda_17.jpeg',
      'sda_1.jpeg',
      'sda_2.jpeg',
      'sda_4.jpeg',
      'sda_7.jpeg',
      'sda_8.jpeg',
      'sda_9.jpeg',
      'sda_10.jpeg',
      'sda_11.jpeg',
      'sda_12.jpeg',
      'sda_13.jpeg',
      'sda_14.jpeg',
      'sda_15.jpeg',
      'sda_16.jpeg',
      'sda_18.jpeg',
      'sda_19.jpeg',
      'sda_22.jpeg',
      'sda_23.jpeg',
      'sda_24.jpeg',

    ];

    this.images = imagePaths.map(path => new ImageItem({ src: path, thumb: path }));

  }

}
