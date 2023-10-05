import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-comparador',
  templateUrl: './comparador.component.html',
  styleUrls: ['./comparador.component.css']
})
  

export class ComparadorComponent {
  
  public Categorias(): string[]{
    const obj: object[] = []

    obj.push(

      { Almacenamiento:"64 Gigabyte",
      Ram:"4 Gigabytes",
      Tamano:"pepe"
    } as object
    )
    let entries = Object.entries(obj[0])
    let mapinha:Map<string,string> = new Map()
let data = entries.map( ([key, val] ) => {
  mapinha.set(key,val)
});
console.log(mapinha);
    return  Array.from(mapinha.keys());
  }
  public Datos2(){
    return { Almacenamiento:"64 Niggbyte",
    Ram:"8 Gigabytes",
    Tamaño:"mayor"
  }
  }

}
