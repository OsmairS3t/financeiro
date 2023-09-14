export interface ICategory {
    id: number;
    name: string;
    icon: string;
    color: string;
}

export interface IBalance {
    id: number;
    category: number;
    typebalance: string;
    name: string;
    price: number;
    datebalance: string;
    file?: string;
}

export interface IResumeCategory {
    idcategory: number;
    iconcategory: string;
    namecategory: string;
    colorcategory: string;
    balancecategory: number;
    datebalance: string;
}

export interface IResumeBalance {
    id: number;
    name: string;
    value: number;
    datebalance: string;
    color: string;
}
