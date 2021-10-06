import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cpfCnpjPipe' })
export class CpfPipe implements PipeTransform {
    transform(
        value: string | number,
        ocultarAlgunsValores: boolean = false
    ): string {
        let valorFormatado = value + '';
        if (valorFormatado.length > 11) {
            valorFormatado = valorFormatado
                .substr(0, 14)
                .replace(/[^0-9]/, '')
                .replace(/(\d{2})(\d{3})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        } else {
            valorFormatado = valorFormatado
                .substr(0, 11)
                .replace(/[^0-9]/, '')
                .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }

        if (ocultarAlgunsValores) {
            valorFormatado = 'XXX.' + valorFormatado.substr(4, 7) + '-XX';
        }

        return valorFormatado;
    }
}
