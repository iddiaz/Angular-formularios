import { FormulariosPage } from './../../../../e2e/app.po';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { Observable } from 'rxjs/Rx';

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
  };

  // si el formulario es muy grande es conveniente hacer la construcción en el ngOnInit mejor, 
  // para que lo cargue una vez haya cargado la página y no antes.
  constructor() {
    console.log(this.usuario);

    this.forma = new FormGroup({
      'nombrecompleto': new FormGroup({
        // 1a. -carga de la data al formulario a partir del objeto, este metodo es válido pero nada práctico
        'nombre': new FormControl( this.usuario.nombrecompleto.nombre, [ Validators.required,
                                         Validators.minLength(3) ] ),
        'apellido': new FormControl( '', [Validators.required,
                                          this.noDiaz] )
      }),
      'correo': new FormControl( '', [ Validators.required,
                                       Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")
          ]),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required )
      ]),
      'password1': new FormControl('', Validators.required ),
      // esto se podria validar igual que el resto, pero lo vamos hacer según la linea 48
      'password2': new FormControl( ),

      // validación asíncrona
      'username': new FormControl('', Validators.required, this.existeUsuario  )
    });
    //  1b- es más cómodo hacerlo asi, si tiene la misma estructura, recorrera el objeto y le aplicará todos los valores.
    // this.forma.setValue(this.usuario);

    // otra forma de validar
    this.forma.controls['password2'].setValidators([
      Validators.required,
      // aqui tendremos que pasarle el valor del contexto local porque this cambia desde donde se ejecuta
      this.noIgual.bind(this.forma)
    ]);

    // Detectar cambios en cualquier campo del formulario
    // valuechanges retorna un observable por lo tanto me puedo suscribir
    this.forma.valueChanges
      .subscribe( data => console.log(data));

    // Detectar cambios en un campo específico de formulario
    this.forma.controls['username'].valueChanges
      .subscribe( data => console.log(data));
    
    // También podemos suscribirnos al estado de los cambios
    this.forma.controls['username'].statusChanges
      .subscribe( data => console.log(data));
   }



    agregarPasatiempo(){
     // indicamos a typescript que es un arreglo asi...
     (<FormArray>this.forma.controls['pasatiempos']).push(
       new FormControl('', Validators.required)
     );
   }

    // validaciónes personalizadas
    noDiaz( control: FormControl ): { [s: string]: boolean }  {
      if ( control.value === 'diaz' ) {
        return {
          nodiaz: true
          // si regreso algo es que la validación falla
        };
      }
      return null;
    }

    noIgual( control: FormControl ): { [s: string]: boolean }  {
      console.log('this es', this);
      // if( control.value !== this.forma.controls['password1'].value ) {
      //   return {
      //     noigulales: true
      //     //si regreso algo es que la validación falla
      //   }
      // }
      // return null;

      // ajustamos el valor de forma en la funcion
      let forma: any = this;

      if( control.value !== forma.controls['password1'].value ) {
        return {
          noigulales: true
          // si regreso algo es que la validación falla
        }
      }
      return null;
    }

    existeUsuario( control: FormControl ): Promise<any>|Observable<any> {
      let promesa = new Promise(
        (resolve, reject) => {
          setTimeout( () => {
            if( control.value === 'strider') {
              resolve( { existe: true } );
            } else {
              resolve ( null );
            }
          }, 3000);
        }
      );
      return promesa;
    }


   guardarCambios() {
     console.log(this.forma.value);
     console.log(this.forma);

    // 2a.- con reset podemos resetear el formulario a sus valores originales antes de que fuera tocado niongún componente
    //  this.forma.reset({
    //    nombrecompleto: {
    //      nombre: 'Peter',
    //      apellido: ''
    //    },
    //    correo: ''
    //  });

     // 2b.- otro método de hacerlo podria ser así, aunque es más engorroso ya que requiere escribir cada campo.
    //  this.forma.controls['correo'].setValue('nuevocorreo@correo.com');
   }




}
