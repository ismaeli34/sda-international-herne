import {AfterViewInit, Component} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {

  private map!: Map;

  ngAfterViewInit(): void {
    // Coordinates for Bochumer Str. 229, Herne (approx)
    const lon = 7.214116;
    const lat = 51.519775;
    const coords = fromLonLat([lon, lat]);

    // Base map
    const baseLayer = new TileLayer({
      source: new OSM()
    });

    // Marker feature
    const marker = new Feature({
      geometry: new Point(coords),
      name: 'Lifeline - Seventh Day Adventist International Church, Herne'

    });

    // Style for marker
    marker.setStyle(new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: 'https://openlayers.org/en/latest/examples/data/icon.png' // or your own icon
      })
    }));

    const vectorSource = new VectorSource({
      features: [marker]
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    // Create map
    this.map = new Map({
      target: 'map',
      layers: [baseLayer, vectorLayer],
      view: new View({
        center: coords,
        zoom: 16
      })
    });
  }
}
