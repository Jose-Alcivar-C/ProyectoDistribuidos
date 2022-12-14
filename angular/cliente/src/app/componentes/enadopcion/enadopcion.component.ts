import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enadopcion',
  templateUrl: './enadopcion.component.html',
  styleUrls: ['./enadopcion.component.css']
})
export class EnadopcionComponent implements OnInit {

  mascotas: any[] = [];

  constructor() { }

  ngOnInit(): void {
    fetch("http://localhost:3000/valores/mascotas")
    .then(response => response.json())
    .then(data => {
        this.mascotas = data;
    })
    .catch(console.error);
  }
}
