export interface Col {
    id: number;
    name: string;
    type: string;
  }
  
  export interface Data {
    id: number;
    title: string;
    description: string;
    location: string;
    type: string;
    participantsCount?:string;
    musicGenre?:string
  }


  export type Mode='create' | 'edit'