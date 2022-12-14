import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {

  noticias: any[] = [];

  constructor() { 
    
  }

  ngOnInit(): void {
    fetch("http://localhost:3000/valores/noticias")
    .then(response => response.json())
    .then(data => {
        this.noticias = data;
    })
    .catch(console.error);
  }

}
