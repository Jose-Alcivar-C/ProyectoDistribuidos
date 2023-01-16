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
    fetch("http://ec2-44-209-225-228.compute-1.amazonaws.com/valores/mascotas")
    .then(response => response.json())
    .then(data => {
        this.mascotas = data;
    })
    .catch(console.error);
  }
}
