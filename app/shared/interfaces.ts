export interface IEnclosure {
     id: number;
     lengthIn: number;
     widthIn: number;
     depthIn: number;
     lengthMm: number;
     widthMm: number;
     depthMm: number;
     material: string
     ingressProtection: string;
     outdoorUse: boolean;
     ulApproval: boolean;
     nema4X: boolean;
     series: string;
     typeNumber: string;
     partNumber: string;
     description: string;
     imageUrl: string;
     pdfUrl: string;
     drawingUrl: string;
     modelUrl: string;
     materialList: string[];
     ingressList: string[];
     seriesList: string[];
}

export interface IFilter {
     minLength?: number;
     minWidth?: number;
     minDepth?: number;
     maxLength?: number;
     maxWidth?: number;
     maxDepth?: number;
     dimensionUnit: string
     partNumber: string;
     materialList: string[];
     ingressList: string[];
     seriesList: string[];
     outdoorUse?: boolean;
     ulApproval?: boolean;
     nema4X?: boolean;
}
 
export interface Pagination {
    CurrentPage : number;
    ItemsPerPage : number;
    TotalItems : number;
    TotalPages: number;
}
 
export class PaginatedResult<T> {
    result :  T;
    pagination : Pagination;
}
 
export interface Predicate<T> {
    (item: T): boolean
}