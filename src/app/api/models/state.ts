export interface IState {
    sigla: string;
    descricao: string;
    dataInclusao?: Date;
    dataAlteracao?: Date;
}

export class State {
    sigla: string;
    descricao: string;
    dataInclusao?: Date;
    dataAlteracao?: Date;
}
