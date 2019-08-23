import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(arreglo: any[], Texto: string, ): any[] {
    if ( Texto === '') {
      return arreglo;
    }
    Texto = Texto.toLowerCase();
    return arreglo.filter(element => {
      return element.clientes.Nombre.toLowerCase().includes(Texto);
    });

    }
}
