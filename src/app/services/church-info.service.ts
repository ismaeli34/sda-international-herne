import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';


interface ChurchInfo {
  englishServiceTime: string;
  sundaySchoolServiceTime: string;
  address: string;
}
@Injectable({
  providedIn: 'root'
})
export class ChurchInfoService {
  private churchInfoSubject = new BehaviorSubject<ChurchInfo>({
    englishServiceTime: '10:00 AM',
    sundaySchoolServiceTime: '10:00 AM',
    address: 'Bochumer Str. 229, 44625 Herne'
  });

  constructor() { }


  // Expose as Observable for other components
  churchInfo$ = this.churchInfoSubject.asObservable();

  // Method to update info
  // ✅ Update all fields dynamically
  updateChurchInfo(
    englishServiceTime: string,
    sundaySchoolServiceTime: string,
    address: string
  ) {
    this.churchInfoSubject.next({
      englishServiceTime,
      sundaySchoolServiceTime,
      address
    });
  }

  // Optional getters for quick access
  getCurrentInfo(): ChurchInfo {
    return this.churchInfoSubject.value;
  }
}
