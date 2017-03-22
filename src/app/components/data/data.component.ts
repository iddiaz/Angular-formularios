
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma: FormGroup;

  usuario: any = {
    nombrecompleto: {
      nombre: 'Ivan',
      apellido: 'Diaz'
    },
    correo: 'correo@ivandiazdiaz.com',
    // pasatiempos: ['correr', 'dormir', 'comer']
  }

  //si el formulario es muy grande es conveniente hacer la construcción en el ngOnInit mejor, para que lo cargue una vez haya cargado la página y no antes.
  constructor() { 
    console.log(this.usuario);

    this.forma = new FormGroup({
      'nombrecompleto': new FormGroup({
        //1a. -carga de la data al formulario a partir del objeto, este metodo es válido pero nada práctico
        'nombre': new FormControl( this.usuario.nombrecompleto.nombre, [ Validators.required,
                                         Validators.minLength(3) ] ),
        'apellido': new FormControl( '', Validators.required )
      }),
      'correo': new FormControl( '', [ Validators.required,
                                       Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
          ]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required )
      ])
    });
    //  1b- es más cómodo hacerlo asi, si tiene la misma estructura, recorrera el objeto y le aplicará todos los valores.
    // this.forma.setValue(this.usuario);
   }


   guardarCambios() {
     console.log(this.forma.value);
     console.log(this.forma);

     //2a.- con reset podemos resetear el formulario a sus valores originales antes de que fuera tocado niongún componente
     this.forma.reset({
       nombrecompleto: {
         nombre: 'Peter',
         apellido: ''
       },
       correo: ''
     });

     //2b.- otro método de hacerlo podria ser así, aunque es más engorroso ya que requiere escribir cada campo.
     this.forma.controls['correo'].setValue('nuevocorreo@correo.com');
   }

   agregarPasatiempo(){
     //indicamos a typescript que es un arreglo asi...
     (<FormArray>this.forma.controls['pasatiempos']).push(
       new FormControl('', Validators.required)
     );
   }


}
