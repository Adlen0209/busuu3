export type User = {
    id: number;
    nom: string;
    prenom: string;
    email: string | undefined;
    role: number;
    mot_de_passe: string;
    mot_de_passe_confirm: string;
  };
  
  //~ Schemas
  
  //& Article
//   export interface ArticleSchema {
//     title: string;
//     abstract: string;
//     content: string;
//   }
  
//   //& Category
//   export interface CategorySchema {
//     name: string;
//     logo: string;
//     color?: string;
//   }
  
//   //& GoldenBookTicket
//   export interface GoldenBookTicketSchema {
//     content: string;
//   }
  
//   //& Project
//   export interface ProjectSchema {
//     title: string;
//     abstract: string;
//     content: string;
//     picture: string;
//     is_active?: boolean;
//     date: string;
//     link?: string;
//     categories?: object[];
//   }
  
  //& User
  export interface UserSchema {
    nom: string;
    prenom: string;
    email: string;
    mot_de_passe: string;
    mot_de_passe_confirm: string;
  }
  
  