import { InvalidPipeArgumentError } from '@angular/common/src/pipes/invalid_pipe_argument_error';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border:solid red 1px
    }
  `]
})
export class TemplateComponent {
  usuario: Object = {
    nombre: null,
    apellido: null,
    correo: null,
    pais: '',
    sexo: 'Hombre',
    acepta: false
  };

  paises = [
    {
      codigo: 'CRI',
      nombre: 'Costa Rica',

    },
    {
      codigo: 'ES',
      nombre: 'España'
    }
  ];

  sexos: string[] = ['Hombre', 'Mujer'];

  constructor() { }

  guardar(forma: NgForm){

    console.log('ngForm', forma);
    console.log('valor forma', forma.value);
    console.log('Usuario', this.usuario);
  }

}
