import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

export interface Character {
  name: string;
  image: string;
  fatality: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'drag-drop';

  myList: Character[];
  confirmList: Character[] = [];

  constructor(private httpCliente: HttpClient){
    this.getMyList()
  }

  getMyList(){
    this.httpCliente.get<Character[]>("assets/data.json")
    .subscribe(list =>{
      this.myList = list;
    })
  }

  drop(event: CdkDragDrop<Character[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }


}

}
